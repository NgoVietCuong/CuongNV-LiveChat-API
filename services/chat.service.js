const Chat = require('../models/chat.model');

function create(data) {
  const chat = new Chat(data)
  return chat.save();
}

function update(filter, data) {
  return Chat.updateOne(filter, data);
}

function findAll(filter, projection = {}) {
  return Chat.find(filter, projection).exec();
}

function findOne(filter, projection = {}) {
  return Chat.findOne(filter, projection).lean().exec();
}

module.exports = {
  create,
  update,
  findAll,
  findOne
}