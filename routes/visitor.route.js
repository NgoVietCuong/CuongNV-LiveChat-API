const Router = require('koa-router');
const { findOnline, findContacts, findOne, upsert, addContact, deleteContact } = require('../controllers/visitor.controller');
const visitorRouter = new Router({ prefix: '/visitors'});

visitorRouter.get('/online', (ctx) => findOnline(ctx));
visitorRouter.get('/contacts', (ctx) => findContacts(ctx));
visitorRouter.get('/:id', (ctx) => findOne(ctx));
visitorRouter.post('/upsert', (ctx) => upsert(ctx));
visitorRouter.put('/contact', (ctx) => addContact(ctx));
visitorRouter.delete('/:id', (ctx) => deleteContact(ctx));

module.exports = visitorRouter;