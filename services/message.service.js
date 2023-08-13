const Message = require('../models/message.model');
const ChatService = require('./chat.service');
const VisitorService = require('../services/visitor.service');

async function create(messageData, chatData, read) {
  const message = new Message(messageData);
  const saveMessage = message.save();
  const updateChat = ChatService.update({ _id: messageData.chat }, { last_message: chatData, read: read });
  await Promise.all([saveMessage, updateChat]);
}

async function bulkCreate(messageData, chatData, chat) {
  const messages = Message.insertMany(messageData);
  const updateChat = ChatService.update({ _id: chat }, { last_message: chatData, read: true, status: 'Open' });
  await Promise.all([messages, updateChat]);
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