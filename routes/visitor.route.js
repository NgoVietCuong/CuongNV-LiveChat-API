const Router = require('koa-router');
const { create, findAll, findOne } = require('../controllers/visitor.controller');
const visitorRouter = new Router({ prefix: '/visitors'});

visitorRouter.get('/', (ctx) => findAll(ctx));
visitorRouter.post('/create', (ctx) => create(ctx));
visitorRouter.get('/:id', (ctx) => findOne(ctx));

module.exports = visitorRouter;