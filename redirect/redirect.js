document.addEventListener("DOMContentLoaded", async () => {
  retrieveInspirationalTextFromStorage();
});

/**
 * Retrieves inspirational message from storage
 */
const retrieveInspirationalTextFromStorage = async () => {
  const h1Element = document.getElementById("inspirational-message");

  const message = await chrome.storage.local.get("inspirationalMessage");
  console.log("message: ", message);

  h1Element.innerText = message.inspirationalMessage
    ? message.inspirationalMessage
    : "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.";
};
