import React from "react";
import Header from "../Header/Header";
import HeaderConfigStore from "../Header/HeaderConfigStore";
import NavAppBar from "../components/NavAppBar";

import AlertUtil from "../utils/AgiirUtil/AlertUtil"
import * as headerConfigActions from "../actions/HeaderConfigAction";

import Designerpage from "./DesignerPage"
import GrovvyPage from "./GroovyPage"
import SavePage from "./SavePage"
import XMLPage from "./XMLPage"
import HelpPage from "./HelpPage"


 
class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pageId: "GRD-HM",
        LiferayImgPath:
          Liferay.ThemeDisplay.getPathThemeImages() + "/lexicon/icons.svg",
        ressourcesList: [],
        themesList: [],
        dates: [],
        themeFilter: [],
        MonthFilter : [],
        headline: "",
        description: "",
        placeholder: "Definir un place Holder",
        filters: [],
        selectedFilters: [],
        filtredData: null,
        canViewAdmin: false,
        isMobile: false,
        init: true,
        noThemePermission: false,
        view: "design",
        jsonFile : [] ,

  
      };

      this.headerTextChangeCallback = this.headerTextChangeCallback.bind(this);
  
      this.viewChange = this.viewChange.bind(this);
      //window.addEventListener("resize", () => this.handleResize());
    }

    async componentDidMount() {
        const { pageId } = this.state;
        // Synchroniser/Intialiser le gros titre et le sous-titre de header
        this.syncHeaderConfig(pageId);
        //await this.getUserRoleFromApi();
        //this.initFilterByAuthoritedTheme();
        // retarder la préparation des dates afin d'afficher la page rapidement
        /*setTimeout(() => {
          this.fetchDateFiltersFromApi();
        }, 2000);
    
        this.handleResize();*/
      }
    
    async viewChange(component, params) {
        this.setState({
          view: component
        });
      }


      //Importation d'une sauvegarde et changement delieu
      ImportJSON(Import){
        this.setState({ jsonFile : Import })   
        //this.setState({ view : "design"})
        this.forceUpdate()
        console.log("Importation & Changement")
        AlertUtil.alert("L'importation de la sauvegarde a bien été faite ! " , "success");
      }

    headerTextChangeCallback() {
        const { pageId } = this.state;
        // Synchroniser/Intialiser le gros titre et le sous-titre de header
        this.syncHeaderConfig(pageId);
      }

      async syncHeaderConfig(pageId) {
        // Appel WS pour récupérer la liste des textes à mettre dans le header liées au module FAQ
        let configs = await headerConfigActions.getModuleHeaderConfig("GRD-Re");
        /* Vérifier si on a des textes de header dans la base
          1. Si on a de texte : Mettre à jour HeaderConfigStore
          2. Sinon : Garder la config intialisée dans HeaderConfigStore
        */
        if (configs.length > 0) {
          //console.log("Configs->", configs);
          configs.map(config => {
            HeaderConfigStore.setPageHeaderText(config);
          });
        } else {
          //console.log("Pas de config de Header");
        }
        // Récupérer le texte de header correspond à la page courante
        let config = HeaderConfigStore.getPageHeaderText(pageId);
        // Vérifier s'il n'est pas null avant de mettre à jour le gros titre et le sous-titre de header
        if (config != null) {
          this.setState({
            headline: config.headerTitle ? config.headerTitle : "",
            description: config.headerSubTitle ? config.headerSubTitle : "",
            placeholder: config.placeholder ? config.placeholder : ""
          });
        }
      }



    render() {
        const {
            headline,
            description,
            placeholder,
            LiferayImgPath,
            themesList,
            filtredData,
            filters,
            canViewAdmin,
            pageId,
            isMobile,
            selectedFilters,
            validator,
            post,
              noThemePermission
          } = this.state;
          const { pageCallback } = this.props;
        return (
          <div>
        <Header
          headline={headline}
          placeholder={placeholder}
          path="Accueil/Workflow/"
          description={description}
          LiferayImgPath={LiferayImgPath}
          headerTextChangeCallback={this.headerTextChangeCallback}
          pageCallback={pageCallback}
          pageId={pageId}
          displayAdminButton={canViewAdmin}
          themesList={themesList}
        />
        <NavAppBar
            activeTab={this.state.view}
            viewChange={this.viewChange}
            type="desktop"
            pageCallback={pageCallback}
            validator={validator}
            post={post}
            pageCallback={pageCallback}
        />
        

        { this.state.view === "design" ? <Designerpage sauvegarde={this.state.jsonFile} /> : <div>{' '}</div>}
        { this.state.view === "groovy" ? <GrovvyPage /> : <div>{' '}</div>}
        { this.state.view === "json" ? <SavePage 	 /> : <div>{' '}</div>}
        { this.state.view === "xml" ? <XMLPage Import= {Import => this.ImportJSON(Import)}  /> : <div>{' '}</div>}
        { this.state.view === "help" ? <HelpPage /> : <div>{' '}</div>}
        </div>



        );
      }

}


export default HomePage;