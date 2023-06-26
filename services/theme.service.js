const themeGetList = require('../admin-rest/themeGetList');

async function getThemeId(domain, accessToken, API_VERSION) {
  let themeId = null;
  const themes = await themeGetList(domain, accessToken, API_VERSION);
  themes.forEach((theme) => {
    if (theme.role === 'main') {
      themeId = theme.id;
    }
  });
  return themeId;
}

module.exports = {
  getThemeId
}