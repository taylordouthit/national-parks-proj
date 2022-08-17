export const addSiteToLocalStorage = (website) => {
  chrome.storage.local.set({ [website]: website });
};

export const getSiteFromLocalStorage = async (website) => {
  return await chrome.storage.local.get(website);
};

export const getSitesFromLocalStorage = async () => {
  const key = "inspirationalMessage";
  const { [key]: foo, ...sites } = await chrome.storage.local.get(null);
  return await chrome.storage.local.get(sites);
};

export const removeSiteFromLocalStorage = (website) => {
  chrome.storage.local.remove([website]);
};
