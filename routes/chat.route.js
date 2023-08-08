const Router = require('koa-router');
const { create, findAll, findId, findOne, updateOne, deleteOne } = require('../controllers/chat.controller');
const chatRouter = new Router({ prefix: '/chats' });

chatRouter.get('/', (ctx) => findAll(ctx));
chatRouter.get('/id', (ctx) => findId(ctx));
chatRouter.get('/:id', (ctx) => findOne(ctx));
chatRouter.put('/:id', (ctx) => updateOne(ctx));
chatRouter.post('/', (ctx) => create(ctx));
chatRouter.delete('/:id', (ctx) => deleteOne(ctx));

module.exports = chatRouter;