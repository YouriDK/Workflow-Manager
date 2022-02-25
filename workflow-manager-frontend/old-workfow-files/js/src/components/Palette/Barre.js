import React from 'react';
import { Button,Tooltip } from 'reactstrap';
import { AgiirIconDropDown } from '../../utils/AgiirIcons'

class Barre extends React.Component {
    constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.toggle1 = this.toggle1.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.toggle5 = this.toggle5.bind(this);
		this.toggle6 = this.toggle6.bind(this);
		this.toggle9 = this.toggle9.bind(this);
		this.toggle10 = this.toggle10.bind(this);

        this.state = {

			tooltipOpen: false,
            tooltipOpen1 : false,
            tooltipOpen2 : false,
            tooltipOpen3 : false,
			tooltipOpen4 : false,
			tooltipOpen5 : false,
			tooltipOpen6 : false,
			tooltipOpen7 : false,
			tooltipOpen8 : false,
			tooltipOpen9 : false,
			tooltipOpen10 : false,
			disabled :false,

			Saving : "Non",
			ID : this.props.ID,
      
         

    
        }
	}
	
	toggle() { this.setState({ tooltipOpen: !this.state.tooltipOpen }); }
    toggle1() { this.setState({ tooltipOpen1: !this.state.tooltipOpen1 }); }
    toggle2() { this.setState({ tooltipOpen2: !this.state.tooltipOpen2 }); }
	toggle5() { this.setState({ tooltipOpen5: !this.state.tooltipOpen5 }); }
	toggle6() { this.setState({ tooltipOpen6: !this.state.tooltipOpen6 }); }
	toggle9() { this.setState({ tooltipOpen9: !this.state.tooltipOpen9 }); }
	toggle10() { this.setState({ tooltipOpen10: !this.state.tooltipOpen10 }); }


    onButtonClick(id) {
		switch (id){
			case "Zoom" : this.props.Choix("Zoom");
			break;
			case "starOver" : this.props.Choix("starOver");
			break;
			case "notifications" :  this.props.Choix("notifications");
			break;
			case "actions" :  this.props.Choix("actions");
			break;
			case "plus" :  this.props.Choix("plus");
			break;
			case "moins" :  this.props.Choix("moins");
			break;

		default : console.log("onButtonClick - barre " +id )
		}
	}


    render() {
        return (
            <div >
				<div className="agiir-wf-barre">
					<Button active className="barre-buttons" id="starOver" color="primary" onClick={() => this.onButtonClick("starOver")}> <AgiirIconDropDown icon={"ic_settings_backup_restore"} />   </Button>
					<Button active className="barre-buttons" id="Zoom" color="primary" onClick={() => this.onButtonClick("Zoom")}> <AgiirIconDropDown icon={"ic_search"} /> </Button> 
					<Button active className="barre-buttons" id="moins" color="primary" onClick={() => this.onButtonClick("moins")}>  <AgiirIconDropDown icon={"ic_zoom_out"} />   </Button>
					<Button active className="barre-buttons" id="plus" color="primary" onClick={() => this.onButtonClick("plus")}> <AgiirIconDropDown icon={"ic_zoom_in"} />   </Button>  
					<Button active className="barre-buttons" id="notifications" color="primary" onClick={() => this.onButtonClick("notifications")}> <AgiirIconDropDown icon={"ic_add_alert"} />  </Button>  
					<Button active className="barre-buttons" id="actions" color="primary" onClick={() => this.onButtonClick("actions")}> <AgiirIconDropDown icon={"ic_assignment"} /> </Button>  
		
				</div>
				<Tooltip placement="top" isOpen={this.state.tooltipOpen1} target="starOver" toggle={this.toggle1}>Recommencer	</Tooltip>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen2} target="Zoom" toggle={this.toggle2}>Ajuster</Tooltip>
				<Tooltip placement="top" isOpen={this.state.tooltipOpen5} target="notifications" toggle={this.toggle5}>Notifications</Tooltip>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen6} target="actions" toggle={this.toggle6}>Actions</Tooltip>
				<Tooltip placement="bottom" isOpen={this.state.tooltipOpen9} target="plus" toggle={this.toggle9}>Zoom plus</Tooltip>
				<Tooltip placement="top" isOpen={this.state.tooltipOpen10} target="moins" toggle={this.toggle10}>Zoom moins</Tooltip>
            </div>
          )
    }
}

export default Barre;
