const Message = require('../models/message.model');
const ChatService = require('./chat.service');

async function create(data) {
  const message = new Message(data);
  const savedMessage = await message.save();
  await ChatService.update({ _id: savedMessage.chat }, { last_message: savedMessage._id });
  return savedMessage;
}

async function bulkCreate(data) {
  const messages = await Message.insertMany(data);
  const lastMessage = messages[messages.length - 1];
  await ChatService.update({ _id: lastMessage.chat }, { last_message: lastMessage._id });
  return messages;
}

function findOne(filter, projection={}) {
  return Message.findOne(filter, projection).lean().exec();
}

function findAll(filter, projection={}) {
  return Message.find(filter, projection).sort({ 'created_at': 1 }).exec();
}

module.exports = {
  create,
  bulkCreate,
  findOne,
  findAll
}