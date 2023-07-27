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
      console.log('frontend room', socket.room);
      console.log('Received message from frontend: ', data);
      MessageService.bulkCreate(data).then((data) => {
        console.log('data', data)
        browserIO.to(socket.room).emit('message', data.messages);
        frontendIO.to(socket.domain).emit('updateChatList', data.chat);
      });
    });
  
    socket.on('disconnect', () => {
      console.log('Fronted disconnected', socket.room);
    });
  });
} 

module.exports = frontendSocket;