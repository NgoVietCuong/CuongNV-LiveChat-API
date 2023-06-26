const axios = require('axios');

const scriptTagCreate = async (domain, accessToken, apiVersion, scriptTagInput) => {
  const query = `
    mutation scriptTagCreate($input: ScriptTagInput!) {
      scriptTagCreate(input: $input) {
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
    variables: { input: scriptTagInput } 
  });

  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    data: body
  });

  const responseData = response.data;
  return responseData;
}

module.exports = scriptTagCreate;