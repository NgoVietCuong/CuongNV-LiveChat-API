const axios = require('axios');

const scriptTagDelete = async (domain, accessToken, apiVersion, scriptTagId) => {
  const query = `
    mutation scriptTagDelete($id: ID!) {
      scriptTagDelete(id: $id) {
        deletedScriptTagId
        userErrors {
          field
          message
        }
      }
    }
  `;

  const body = JSON.stringify({ query: query, variables: { id: scriptTagId } });

  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    data: body
  });

  const responseData =  response.data;
  return responseData;
}

module.exports = scriptTagDelete;