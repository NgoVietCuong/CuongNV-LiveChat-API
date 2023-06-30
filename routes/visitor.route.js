const Router = require('koa-router');
const { findOnline, findContacts, findOne, upsert } = require('../controllers/visitor.controller');
const visitorRouter = new Router({ prefix: '/visitors'});

visitorRouter.get('/online', (ctx) => findOnline(ctx));
visitorRouter.get('/contacts', (ctx) => findContacts(ctx));
visitorRouter.post('/upsert', (ctx) => upsert(ctx));
visitorRouter.get('/:id', (ctx) => findOne(ctx));

module.exports = visitorRouter;