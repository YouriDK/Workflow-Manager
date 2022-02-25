import LFS from "../utils/FetchService/LiferayFetchService";

export const getRessourcesByTheme = async id => {
  let object = await LFS.apiCall("getRessourcesByTheme", "docressource", {
    id: id
  });
  return object;
};

export const getRessourceByFileEntry = async fileEntryid => {
  let object = await LFS.apiCall("getRessourceByFileEntry", "docressource", {
    fileEntryid: fileEntryid
  });
  return object;
};


export const canView = async fileEntryid => {
  let object = await LFS.apiCall("canView", "docressource", {
    fileentryId: fileEntryid
  });
  return object;
};

export const getRessource = async ressourceId => {
  let object = await LFS.apiCall("getRessource", "docressource", {
    ressourceId: ressourceId
  });
  return object;
};

export const getRessourcesByRole = async () => {
  let object = await LFS.apiCall("getRessourcesByRole", "docressource");
  return object;
};

//C'est pas le bon thème apparemment
export const getAllThemes = async () => {
  let object = await LFS.apiCall("getAllThemes", "theme");
  return object;
};


export const getAllRessources = async () => {
  let object = await LFS.apiCall("getAllRessources", "docressource");
  return object;
};

export const getOrganizationByUser = async (userID) => {
  let object = await LFS.apiCall("getOrganization", "organization", { userId : userID });
  return object;
};

export const getUserById = async (userID) => {
  let object = await LFS.apiCall("userByID", "user", { userId : userID });
  return object;
};
 

export const addRessource = async (ressource, docTheme) => {
  let returnVal = await LFS.apiCall("createRessource", "docressource", {
    jsonData: JSON.stringify(ressource),
    docThemeJsonData: JSON.stringify(docTheme)
  });
  //console.log("add log", returnVal);
  return returnVal;
};

export const updateRessource = async (ressource, docTheme) => {
  let returnVal = await LFS.apiCall("updateRessource", "docressource", {
    jsonData: JSON.stringify(ressource),
    docThemeJsonData: JSON.stringify(docTheme)
  });
  //console.log("update log", returnVal);
  return returnVal;
};

export const deleteRessource = async id => {
  let returnVal = await LFS.apiCall("deleteRessource", "docressource", {
    id: id
  });
  //console.log("delete log", returnVal);
  return returnVal;
};

export const incrementDownload = async ressourceId => {
  let returnVal = await LFS.apiCall("incrementDownloadNumber", "docressource", {
    ressourceId
  });
  return returnVal;
};

//WORKFLOW
export const getAllGroovy = async () => {
  let object = await LFS.apiCall("findAllGroovy", "workflowgroovy");
  return object;
};

export const deleteGroovy = async wf => {
  let returnVal = await LFS.apiCall("removeGroovy", "workflowgroovy" , { WorkflowGroovy : JSON.stringify(wf) })
  return returnVal;
};

export const addGroovy = async wf => {
  let returnVal = await LFS.apiCall("pushGroovy", "workflowgroovy" , { groovysave : JSON.stringify(wf) })
  return returnVal;
};

export const getAllUsernames = async () => {
  let object = await LFS.apiCall("getAllNames", "util");
  return object;
};

export const getCurrentUser = async () => {
  let object = await LFS.apiCallnoSB("getCurrentUser", "user");
  return object;
};

export const getAllXml = async () => {
  let object = await LFS.apiCall("getAllDataXML", "workflowxml");
  return object;
};

export const deleteXml = async (xml) => {
  let object = await LFS.apiCall("DelXML", "workflowxml" , { workflowxml : xml });
  return object;
};
export const downloadXml = async () => {
  let object = await LFS.apiCall("DownXML", "workflowxml"  );
  return object;
};

export const pushXml = async (xml) => {
  let object = await LFS.apiCall("getXml", "workflowxml" , { xmlsave : xml } );
  return object;
};

export const getAllRoles = async () => {
  let object = await LFS.apiCall("getRoles", "docthemeuserroles");
  return object;
};

export const getAllJsonWF = async () => {
  let object = await LFS.apiCall("findAllJson", "workflow");
  return object;
};

export const pullJsonWF = async (json) => {
  let returnVal = await LFS.apiCall("pullJson", "workflow" , { jsonsave : json })
  return returnVal;
};

export const deleteJsonWF = async (json) => {
  let returnVal = await LFS.apiCall("deleteJson", "workflow" , { workflow : json })
  return returnVal;
};

export const getUserGroup = async (cId,uId) => {
  let returnVal = await LFS.apiCallnoSB("getGroup", "group" , { companyId : cId , userId : uId })
  return returnVal;
};

export const ddmGetAllFormInstances = async (cId,gId) => {
  let returnVal = await LFS.apiCallnoSB("allForminstances", "ddm.ddmforminstance" , { companyId : cId , groupId : gId , start : 0 , end : 10000 })
  return returnVal;
};

export const getStructure = async (sId) => {
  let returnVal = await LFS.apiCallnoSB("getStructure", "ddm.ddmstructure" , { structureId : sId })
  return returnVal;
};
