import { chatWidgetContainer, closedWidget, prechatSurvey, startedChat, notification } from './template';
import handleContact from './handleContact';
import liveChatInteraction from './liveChat';
import { changeIconToClosed, changeIconToOpened, moveToPreChatSurvey, backToPrevious } from './common';

function startedChatInteraction(chatWidget) {
  chatWidget.insertAdjacentHTML("afterbegin", prechatSurvey);
  chatWidget.insertAdjacentHTML("afterbegin", startedChat);
  const widget = chatWidget.querySelector(".nvc-widget-closed");
  const chatButton = chatWidget.querySelector(".nvc-chat-button");
  const startedUI = chatWidget.querySelector(".nvc-start-group");
  const surveyUI = chatWidget.querySelector(".nvc-survey");
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
    window.nvc.chatWidgetClose = false;
    const noti = widget.querySelector("#nvc_new_message");
    if (noti) {
      widget.removeChild(noti);
    }
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
    window.nvc.chatWidgetClose = true;
    startedUI.classList.remove("nvc-active");
    chatButton.removeEventListener("click", openedChatHandler);
    chatButton.addEventListener("click", closedChatHandler);
    changeIconToClosed(chatButton);
  });

  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    backToPrevious(startedUI, surveyUI, chatButton);
    chatButton.addEventListener("click", openedChatHandler);
  });

  window.nvc.socket.once("message", (data) => {
    if (!window.nvc.isContact) {
      sessionStorage.setItem("cuongnv-live-chat-messages", JSON.stringify(data));
      chatWidget.removeChild(startedUI);
      chatWidget.removeChild(surveyUI);
      liveChatInteraction(chatWidget);
      const chatUI = chatWidget.querySelector(".nvc-chat");
      const noti = widget.querySelector("#nvc_new_message");
      if (window.nvc.chatWidgetClose && !noti) {
        widget.insertAdjacentHTML("beforeend", notification);
      } else {
        chatUI.classList.add("nvc-active");
      }
    }
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
  if (window.nvc.chatId) {
    liveChatInteraction(chatWidget);
  } else {
    startedChatInteraction(chatWidget);
  }

  window.nvc.socket.on('preventVisitor', () => {
    const nvcChatWidget = body.querySelector("#nvc_live_chat");
    body.removeChild(nvcChatWidget);
  });
}

export default insertChatWidget;