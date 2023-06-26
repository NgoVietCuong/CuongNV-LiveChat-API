const Router = require('koa-router');
const shopRouter = require('./shop.route');
const installRouter = require('./install.route');
const visitorRouter = require('./visitor.route');
const scriptTagRouter = require('./scriptTag.route');
const validateRequest = require('../middlewares/validateRequest.middleware');

const routers = new Router();
routers.use((ctx, next) => validateRequest(ctx, next));
routers.use(shopRouter.routes(), shopRouter.allowedMethods());
routers.use(installRouter.routes(), installRouter.allowedMethods());
routers.use(visitorRouter.routes(), visitorRouter.allowedMethods());
routers.use(scriptTagRouter.routes(), scriptTagRouter.allowedMethods());

module.exports = routers;