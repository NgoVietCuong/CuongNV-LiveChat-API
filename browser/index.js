import initialLoad from './initialLoad';
import eventualLoad from './eventualLoad';
import insertChatWidget from './chatWidget';

(function() {
  if (window.Shopify && window.Shopify.shop) {
    window.nvc = {}
    window.nvc.shopifyDomain = window.Shopify.shop;
    console.log('test')

    // window.addEventListener('load', () => {console.log('hoa hoa')});
    // function startUp() {
    //   const browserSocket = io('https://cuongnv-live-chat-api.dev-bsscommerce.com/browser');
    // }
  
    // const formVisitorHtml = `
    //   <div id='nvc-live-chat' style='position: fixed; bottom: 40px; left: 100px; padding: 20px; background: white; border-radius: 10px; height: 400px; display: flex; flex-direction: column; justify-content: space-between; z-index: 999999999'>
    //     <form id='visitor-form' style='display: flex; flex-direction: column'>
    //       <input type='text' id='name-input' placeholder='Enter your name'>
    //       <input type='text' id='email-input' placeholder='Enter your email'>
    //       <button id='form-submit'>Send</button>
    //     </form>
    //   </div>
    // `;
  
    // const chatWidgetHtml = `
    //   <div id='nvc-live-chat' style='position: fixed; bottom: 40px; left: 100px; padding: 20px; background: white; border-radius: 10px; height: 400px; display: flex; flex-direction: column; justify-content: space-between; z-index: 999999999'>
    //     <div id='message-field' style='flex-grow: 1;'>
    //         <ul id='messages' style='list-style-type: none; margin:0; padding:0'></ul>
    //     </div>
    //     <form id='message-form'>
    //       <input type='text' id='message-input' placeholder='Enter message here'>
    //       <button id='message-send'>Send</button>
    //     </form>
    //   </div>
    // `;
  
    // function handleMessage() {
    //   let form = document.getElementById('message-form');
    //   let input = document.getElementById('message-input');
    //   form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     let messages = document.getElementById('messages');
    //     if (input.value) {
    //       let item = document.createElement('li');
    //       item.setAttribute('style', 'display: flex; flex-direction: row; justify-content: flex-end')
    //       item.textContent = input.value;
    //       messages.appendChild(item);
    //       browserSocket.emit('message', input.value);
    //       input.value='';
    //     }
    //   });
    // }
  
    // function handleVisitor() {
    //   let form = document.getElementById('visitor-form');
    //   let nameInput = document.getElementById('name-input');
    //   let emailInput = document.getElementById('email-input');
  
    //   form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const name = nameInput.value;
    //     const email = emailInput.value;
    //     fetch(`${window.nvc.serverUrl}/visitors/create`, {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         name: name, 
    //         email: email, 
    //         key: window.nvc.visitor, 
    //         domain: window.nvc.shopifyDomain
    //       })
    //     })
    //     .then((response => response.json()))
    //   });
    // }
  
    // browserSocket.on('connect', function () {
    //   console.log('connected to server');
    //   browserSocket.emit('join', window.nvc.visitor)
    // });
  
    // browserSocket.on('message', function (message) {
    //   let messages = document.getElementById('messages');
    //   let item = document.createElement('li');
    //   item.setAttribute('style', 'display: flex; flex-direction: row; justify-content: flex-start')
    //   item.textContent = message;
    //   messages.appendChild(item);
    // });

    initialLoad();
    eventualLoad();
    insertChatWidget();
  }
})();

