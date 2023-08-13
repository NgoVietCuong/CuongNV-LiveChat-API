const ChatService = require('../services/chat.service');
const ShopService = require('../services/shop.service');
const MessageService = require('../services/message.service');
const VisitorService = require('../services/visitor.service');

async function create(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;
  const { visitor, status } = ctx.request.body;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      const chat = await ChatService.create({ status: status, shop: shop._id, visitor: visitor._id });
      res.statusCode = 201;
      res.message = 'Created';
      res.payload = chat;
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

async function findAll(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      let chats = await ChatService.findAll({ shop: shop._id, status: { $ne: 'Deleted' } });
      if (chats && chats.length) {
        chats = await Promise.all(
          chats.map(async (chat) => {
            const visitor = await VisitorService.findOne({ _id: chat.visitor, shop: chat.shop }, { name: 1, email: 1, active: 1, avatar: 1 });
            return {...chat.toObject(), visitor};
          })
        );
        res.statusCode = 200;
        res.message = 'OK';
        res.payload = chats;
      } else {
        res.statusCode = 404;
        res.message = 'Chats Not Found';
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

async function findId(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const filter = ctx.query;

  try {
    const chat = await ChatService.findOne(filter, { _id: 1});
    if (chat && chat._id) {
      res.statusCode = 200;
      res.message = 'OK';
      res.payload = chat._id;
    } else {
      res.statusCode = 404;
      res.message = 'Chat Not Found';
      res.payload = null;
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

  const { domain } = ctx.state.app;
  const { id } = ctx.params;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      let chat = await ChatService.findOne({ _id: id, shop: shop._id });
      if (chat && chat._id) {
        const visitor = await VisitorService.findOne({ _id: chat.visitor, shop: shop._id });
        const messages = await MessageService.findAll({ chat: chat._id, shop: shop._id, visitor: visitor._id });
        res.statusCode = 200;
        res.message = 'OK';
        res.payload = {...chat, visitor, messages};
      } else {
        res.statusCode = 404;
        res.message = 'Chat Not Found';
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

async function updateOne(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;
  const update = ctx.request.body;
  const { id } = ctx.params;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      chat = await ChatService.update({ _id: id, shop: shop._id }, update);
      res.statusCode = 200;
      res.message = 'OK';
      res.payload = chat;
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

async function deleteOne(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const { domain } = ctx.state.app;
  const { id } = ctx.params;

  try {
    const shop = await ShopService.findByDomain(domain);
    if (shop && shop._id) {
      await ChatService.update({ _id: id, shop: shop._id }, { status: 'Deleted', last_message: null });
      await MessageService.deleteMany({ chat: id, shop: shop._id });
      res.statusCode = 200;
      res.message = 'Deleted';
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
  create,
  findAll,
  findId,
  findOne,
  deleteOne,
  updateOne
}