const MessageService = require('../services/message.service');
const VisitorService = require('../services/visitor.service');
const Message = require('../models/message.model');
const Chat = require('../models/chat.model');
const { ObjectId } = require('mongodb');

function browserSocket(frontendIO, browserIO) {
  browserIO.on('connection', (socket) => {
    console.log('Browser connected');
    console.log('Browser socket numbers: ', browserIO.sockets.size);

    socket.on('join', (data) => {
      socket.room = data.visitorId;
      socket.shop = data.shopId;
      socket.domain = data.domain;
      socket.join(socket.room);

      const roomSockets = browserIO.adapter.rooms.get(socket.room);
      if (roomSockets.size === 1) {
        frontendIO.to(socket.domain).emit('onlineVisitor', data.visitorInfo);
        socket.messageStream = Message.watch([{ $match: { operationType: 'insert', 'fullDocument.shop': new ObjectId(data.shopId), 'fullDocument.visitor': new ObjectId(data.visitorId), 'fullDocument.sender': 'Visitor' } }], { fullDocument: 'updateLookup' });
        socket.messageStream.on('change', changeEvent => {
          const document = changeEvent.fullDocument;
          browserIO.to(socket.room).emit('message', document);
          frontendIO.to(socket.room).emit('message', document);
        });
      }
    });

    socket.on('updateVisitor', (data) => {
      frontendIO.to(socket.domain).emit('updateVisitor', data);
    });

    socket.on('message', (data) => {
      const chatSocket = frontendIO.adapter.rooms.get(data.visitor);
      const messageData = data;
      const { chat, shop, visitor, ...chatData } = data;
      if (chatSocket) {
        MessageService.create(messageData, chatData, true).then();
      } else {
        MessageService.create(messageData, chatData, false).then();
      } 
    });

    socket.on('disconnect', () => {
      console.log('Browser disconnected:', socket.room);
      if (socket.messageStream) {
        socket.messageStream.close();
      }
      const roomSockets = browserIO.adapter.rooms.get(socket.room);
      if (!roomSockets) {
        VisitorService.updateOne({ _id: socket.room, shop: socket.shop }, { active: false }).then(() => {
          frontendIO.to(socket.domain).emit('offlineVisitor', socket.room);
        });
      }
    });
  });
}

module.exports = browserSocket;