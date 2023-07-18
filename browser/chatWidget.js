import { chatWidgetContainer, closedWidget, prechatSurvey, startedChat } from './template';
import handleContact from './handleContact';
import liveChatInteraction from './liveChat';

function changeIconToOpened(chatButton) {
  const iconsClosed = chatButton.querySelectorAll(".nvc-for-closed");
  iconsClosed.forEach((icon) => { icon.classList.remove("nvc-active") });
  const iconsOpened = chatButton.querySelectorAll(".nvc-for-opened");
  iconsOpened.forEach((icon) => { icon.classList.add("nvc-active") });
}

function changeIconToClosed(chatButton) {
  const iconsOpened = chatButton.querySelectorAll(".nvc-for-opened");
  iconsOpened.forEach((icon) => { icon.classList.remove('nvc-active') });
  const iconsClosed = chatButton.querySelectorAll(".nvc-for-closed");
  iconsClosed.forEach((icon) => { icon.classList.add('nvc-active') });
}

function moveToPreChatSurvey(startedUI, surveyUI, chatButton) {
  startedUI.classList.remove("nvc-active", "nvc-chat-before");
  startedUI.classList.add("nvc-chat-after");
  surveyUI.classList.remove("nvc-chat-after");
  surveyUI.classList.add("nvc-active", "nvc-chat-before");
  chatButton.classList.add("disabled");
}

function backToStartedChat(startedUI, surveyUI, chatButton) {
  startedUI.classList.add("nvc-active", "nvc-chat-before");
  startedUI.classList.remove("nvc-chat-after");
  surveyUI.classList.add("nvc-chat-after");
  surveyUI.classList.remove("nvc-active", "nvc-chat-before");
  chatButton.classList.remove("disabled");
}

function startedChatInteraction(chatWidget) {
  chatWidget.insertAdjacentHTML("afterbegin", prechatSurvey);
  chatWidget.insertAdjacentHTML("afterbegin", startedChat);
  const chatButton = chatWidget.querySelector(".nvc-chat-button");
  const startedUI = chatWidget.querySelector(".nvc-start-group");
  const surveyUI = chatWidget.querySelector(".nvc-chat");
  const closeButton = chatWidget.querySelector(".nvc-user-data-modal-close");
  const minimizeButton = chatWidget.querySelector("button.nvc-material-icons.nvc-exit-chat");
  const messageArea = chatWidget.querySelector("#nvc_message_textarea");

  let firstMessage = '';

  const openedChatHandler = (e) => {
    e.preventDefault();
    if (messageArea.value) {
      firstMessage = messageArea.value;
      moveToPreChatSurvey(startedUI, surveyUI, chatButton);
      chatButton.removeEventListener("click", openedChatHandler);
      handleContact(chatWidget, firstMessage);
    } else {
      messageArea.classList.add("nvc-shake");
      setTimeout(function() {
        messageArea.classList.remove('nvc-shake');
      }, 600);
    }
  }

  const closedChatHandler = (e) => {
    e.preventDefault();
    startedUI.classList.add("nvc-active");
    changeIconToOpened(chatButton);
    chatButton.removeEventListener("click", closedChatHandler);
    chatButton.addEventListener("click", openedChatHandler);
  }

  messageArea.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        openedChatHandler(e);
      }
    }
  });

  chatButton.addEventListener("click", closedChatHandler);

  minimizeButton.addEventListener("click", (e) => {
    e.preventDefault();
    startedUI.classList.remove("nvc-active");
    chatButton.removeEventListener("click", openedChatHandler);
    chatButton.addEventListener("click", closedChatHandler);
    changeIconToClosed(chatButton);
  });

  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    backToStartedChat(startedUI, surveyUI, chatButton);
    chatButton.addEventListener("click", openedChatHandler);
  });
}

function insertChatWidget() {
  const body = document.body;
  body.insertAdjacentHTML('beforeend', chatWidgetContainer);
  const iframe = document.querySelector('#nvc_live_chat_iframe');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(closedWidget);
  iframeDoc.close();

  const iframeHtml = iframeDoc.documentElement;
  const chatWidget = iframeHtml.querySelector('.nvc-widget-right');
  if (window.nvc.isContact) {
    liveChatInteraction(chatWidget, true);
  } else {
    startedChatInteraction(chatWidget);
  }
}

export default insertChatWidget;