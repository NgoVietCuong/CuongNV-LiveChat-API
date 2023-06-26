const Router = require('koa-router');
const { getThemeId } = require('../controllers/install.controller');
const installRouter = new Router({ prefix: '/install' });

installRouter.get('/', (ctx) => getThemeId(ctx));

module.exports = installRouter;