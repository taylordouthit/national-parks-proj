export const debug = (message, stringifiedVar = {}) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      log: `${message} ${JSON.stringify(stringifiedVar)}`,
    });
  });
};
