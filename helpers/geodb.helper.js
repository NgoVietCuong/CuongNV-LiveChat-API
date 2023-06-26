const fs = require('fs');
const path = require('path');
const Reader = require('@maxmind/geoip2-node').Reader;

function getLocationByIp(ip) {
  const dbBuffer = fs.readFileSync(path.join(__dirname, '../GeoLite2-City.mmdb'));
  const reader = Reader.openBuffer(dbBuffer);
  response = reader.city(ip)
  let country = 'Unknown';
  let city = 'Unknown';

  if (response.country) {
    country = response.country.isoCode;
  }

  if (response.city) {
    city = response.city.names.en;
  }

  return { city, country };
}

module.exports = {
  getLocationByIp
}