import React from "react";
import HomePage from "./pages/HomePage";


const INITIAL_STATE = {
  currentPage: "page",
  params: null,
  themesPostUser: [],
  defaultThemeId: null
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //new state
    INITIAL_STATE,

    //old state
    currentPage: "home",
    activeTab : '1',
    params: null,
    };

    
  }

  changePage(page, params, theme) {
    if (params != null) {
      this.setState({
        currentPage: page,
        params: params,
        defaultThemeId: null
      });
      /* if(theme !=null)
	  {
    	  this.setState({ theme: params });
	  }*/
    } else {
      this.setState({ currentPage: page, defaultThemeId: null });
    }
    window.scrollTo(0, 0); // return to top page
  }

  componentDidMount() {
  }

  /*renderPage() {
    switch(this.state.currentPage) {
      
      case "home":
        return (
          <HomePage
            pageCallback={(page, params) => this.changePage(page, params)}
            themeId={this.state.defaultThemeId}
          />
        );
      case "back" :
        return (
          <div className="page">
                <h2>
                  Hello Webpack
                </h2> 
          </div>
        );

        
    }
  } */
  
  render() {
		return (
		    <div className="App">
          <HomePage
            pageCallback={(page, params) => this.changePage(page, params)}
            themeId={this.state.defaultThemeId}
          />
		     </div>
		);
	}
}

export default App;
