require('dotenv').config();
const ShopService = require('../services/shop.service');
const {
  scriptTagCreate,
  scriptTagUpdate,
  scriptTagDelete
} = require('../graphql/scriptTag');

const { API_VERSION, APP_HOST } = process.env;

async function create(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain, accessToken } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const scriptTagInput = {
        cache: false,
        displayScope: 'ALL',
        src: `${APP_HOST}/livechat.js`
      }

      const response = await scriptTagCreate(
        domain,
        accessToken, 
        API_VERSION, 
        scriptTagInput
      );

      if (
        response && 
        response.data && 
        response.data.scriptTagCreate && 
        response.data.scriptTagCreate.scriptTag &&
        response.data.scriptTagCreate.scriptTag.id
      ) {
        await ShopService.update(domain, { script_tag_id: response.data.scriptTagCreate.scriptTag.id });
        res.statusCode = 201;
        res.message = 'Created'
      }  
    } else {
      res.statusCode = 404;
      res.message = 'Shop Not Found'
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

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const scriptTagId = shop.script_tag_id;
      const scriptTagInput = {
        cache: false,
        displayScope: 'ALL',
        src: `${APP_HOST}/livechat.js`
      }

      const response = await scriptTagUpdate(
        domain, 
        accessToken, 
        API_VERSION, 
        scriptTagId, 
        scriptTagInput
      );

      if (
        response && 
        response.data && 
        response.data.scriptTagUpdate && 
        response.data.scriptTagUpdate.scriptTag &&
        response.data.scriptTagUpdate.scriptTag.id
      ) {
        res.statusCode = 200;
        res.message = 'Updated';
      }
    } else {
      res.statusCode = 404;
      res.message = 'Shop Not Found';
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

async function remove(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { id } = ctx.params;
  const { domain, accessToken } = ctx.state.app;
  const scriptTagId = `gid://shopify/ScriptTag/${id}`;

  try {
    await scriptTagDelete(
      domain, 
      accessToken, 
      API_VERSION, 
      scriptTagId
    );
    res.statusCode = 200;
    res.message = 'Deleted'
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

module.exports = {
  create,
  update,
  remove
}