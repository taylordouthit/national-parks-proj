export const sendMessageToServiceWorker = (key, message) => {
  chrome.runtime.sendMessage({
    [key]: message,
  });
};
