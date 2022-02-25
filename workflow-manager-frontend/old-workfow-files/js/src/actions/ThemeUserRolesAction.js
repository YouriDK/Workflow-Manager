import LFS from "../utils/FetchService/LiferayFetchService";

export const getRoleList = async () => {
  let object = await LFS.apiCall("getRoleList", "docthemeuserroles");
  return object;
};

export const getThemePermissionByRoleId = async id => {
  let object = await LFS.apiCall(
    "getThemePermissionByRole",
    "docthemeuserroles",
    {
      id: id
    }
  );
  return object;
};

export const getThemePermissionByThemeId = async themeId => {
  let object = await LFS.apiCall(
    "getThemePermissionByThemeId",
    "docthemeuserroles",
    {
      id: themeId
    }
  );
  return object;
};

export const getAllThemesPermission = async () => {
  let object = await LFS.apiCall("getAllThemesPermission", "docthemeuserroles");
  return object;
};

export const addThemeRolePermission = async permission => {
  let returnVal = await LFS.apiCall(
    "createThemeRolePermission",
    "docthemeuserroles",
    {
      jsonData: JSON.stringify(permission)
    }
  );
  return returnVal;
};

export const updateThemeRolePermission = async permission => {
  //console.log("Avant l'appel", permission);
  let returnVal = await LFS.apiCall(
    "updateThemeRolePermission",
    "docthemeuserroles",
    {
      jsonData: JSON.stringify(permission)
    }
  );
  return returnVal;
};

export const deleteThemeRolePermission = async id => {
  let returnVal = await LFS.apiCall(
    "deleteThemeRolePermission",
    "docthemeuserroles",
    {
      id: id
    }
  );
  return returnVal;
};

export const updateThemeRolePermissionList = async list => {
  let results;
  let promises = [];
  // console.log(list);
  list.map(value => {
    if (value.permKeys.length == 0) {
      if (value.id) {
        promises.push(
          LFS.apiCall("deleteThemeRolePermission", "docthemeuserroles", {
            id: value.id
          })
        );
      }
    } else {
      let obj = {
        themeId: value.themeId,
        roleId: value.roleId,
        permKeys: JSON.stringify(value.permKeys)
      };
      if (value.id) {
        obj.id = value.id;
      }
      promises.push(
        LFS.apiCall("updateThemeRolePermission", "docthemeuserroles", {
          jsonData: JSON.stringify(obj)
        })
      );
    }
  });
  //console.log("promises", promises);
  results = await Promise.all(promises);
  //console.log(results);
  let result = 201;
  results.map(res => {
    if (res != 201) {
      result = 501;
    }
  });
  //console.log(result);
  return result;
};
