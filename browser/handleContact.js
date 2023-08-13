import { arrowIcon, successIcon, failedIcon, textMessage, linkMessage } from './template';
import liveChatInteraction from './liveChat';
import { validateEmail, containLinks } from './common';

function moveToLiveChat(chatWidget) {
  liveChatInteraction(chatWidget);
  const chatUI = chatWidget.querySelector(".nvc-chat");
  chatUI.classList.add("nvc-active");
}

function handleContact(chatWidget, firstMessage) {
  const chatButton = chatWidget.querySelector(".nvc-chat-button");
  const startedUI = chatWidget.querySelector(".nvc-start-group");
  const surveyUI = chatWidget.querySelector(".nvc-survey");
  const form = chatWidget.querySelector(".nvc-pre-chat form");
  const nameWrapper = chatWidget.querySelector(".nvc-field-wrapper.nvc-name-wrapper");
  const emailWrapper = chatWidget.querySelector(".nvc-field-wrapper.nvc-email-wrapper");
  const nameField = chatWidget.querySelector("#nvc_name_field");
  const emailField = chatWidget.querySelector("#nvc_email_field");
  const submitButton = chatWidget.querySelector(".nvc-user-data-modal-submit");

  nameField.addEventListener("input", (e) => {
    const svgIcon = nameWrapper.querySelector("svg");
    if (svgIcon.classList[0] === "nvc-ic-failed") {
      nameWrapper.removeChild(svgIcon);
      nameWrapper.insertAdjacentHTML("afterbegin", arrowIcon);
      nameWrapper.classList.remove("nvc-field-wrapper-with-error");
    }
    
    if (e.target.value.length > 1) {
      if (svgIcon.classList[0] === "nvc-ic-arrow") {
        nameWrapper.removeChild(svgIcon);
        nameWrapper.insertAdjacentHTML("afterbegin", successIcon);
      }
    } else {
      if (svgIcon.classList[0] === "nvc-ic-success") {
        nameWrapper.removeChild(svgIcon);
        nameWrapper.insertAdjacentHTML("afterbegin", arrowIcon);
      }
    }
  });

  emailField.addEventListener("input", (e) => {
    const svgIcon = emailWrapper.querySelector("svg");
    if (svgIcon.classList[0] === "nvc-ic-failed") {
      emailWrapper.removeChild(svgIcon);
      emailWrapper.insertAdjacentHTML("afterbegin", arrowIcon);
      emailWrapper.classList.remove("nvc-field-wrapper-with-error");
    }
    
    if (validateEmail(e.target.value)) {
      if (svgIcon.classList[0] === "nvc-ic-arrow") {
        emailWrapper.removeChild(svgIcon);
        emailWrapper.insertAdjacentHTML("afterbegin", successIcon);
      }
    } else {
      if (svgIcon.classList[0] === "nvc-ic-success") {
        emailWrapper.removeChild(svgIcon);
        emailWrapper.insertAdjacentHTML("afterbegin", arrowIcon);
      } 
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameFieldIcon = nameWrapper.querySelector("svg");
    const emailFieldIcon = emailWrapper.querySelector("svg");
    if (nameField.value.length <= 1) {
      nameWrapper.classList.add("nvc-field-wrapper-with-error", "nvc-shake");
      nameWrapper.removeChild(nameFieldIcon);
      nameWrapper.insertAdjacentHTML("afterbegin", failedIcon);
      setTimeout(() => {
        nameWrapper.classList.remove('nvc-shake');
      }, 600);
    }

    if (!emailField.value.length || !validateEmail(emailField.value)) {
      emailWrapper.classList.add("nvc-field-wrapper-with-error", "nvc-shake");
      emailWrapper.removeChild(emailFieldIcon);
      emailWrapper.insertAdjacentHTML("afterbegin", failedIcon);
      setTimeout(() => {
        emailWrapper.classList.remove('nvc-shake');
      }, 600);
    }

    if (nameField.value.length > 1 && emailField.value.length && validateEmail(emailField.value)) {
      submitButton.innerText = ""
      submitButton.disabled = true;
      submitButton.insertAdjacentHTML("afterbegin", `<i class="fa fa-circle-o-notch fa-spin"></i>Loading`);
      
      fetch(`${window.nvc.serverUrl}/visitors/contact`, {
        method: "PUT",
        body: JSON.stringify({
          domain: window.nvc.shopifyDomain,
          key: window.nvc.visitorKey,
          name: nameField.value,
          email: emailField.value
        })
      })
      .then(response => response.json())
      .then(data => {
        window.nvc.chatId = data.payload.chat._id;
        window.nvc.isContact = true;
        
        let messageData;
        if (containLinks(firstMessage)) {
          const urlRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;
          const text = firstMessage.replace(urlRegex, '<a style="color: #2B6CB0" href="$&" target="_blank" rel="noopener noreferrer">$&</a>');
          messageData = {
            sender: "Visitor",
            text: text,
            type: "Link",
            chat: window.nvc.chatId,
            shop: window.nvc.shopId,
            visitor: window.nvc.visitorId
          }
        } else {
          messageData = {
            sender: "Visitor",
            text: firstMessage,
            type: "Text",
            chat: window.nvc.chatId,
            shop: window.nvc.shopId,
            visitor: window.nvc.visitorId
          }
        }

        window.nvc.socket.emit('updateVisitor', data.payload);
        window.nvc.socket.emit('message', messageData);
        if (startedUI) {
          chatWidget.removeChild(startedUI);
        }
        chatWidget.removeChild(surveyUI);
        chatButton.classList.remove("disabled");
        moveToLiveChat(chatWidget);
      });
    }
  });
}

export default handleContact;