const Router = require('koa-router');
const { find } = require('../controllers/message.controller');
const messageRouter = new Router({ prefix: '/messages' });

messageRouter.get('/', (ctx) => find(ctx));

module.exports = messageRouter;