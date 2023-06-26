function addPackageScripts() {
  const socketScript = document.createElement('script');
  socketScript.src = 'https://cdn.socket.io/4.6.1/socket.io.min.js';
  socketScript.setAttribute('defer', 'defer');

  const uuidScript = document.createElement('script');
  uuidScript.src = 'https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/umd/uuidv4.min.js';
  uuidScript.setAttribute('defer', 'defer');

  document.head.appendChild(socketScript);
  document.head.appendChild(uuidScript);
}

function getVisitor() {
  console.log("getVisitor")
  const value = localStorage.getItem('cuongnv-live-chat-visitor-key');
  if (value) {
    window.nvc.visitor = value;
  }
  if (!value) {
    const key = uuidv4();
    window.nvc.visitor = key;
    localStorage.setItem('cuongnv-live-chat-visitor-key', key);
  }
}  

function getUrl() {
  console.log("getUrl")
  let url = "";
  const SERVER_REG = /\/([\w.-]*)([\\]*\/livechat.js)/g;
  const REG_ARRAY = SERVER_REG.exec(document.getElementsByTagName("head")[0].innerHTML);
  if (Array.isArray(REG_ARRAY) && REG_ARRAY.length > 1) {
    url = `https://${REG_ARRAY[1]}`;
  }
  window.nvc.serverUrl = url;
}

export { addPackageScripts, getVisitor, getUrl }

