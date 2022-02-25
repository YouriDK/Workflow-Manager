//Singleton "FetchService" to fetch data from Liferay's Remote Services delivered by Service Builder
import AlertUtil from "../AgiirUtil/AlertUtil";

export default class FetchService {
  static instance = null;

  static instance = null;

  //Routes du service builder
  static api = {
    //ddm
    getRoles : "get-role-list",
    allForminstances : "get-form-instances",
    getStructure : "get-structure",

    //Portal
    getCurrentUser :"get-current-user",
    getGroup : "get-user-group",
    getAllNames : "data-provider-get-all-user-names",
    

    //Workflow
    findAllGroovy :"find-all-grovvy",
    pushGroovy : "push-groovy",
    deleteAllGroovy : "delete-all-groovy",
    removeGroovy : "remove-groovy",

    pullJson : "pull-json",
    deleteAllJson :"delete-all-json",
    findAllJson : "find-all-json",
    deleteJson : "remove-json",

    getXml : "get-xml",
    getAllDataXML : "get-all-xml",
    DelXML : "delete-xml",
    DownXML :"download-xml",

    //Non Service Builder
    getOrganization : "get-user-organizations" ,
    userByID : "get-user-by-id",

    //applications
    getAllRessources: "get-all-doc-ressource",
    getRessource: "get-doc-ressource",
    getRessourceByFileEntry: "get-doc-ressource-by-file-entry-id",
    updateRessource: "update-doc-ressource",
    createRessource: "create-doc-ressource",
    deleteRessource: "delete-doc-ressource",
    getRessourcesByTheme: "get-doc-ressource-by-theme",
    getRessourcesByRole: "get-doc-ressource-by-user-role",
    incrementDownloadNumber: "increment-download-number",
    //Themes
    getAllThemes: "get-all-doc-themes",
    getThemesByRole: "get-doc-themes-by-user-role",
    getTheme: "get-doc-theme",
    updateTheme: "update-doc-theme",
    createTheme: "create-doc-theme",
    deleteTheme: "delete-doc-theme",
    getDocThemeByRessource: "get-doc-theme-by-ressource",
    //Theme User Groups Permission
    getRoleList: "get-role-list",
    getThemePermissionByRole: "get-doc-theme-user-roles-by-user-role-id",
    getThemePermissionByThemeId: "get-doc-theme-user-roles-by-theme-id",
    getAllThemesPermission: "get-all-doc-theme-user-roles",
    getThemePermission: "get-doc-theme-user-roles",
    createThemeRolePermission: "create-doc-theme-user-roles",
    updateThemeRolePermission: "update-doc-theme-user-roles",
    deleteThemeRolePermission: "delete-doc-theme-user-roles",
    //permission
    getPermissionsByPortletId: "get-all-by-portlet-id",
    checkIfIsAdmin: "check-if-is-admin",
    checkIfHasRole: "check-if-has-role",
    canView: "can-view",
    //Search
    searchQuery: "search-query",
    //HeaderConfig
    getHeaderUtilByModule: "get-header-util-by-module",
    createHeaderUtil: "create-header-util",
    updateHeaderUtil: "update-header-util",
    deleteHeaderUtil: "delete-header-util"
  };

  static serviceURI = "/servicebuilder";
  static serviceURInoSB = "/group";

  static createInstance() {
    var o = new FetchService();
    return o;
  }

  static getInstance() {
    if (!FetchService.instance)
      FetchService.instance = FetchService.createInstance();
    return FetchService.instance;
  }

  //apiCall: on appelle cette fonction en spécifiant une route ci dessus, des paramètres (ou vide si pas de params)
  //Return : l'objet, que quand elle l'a car asynchrone
  static async apiCall(route, entity, params = {}) {
    let object = [];
    await Liferay.Service(
      this.getRoute(route, entity),
      params,
      function(obj) {
        object = obj;
      },
      function(exception, route) {
        //console.log("error");
        //console.log(exception);
        if (
          route == "createRessource" ||
          route == "updateRessource" ||
          route == "deleteRessource"
        ) {
          AlertUtil.alert(
            "erreur critique : " +
              exception +
              ", Veuillez contacter le service technique",
            "error"
          );
        }
      }
    );
    if (object instanceof Array) {
      if (typeof object[0] === "string") {
        object = this.convertStrArrayToJsonArray(object);
      }
    } else {
      if (typeof object === "string") {
        object = this.convertStrArrayToJsonArray(object);
      }
    }

    return object;
  }

  static async apiCallnoSB(route, entity, params = {}) {
    let object = [];
    await Liferay.Service(
      this.getRoutenoSB(route, entity),
      params,
      function(obj) {
        object = obj;
      },
      function(exception, route) {
        //console.log("error");
        //console.log(exception);
        if (
          route == "createRessource" ||
          route == "updateRessource" ||
          route == "deleteRessource"
        ) {
          AlertUtil.alert(
            "erreur critique : " +
              exception +
              ", Veuillez contacter le service technique",
            "error"
          );
        }
      }
    );
    if (object instanceof Array) {
      if (typeof object[0] === "string") {
        object = this.convertStrArrayToJsonArray(object);
      }
    } else {
      if (typeof object === "string") {
        object = this.convertStrArrayToJsonArray(object);
      }
    }

    return object;
  }

  static getRoutenoSB(routeName, entity,chemin) {
    let route = this.api[routeName];
    if (route != null) { 

      //Route nnSB
      if(routeName === "getOrganization"){ return "/" + "" + entity + "/" + route; }
      if(routeName === "userByID"){ return "/" + "" + entity + "/" + route; }
     
      return "/" + entity + "/" + route;
    } else {
      return "LFS: UNKNOWN_ROUTE_NAME";
    }
  }

  static getRoute(routeName, entity) {
    let route = this.api[routeName];
    if (route != null) { 

      //Route nnSB
      if(routeName === "getOrganization"){ return "/" + "" + entity + "/" + route; }
      if(routeName === "userByID"){ return "/" + "" + entity + "/" + route; }
      
      return this.serviceURI + "." + entity + "/" + route;
    } else {
      return "LFS: UNKNOWN_ROUTE_NAME";
    }
  }



  static isUserConnected() {
    return Liferay.ThemeDisplay.isSignedIn();
  }

  static convertStrArrayToJsonArray(array) {
    let returnArray = [];
    array.map(str => {
      returnArray.push(JSON.parse(str));
    });
    return returnArray;
  }
}
