import React from "react";
import { Alert, Container, Row } from "reactstrap";
import HeaderTextForm from "./HeaderTextForm";
import HeaderConfigStore from "./HeaderConfigStore";

export default class HeaderPageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initiliser la liste des configs pour les headers des pages
      pageList: HeaderConfigStore.getHeaderText(),
      // Initiliser la page courante par l'id de la page réçu en props
      activePage: props.pageId
    };
    // Bind de la fonction qui permet de choisir la page qu'on va modifier sa config de header
    this.changePage = this.changePage.bind(this);
  }

  // Fonction qui permet de choisir la page qu'on va modifier sa config de header
  changePage(pageId) {
    if (this.state.activePage != pageId) {
      this.setState({ activePage: pageId });
    } else {
      this.setState({ activePage: -1 });
    }
  }

  render() {
    const { activePage, pageList } = this.state;
    const { pageCallback, headerCallback, LiferayImgPath } = this.props;

    return (
      <div>
        <div className="modal-header">
          <h2>Gestion de bandeau d'entête</h2>
        </div>
        {pageList.length > 0 ? (
          <div>
            <div className="table-height">
              <Container className="table">
                <div>
                  {pageList.map((value, index) => {
                    return (
                      <div key={index}>
                        <Row
                          className="tr theme-click"
                          onClick={() => this.changePage(value.pageId)}
                        >
                          {activePage != -1 && activePage == value.pageId ? (
                            <clay-icon
                              class="arrow-icon"
                              spritemap={LiferayImgPath}
                              symbol="angle-down"
                              onClick={() => this.changePage(value.pageId)}
                            ></clay-icon>
                          ) : (
                            <clay-icon
                              class="arrow-icon"
                              spritemap={LiferayImgPath}
                              symbol="angle-right"
                              onClick={() => this.changePage(value.pageId)}
                            ></clay-icon>
                          )}
                          &nbsp;&nbsp; {value.pageName}
                        </Row>
                        {activePage != -1 && activePage == value.pageId && (
                          <HeaderTextForm
                            current={value}
                            pageCallback={pageCallback}
                            formResponseCallback={headerCallback}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Container>
            </div>
          </div>
        ) : (
          <Alert color="info" className="no-app-alert">
            Pas de configuration de header dans l'interface
          </Alert>
        )}
      </div>
    );
  }
}
