import {
  addSiteToLocalStorage,
  getSiteFromLocalStorage,
  getSitesFromLocalStorage,
  removeSiteFromLocalStorage,
} from "../storage/storage.js";

import { sendMessageToServiceWorker } from "../runtime/runtime.js";

/**
 * popup.js fires when the extension popup is opened from the toolbar.
 * Upon opening, it will grab all blocked sites from local storage,
 * build the ui list inside the popup, send a message to the
 * service worker about the current state of things, and add some
 * listeners that for some reason cannot be attached to the template
 * directly.
 */
document.addEventListener("DOMContentLoaded", async () => {
  addSitesFromLocalStorageToDOM();

  sendMessageToServiceWorker(
    "addBlockedSites",
    Object.keys(await getSitesFromLocalStorage())
  );

  addKeypressListenerToInputAndAddIcon();

  addClickListenerToAddIcon();
});

/**
 * Takes a list of sites and reconstructs the list contained
 * within the popup UI.
 */
const addSitesFromLocalStorageToDOM = async () => {
  const blockedSites = Object.keys(await getSitesFromLocalStorage());
  blockedSites.forEach((key) => {
    const blockedSitesContainerElement =
      document.getElementById("blocked-sites");
    const blockedSiteElement = createSiteElement(key);
    blockedSitesContainerElement.appendChild(blockedSiteElement);
  });
};

/**
 * Adds an enter keypress event to the input and + icon
 */
const addKeypressListenerToInputAndAddIcon = () => {
  document.querySelectorAll(".add").forEach((element) => {
    element.addEventListener("keypress", (event) => {
      if (event.key === "Enter" && !inputIsBlank()) {
        addSite();
        clearInput();
      }
    });
  });
};

/**
 * Adds a click event to the + icon
 */
const addClickListenerToAddIcon = () => {
  const addIcon = document.getElementById("add-icon");
  addIcon.addEventListener("click", () => {
    if (!inputIsBlank()) {
      addSite();
      clearInput();
    }
  });
};

/**
 * Adds site to DOM and Local storage.
 * It currently performs validation to make sure
 * site doesn't already exist.
 */
const addSite = async () => {
  const addSiteInputValue = document
    .getElementById("add-site")
    .value.toLowerCase();

  const siteAlreadyExists =
    Object.keys(await getSiteFromLocalStorage(addSiteInputValue)).length !== 0;

  if (siteAlreadyExists) return;

  const blockedSitesContainerElement = document.getElementById("blocked-sites");
  const blockedSiteElement = createSiteElement(addSiteInputValue);
  blockedSitesContainerElement.appendChild(blockedSiteElement);
  addSiteToLocalStorage(addSiteInputValue);

  const blockedSites = Object.keys(await getSitesFromLocalStorage());
  sendMessageToServiceWorker("addBlockedSites", blockedSites);
};

/**
 * Returns a <div><img /><span>blockedsite.com</span><img /></div>
 * @param {string} addSiteInputValue
 * @returns {HTMLDivElement}
 */
const createSiteElement = (addSiteInputValue) => {
  // Create favicon
  const faviconImageElement = document.createElement("img");
  faviconImageElement.classList.add("favicon");
  faviconImageElement.src = "https://www." + addSiteInputValue + "/favicon.ico";

  // Create span containing website name
  const websiteTextElement = document.createElement("span");
  websiteTextElement.innerText = addSiteInputValue;

  // Create trash icon
  const removeImageElement = document.createElement("img");
  removeImageElement.classList.add("icon", "remove-icon");
  removeImageElement.src = "../icons/remove-icon.png";
  removeImageElement.tabIndex = 3;

  // function () because we need scope
  removeImageElement.addEventListener("click", async function () {
    removeSiteFromLocalStorage(this.parentNode.innerText);
    this.parentElement.remove();
    const blockedSites = Object.keys(await getSitesFromLocalStorage());
    sendMessageToServiceWorker("addBlockedSites", blockedSites);
  });
  removeImageElement.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      removeSiteFromLocalStorage(this.parentNode.innerText);
      this.parentElement.remove();
      const blockedSites = Object.keys(await getSitesFromLocalStorage());
      sendMessageToServiceWorker("addBlockedSites", blockedSites);
    }
  });

  const blockedSiteElement = document.createElement("div");
  blockedSiteElement.classList.add("site");
  blockedSiteElement.appendChild(faviconImageElement);
  blockedSiteElement.appendChild(websiteTextElement);
  blockedSiteElement.appendChild(removeImageElement);

  return blockedSiteElement;
};

/**
 * Checks whether input is blank
 */
const inputIsBlank = () => {
  return document.getElementById("add-site").value === "";
};

/**
 * Clears the input
 */
const clearInput = () => {
  document.getElementById("add-site").value = "";
};
