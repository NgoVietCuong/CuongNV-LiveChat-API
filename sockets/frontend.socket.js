const MessageService = require('../services/message.service');
const ChatService = require('../services/chat.service');
const Message = require('../models/message.model');
const Chat = require('../models/chat.model');
const { ObjectId } = require('mongodb');

function frontendSocket(frontendIO, browserIO) {
  frontendIO.on('connection', (socket) => {
    console.log('Frontend connected');
    console.log('Frontend socket numbers: ', frontendIO.sockets.size);
  
    socket.on('join', (data) => {
      if (data.visitorId) {
        socket.room = data.visitorId;
        socket.domain = data.domain;
        socket.join(socket.room);

        ChatService.update({ _id: data.chatId }, { read: true }).then();

        socket.messageStream = Message.watch([{ $match: { operationType: 'insert', 'fullDocument.shop': new ObjectId(data.shopId), 'fullDocument.visitor': new ObjectId(data.visitorId), 'fullDocument.sender': 'Operator' }}], { fullDocument: 'updateLookup' });
        socket.messageStream.on('change', changeEvent => {
          const document = changeEvent.fullDocument;
          browserIO.to(socket.room).emit('message', document);
          frontendIO.to(socket.room).emit('message', document);
        });
      } else {
        socket.room = data.domain;
        socket.domain = data.domain;
        socket.join(socket.room);

        const pipeline = [
          { 
            $match: { 
              operationType: 'update', 
              'fullDocument.shop': new ObjectId(data.shopId), 
              'fullDocument.status': { $in: ['Waiting', 'Open', 'Closed']},
              $expr: {
                $gt: [{ $size: { $objectToArray: '$updateDescription.updatedFields' } }, 1]
              }
            }
          }
        ]

        socket.chatStream = Chat.watch(pipeline, { fullDocument: 'updateLookup' });
        socket.chatStream.on('change', changeEvent => {
          const document = changeEvent.fullDocument;
          const updatedFields = changeEvent.updateDescription.updatedFields;
          if ((('read' in updatedFields) && !updatedFields.status) || (Object.keys(updatedFields).length === 1)){
            document.changeOrder = false;
          } else {
            document.changeOrder = true;
          }
          frontendIO.to(socket.domain).emit('updateChatList', document);
        });
      }
    });
  
    socket.on('message', (data) => {
      const messageData = data;
      const lastData = data[data.length - 1];
      const { chat, shop, visitor, ...chatData } = lastData; 
      MessageService.bulkCreate(messageData, chatData, chat).then();
    });

    socket.on('preventVisitor', (data) => {
      browserIO.to(data.visitorId).emit('preventVisitor');
    });
  
    socket.on('disconnect', () => {
      console.log('Frontend disconnected', socket.room);
      if (socket.messageStream) {
        socket.messageStream.close();
      }
      if (socket.chatStream) {
        socket.chatStream.close();
      }
    });
  });
} 

module.exports = frontendSocket;