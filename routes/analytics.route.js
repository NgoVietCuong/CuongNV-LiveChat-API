const Router = require('koa-router');
const { appAnalytics, visitorAnalytics } = require('../controllers/analytics.controller');
const analyticRouter = new Router({ prefix: '/analytics'});

analyticRouter.get('/', (ctx) => appAnalytics(ctx));
analyticRouter.get('/visitor/:id', (ctx) => visitorAnalytics(ctx));

module.exports = analyticRouter;