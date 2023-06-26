require('dotenv').config();
const ThemeService = require('../services/theme.service');

const { API_VERSION } = process.env;

async function getThemeId(ctx) {
  const res = {
    statusCode: 500,
    message: 'Internal_Server_Error'
  }

  const { domain, accessToken } = ctx.state.app;

  console.log(domain, accessToken)

  try {
    const themeId = await ThemeService.getThemeId(domain, accessToken, API_VERSION);
    console.log(themeId);
  } catch (e) {
    console.log(e);
  } finally {
    ctx.body = res;
  }
}

module.exports = {
  getThemeId
}