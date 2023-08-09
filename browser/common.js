export function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function containLinks(string) {
  const urlRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;
  return urlRegex.test(string);
}

export function getRandomAvatar() {
  const colorArray = ['#A0AEC0', '#FC8181', '#F6AD55', '#68D391', '#63B3ED', '#76E4F7', '#B794F4', '#F687B3', '#4FD1C5'];
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
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