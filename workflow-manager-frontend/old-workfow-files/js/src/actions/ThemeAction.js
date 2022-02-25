import LFS from "../utils/FetchService/LiferayFetchService";

export const getAllThemes = async () => {
  let object = await LFS.apiCall("getAllThemes", "doctheme");
  return object;
};

export const getThemesByRole = async perm => {
  let object = await LFS.apiCall("getThemesByRole", "doctheme", {
    perm: perm
  });
  return object;
};

export const addTheme = async theme => {
  let returnVal = await LFS.apiCall("createTheme", "doctheme", {
    jsonData: JSON.stringify(theme)
  });
  return returnVal;
};

export const updateTheme = async theme => {
  let returnVal = await LFS.apiCall("updateTheme", "doctheme", {
    jsonData: JSON.stringify(theme)
  });
  return returnVal;
};

export const deleteTheme = async id => {
  let returnVal = await LFS.apiCall("deleteTheme", "doctheme", {
    id: id
  });
  return returnVal;
};

export const getDocThemeByRessource = async ressource => {
  let returnVal = await LFS.apiCall("getDocThemeByRessource", "doctheme", {
    ressource: ressource
  });
  return returnVal;
};

export const getTheme = async theme => {
  let returnVal = await LFS.apiCall("getTheme", "doctheme", {
    id: theme
  });
  return returnVal;
};
