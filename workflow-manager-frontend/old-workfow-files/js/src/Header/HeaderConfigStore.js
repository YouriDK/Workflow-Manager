export default class HeaderConfigStore {
  static instance = null;
  // La config intiale des pages & leurs textes de headers (à adapter avec le module)
  static headerText = [
    {
      moduleId: "GRD-Ac",
      pageId: "GRD-HM",
      pageName: "Page d'Accueil",
      headerTitle: "Designer workflow",
      headerSubTitle:
        "Construisez votre workflow !",
      placeholder: ""
    },
    {
      moduleId: "GRD-Re",
      pageId: "GRD-RE",
      pageName: "Page de ressource",
      headerTitle: "Ressource",
      headerSubTitle: "Etudier les données émises par le module ressource",
      placeholder: "Cherchez votre module"
    }
  ];

  // Mettre à jour la config par page
  static setPageHeaderText(pageConfig) {
    HeaderConfigStore.headerText = HeaderConfigStore.headerText.map(page => {
      if (page.pageId == pageConfig.pageId) {
        page = pageConfig;
      }
      return page;
    });
  }
  // Récupérer les configs de module
  static getHeaderText() {
    return HeaderConfigStore.headerText;
  }

  // Récupérer la config par page
  static getPageHeaderText(pageId) {
    let textArray = HeaderConfigStore.headerText.filter(function(page) {
      return page.pageId == pageId;
    });
    if (textArray.length > 0) {
      return textArray[0];
    } else {
      return {};
    }
  }
  // Créer une instance de HeaderConfigStore : Singleton
  static createInstance() {
    var o = new HeaderConfigStore();
    return o;
  }
  // Récupérer une instance de HeaderConfigStore
  static getInstance() {
    if (!HeaderConfigStore.instance)
      HeaderConfigStore.instance = HeaderConfigStore.createInstance();
    return HeaderConfigStore.instance;
  }
}
