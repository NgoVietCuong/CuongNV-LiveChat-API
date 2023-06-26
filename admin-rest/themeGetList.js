const axios = require('axios');

async function themeGetList(domain, accessToken, apiVersion) {
  const url = `https://${domain}/admin/api/${apiVersion}/themes.json`;
  const response = await axios({
    url: url,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    }
  });

  const themes = response.data.themes;
  return themes;
}

module.exports = themeGetList;