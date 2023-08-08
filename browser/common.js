export function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function containLinks(string) {
  const urlRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;
  return urlRegex.test(string);
}

export function changeIconToOpened(chatButton) {
  const iconsClosed = chatButton.querySelectorAll(".nvc-for-closed");
  iconsClosed.forEach((icon) => { icon.classList.remove("nvc-active") });
  const iconsOpened = chatButton.querySelectorAll(".nvc-for-opened");
  iconsOpened.forEach((icon) => { icon.classList.add("nvc-active") });
}

export function changeIconToClosed(chatButton) {
  const iconsOpened = chatButton.querySelectorAll(".nvc-for-opened");
  iconsOpened.forEach((icon) => { icon.classList.remove('nvc-active') });
  const iconsClosed = chatButton.querySelectorAll(".nvc-for-closed");
  iconsClosed.forEach((icon) => { icon.classList.add('nvc-active') });
}

export function moveToPreChatSurvey(previousUI, surveyUI, chatButton) {
  previousUI.classList.remove("nvc-active", "nvc-chat-before");
  previousUI.classList.add("nvc-chat-after");
  surveyUI.classList.remove("nvc-chat-after");
  surveyUI.classList.add("nvc-active", "nvc-chat-before");
  chatButton.classList.add("disabled");
}

export function backToPrevious(previousUI, surveyUI, chatButton) {
  previousUI.classList.add("nvc-active", "nvc-chat-before");
  previousUI.classList.remove("nvc-chat-after");
  surveyUI.classList.add("nvc-chat-after");
  surveyUI.classList.remove("nvc-active", "nvc-chat-before");
  chatButton.classList.remove("disabled");
}