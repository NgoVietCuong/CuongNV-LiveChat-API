const Visitor = require('../models/visitor.model');

function upsert(filter, data) {
  return Visitor.findOneAndUpdate(filter, {
    key: data.key,
    type: data.type,
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
  }
  );
}

function findOne(filter, projection={}) {
  return Visitor.findOne(filter, projection).exec();
}

function findAll(filter={}, projection={}) {
  return Visitor.find(filter, projection).exec();
}

module.exports = {
  upsert,
  findOne,
  findAll
}