import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import * as headerConfigActions from "../actions/HeaderConfigAction";
import HeaderConfigStore from "./HeaderConfigStore";

export default class HeaderTextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: props.current
        ? props.current.headerTitle
          ? props.current.headerTitle
          : ""
        : "",
      headerSubTitle: props.current
        ? props.current.headerSubTitle
          ? props.current.headerSubTitle
          : ""
        : "",
      placeholder: props.current
        ? props.current.placeholder
          ? props.current.placeholder
          : ""
        : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Fonction qui permet de mettre à jour le state avec les valeurs saisies dans le form
  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  // Fonction à appeler pour valider et sauvgarder les modifications faites dans le form
  async handleSubmit() {
    const { current, formResponseCallback } = this.props;
    const { headerTitle, headerSubTitle, placeholder } = this.state;
    // Initailiser un object de Header Configuration
    let headerPageConfig = {
      // L'id de module (Expl: 'FAQ')
      moduleId: current.moduleId,
      // L'id de la page (Expl: 'FAQ-HM')
      pageId: current.pageId,
      // Le nom de la page (Expl: 'Home')
      pageName: current.pageName,
      // Le gros titre de Header de la page
      headerTitle: headerTitle,
      // Le sous-titre de Header de la page
      headerSubTitle: headerSubTitle,
      // placeholder
      placeholder: placeholder
    };
    // Vérifier si on a déja cette config danas la base :
    // Si oui => on ajoute l'id de config à notre object de Header Configuration intilialisé
    if (current && current.id) {
      headerPageConfig.id = current.id;
    }
    // console.log(headerPageConfig);
    // Appel WS pour modifier la config dans la base (si on l'a déja dans la BD)/ ajouter la config dans la base (si elle n'existe pas encore dans la BD)
    let response = headerPageConfig.id
      ? await headerConfigActions.updatePageHeaderConfig(headerPageConfig)
      : await headerConfigActions.addPageHeaderConfig(headerPageConfig);
    // Si erreur Serveur => Afficher l'erreur
    if (response != 201) {
      console.error(
        "ADD : Une erreur interne est survenue. Server returned '" + obj + "'"
      );
    }
    // Si l'appel WS a bien reussi
    else {
      // Mettre à jour la HeaderConfigStore
      HeaderConfigStore.setPageHeaderText(headerPageConfig);
      console.log("La config a bien été ajoutée", "success");
      // Appeler la fonction de callback pour synchroniser les textes affichés dans le header
      formResponseCallback();
    }
  }

  render() {
    const { headerTitle, headerSubTitle, placeholder } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label for="themeName">Gros titre</Label>
          <Input
            type="text"
            name="headerTitle"
            id="headerTitle"
            value={headerTitle}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="themeDescription">Description</Label>
          <Input
            type="textarea"
            name="headerSubTitle"
            id="headerSubTitle"
            value={headerSubTitle}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="themeName">Placeholder de recherche</Label>
          <Input
            type="text"
            name="placeholder"
            id="placeholder"
            value={placeholder}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button
          onClick={() => {
            this.handleSubmit();
          }}
        >
          Sauvegarder
        </Button>
      </Form>
    );
  }
}
