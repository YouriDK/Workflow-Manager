import React from "react";
import { ListGroup, ListGroupItem, Alert } from "reactstrap";
import AgiirUtil from "../utils/AgiirUtil/AgiirUtil";

export default class SearchQuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsList: []
    };

    this.openRessourcePage = this.openRessourcePage.bind(this);
  }

  componentDidMount() {
    //console.log(this.props.keyword);
    //console.log(this.props.themesList);
    AgiirUtil.getInstance()
      .search(this.props.themesList, this.props.keyword)
      .then(json => {
        //console.log("got this search result", json);
        let list = json.map(res => res._source);
        this.setState({ resultsList: list });
      });
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.keyword);
    //console.log(nextProps.themesList);
    AgiirUtil.getInstance()
      .search(nextProps.themesList, nextProps.keyword)
      .then(json => {
        // console.log("got this search result", json);
        let list = json.map(res => res._source);
        this.setState({ resultsList: list });
      });
  }

  // Fonction qui permet de rediriger l'user vers la page de ressource
  openRessourcePage = ressource => {
    const { pageCallback, reset } = this.props;
    pageCallback("ressource-detail", ressource);
    reset();
  };

  render() {
    const { resultsList } = this.state;
    return (
      <div className="responsive-container">
        {resultsList.length > 0 ? (
          <ListGroup>
            {resultsList.map((result, index) => (
              <ListGroupItem
                key={index}
                onClick={() => this.openRessourcePage(result)}
                action
              >
                {result.title}
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <Alert color="info" className="no-app-alert">
            Aucune résultat trouvée avec ces mots
          </Alert>
        )}
      </div>
    );
  }
}
