const ShopService = require('../services/shop.service');

async function findOne(ctx) {
  const res = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { domain } = ctx.state.app;
  
  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      res.statusCode = 200;
      res.message = 'OK';
      res.payload = shop;
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

async function create(ctx) {
  const res = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { domain, accessToken } = ctx.state.app;

  try {
    const shop = await ShopService.create(domain, accessToken);
    if (shop && shop._id) {
      res.statusCode = 201;
      res.message = 'Created';
      res.payload = shop;
    } 
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

async function update(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain, accessToken } = ctx.state.app;
  const updateData = {
    access_token: accessToken,
    status: true
  }

  try {
    const shop = await ShopService.update(domain, updateData);
    if (shop) {
      res.statusCode = 200;
      res.message = 'OK';
      res.payload = shop;
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

module.exports = {
  findOne,
  create,
  update
}