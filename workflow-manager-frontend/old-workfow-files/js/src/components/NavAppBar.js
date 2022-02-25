import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import classnames from "classnames";

class NavAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      categoryList: [],
      dropdownOpen: false,
      activeTab: "all",
      LiferayImgPath:
        Liferay.ThemeDisplay.getPathThemeImages() + "/lexicon/icons.svg",
      isMbDropdownOpen: false,
      modal: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleView(tab, params) {
    const { viewChange } = this.props;
    if (params != null) {
      viewChange(tab, params);
    } else {
      viewChange(tab);
    }
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }

    //console.log(this.state.activeTab)
  }

  stopRedirect(e) {
    //console.log("stopRedirect");
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  toggleMobileDropdown() {
    this.setState({
      isMbDropdownOpen: this.state.isMbDropdownOpen ? false : true
    });
  }

  render() {
    const {
      categoryList,
      activeTab,
      isMbDropdownOpen,
      LiferayImgPath
    } = this.state;
    const { type, validator, post, pageCallback } = this.props;

    //console.log(categoryList);
    return (
      <div className="responsive-container nav-block">
        {type === "desktop" ? (
          <Nav tabs className="custom-nav col-8">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "design"
                })}
                onClick={() => {
                  this.toggleView("design");
                }}
                id="design"
              >
                Conception
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "xml"
                })}
                onClick={() => {
                  this.toggleView("xml");
                }}
                id="xml"
              >
                Workflows
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "groovy"
                })}
                onClick={() => {
                  this.toggleView("groovy");
                }}
                id="groovy"
              >
                Actions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "help"
                })}
                onClick={() => {
                  this.toggleView("help");
                }}
                id="help"
              >
                Aide
              </NavLink>
            </NavItem>
      
            
            {validator && (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "valid"
                  })}
                  onClick={() => {
                    this.toggleView("valid");
                  }}
                >
                  Annonces à valider
                </NavLink>
              </NavItem>
            )}
          </Nav>
        ) : (
          <Dropdown
            className="agiir-app-mobile-nav-dropdown"
            isOpen={isMbDropdownOpen}
            toggle={() => this.toggleMobileDropdown()}
          >
            <DropdownToggle>
              <span>
                {activeTab === "all"
                  ? "Toutes les annonces"
                  : "Suivre mes annonces"}
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  this.toggleView("all");
                }}
                className={classnames({
                  active: activeTab === "all"
                })}
              >
                Acceuil
              </DropdownItem>
             
              {validator && (
                <DropdownItem
                  className={classnames({ active: activeTab === "valid" })}
                  onClick={() => {
                    this.toggleView("valid");
                  }}
                  id="valid"
                >
                  Annonces à valider
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    );
  }
}

export default NavAppBar;
