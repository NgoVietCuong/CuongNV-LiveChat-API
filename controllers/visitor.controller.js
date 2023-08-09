const ChatService = require('../services/chat.service');
const ShopService = require('../services/shop.service');
const VisitorService = require('../services/visitor.service');
const MessageService = require('../services/message.service');

async function findOnline(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      let visitors = await VisitorService.findAll({ active: true, shop: shop._id });
      if (visitors && visitors.length) {
        visitors = await Promise.all(
          visitors.map(async (visitor) => {
            const chat = await ChatService.findOne({ shop: shop._id, visitor: visitor._id }, { _id: 1 });
            return {...visitor.toObject(), chat}
          })
        );
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
      let contacts = await VisitorService.findAll({ in_contact: true, shop: shop._id });
      if (contacts && contacts.length) {
        contacts = await Promise.all(
          contacts.map(async (contact) => {
            const chat = await ChatService.findOne({ shop: shop._id, visitor: contact._id }, { _id: 1 });
            return {...contact.toObject(), chat}
          })
        );
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
        const chat = await ChatService.findOne({ shop: shop._id, visitor: visitor._id }, { _id: 1 });
        res.statusCode = 200;
        res.message = 'OK';
        res.payload = {...visitor, chat};
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
  const { domain, name, key, type, avatar, active } = params;
  const { location, country, browser, device, os, ips } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const visitorData = {
        name,
        key,
        type,
        avatar,
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
        const chat = await ChatService.findOne({ shop: shop._id, visitor: visitor._id }, { _id: 1 });
        res.statusCode = 200;
        res.message = 'Upserted';
        res.payload = {...visitor.toObject(), chat};
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
        let chat = await ChatService.findOne({ shop: shop._id, visitor: visitor._id }, { _id: 1 });
        if (!chat) {
          chat = await ChatService.create({ status: 'Waiting', shop: shop._id, visitor: visitor._id });
        }
        if (chat && chat._id) {
          res.statusCode = 200;
          res.message = 'OK';
          res.payload = {...visitor.toObject(), chat};
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
      const chat = await ChatService.findOne({ shop: shop._id, visitor: id });
      await VisitorService.deleteOne({ _id: id });
      await ChatService.deleteOne({ _id: chat._id });
      await MessageService.deleteMany({ chat: chat._id, shop: shop._id, visitor: id });
      res.statusCode = 200;
      res.message = 'OK';
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