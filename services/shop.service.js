const Shop = require('../models/shop.model');

function create(domain, accessToken) {
  const shop = new Shop({
    domain: domain,
    access_token: accessToken
  });
  return shop.save();
}

function update(domain, data) {
  return Shop.updateOne({ domain: domain }, data);
}

function findByDomain(domain) {
  return Shop.findOne({ domain: domain}).lean().exec();
}

module.exports = {
  create,
  update,
  findByDomain
}