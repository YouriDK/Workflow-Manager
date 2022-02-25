import React from 'react';
import { Button } from 'reactstrap';

class Palette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    onButtonClick(id) { this.props.callback(id) }

    render() {
        return ( 
        <div>   
          <Button id="palette-boutons" color="secondary" onClick={(id) => this.onButtonClick("task")  }>Tache</Button>   
          <Button id="palette-boutons" color="secondary" hidden={true} >Condition</Button>
          <Button id="palette-boutons" color="secondary" onClick={(id) => this.onButtonClick("State")  }>Etat</Button>
          <Button id="palette-boutons" color="secondary" onClick={(id) => this.onButtonClick("Validation")  }>Validation</Button>
          <Button id="palette-boutons" color="secondary" onClick={(id) => this.onButtonClick("Yes")  }>Accepter</Button>
          <Button id="palette-boutons" color="secondary" onClick={(id) => this.onButtonClick("No")  }>Refuser</Button>
        </div>
        )
    }
}
export default Palette