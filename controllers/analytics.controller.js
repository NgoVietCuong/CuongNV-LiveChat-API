const ShopService = require('../services/shop.service');
const AnalyticService = require('../services/analytics.service');

async function appAnalytics(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const result = await AnalyticService.getAppAnalytics(shop);
      res.statusCode = 200;
      res.message = 'OK';
      res.payload = result;
    } else {
      res.statusCode = 404;
      res.message = 'Shop Not Found';
      res.payload = null;
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

async function visitorAnalytics(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;
  const { id } = ctx.params;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const result = await AnalyticService.getVisitorAnalytics(shop, id);
      res.statusCode = 200;
      res.message = 'OK',
      res.payload = result;
    } else {
      res.statusCode = 404;
      res.message = 'Shop Not Found';
      res.payload = null;
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

module.exports = {
  appAnalytics,
  visitorAnalytics
}