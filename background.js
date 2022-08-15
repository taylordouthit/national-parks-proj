import { debug } from "./debugger.js";
/**
 * background.js communicates with the extension.
 * The extension sends the background (service work) which sites have
 * been blocked in the UI. The service worker then works to update
 * the rules.
 */
chrome.runtime.onMessage.addListener((message) => {
  debug("Message received in service worker: ", message);
  if (message.addBlockedSites) {
    const rulesList = createRulesList(message.addBlockedSites);
    debug("rulesList: ", rulesList);
    const ruleSet = {
      addRules: rulesList,
    };
    // hacky POS
    const removeRule = {
      addRules: [],
      removeRuleIds: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
    };
    chrome.declarativeNetRequest.updateDynamicRules(removeRule);
    chrome.declarativeNetRequest.updateDynamicRules(ruleSet);
  }
});

const createRulesList = (listOfBlockedSites) => {
  return listOfBlockedSites.map((site, index) => {
    debug("site: ", site);
    return {
      id: index + 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: { extensionPath: "/redirect/redirect.html" },
      },
      condition: {
        urlFilter: site,
        resourceTypes: ["main_frame"],
      },
    };
  });
};
