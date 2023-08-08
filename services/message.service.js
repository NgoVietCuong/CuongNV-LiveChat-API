const Message = require('../models/message.model');
const ChatService = require('./chat.service');
const VisitorService = require('../services/visitor.service');

async function create(data) {
  const message = new Message(data);
  const savedMessage = await message.save();
  const visitor = await VisitorService.findOne({ _id: savedMessage.visitor, shop: savedMessage.shop }, { name: 1, email: 1, active: 1, avatar: 1 });
  const updatedChat = await ChatService.update({ _id: savedMessage.chat }, { last_message: savedMessage._id });
  const chat = {...updatedChat.toObject(), visitor, lastMessage: savedMessage};
  return { savedMessage, chat};
}

async function bulkCreate(data) {
  const messages = await Message.insertMany(data);
  const lastMessage = messages[messages.length - 1];
  const visitor = await VisitorService.findOne({ _id: lastMessage.visitor, shop: lastMessage.shop }, { name: 1, email: 1, active: 1, avatar: 1 });
  const updatedChat = await ChatService.update({ _id: lastMessage.chat }, { last_message: lastMessage._id, status: 'Open', read: true });
  const chat = {...updatedChat.toObject(), visitor, lastMessage: lastMessage}
  return { messages, chat };
}

function findOne(filter, projection={}) {
  return Message.findOne(filter, projection).lean().exec();
}

function findAll(filter, projection={}) {
  return Message.find(filter, projection).sort({ 'created_at': 1 }).exec();
}

function deleteMany(filter) {
  return Message.deleteMany(filter);
}

module.exports = {
  create,
  bulkCreate,
  findOne,
  findAll,
  deleteMany
}