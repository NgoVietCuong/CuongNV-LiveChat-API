const Router = require('koa-router');
const chatRouter = require('./chat.route');
const shopRouter = require('./shop.route');
const visitorRouter = require('./visitor.route');
const messageRouter = require('./message.route');
const analyticRouter = require('./analytics.route');
const scriptTagRouter = require('./scriptTag.route');
const validateRequest = require('../middlewares/validateRequest.middleware');

const routers = new Router();
routers.use((ctx, next) => validateRequest(ctx, next));
routers.use(chatRouter.routes(), chatRouter.allowedMethods());
routers.use(shopRouter.routes(), shopRouter.allowedMethods());
routers.use(visitorRouter.routes(), visitorRouter.allowedMethods());
routers.use(messageRouter.routes(), messageRouter.allowedMethods());
routers.use(analyticRouter.routes(), analyticRouter.allowedMethods());
routers.use(scriptTagRouter.routes(), scriptTagRouter.allowedMethods());

module.exports = routers;