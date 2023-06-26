const Router = require('koa-router');
const { create, update, remove } = require('../controllers/scriptTag.controller');
const scriptTagRouter = new Router({ prefix: '/script-tags' });

scriptTagRouter.post('/', (ctx) => create(ctx));
scriptTagRouter.put('/', (ctx) => update(ctx));
scriptTagRouter.delete('/:id', (ctx) => remove(ctx));

module.exports = scriptTagRouter;