const MessageService = require('../services/message.service');

function frontendSocket(frontendIO, browserIO) {
  frontendIO.on('connection', (socket) => {
    console.log('Frontend connected');
    console.log('Frontend socket numbers: ', frontendIO.sockets.size);
  
    socket.on('join', (data) => {
      if (data.visitorId) {
        socket.room = data.visitorId;
        socket.domain = data.domain;
        socket.join(socket.room);
      } else {
        socket.room = data.domain;
        socket.domain = data.domain;
        socket.join(socket.room);
      }
      socket.join(socket.room);
    });
  
    socket.on('message', (data) => {
      MessageService.bulkCreate(data).then((data) => {
        frontendIO.to(socket.domain).emit('updateChatList', data.chat);
        browserIO.to(socket.room).emit('message', data.messages);
      });
    });

    socket.on('preventVisitor', (data) => {
      browserIO.to(data.visitorId).emit('preventVisitor');
    })
  
    socket.on('disconnect', () => {
      console.log('Fronted disconnected', socket.room);
    });
  });
} 

module.exports = frontendSocket;