require('isomorphic-fetch');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const { userAgent: koaUA } = require('koa-useragent'); 
const mongoose = require('mongoose');
const routers = require('./routes');
const cors = require('@koa/cors')

const { APP_PORT, MONGO_URI } = process.env;

const app = new Koa();
const server = http.createServer((app.callback()));
const io = new Server(server);
app.use(koaStatic('./public'));
app.use(koaBody());
app.use(cors());
app.use(async (ctx, next) => {
  if (ctx.path === '/visitors/upsert') {
    await koaUA(ctx, next);
  } else {
    await next();
  }
});

app.use(routers.routes());

const frontendIO = io.of('/frontend');
frontendIO.on('connection', (socket) => {
  console.log('Frontend connected');
  console.log('Frontend socket numbers: ', frontendIO.sockets.size);

  socket.on('join', (room) => {
    socket.room = room;
    socket.join(room);
    frontendIO.to(room).emit('message', { type: 'income', message: `You have been connected to room ${room}` });
  });

  socket.on('message', (data) => {
    console.log('frontend room', socket.room)
    console.log('Received message from frontend: ', data)
    browserIO.to(socket.room).emit('message', data)
  });  

  socket.on('disconnect', () => {
    console.log('Fronted disconnected', socket.room);
  });
});

const browserIO = io.of('/browser');
browserIO.on('connection', (socket) => {
  console.log('Browser connected');
  console.log('Brontend socket numbers: ', browserIO.sockets.size);
  
  socket.on('join', (room) => {
    socket.room = room;
    socket.join(room);
    browserIO.to(room).emit('message', `You have been connected to room ${room}`);
  });

  socket.on('message', (data) => {
    console.log('browser room', socket.room);
    console.log('Received message from browser:', data);
    frontendIO.to(socket.room).emit('message', { type: 'income', message: data });
  });

  socket.on('disconnect', () => {
    console.log('Browser disconnected:', socket.room);
  });
});

server.listen(APP_PORT, () => {
  mongoose.connect(MONGO_URI, { autoIndex: true });
  console.log(`Server started on port: ${APP_PORT}`)
});