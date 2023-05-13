const deleteScriptTag = async (domain, accessToken, apiVersion, scriptTagId) => {
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

  const body = JSON.stringify({query: query, variables: {id: scriptTagId}});

  const response = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    body: body
  });

  const responseJson = await response.json();
  return responseJson;
}

module.exports = deleteScriptTag;