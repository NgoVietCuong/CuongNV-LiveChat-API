const MessageService = require('../services/message.service');

async function find(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal Server Error'
  }

  const filter = ctx.query;

  try {
    const messages = await MessageService.findAll(filter);
    if (messages) {
      res.statusCode = 200;
      res.message = 'OK';
      res.payload = messages;
    } else {
      res.statusCode = '404';
      res.message = 'Not Found';
      res.payload = [];
    }
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

module.exports = {
  find
}