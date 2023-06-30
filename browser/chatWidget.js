const chatWidgetContainer = `
  <div id='nvc_live_chat'>
    <iframe id='nvc_live_chat_iframe' style='display: block; border: none; position: fixed; inset: auto 0px 0px auto; width: 450px; height: 647px; max-height: 100%; opacity: 1; color-scheme: none; background: none transparent !important; margin: 0px; max-width: 100vw; transform: translateY(0px); transition: none 0s ease 0s !important; visibility: visible; z-index: 999999999 !important;'></iframe>
  </div>
`;

const startedChat = `
  <div class="nvc-start-group">
    <div class="nvc-chat-header">
      <h2 class="nvc-banner">
        <span>
          Hi there
          <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/72x72/1f44b.png" class="nvc-emoji" />
        </span>
      </h2>
      <button class="nvc-material-icons nvc-exit-chat">
        <svg class="nvc-ic-minimize" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
        </svg>
      </button>
      <p class="nvc-start-message">
        Welcome to our website. How can we help you?
      </p>
      <div class="nvc-start-operators">
        <div class="nvc-start-avatar"></div>
      </div>
      <div class="nvc-status-message">
        <span class="nvc-online">
          <span>We reply immediately</span>
        </span>
      </div>
    </div>
    <div class="nvc-input-group">
      <div class="nvc-input">
        <textarea id="nvc_message_textarea" rows="1" placeholder="Enter your message..." aria-label="New message"></textarea> 
      </div>
      <div class="nvc-footer">
        <div class="nvc-footer-icons-wrapper">
          <button class="nvc-material-icons">
          </button>
        </div>
      </div>
    </div>
  </div>
`;

const prechatSurvey = `
  <div class="nvc-chat">
    <div class="nvc-user-data-modal">
      <div class="nvc-pre-chat">
        <div class="nvc-user-data-modal-operators">
          <div class="nvc-user-data-modal-operator"></div>
        </div>
        <form>
          <div class="nvc-user-data-modal-text">
            <span>Please introduce yourself:</span>
          </div>
          <div class="nvc-user-data-modal-fields">
            <div class="nvc-field-wrapper">
              <svg class="nvc-ic-arrow" fill="#000000" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg>
              <input type="text" placeholder="Enter your name..." />
            </div>
            <div class="nvc-field-wrapper">
              <svg class="nvc-ic-arrow" fill="#000000" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg>
              <input type="email" placeholder="Enter your email..." />
            </div>
          </div>
          <button class="nvc-user-data-modal-submit">Send</button>
        </form>
      </div>
    </div>
  </div>
`;

