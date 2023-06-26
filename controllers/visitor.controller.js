const ShopService = require('../services/shop.service');
const VisitorService = require('../services/visitor.service');

async function findAll(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const visitors = await VisitorService.findAll();
      if (visitors && visitors.length) {
        res.statusCode = 200;
        res.message = 'OK';
        res.payload = visitors;
      } else {
        res.statusCode = 404;
        res.message = 'Not Found';
        res.payload = [];
      }
    } else {
      res.statusCode = 404;
      res.message = 'Not Found';
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

async function create(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const body = ctx.request.body;
  const params = JSON.parse(body);
  const { name, email, key, domain } = params;
  const { location, country, browser, device, os, ips } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const visitorData = {
        key,
        name,
        email,
        location,
        country,
        browser,
        device,
        os,
        ips,
        shop: shop._id
      };
      const visitor = await VisitorService.create(visitorData);
      if (visitor && visitor._id) {
        res.statusCode = 201;
        res.messge = 'Created';
        res.payload = visitor;
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

async function findOne(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const id = ctx.params.id;
  const { domain } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const visitor = await VisitorService.findOne({ _id: id, shop: shop._id });
      if (visitor && visitor._id) {
        res.statusCode = 200;
        res.message = 'OK';
        res.payload = visitor;
      } else {
        res.statusCode = 404;
        res.message = 'Not Found';
        res.payload = null;
      }
    } else {
      res.statusCode = 404;
      res.message = 'Not Found';
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

module.exports = {
  findAll,
  create,
  findOne
}