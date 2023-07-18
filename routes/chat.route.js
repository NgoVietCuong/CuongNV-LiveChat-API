const Router = require('koa-router');
const { findAll, findOne, updateOne, removeOne } = require('../controllers/chat.controller');
const chatRouter = new Router({ prefix: '/chats' });

chatRouter.get('/', (ctx) => findAll(ctx));
chatRouter.get('/:id', (ctx) => findOne(ctx));
chatRouter.put('/:id', (ctx) => updateOne(ctx));
chatRouter.delete('/:id', (ctx) => removeOne(ctx));

module.exports = chatRouter;