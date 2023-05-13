const createScriptTag = async (domain, accessToken, apiVersion, scriptTagInput) => {
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
    variables: { input: scriptTagInput } });

  const graphqlResponse = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    body: body
  });

  const responseJson = graphqlResponse.json();
  return responseJson;
}

module.exports = createScriptTag;