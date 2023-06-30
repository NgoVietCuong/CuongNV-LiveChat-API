function addPackageScripts(callback) {
  const socketScript = document.createElement('script');
  socketScript.src = 'https://cdn.socket.io/4.6.1/socket.io.min.js';
  socketScript.setAttribute('defer', 'defer');

  const uuidScript = document.createElement('script');
  uuidScript.src = 'https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/umd/uuidv4.min.js';
  uuidScript.setAttribute('defer', 'defer');
  uuidScript.onload = callback;

  document.head.appendChild(socketScript);
  document.head.appendChild(uuidScript);
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
  const value = localStorage.getItem('cuongnv-live-chat-visitor-key');
  if (value) {
    window.nvc.visitor = value;
    window.nvc.visitortype = 'Return';
  }
  if (!value) {
    const key = uuidv4();
    window.nvc.visitor = key;
    window.nvc.visitortype = 'New';
    localStorage.setItem('cuongnv-live-chat-visitor-key', key);
  }
}  

function visitorUpsert() {
  fetch(`${window.nvc.serverUrl}/visitors/upsert`, {
    method: 'POST',
    body: JSON.stringify({
      domain: window.nvc.shopifyDomain,
      key: window.nvc.visitor,
      type: window.nvc.visitortype,
      active: true,
    })
  })
  .then((response => response.json()));
}

function initialLoad() {
  getVisitor();
  getUrl();
  visitorUpsert();
}

export default function() {
  addPackageScripts(initialLoad);
}