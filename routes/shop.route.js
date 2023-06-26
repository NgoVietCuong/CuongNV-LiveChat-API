const Router = require('koa-router');
const { findOne, create, update } = require('../controllers/shop.controller');
const shopRouter = new Router({ prefix: '/shops' });

shopRouter.get('/', (ctx) => findOne(ctx));
shopRouter.post('/', (ctx) => create(ctx));
shopRouter.put('/', (ctx) => update(ctx));

module.exports = shopRouter;