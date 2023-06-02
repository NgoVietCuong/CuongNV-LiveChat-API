require('isomorphic-fetch');
const http = require('http');
const { Server } = require('socket.io');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaRouter = require('koa-router');
const koaStatic = require('koa-static');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { API_VERSION, APP_HOST, APP_PORT, MONGO_URI } = process.env;

const createScriptTag = require('./graphql/scriptTag/createScriptTag');
const updateScriptTag = require('./graphql/scriptTag/updateScriptTag');
const deleteScriptTag = require('./graphql/scriptTag/deleteScriptTag');

const app = new Koa();
const server = http.createServer((app.callback()));
const io = new Server(server);
const router = new koaRouter();
app.use(koaStatic('./public'));
app.use(koaBody());

mongoose.connect(MONGO_URI, { autoIndex: true });

router.get('/', ctx => ctx.body = 'hello world')
router.post('/create', async (ctx) => {
  const result = {
    success: false,
    message: 'Could not create script tag'
  }

  const params = ctx.request.body;
  const { domain, accessToken } = params;

  const scriptTagInput = {
    cache: false,
    displayScope: 'ALL',
    src: `${APP_HOST}/livechat.js`
  }

  try {
    const response = await createScriptTag(domain, accessToken, API_VERSION, scriptTagInput);
    console.log(response);
    result.success = true;
    result.message = 'Create script tag successfully'
  } catch(e) {
    console.log(e)
  }

  ctx.body = result;
});
router.post('/update', async (ctx) => {
  const result = {
    success: false,
    message: 'Could not update script tag'
  }

  const params = ctx.request.body;
  const { domain, accessToken } = params;

  const scriptTagId = 'gid://shopify/ScriptTag/201719611555';
  const scriptTagInput = {
    cache: false,
    displayScope: 'ALL',
    src: `${APP_HOST}/livechat.js`
  }

  try {
    const response = await updateScriptTag(domain, accessToken, API_VERSION, scriptTagId, scriptTagInput);
    result.success = true;
    result.message = 'Updated script tag successfully'
  } catch(e) {
    console.log('backend error', e)
  }

  ctx.body = result;
});
router.post('/delete', async (ctx) => {
  const result = {
    success: false,
    message: 'Could not delete script tag'
  }

  const params = ctx.request.body;
  const { domain, accessToken } = params;

  const scriptTagId = 'gid://shopify/ScriptTag/201716301987';
  try {
    const response = await deleteScriptTag(domain, accessToken, API_VERSION, scriptTagId);
    console.log(response);
    result.success = true;
    result.message = 'Deleted script tag successfully'
  } catch(e) {
    console.log('backend error', e)
  }
  ctx.body = result;
});

app.use(router.routes()).use(router.allowedMethods());

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
    // console.log('Received message from frontend: ', data)
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
    // console.log('Received message from browser:', data);
    frontendIO.to(socket.room).emit('message', { type: 'income', message: data });
  });

  socket.on('disconnect', () => {
    console.log('Browser disconnected:', socket.room);
  });
});

server.listen(APP_PORT, () => {
  console.log(`Server started on port: ${APP_PORT}`)
});