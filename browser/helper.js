export function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function containLinks(string) {
  const urlRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;
  return urlRegex.test(string);
}