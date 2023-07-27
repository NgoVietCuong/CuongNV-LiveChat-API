const MessageService = require('../services/message.service');
const VisitorService = require('../services/visitor.service');

function browserSocket(frontendIO, browserIO) {
  browserIO.on('connection', (socket) => {
    console.log('Browser connected');
    console.log('Browser socket numbers: ', browserIO.sockets.size);
    
    socket.on('join', (data) => {
      socket.room = data.visitorId;
      socket.shop = data.shopId;
      socket.domain = data.domain;
      socket.join(socket.room);
    });
  
    socket.on('message', (data) => {
      console.log('browser room', socket.room);
      console.log('Received message from browser:', data);
      MessageService.create(data).then((data) => {
        frontendIO.to(socket.room).emit('message', data.savedMessage);
        frontendIO.to(socket.domain).emit('updateChatList', data.chat);
      });
    });
  
    socket.on('disconnect', () => {
      console.log('Browser disconnected:', socket.room, socket.shop);
      VisitorService.updateOne({ _id: socket.room, shop: socket.shop }, { active: false }).then((data) => console.log(data));
    });
  });
}

module.exports = browserSocket;