import React from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button
} from "reactstrap";
import Modal from "react-responsive-modal";
import Breakpoint from "react-socks";
import { AgiirIcon } from '../utils/AgiirIcons'


export default class ActionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      openModal: false,
      isActive: false,
      LiferayImgPath:
        Liferay.ThemeDisplay.getPathThemeImages() + "/lexicon/icons.svg"
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  }

  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  openDetailsView() {
    const { target, targetValue, pageCallback } = this.props;
    if (target === "annonce") {
      pageCallback("detail", targetValue);
    } else if (target === "cat") {
      //pageCallback("cat-detail", targetValue)
    } else {
      pageCallback("annonces");
    }
  }

  openUpdateView() {
    const { target, targetValue, pageCallback, toggle ,  } = this.props;
    this.props.modifier("Modifier")
    /*if (target === "annonce") {
      pageCallback("update", targetValue);
    } else if (target === "cat") {
      toggle(targetValue);
    } else {
      pageCallback("annonces");
    }*/
  }

  async deleteItem() {
      this.props.supprimer("Supprimer")
    /*const {
      target,
      targetValue,
      pageCallback,
      rerenderParentCallback
    } = this.props;
    if (target === "annonce") {
      var annonce = targetValue;
      //let response = await annonceActions.deleteAnnonce(annonce._id);
      if (response != 201) {
        console.error(
          "DELETE : Une erreur interne est survenue. Server returned '" +
            response +
            "'"
        );
      } else {
        //console.log("L'application \"" + application._title + '" a bien été supprimée',"success");
      }
    } else if (target === "cat") {
      var category = targetValue;
      //let pac = await categoryActions.deletePaCategByCateg(category.id);
      if (pac != 201) {
        console.error(
          "DELETE : Une erreur interne est survenue. Server returned '" +
            pac +
            "'"
        );
      } else {
        //console.log('Le thème "' + category.nom + '" a bien été supprimé',"success");
      }
      let response = await categoryActions.deleteCategorie(category.id);

      if (response != 201) {
        console.error(
          "DELETE : Une erreur interne est survenue. Server returned '" +
            response +
            "'"
        );
      } else {
        //console.log('Le thème "' + category.nom + '" a bien été supprimé',"success");
      }
    }
    this.onCloseModal();
    rerenderParentCallback();
    pageCallback("admin");*/
  }

  openDeletePopupView() {
    console.log("DeletePopupView");
    this.props.supprimer("Supprimer")
    //this.onOpenModal();
  }

  openRulesView() {
    //console.log("RulesPageView");
  }
  

  render() {
    const { openModal, dropdownOpen, LiferayImgPath } = this.state;
    const { target, toggle } = this.props;
    return (
      <div>
        <Breakpoint medium down>
          <Dropdown
            direction="left"
            className="action-button"
            isOpen={dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle>
              <clay-icon spritemap={LiferayImgPath} symbol="plus"></clay-icon>
            </DropdownToggle>
            <DropdownMenu>
            {target === "Groovy" && (
                <DropdownItem onClick={() => this.openUpdateView()}>
                  <clay-icon
                    spritemap={LiferayImgPath}
                    symbol="view"
                  ></clay-icon>{" "}
                  &nbsp; Modifier
                </DropdownItem>
              )}
              {target === "XML" && (
                <DropdownItem onClick={() => this.openUpdateView()}>
                  <clay-icon
                    spritemap={LiferayImgPath}
                    symbol="view"
                  ></clay-icon>{" "}
                  &nbsp; Télécharger
                </DropdownItem>
              )}

            {target !== "Groovy" && target !== "XML" && (
              <DropdownItem onClick={() => this.openUpdateView()}>
                <clay-icon
                  spritemap={LiferayImgPath}
                  symbol="pencil"
                ></clay-icon>{" "}
                &nbsp; Modifier
              </DropdownItem>
               )}
              <DropdownItem onClick={() => this.openDeletePopupView()}>
                <clay-icon
                  spritemap={LiferayImgPath}
                  symbol="trash"
                ></clay-icon>{" "}
                &nbsp; Supprimer
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Breakpoint>
        <Breakpoint large up>
          <Dropdown
            className="action-button"
            isOpen={dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle>
             <AgiirIcon icon={"ic_settings"} /> 
            </DropdownToggle>
            <DropdownMenu>
            {target === "XML" && (
                <DropdownItem onClick={() => this.openUpdateView()}>
                <AgiirIcon icon={"ic_file_download"} />{" "}
                 <span>Télécharger</span>
                </DropdownItem>
              )}
            {target === "Groovy" && (
                <DropdownItem onClick={() => this.openUpdateView()}>
                  <clay-icon
                    spritemap={LiferayImgPath}
                    symbol="download"
                  ></clay-icon>{" "}
                  &nbsp; Importer
                </DropdownItem>
              )}

            {target !== "Groovy"  && target !== "XML"  && (
              <DropdownItem onClick={() => this.openUpdateView()}>
                <clay-icon
                  spritemap={LiferayImgPath}
                  symbol="pencil"
                ></clay-icon>{" "}
                &nbsp; Modifier
              </DropdownItem>
               )}
              <DropdownItem onClick={() => this.openDeletePopupView()}>
              <AgiirIcon icon={"ic_delete"} />{" "}
              <span>Supprimer</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Breakpoint>

        <Modal
          open={openModal}
          onClose={this.onCloseModal}
          center
          closeOnOverlayClick={false}
        >
          <div className="modal-header">
            <h2>Suppression</h2>
          </div>
          <p className="modal-message">
            Êtes-vous sûr de bien vouloir supprimer cet élément ?
          </p>
          <div>
            <Button onClick={() => this.onCloseModal()} color="primary">
              Annuler
            </Button>{" "}
            <Button
              className="action-button"
              onClick={() => this.deleteItem()}
              color="secondary"
            >
              Supprimer
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
