const updateScriptTag = async (domain, accessToken, apiVersion, scriptTagId, scriptTagInput) => {
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

  try {
    const response = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: body,
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    console.log(e)
  }



}

module.exports = updateScriptTag;