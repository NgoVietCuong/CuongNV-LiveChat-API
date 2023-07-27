import insertChatWidget from './chatWidget';

function addUUIDScripts(callback) {
  const uuidScript = document.createElement("script");
  uuidScript.src = "https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/umd/uuidv4.min.js";
  uuidScript.setAttribute("defer", "defer");
  uuidScript.onload = callback;
  document.head.appendChild(uuidScript);
}

function addSocketIOScript(callback) {
  const socketScript = document.createElement("script");
  socketScript.src = "https://cdn.socket.io/4.6.1/socket.io.min.js";
  socketScript.setAttribute("defer", "defer");
  socketScript.onload = callback;
  document.head.appendChild(socketScript);
}

function getUrl() {
  let url = "";
  const SERVER_REG = /\/([\w.-]*)([\\]*\/livechat.js)/g;
  const REG_ARRAY = SERVER_REG.exec(document.getElementsByTagName("head")[0].innerHTML);
  if (Array.isArray(REG_ARRAY) && REG_ARRAY.length > 1) {
    url = `https://${REG_ARRAY[1]}`;
  }
  window.nvc.serverUrl = url;
}

function getVisitor() {
  const roomData = JSON.parse(localStorage.getItem("cuongnv-live-chat-room-data"));
  if (roomData && roomData.visitorKey) {
    window.nvc.visitorKey = roomData.visitorKey;
    window.nvc.visitorType = "Return";
  } else {
    const key = uuidv4();
    window.nvc.visitorKey = key;
    window.nvc.visitorType = "New";
    localStorage.setItem("cuongnv-live-chat-room-data", JSON.stringify({ visitorKey: key }));
  }
}

function checkContact() {
  const roomData = JSON.parse(localStorage.getItem("cuongnv-live-chat-room-data"));
  if (roomData && roomData.visitorId && roomData.chatId && roomData.shopId) {
    window.nvc.isContact = true;
    window.nvc.visitorId = roomData.visitorId;
    window.nvc.chatId = roomData.chatId;
    window.nvc.shopId = roomData.shopId;
  } else {
    window.nvc.isContact = false;
  }
}

function visitorUpsert() {
  fetch(`${window.nvc.serverUrl}/visitors/upsert`, {
    method: "POST",
    body: JSON.stringify({
      domain: window.nvc.shopifyDomain,
      key: window.nvc.visitorKey,
      type: window.nvc.visitorType,
      active: true
    })
  })
  .then((response) => response.json())
  .then((data) => {
    window.nvc.shopId = data.payload.shop;
    window.nvc.visitorId = data.payload._id;
    window.nvc.socket.emit('join', { visitorId: window.nvc.visitorId, shopId: window.nvc.shopId, domain: window.nvc.shopifyDomain });
    if (!window.nvc.isContact) {
      localStorage.setItem("cuongnv-live-chat-room-data", JSON.stringify({ 
        visitorKey: window.nvc.visitorKey,
        visitorId: window.nvc.visitorId,
        shopId: window.nvc.shopId
      }));
    }
  });
}

function initialLoad() {
  getVisitor();
  getUrl();
  checkContact();
  visitorUpsert();
  insertChatWidget();
}

function initialSocket() {
  const browserSocket = io('https://dev-cuongnv-live-chat-api.dev-bsscommerce.com/browser');
  window.nvc.socket = browserSocket;
  window.nvc.socket.on("connect", function() {
    console.log("connected socket to server")
  });
}

export default function() {
  addSocketIOScript(initialSocket);
  addUUIDScripts(initialLoad);
}