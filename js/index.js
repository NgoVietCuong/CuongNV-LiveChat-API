(function() {
  window.nvc = {}

  const value = localStorage.getItem('cuongnv-live-chat-visitor-key');
  if (value) {
    window.nvc.visitor = value;
  }
  if (!value) {
    const key = uuidv4();
    window.nvc.visitor = key;
    localStorage.setItem('cuongnv-live-chat-visitor-key', key);
  }

  const browserSocket = io('https://cuongnv-live-chat-api.dev-bsscommerce.com/browser');
  const chatWidgetHtml = `
    <div id="nvc-live-chat" style="position: fixed; bottom: 40px; left: 100px; padding: 20px; background: white; border-radius: 10px; height: 400px; display: flex; flex-direction: column; justify-content: space-between; z-index: 999999999">
      <div id="message-field" style="flex-grow: 1;">
          <ul id="messages" style="list-style-type: none; margin:0; padding:0"></ul>
      </div>
      <form id="message-form">
        <input type="text" id="message-input" placeholder="Enter message here">
        <button id="message-send">Send</button>
      </form>
    </div>
  `;

  function handleMessage() {
    let form = document.getElementById("message-form");
    let input = document.getElementById("message-input");
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let messages = document.getElementById("messages");
      if (input.value) {
        let item = document.createElement('li');
        item.setAttribute('style', 'display: flex; flex-direction: row; justify-content: flex-end')
        item.textContent = input.value;
        messages.appendChild(item);
        browserSocket.emit('message', input.value);
        input.value="";
      }
    });
  }

  browserSocket.on('connect', function () {
    console.log("connected to server");
    browserSocket.emit('join', window.nvc.visitor)
  });

  browserSocket.on('message', function (message) {
    let messages = document.getElementById("messages");
    let item = document.createElement('li');
    item.setAttribute('style', 'display: flex; flex-direction: row; justify-content: flex-start')
    item.textContent = message;
    messages.appendChild(item);
  });

  function insertChatWidget() {
    const body = document.body;
    body.insertAdjacentHTML("beforeend", chatWidgetHtml);
    handleMessage()
  }

  insertChatWidget();
})();

