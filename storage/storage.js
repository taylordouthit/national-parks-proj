export const addSiteToLocalStorage = (website) => {
  chrome.storage.local.set({ [website]: website });
};

export const getSiteFromLocalStorage = async (website) => {
  return await chrome.storage.local.get(website);
};

export const getSitesFromLocalStorage = async () => {
  return await chrome.storage.local.get(null);
};

export const removeSiteFromLocalStorage = (website) => {
  chrome.storage.local.remove([website]);
};
