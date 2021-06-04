// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(async function () {
  const vscode = acquireVsCodeApi();

  // const oldState = vscode.getState();

  // const counter = document.getElementById('lines-of-code-counter');
  // console.log('Initial state', oldState);

  // let currentCount = (oldState && oldState.count) || 0;
  // counter.textContent = currentCount;

  // setInterval(() => {
  //   counter.textContent = currentCount++;

  //   // Update state
  //   vscode.setState({ count: currentCount });

  //   // Alert the extension when the cat introduces a bug
  //   if (Math.random() < Math.min(0.001 * currentCount, 0.05)) {
  //     // Send a message back to the extension
  //     vscode.postMessage({
  //       command: 'alert',
  //       text: '🐛  on line ' + currentCount
  //     });
  //   }
  // }, 100);

  // // Handle messages sent from the extension to the webview
  // window.addEventListener('message', event => {
  //   const message = event.data; // The json data that the extension sent
  //   switch (message.command) {
  //     case 'refactor':
  //       currentCount = Math.ceil(currentCount * 0.5);
  //       counter.textContent = currentCount;
  //       break;
  //   }
  // });

  const API_URL_BASE = 'https://api.teletype.atom.io';
  const PUSHER_KEY = 'f119821248b7429bece3';
  const PUSHER_CLUSTER = 'mt1';
  const AUTH_TOKEN = '';
  const PORTAL_ID = 'a3fd42c5-1909-4d7f-9805-0d5f12fa2a63';
// atom://teletype/portal/a3fd42c5-1909-4d7f-9805-0d5f12fa2a63

  await joinPortal(PORTAL_ID, AUTH_TOKEN);

  async function joinPortal(portalId, auth_token) {
    console.log('Inside the function call of JoinPortal');

    // let textEditor = vscode.window.activeTextEditor;
    let portal_binding;
    if (auth_token !== '') {
      try {
        const { client } = new CheTeletype({
          pusherKey: PUSHER_KEY,
          pusherOptions: {
            cluster: PUSHER_CLUSTER
          },
          baseURL: API_URL_BASE,
        });

        console.log(client);

        await client.initialize();
        // await client.signIn(constants.AUTH_TOKEN);
        await client.signIn(auth_token);

        console.log('Inside the try block of creating teletype client');
      } catch (e) {
        console.log('Inside the catch block of creating teletype client');

        console.log("Exception Error Message " + e);
      }

      // portal_binding = new PortalBinding({ client: client, portalId: portalId, editor: textEditor });
      // await portal_binding.initialize();
    } else {
      console.error("GitHub Auth Token. Please provide it in the constants.ts file");
    }
  }
}());