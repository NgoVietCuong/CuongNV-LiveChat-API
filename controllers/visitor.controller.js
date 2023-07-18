const ChatService = require('../services/chat.service');
const ShopService = require('../services/shop.service');
const VisitorService = require('../services/visitor.service');
const { getRandomAvatar } = require('../helpers/avatar.helper');

async function findOnline(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const visitors = await VisitorService.findAll({ active: true, shop: shop._id });
      if (visitors && visitors.length) {
        res.statusCode = 200;
        res.message = 'OK';
        res.payload = visitors;
      } else {
        res.statusCode = 404;
        res.message = 'Visitors Not Found';
        res.payload = [];
      }
    } else {
      res.statusCode = 404;
      res.message = 'Shop Not Found';
      res.payload = [];
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

async function findContacts(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const contacts = await VisitorService.findAll({ in_contact: true, shop: shop._id });
      if (contacts && contacts.length) {
        res.statusCode = 200;
        res.message = 'OK';
        res.payload = contacts;
      } else {
        res.statusCode = 404;
        res.message = 'Contacts Not Found';
        res.payload = [];
      }
    } else {
      res.statusCode = 404;
      res.message = 'Shop Not Found';
      res.payload = [];
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
        res.message = 'Visitor Not Found';
        res.payload = null;
      }
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

async function upsert(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const body = ctx.request.body;
  const params = JSON.parse(body);
  const { domain, key, type, active } = params;
  const { location, country, browser, device, os, ips } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const visitorData = {
        key,
        type,
        avatar: getRandomAvatar(),
        location,
        country,
        browser,
        device,
        os,
        ips,
        active,
        shop: shop._id
      };
      const visitor = await VisitorService.upsert({ key: key, shop: shop._id }, visitorData);
      if (visitor && visitor._id) {
        res.statusCode = 200;
        res.message = 'Upserted';
        res.payload = visitor;
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

async function addContact(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const body = ctx.request.body;
  const params = JSON.parse(body);
  const { domain, key, name, email } = params;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const contactData = {
        name,
        email,
        isContact: true
      }

      const visitor = await VisitorService.addContact({ key: key, shop: shop._id }, contactData);
      if (visitor && visitor._id) {
        const chat = await ChatService.create({ status: 'Waiting', shop: shop._id, visitor: visitor._id });
        if (chat && chat._id) {
          res.statusCode = 200;
          res.message = 'OK';
          res.payload = {
            chatId: chat._id,
            shopId: shop._id,
            visitorId: visitor._id
          };
        }
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

async function deleteContact(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const id = ctx.params.id;
  const { domain } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const contact = await VisitorService.deleteContact(id);
      if (contact && contact._id) {
        res.statusCode = 200;
        res.message = 'OK';
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

module.exports = {
  findOnline,
  findContacts,
  findOne,
  upsert,
  addContact,
  deleteContact
}