const closedWidget = `
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Mulish:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Wix+Madefor+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        //test
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

        input:focus, textarea:focus {
          border: 0px;
          outline: 0px;
        }
        
        button {
          background: none;
          border: 0px;
          padding: 0px;
          cursor: pointer;
        }

        .nvc-start-group, .nvc-chat {
          opacity: 0;
          width: 372px;
          position: absolute;
          bottom: 26px;
          left: auto;
          right: 48px;
          border-radius: 16px;
          pointer-events: auto;
          overflow: hidden;
          z-index: 1;
          left: auto;
          display: flex;
          flex-direction: column;
          box-shadow: rgba(0, 18, 46, 0.16) 0px 8px 18px 0px;
        }

        .nvc-widget-closed {
          position: absolute;
          width: 112px;
          height: 140px;
          bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
          right: 0px;
        }

        .nvc-chat-header {
          color: rgb(255, 255, 255);
          background: linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%);
          padding: 24px 28px 0px;
          position: relative;
          z-index: 4;
          flex: 0 0 auto;
        }

        .nvc-chat-header .nvc-banner {
          color: rgb(255, 255, 255);
          font-weight: 500;
          font-size: 42px;
          margin: 6px 0px 16px;
          padding-top: 4px;
          display: inline-block;
          position: relative;
          max-width: calc(100% - 90px);
          line-height: 50px;
          padding-left: 14px;
        }

        .nvc-chat-header .nvc-banner .nvc-emoji {
          width: 31px;
          height: 31px;
          margin: 0px 2px -5px;
          user-select: none;
        }

        button.nvc-material-icons {
          position: relative;
          margin: 15px 0px 8px 11px;
          float: right;
        }

        button.nvc-material-icons.nvc-exit-chat {
          color: rgb(255, 255, 255);
          margin-right: -3px;
          z-index: unset;
        }

        button.nvc-material-icons svg.nvc-ic-minimize {
          fill: currentColor;
          padding: 3px 0px;
          transform: rotate(270deg) translate(3px, 0px);
          width: 26px;
          height: 26px;
        }

        .nvc-start-message {
          color: currentColor;
          font-size: 16px;
          margin: 0px 0px 32px;
          line-height: 22px;
          position: relative;
          padding-left: 14px;
          padding-right: 100px;
          z-index: 2;
        }

        .nvc-start-operators {
          display: flex;
          position: absolute;
          top: 90px;
          flex-direction: column;
          height: calc(100% - 84px);
          width: 66px;
          right: 25px;
        }

        .nvc-start-operators .nvc-start-avatar {
          width: 60px;
          height: 60px;
          border-radius: 31px;
          background-size: cover;
          background-position: center center;
          background-image: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/CABEIADwAPAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgn/2gAIAQEAAAAA+lYAj8cy5ndHO8VNN0IFrk62gjEYudH9iLQPN6lec+0VmtG038L9UpWh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAhAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMQAAAAAAD/xAAuEAABAwMACAUEAwAAAAAAAAABAgMEAAURBhASEyAhQVEiMmKRwSNxcoExQqH/2gAIAQEAAT8A14PHdbuuMvcMY2wPGs88Z6ClT5qzlUh0n8qjXmawoFay8jqlfwaZebkNIdbOUrGRwCpxJmySf53qtdgJNu+zq+G7N7u4yPUoK9xrsyC3bWfUVL9zw6QxiS1IA5Y2F/Gpplb7qGkeZasCkNpabQhPlQkJH64CMDJ5DvWkk+Gu3uRm3wp5ak42Dkp2TnJNC4S2hhyPvT0Wg4z9xVqmuN3SNJl/TabUcITzxkY2j3piRHkjLLrbg9Ks1gjVL0nnvLVuAllHTllf7Jp+VKknLz7jn5K+KAAGNY8JykkHuDg0xe7rG5JkqUB/VY2x/tR9LkBvEmMsud2/KfeumrtXSu9dKFZNf//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AB//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AB//Z");
          position: absolute;
          top: 0px;
          left: 0px;
          transition: transform 0.2s ease-in-out 0s;
          will-change: transform;
          transform: translate3d(0px, 0px, 0px);
        }

        .nvc-status-message {
          background-image: linear-gradient(135deg, rgba(42, 39, 218, 0.72) 0%, rgba(0, 204, 255, 0.72) 100%);
          padding: 15px 28px 15px;
          margin: 18px -28px 0px;
          color: currentColor;
          position: relative;
          background-size: 100% calc(100% + 12px);
          z-index: 1;
        }

        .nvc-status-message .nvc-online {
          padding-left: 20px;
          z-index: 2;
          position: relative;
          display: inline-block;
          font-size: 16px;
        }

        .nvc-status-message .nvc-online::before {
          content: "";
          display: block;
          width: 8px;
          height: 8px;
          position: absolute;
          top: calc(50% - 4px);
          left: 0px;
          background: rgb(88, 183, 67);
          border-radius: 50%;
        }

        .nvc-input-group {
          padding: 0px 28px 6px;
          position: relative;
          background: rgb(255, 255, 255);
          z-index: 3;
          flex: 0 0 auto;
        }
        
        .nvc-input-group .nvc-input {
          transition: all 0.5s ease-in-out 0s;
          opacity: 1;
          transform: translateY(0px);
        }
        
        #nvc_message_textarea {
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

        .nvc-footer {
          height: 42px;
          position: relative;
        }

        .nvc-active {
          opacity: 1;
        }

        .nvc-user-data-modal {
          background-image: linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255)), linear-gradient(118deg, rgb(42, 39, 218), rgb(0, 204, 255));
          opacity: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          padding: 50px 55px;
        }

        .nvc-user-data-modal .nvc-user-data-modal-operators {
          text-align: center;
          white-space: nowrap;
          margin-bottom: 32px;
        }

        .nvc-user-data-modal .nvc-user-data-modal-operators .nvc-user-data-modal-operator {
          width: 66px;
          height: 66px;
          border-radius: 31px;
          background-size: cover;
          background-position: center center;
          display: inline-block;
          background-image: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/CABEIADwAPAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgn/2gAIAQEAAAAA+lYAj8cy5ndHO8VNN0IFrk62gjEYudH9iLQPN6lec+0VmtG038L9UpWh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAhAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMQAAAAAAD/xAAuEAABAwMACAUEAwAAAAAAAAABAgMEAAURBhASEyAhQVEiMmKRwSNxcoExQqH/2gAIAQEAAT8A14PHdbuuMvcMY2wPGs88Z6ClT5qzlUh0n8qjXmawoFay8jqlfwaZebkNIdbOUrGRwCpxJmySf53qtdgJNu+zq+G7N7u4yPUoK9xrsyC3bWfUVL9zw6QxiS1IA5Y2F/Gpplb7qGkeZasCkNpabQhPlQkJH64CMDJ5DvWkk+Gu3uRm3wp5ak42Dkp2TnJNC4S2hhyPvT0Wg4z9xVqmuN3SNJl/TabUcITzxkY2j3piRHkjLLrbg9Ks1gjVL0nnvLVuAllHTllf7Jp+VKknLz7jn5K+KAAGNY8JykkHuDg0xe7rG5JkqUB/VY2x/tR9LkBvEmMsud2/KfeumrtXSu9dKFZNf//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AB//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AB//Z");
          margin-right: -4%;
        }

        .nvc-user-data-modal .nvc-user-data-modal-text {
          font-size: 20px;
          font-weight: 600;
          text-align: center;
          color: rgb(0, 18, 46);
          margin-bottom: 32px;
        }

        .nvc-field-wrapper {
          position: relative;
          left: 0px;
        }

        .nvc-user-data-modal .nvc-user-data-modal-fields .nvc-ic-arrow {
          fill: rgb(0, 125, 252);
          transform: rotate(45deg);
          width: 24px;
          height: 24px;
          position: absolute;
          top: 8px;
          left: 9px;
        }

        .nvc-user-data-modal .nvc-user-data-modal-fields input {
          width: 100%;
          display: block;
          border-radius: 5px;
          border: 1px solid rgba(108, 125, 159, 0.24);
          font-size: 15px;
          padding: 9px 12px 10px 40px;
          margin: 0px 0px 8px;
          line-height: normal;
        }

        .nvc-user-data-modal .nvc-user-data-modal-submit {
          background: linear-gradient(99deg, rgb(42, 39, 218), rgb(0, 204, 255));
          color: rgb(255, 255, 255);
          box-shadow: rgba(0, 77, 255, 0.24) 0px 8px 32px 0px;
          width: 100%;
          height: 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 6px;
          margin: 16px 0px;
          position: relative;
        }

        .nvc-chat-button {
          background: linear-gradient(135deg, rgb(42, 39, 218), rgb(0, 204, 255));
          box-shadow: rgba(0, 77, 255, 0.5) 0px 4px 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: inherit;
          justify-content: center;
          align-items: center;
          pointer-events: initial;
          transition: all 0.2s ease-in-out 0s;
          position: relative;
          color: rgb(0, 125, 252);
        }
      </style>
    </head>
    <body>
      <div class="nvc-widget-right">
        ${prechatSurvey}
        <div class="nvc-widget-closed">
          <button class="nvc-chat-button">
            <i class="nvc-active">
              <svg class="ic_bubble" fill="#FFFFFF" width="24" height="24" viewBox="0 0 24 24" xmls="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
            </i>
          </button>
        </div>
      </div> 
    </body>
  </html>
`;

function chatInteraction() {
  const iframe = document.querySelector('#nvc_live_chat_iframe');
  const iframeHtml = iframe.contentDocument.documentElement;
  const widget = iframeHtml.querySelector('.nvc-widget-left');
  const prechatSurvey = iframeHtml.querySelector('.nvc-chat');
  const chatButton = iframeHtml.querySelector('.nvc-chat-button');
  chatButton.addEventListener('click', () => {
    prechatSurvey.classList.add('nvc-active');
  });


  // const started = iframeHtml.querySelector('.nvc-start-group');
  // chatButton.addEventListener('click', () => {
  //   started.classList.add('nvc-active');
  // });

  // const minimizeButton = started.querySelector('button.nvc-material-icons.nvc-exit-chat');
  // minimizeButton.addEventListener('click', () => {
  //   started.classList.remove('nvc-active');
  // });

  const messageInput = iframeHtml.querySelector('')
}

function insertChatWidget() {
  const body = document.body;
  body.insertAdjacentHTML('beforeend', chatWidgetContainer);
  const iframe = document.querySelector('#nvc_live_chat_iframe');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(closedWidget);
  iframeDoc.close();

  chatInteraction()
}

export default insertChatWidget;