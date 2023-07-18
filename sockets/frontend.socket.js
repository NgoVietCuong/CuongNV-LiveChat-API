const MessageService = require('../services/message.service');

function frontendSocket(frontendIO, browserIO) {
  frontendIO.on('connection', (socket) => {
    console.log('Frontend connected');
    console.log('Frontend socket numbers: ', frontendIO.sockets.size);
  
    socket.on('join', (room) => {
      console.log(room)
      socket.room = room;
      socket.join(room);
    });
  
    socket.on('message', (data) => {
      console.log('frontend room', socket.room);
      console.log('Received message from frontend: ', data);
      MessageService.bulkCreate(data).then((data) => browserIO.to(socket.room).emit('message', data));
    });  
  
    socket.on('disconnect', () => {
      console.log('Fronted disconnected', socket.room);
    });
  });
} 

module.exports = frontendSocket;