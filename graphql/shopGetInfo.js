const axios = require('axios');

const shopGetInfo = async (domain, accessToken, apiVersion) => {
  const query = `
    query {
      shop {
        name
      }
    }
  `;

  const body = JSON.stringify({ query: query });

  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    data: body
  });

  const responseData = response.data.data.shop;
  return responseData;
}

module.exports = shopGetInfo;