const jwt = require('jsonwebtoken');
const { JWT_ALGORITHM, JWT_SECRET_KEY } = process.env;
const { getBrowser, getDevice, getOS } = require('../helpers/userAgent.helper');
const { getLocationByIp } = require('../helpers/geodb.helper');

async function validateToken(ctx, next) {
  const token = ctx.headers.authorization.split(' ')[1];
  const verified = jwt.verify(token, JWT_SECRET_KEY, {
    algorithms: JWT_ALGORITHM
  });

  ctx.state.app = {
    domain: verified.domain,
    accessToken: verified.accessToken
  }

  await next();
}

async function validateVisistor(ctx, next) {
  const ua = ctx.userAgent;
  const browser = getBrowser(ua._agent);
  const device = getDevice(ua._agent);
  const os = getOS(ua._agent);
  const ip = ctx.headers['x-forwarded-for'];
  const { city: location, country } = getLocationByIp(ip);

  ctx.state.app = {
    location,
    country,
    browser,
    device,
    os,
    ips: [ip]
  }
  
  await next();
}

async function validateRequest(ctx, next) {
  if (ctx.path === '/visitors/upsert') {
    await validateVisistor(ctx, next);
  } else {
    await validateToken(ctx, next);
  }
}

module.exports = validateRequest;