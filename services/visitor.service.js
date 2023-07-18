const Visitor = require('../models/visitor.model');

function upsert(filter, data) {
  return Visitor.findOneAndUpdate(filter, {
    key: data.key,
    type: data.type,
    avatar: data.avatar,
    location: data.location,
    country: data.country,
    browser: data.browser,
    os: data.os,
    device: data.device,
    active: data.active,
    ips: data.ips,
    shop: data.shop
  }, 
  {
    new: true,
    upsert: true
  });
}

function addContact(filter, data) {
  return Visitor.findOneAndUpdate(filter, {
    name: data.name,
    email: data.email,
    in_contact: data.isContact
  }, 
  {
    new: true,
  });
}

function findOne(filter, projection={}) {
  return Visitor.findOne(filter, projection).lean().exec();
}

function findAll(filter={}, projection={}) {
  return Visitor.find(filter, projection).exec();
}

function updateOne(filter, data) {
  return Visitor.updateOne(filter, data);
}

function deleteContact(id) {
  return Visitor.findByIdAndUpdate(id, { in_contact: false }, { new: true });
}

module.exports = {
  upsert,
  addContact,
  findOne,
  findAll,
  updateOne,
  deleteContact
}