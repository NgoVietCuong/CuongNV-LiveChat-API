const Visitor = require('../models/visitor.model');

function create(data) {
  const visitor = new Visitor({
    key: data.key,
    name: data.name,
    email: data.email,
    location: data.location,
    country: data.country,
    browser: data.browser,
    os: data.os,
    device: data.device,
    ips: data.ips,
    shop: data.shop
  });
  return visitor.save();
}

function findOne(filter, projection={}) {
  return Visitor.findOne(filter, projection).exec();
}

function findAll(filter={}, projection={}) {
  return Visitor.find(filter, projection).exec();
}

module.exports = {
  create,
  findOne,
  findAll
}