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
      const roomSockets = browserIO.adapter.rooms.get(socket.room);
      if (roomSockets.size === 1) {
        frontendIO.to(socket.domain).emit('onlineVisitor', data.visitorInfo);
      }
    });

    socket.on('updateVisitor', (data) => {
      frontendIO.to(socket.domain).emit('updateVisitor', data);
    });

    socket.on('message', (data) => {
      MessageService.create(data).then((data) => {
        frontendIO.to(socket.domain).emit('updateChatList', data.chat);
        frontendIO.to(socket.room).emit('message', data.savedMessage);
      });
    });

    socket.on('disconnect', () => {
      console.log('Browser disconnected:', socket.room);
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