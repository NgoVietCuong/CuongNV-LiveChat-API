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
const cors = require('@koa/cors');
const frontendSocket = require('./sockets/frontend.socket');
const browserSocket = require('./sockets/browser.socket');

const { APP_PORT, MONGO_URI } = process.env;

const app = new Koa();
const server = http.createServer((app.callback()));
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

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
const browserIO = io.of('/browser');
frontendSocket(frontendIO, browserIO);
browserSocket(frontendIO, browserIO);

server.listen(APP_PORT, () => {
  mongoose.connect(MONGO_URI, { autoIndex: true });
  console.log(`Server started on port: ${APP_PORT}`)
});