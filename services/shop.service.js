const Shop = require('../models/shop.model');

function create(domain, accessToken) {
  const shop = new Shop({
    domain: domain,
    access_token: accessToken
  });
  return shop.save();
}

function update(domain, data) {
  return Shop.updateOne({ domain: domain }, data, { runValidators: true });
}

function findByDomain(domain) {
  return Shop.findOne({ domain: domain}).exec();
}

module.exports = {
  create,
  update,
  findByDomain
}