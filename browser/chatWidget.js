export const chatWidgetContainer = `
  <div id='nvc-live-chat'>
    <iframe id='nvc-live-chat-iframe' style='display: block; border: none; position: fixed; inset: auto auto 0px 0px; width: 450px; height: 647px; max-height: 100%; opacity: 1; color-scheme: none; background: none transparent !important; margin: 0px; max-width: 100vw; transform: translateY(0px); transition: none 0s ease 0s !important; visibility: visible; z-index: 999999999 !important; border-radius: 47px 30px 47px 47px;'></iframe>
  </div>
`;

export const onlineHtml = `
<html>
  <head>
    <link rel="stylesheet" href="chat.css">
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Mulish:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Wix+Madefor+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style type="text/css">
      *, ::before, ::after {
        box-sizing: inherit;
      }
      
      body, input, textarea, select, button {
        font-family: Mulish;
        letter-spacing: -0.24px;
        -webkit-font-smoothing: antialiased;
        color: rgb(6, 19, 43);
        box-sizing: border-box;
      }
      
      .chat {
        width: 372px;
        position: absolute;
        pointer-events: auto;
        border-radius: 16px;
        overflow: hidden;
        z-index: 1;
        left: auto;
        display: flex;
        flex-direction: column;
        box-shadow: rgba(0, 18, 46, 0.16) 0px 8px 18px 0px;
      }
      
      .chat-header {
        color: rgb(255, 255, 255);
        background: linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%);
        padding: 24px 28px 0px;
        position: relative;
        z-index: 4;
        flex: 0 0 auto;
      }
      
      .avatars-wrapper {
        width: 52px;
        height: 52px;
        margin: 0px 18px 0px 0px;
        float: left;
      }
      
      .header-ava {
        width: 52px;
        height: 52px;
        border-radius: 24px;
        background-size: cover;
        background-position: center center;
        background-image: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/CABEIADwAPAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgn/2gAIAQEAAAAA+lYAj8cy5ndHO8VNN0IFrk62gjEYudH9iLQPN6lec+0VmtG038L9UpWh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAhAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMQAAAAAAD/xAAuEAABAwMACAUEAwAAAAAAAAABAgMEAAURBhASEyAhQVEiMmKRwSNxcoExQqH/2gAIAQEAAT8A14PHdbuuMvcMY2wPGs88Z6ClT5qzlUh0n8qjXmawoFay8jqlfwaZebkNIdbOUrGRwCpxJmySf53qtdgJNu+zq+G7N7u4yPUoK9xrsyC3bWfUVL9zw6QxiS1IA5Y2F/Gpplb7qGkeZasCkNpabQhPlQkJH64CMDJ5DvWkk+Gu3uRm3wp5ak42Dkp2TnJNC4S2hhyPvT0Wg4z9xVqmuN3SNJl/TabUcITzxkY2j3piRHkjLLrbg9Ks1gjVL0nnvLVuAllHTllf7Jp+VKknLz7jn5K+KAAGNY8JykkHuDg0xe7rG5JkqUB/VY2x/tR9LkBvEmMsud2/KfeumrtXSu9dKFZNf//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AB//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AB//Z");
        float: left;
      }
      
      .chat h2.twolines {
        margin-bottom: 5px;
      }
      
      .chat h2 {
        font-size: 22px;
        font-weight: 600;
        color: currentColor;
        margin: 4px 0px 0px;
        padding: 0px;
        display: inline-block;
        position: relative;
        max-width: calc(100% - 145px);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: bottom;
      }
      
      .chat h2 .top-heading {
        font-size: 16px;
        display: block;
        line-height: 15px;
        margin-top: 4px;
      }
      
      button.material-icons.exit-chat {
        color: rgb(255, 255, 255);
        margin-right: -3px;
        z-index: unset;
      }
      
      button.material-icons {
        position: relative;
        margin: 15px 0px 8px 11px;
        float: right;
        background: none;
        border: 0px;
        font-style: inherit;
        font-weight: inherit;
        font-stretch: inherit;
        font-size: inherit;
        font-family: inherit;
        font-optical-sizing: inherit;
        font-kerning: inherit;
        font-feature-settings: inherit;
        font-variation-settings: inherit;
        line-height: normal;
        overflow: visible;
        padding: 0px;
        user-select: none;
        outline: none;
        cursor: pointer;
      }
      
      button.material-icons::before {
        background: rgba(0, 36, 92, 0.16);
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        z-index: -1;
        transition: all 0.16s ease-in-out 0s;
        transform: scale(0);
        top: calc(50% - 20px);
        left: calc(50% - 20px);
      }
      
      button.material-icons svg {
        fill: currentColor;
        padding: 3px 0px;
        transform: rotate(270deg) translate(3px, 0px);
        width: 26px;
        height: 26px;
      }
      
      button.material-icons span {
        background: rgb(255, 255, 255);
        padding: 6px 8px;
        border-radius: 2px;
        box-shadow: rgba(0, 18, 46, 0.32) 0px 2px 8px 0px;
        font-size: 13px;
        position: absolute;
        opacity: 0;
        pointer-events: none;
        white-space: nowrap;
        transition: all 0.16s ease-in-out 0s;
        z-index: 1;
        right: calc(100% + 10px);
        top: 50%;
        transform: translate(5px, -50%);
        translate: rgb(6, 19, 43);
      }
      
      .no-clip-path .offline-message {
        background-image: linear-gradient(135deg, rgba(42, 39, 218, 0.72) 0%, rgba(0, 204, 255, 0.72) 100%);
        padding: 14px 28px 20px;
      }
      
      .no-clip-path .offline-message::after {
        content: "";
        position: absolute;
        width: calc(100% + 10px);
        bottom: -8px;
        left: -5px;
        border-image-source: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNzIgMTUiPgogIDxwYXRoIGQ9Ik0zNDkuOCAxLjRDMzM0LjUuNCAzMTguNSAwIDMwMiAwaC0yLjVjLTkuMSAwLTE4LjQuMS0yNy44LjQtMzQuNSAxLTY4LjMgMy0xMDIuMyA0LjctMTQgLjUtMjggMS4yLTQxLjUgMS42Qzg0IDcuNyA0MS42IDUuMyAwIDIuMnY4LjRjNDEuNiAzIDg0IDUuMyAxMjguMiA0LjEgMTMuNS0uNCAyNy41LTEuMSA0MS41LTEuNiAzMy45LTEuNyA2Ny44LTMuNiAxMDIuMy00LjcgOS40LS4zIDE4LjctLjQgMjcuOC0uNGgyLjVjMTYuNSAwIDMyLjQuNCA0Ny44IDEuNCA4LjQuMyAxNS42LjcgMjIgMS4yVjIuMmMtNi41LS41LTEzLjgtLjUtMjIuMy0uOHoiIGZpbGw9IiNmZmYiLz4KPC9zdmc+Cg==");
        border-image-slice: 0 0 100%;
        border-image-width: 0 0 15px;
        border-image-repeat: stretch;
        border-width: 0px 0px 15px;
        border-bottom-style: solid;
        border-color: initial;
        border-top-style: initial;
        border-left-style: initial;
        border-right-style: initial;
      }
      
      .offline-message {
        margin: 18px -28px 0px;
        color: currentColor;
        width: calc(100% + 56px);
        position: relative;
        background-size: 100% calc(100% + 12px);
        z-index: 1;
      }
      
      .offline-message span.online {
        padding-left: 20px;
      }
      
      .offline-message span {
        z-index: 2;
        position: relative;
        display: inline-block;
        font-size: 16px;
      }
      
      .offline-message span.online::before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        top: calc(50% - 4px);
        background: rgb(88, 183, 67);
        border-radius: 50%;
        left: 0px;
      }
      
      
      
      #conversation-group {
        padding: 0px 28px;
        height: 357px;
        overflow: hidden auto;
        background: rgb(255, 255, 255);
        transition: all 0.3s ease 0s;
        max-height: 357px;
        min-height: 160px;
        flex: 0 1 auto;
      }
      
      #messages {
        position: relative;
        margin-top: 10px;
        width: 100%;
        padding-bottom: 24px;
        float: left;
      }
      
      #conversation-group #conversation-scroll {
        width: 24px;
        height: 313px;
        position: absolute;
        right: 2px;
        padding: 0px 12px 0px 4px;
      }
      
      
      
      
      
      .input-group {
        padding: 0px 28px 6px;
        position: relative;
        background: rgb(255, 255, 255);
        z-index: 3;
        flex: 0 0 auto;
      }
      
      .footer-input-wrapper {
        transition: all 0.5s ease-in-out 0s;
        opacity: 1;
        transform: translateY(0px);
      }
      
      hr {
        margin: 0;
        border-width: 0px 0px 1px;
        border-top-style: initial;
        border-right-style: initial;
        border-left-style: initial;
        border-top-color: initial;
        border-right-color: initial;
        border-left-color: initial;
        border-image: initial;
        border-bottom-style: solid;
        border-bottom-color: rgb(219, 223, 230);
      }
      
      textarea {
        letter-spacing: -0.24px;
        -webkit-font-smoothing: antialiased;
        color: rgb(6, 19, 43);
        border: 0px;
        width: 100%;
        font-size: 17px;
        padding: 20px 0px 14px;
        resize: none;
        line-height: 24px;
        overflow-x: hidden;
      }
      
      textarea:focus {
        border: 0px;
        outline: 0px;
      }
    </style>
  </head>
  <body>
    <div class="chat">
      <div class="chat-header no-clip-path">
        <div class="avatars-wrapper">
          <div class="header-ava"></div>
        </div>
        <h2 class="twolines">
          <span class="top-heading">
            Chat with
          </span>
          Kou
        </h2>
        <button class="material-icons exit-chat ripple">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
          </svg>
          <span>Minimize</span>
        </button>
        <div class="offline-message">
          <span class="online">
            <span>We reply immediately</span>
          </span>
        </div>
      </div>


      <div id="conversation-group">
        <div id="messages" aria-live="polite" aria-atomic="false">

        </div>
        <div id="conversation-scroll">
          <div style="top: 104.885px; height: 207.115px;"></div>
        </div>
      </div>

      <div class="input-group">
        <div class="footer-input-wrapper">
          <hr />
          <textarea id="new-message-textarea" rows="1" placeholder="Enter your message..." aria-label="New message"></textarea> 
        </div>
      </div>
    </div>
  </body>
</html>
`;

function insertChatWidget() {
  const body = document.body;
  body.insertAdjacentHTML('beforeend', chatWidgetContainer);
  const iframe = document.querySelector('#nvc-live-chat-iframe');
  iframe.src = `data:text/html,${encodeURIComponent(onlineHtml)}`;
}

export { insertChatWidget }