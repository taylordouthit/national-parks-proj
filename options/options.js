/**
 * options.js
 */
document.addEventListener("DOMContentLoaded", async () => {
  addInspirationalTextFromStorage();
  addClickEventToSaveButton();
});

/**
 * Adds a click event to the + icon
 */
const addInspirationalTextFromStorage = async () => {
  const textareaElement = document.getElementById("inspirational-message");

  const message = await chrome.storage.local.get("inspirationalMessage");

  textareaElement.value = message.inspirationalMessage
    ? message.inspirationalMessage
    : "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.";
};
/**
 * Adds a click event to the + icon
 */
const addClickEventToSaveButton = () => {
  const textareaElement = document.getElementById("inspirational-message");
  const saveButtonElement = document.getElementById("save");
  saveButtonElement.addEventListener("click", () => {
    chrome.storage.local.set({
      inspirationalMessage: textareaElement.value,
    });
  });
};
