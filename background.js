/**
 * background.js communicates with the extension.
 * The extension sends the background (service work) which sites have
 * been blocked in the UI. The service worker then works to update
 * the rules.
 */

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.addBlockedSites) {
    const options = createRuleOptions(message.addBlockedSites);

    chrome.declarativeNetRequest.updateDynamicRules(options);
  }
});

/**
 * Creates a list of rules to redirect each blocked site
 * @param {string[]} listOfBlockedSites
 * @returns {UpdateRuleOptions}
 */
const createRuleOptions = (listOfBlockedSites) => {
  const rulesList = listOfBlockedSites.map((site, index) => {
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

  const wipeAway = Array.from(Array(50).keys(), (n) => n + 1);

  const ruleOptions = {
    removeRuleIds: wipeAway,
    addRules: rulesList,
  };

  return ruleOptions;
};
