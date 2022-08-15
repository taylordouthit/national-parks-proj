/**
 * content-script.js has access to the webpage and it's DOM
 * use this file to communicate back and forth with the extension.
 */
chrome.runtime.onMessage.addListener((message) => {
  if (message) {
    console.log(message);
  }
});
