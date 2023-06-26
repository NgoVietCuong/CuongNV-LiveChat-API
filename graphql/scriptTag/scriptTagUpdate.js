const axios = require('axios');

const scriptTagUpdate = async (domain, accessToken, apiVersion, scriptTagId, scriptTagInput) => {
  const query = `
    mutation scriptTagUpdate($id: ID!, $input: ScriptTagInput!) {
      scriptTagUpdate(id: $id, input: $input) {
        scriptTag {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const body = JSON.stringify({
    query: query,
    variables: { id: scriptTagId, input: scriptTagInput }
  });

  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    data: body,
  });
  const responseData = response.data;
  return responseData;
}

module.exports = scriptTagUpdate;