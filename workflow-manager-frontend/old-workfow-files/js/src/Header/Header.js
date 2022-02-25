import React from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import Modal from "react-responsive-modal";
import SearchQuestionList from "./SearchQuestionList";
import HeaderPageList from "./HeaderPageList";
import { BreadcrumbHeader } from "./BreadcrumbHeader";
import { Icon } from "react-icons-kit";
import { ic_web, ic_search } from "react-icons-kit/md";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initailiser le texte de recherche ('search') dans le state
      search: "",
      openModal: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    // Bind la fonction à appeler quand on modifie le texte de Header
    this.handleHeaderTextChange = this.handleHeaderTextChange.bind(this);
  }

  /* Une fonction de callback à appeler quand on modifie le texte de header et qui permet de  :
      - Fermer le Modal
      - Faire un Callback à une fonction implémentée dans la page pour mettre à jour le texte
  */
  handleHeaderTextChange() {
    const { headerTextChangeCallback } = this.props;
    // Fermer le Modal
    this.onCloseModal();
    //Faire un Callback à une fonction implémentée dans la page pour mettre à jour le texte
    headerTextChangeCallback();
  }

  // Fonction qui permet de mettre à jour le texte de recherche ('search') dans le state
  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  // Fonction qui permet de fermer le modal de : Mise à jour texte de Header
  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  // Fonction qui permet d'ouvrir le modal de : Mise à jour texte de Header
  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  // Ré-initailiser le texte de recherche ('search') dans le state
  resetSearch() {
    this.setState({ search: "" });
  }

  render() {
    const { openModal, search } = this.state;
    const {
      headline,
      description,
      path,
      LiferayImgPath,
      pageCallback,
      subTheme,
      pageId,
      displayAdminButton,
      placeholder,
      themesList
    } = this.props;
    return (
      <div className="header">
        <BreadcrumbHeader
          path={path}
          pageCallback={pageCallback}
          subTheme={subTheme}
        />
        {displayAdminButton && displayAdminButton == true && (
          <Button
            color="secondary"
            onClick={this.onOpenModal}
            className="header-button"
          >
            <Icon size={20} icon={ic_web} />
            <span className="button-text">&nbsp; Gérer le bandeau</span>
          </Button>
        )}
        <div className="responsive-container header-content">
          <div className="home-header">
            <h1 className="header-title">{headline}</h1>
            <p className="header-subtitle">{description}</p>

          </div>
        </div>
        {search.length > 3 && (
          <div className="search-container search-container-scroll">
            <SearchQuestionList
              keyword={search}
              pageCallback={pageCallback}
              reset={this.resetSearch}
              themesList={themesList}
            />
          </div>
        )}
        <Modal
          open={openModal}
          onClose={this.onCloseModal}
          center
          classNames={{ modal: "header-modal" }}
        >
          <HeaderPageList
            LiferayImgPath={LiferayImgPath}
            pageCallback={pageCallback}
            headerCallback={this.handleHeaderTextChange}
            pageId={pageId}
          />
        </Modal>
      </div>
    );
  }
}
