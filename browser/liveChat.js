import { liveChat, prechatSurvey, loadingMessage, linkMessage, textMessage, imageMessage, fileMessage, musicIcon, videoIcon, excelIcon, docIcon, fileIcon } from "./template";
import { containLinks } from "./common";
import handleContact from "./handleContact";
import { changeIconToClosed, changeIconToOpened, moveToPreChatSurvey, backToPrevious } from "./common";

function renderMessage(item, container, className) {
  let message = ''
  if (item.type === "Text") {
    message = textMessage(item.text, className);
  } else if (item.type === "File") {
    const fileExtension = item.url.split('.').pop();
    if (["xlsx", "csv", "xls"].includes(fileExtension)) {
      message = fileMessage(item.filename, item.url, className, excelIcon);
    } else if (["docx", "doc"].includes(fileExtension)) {
      message = fileMessage(item.filename, item.url, className, docIcon);
    } else {
      message = fileMessage(item.filename, item.url, className, fileIcon);
    }
  } else if (item.type === "Media") {
    const fileExtension = item.url.split('.').pop();
    if (["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "svg", "ico", "webp", "heic", "heif"].includes(fileExtension)) {
      message = imageMessage(item.url, className);
    } else if (["mp3", "wav", "flac", "aac", "ogg"].includes(fileExtension)) {
      message = fileMessage(item.filename, item.url, className, musicIcon);
    } else if (["mp4", "avi", "mkv", "mov", "webm", "wmv", "flv", "mpeg", "asf"].includes(fileExtension)) {
      message = fileMessage(item.filename, item.url, className, videoIcon);
    }
  } else {
    message = linkMessage(item.text, className);
  }
  container.insertAdjacentHTML("beforeend", message);
}

function liveChatInteraction(chatWidget) {
  if (!window.nvc.isContact) {
    chatWidget.insertAdjacentHTML("afterbegin", prechatSurvey);
  }
  chatWidget.insertAdjacentHTML('afterbegin', liveChat);
  const chatButton = chatWidget.querySelector('.nvc-chat-button');
  const chatUI = chatWidget.querySelector('.nvc-chat');
  const surveyUI = chatWidget.querySelector(".nvc-survey");
  const minimizeButton = chatWidget.querySelector('button.nvc-material-icons.nvc-exit-chat');
  const closeButton = chatWidget.querySelector(".nvc-user-data-modal-close");
  const conversationGroup = chatWidget.querySelector('#nvc_conversation_group');
  const messagesContainer = chatWidget.querySelector('#nvc_messages');
  const messageArea = chatWidget.querySelector("#nvc_message_textarea");
  const attachButton = chatWidget.querySelector(".nvc-footer-icons-wrapper button.nvc-material-icons");
  const attachInput = chatWidget.querySelector(".nvc-footer-icons-wrapper .nvc-attach-input");

  const messages = JSON.parse(sessionStorage.getItem("cuongnv-live-chat-messages"));
  if (messages) {
    messages.forEach((item) => {
      if (item.sender === "Visitor") {
        renderMessage(item, messagesContainer, "nvc-message-visitor");
      } else {
        renderMessage(item, messagesContainer, "nvc-message-operator");
      }
    });
    conversationGroup.scrollTop = conversationGroup.scrollHeight;
  }

  window.nvc.socket.on("message", (data) => {
    data.forEach(item => {
      renderMessage(item, messagesContainer, "nvc-message-operator");
    });
    conversationGroup.scrollTop = conversationGroup.scrollHeight;
  });

  if (window.nvc.isContact) {
    const openedChatHandler = (e) => {
      e.preventDefault();
      if (messageArea.value) {
        let message = '';
        let messageData = {};
        if (containLinks(messageArea.value)) {
          const urlRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;
          const text = messageArea.value.replace(urlRegex, '<a style="color: #2B6CB0" href="$&" target="_blank" rel="noopener noreferrer">$&</a>');
          messageData = {
            sender: "Visitor",
            text: text,
            type: "Link",
            chat: window.nvc.chatId,
            shop: window.nvc.shopId,
            visitor: window.nvc.visitorId
          }
          message = linkMessage(text, "nvc-message-visitor");
        } else {
          messageData = { 
            sender: "Visitor",
            text: messageArea.value,
            type: "Text",
            chat: window.nvc.chatId,
            shop: window.nvc.shopId,
            visitor: window.nvc.visitorId
          }
          message = textMessage(messageArea.value, "nvc-message-visitor");
        }
        window.nvc.socket.emit("message", messageData);
        messageArea.value = "";
        messagesContainer.insertAdjacentHTML("beforeend", message);
        conversationGroup.scrollTop = conversationGroup.scrollHeight;
      } else {
        messageArea.classList.add("nvc-shake");
        setTimeout(function() {
          messageArea.classList.remove('nvc-shake');
        }, 600);
      }
    }
  
    const closedChatHandler = (e) => {
      e.preventDefault();
      chatUI.classList.add("nvc-active");
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
      chatUI.classList.remove("nvc-active");
      chatButton.removeEventListener("click", openedChatHandler);
      chatButton.addEventListener("click", closedChatHandler);
      changeIconToClosed(chatButton);
    });
  
    attachButton.addEventListener("click", () => {
      attachInput.value = null;
      attachInput.click();
    });
  
    attachInput.addEventListener("change", (event) => {
      const file = event.target.files[0]; 
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "test-nvc-live-chat");
      formData.append("public_id_prefix", `test-nvc-live-chat/${window.nvc.shopifyDomain}/${window.nvc.visitorId}`);
  
      let action = "raw";
      if (file.type.includes("image")) {
        action = "image";
      } else if (file.type.includes("video") || file.type.includes("audio")) {
        action = "video";
      }
  
      const uploading = loadingMessage('nvc-message-visitor nvc-message-loading');
      messagesContainer.insertAdjacentHTML("beforeend", uploading);
  
      fetch(`https://api.cloudinary.com/v1_1/${window.nvc.cloudName}/${action}/upload`, {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const uploading = messagesContainer.querySelector(".nvc-message-loading");
        console.log(uploading)
        messagesContainer.removeChild(uploading);
        window.nvc.socket.emit("message", { 
          sender: "Visitor",
          type: ["image", "video"].includes(data.resource_type) ? "Media" : "File",
          url: data.url,
          filename: data.original_filename,
          chat: window.nvc.chatId,
          shop: window.nvc.shopId,
          visitor: window.nvc.visitorId
        });
  
        const fileExtension = data.url.split('.').pop();
        let message = '';
  
        if (data.resource_type === "image") {
          message = imageMessage(data.url, "nvc-message-visitor");
        } else if (data.resource_type === "video" && data.is_audio) {
          message = fileMessage(data.original_filename, data.url, "nvc-message-visitor", musicIcon);
        } else if (data.resource_type === "video" && !data.is_audio) {
          message = fileMessage(data.original_filename, data.url, "nvc-message-visitor", videoIcon);
        } else if (data.resource_type === "raw" && ["xlsx", "csv", "xls"].includes(fileExtension)) {
          message = fileMessage(data.original_filename, data.url, "nvc-message-visitor", excelIcon);
        } else if (data.resource_type === "raw" && ['docx', 'doc'].includes(fileExtension)) {
          message = fileMessage(data.original_filename, data.url, "nvc-message-visitor", docIcon);
        } else {
          message = fileMessage(data.original_filename, data.url, "nvc-message-visitor", fileIcon);
        }
        messagesContainer.insertAdjacentHTML("beforeend", message);
        conversationGroup.scrollTop = conversationGroup.scrollHeight;
      });
    });
  } else {
    let firstMessage = '';
    const openedChatHandler = (e) => {
      e.preventDefault();
      if (messageArea.value) {
        firstMessage = messageArea.value;
        moveToPreChatSurvey(chatUI, surveyUI, chatButton);
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
      chatUI.classList.add("nvc-active");
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
      chatUI.classList.remove("nvc-active");
      chatButton.removeEventListener("click", openedChatHandler);
      chatButton.addEventListener("click", closedChatHandler);
      changeIconToClosed(chatButton);
    });

    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      backToPrevious(chatUI, surveyUI, chatButton);
      chatButton.addEventListener("click", openedChatHandler);
    });
  
  }
}

export default liveChatInteraction;