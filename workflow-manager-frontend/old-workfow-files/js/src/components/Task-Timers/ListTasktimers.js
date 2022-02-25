import React from 'react';
import Modal from "react-responsive-modal";
import { Button,Table,} from 'reactstrap';
import Tasktimers from '../Task-Timers/Tasktimers'
import { AgiirIcon } from '../../utils/AgiirIcons'
import ActionButton from '../../components/ActionButtons'




class ListTasktimers extends React.Component {
  constructor(props) {
	  
    super(props);
    this.state = {
	  modal: false,
	  modalTimer : false,
	  modalActTimer :false,
	  elementTimer: null,
    };

	this.toggle = this.toggle.bind(this);
	
  }

  /*componentWillReceiveProps(nextProps){
	this.setState({ NotifListe : this.FillTableNotifications()  })
}*/



	toggle() {	this.setState(prevState => ({	modal: !prevState.modal	}));	}
	toggleActTimer() { this.setState(prevState => ({	modalActTimer: !prevState.modalActTimer	})); }
	Validation(){	this.toggle()	}

	onButtonClick(id){
		switch (id){
			case "done" :
				this.props.toggle();
				break;
			case "add" :
				this.setState({ elementTimer : null })
				this.toggleActTimer()
				break;

			case "delete" :
				if(this.props.elementTache !=  null){
					this.props.elementTache.TaskTimer.forEach( element => { 	
					if( (document.getElementById(element.ID).checked) ) {
						this.props.DeleteTimer(element)
						//console.log("Suppresion Timer : " + element.ID)
					}
				})	
			}
				break;
			case "modifier":
				if(this.props.elementTache !=  null){
					this.props.elementTache.TaskTimer.forEach( element => { 	
					if( (document.getElementById(element.ID).checked) ) {
						this.setState({ elementTimer : element })
						this.toggleActTimer()
						//console.log("Suppresion Timer : " + element.ID)
					}
				})	
			}
				break;
			
			/*case "cus-mail":
				this.props.Add("cus-mail");
				break;*/
					
		default : 
		console.log("Error onButtonCLick ListTaskTimer - : " + id)
		}
	}

	getActTimer(ActTimer){
		console.log("On remonte de tasktimer vers task")
		this.props.ActTimer(ActTimer)
		this.toggleActTimer()
	}
	deleteTimerElement(id){
		if(this.props.elementTache !=  null){
			this.props.elementTache.TaskTimer.forEach( element => { 	
			if( element.ID === id ) {
				this.props.DeleteTimer(element)
			}
		})	
		}
	}

	modifyTimerElement(id){
		if(this.props.elementTache !=  null){
			this.props.elementTache.TaskTimer.forEach( element => { 	
				if( element.ID === id ) {
				this.setState({ elementTimer : element })
				this.toggleActTimer()
				//console.log("Suppresion Timer : " + element.ID)
			}
		})	
		}
	}

	FillTableTimers(){
		var array = [];
		if (this.props.elementTache != null ){
			var not = null
			var freq = null
			if( this.props.elementTache.TaskTimer.length > 0 ) {
				this.props.elementTache.TaskTimer.map((element) => {
					switch(element.dscale){
						case "second" : 
							not = "Secondes"
							break;
						case "minute" :  
							not = "Minutes"
							break;
						case "hour" :  
							not = "Heures"
							break;
						case "day" :  
							not = "Jours"
							break;
						case "week" :  
							not = "Semaines"
							break;
						case "month" :  
							not = "Mois"
							break;
						case "year" :  
							not = "Annees"
							break;
					}
					switch(element.rscale){
						case "second" : 
						freq = "Secondes"
							break;
						case "minute" :  
						freq = "Minutes"
							break;
						case "hour" :  
						freq = "Heures"
							break;
						case "day" :  
						freq = "Jours"
							break;
						case "week" :  
						freq = "Semaines"
							break;
						case "month" :  
						freq = "Mois"
							break;
						case "year" :  
						freq = "Annees"
							break;
						default : 	
						freq = " "; break;

					}
					array.push(
						<tr key = {element.ID}>
							<td style={{ textAlign : "left"}} >{element.name}</td>
							<td style={{ textAlign : "left"}} >{element.dduration + " " + not }</td>
							<td style={{ textAlign : "left"}} >{element.rduration + " " + freq }</td>
							
						<td>
						<ActionButton
                            id={element.ID}
                            modifier = { modifier => this.modifyTimerElement(element.ID) }
                            supprimer = { supprimer => this.deleteTimerElement(element.ID) }
                            target="notifications"
                        />

						</td>
						</tr>
					)
				})
			}
	}
		return array;	
	}

	render() {		
		return (
			<div>
			<Modal 	
			open={this.props.isOpen}
			onClose={() => this.props.close()}
			classNames={{ modal: "agiir-modal" }}
			center
			closeOnOverlayClick={false}>

		
				<div className="modal-header">
					<h2 >Liste de rappel</h2>
				</div>
					
			
				<div>
					<Table hover striped bordered id='AffAct'>
						<thead>
							<tr hidden={ this.props.elementTache.TaskTimer.length > 0 ? false : true } >
								<th>Nom</th>
								<th>Durée</th>
								<th>Fréquence</th>
								
								<th style={{ textAlign : "center"}} >Actions</th>
							</tr>
						</thead>
						<tbody>{this.FillTableTimers()}</tbody>  
					</Table>
				</div>
				<div className="modal-footer-buttons" >
				<Button 
					active 
					id="Label"
					color="primary"
					onClick={() => this.props.close()}>
						
					<AgiirIcon icon={"ic_close"} />{" "}
					<span>Fermer</span>
				</Button>
				{" "}
				<Button 
					active 
					id="Label"
					color="secondary"
					onClick={() => this.onButtonClick("add")}>
						
					<AgiirIcon icon={"ic_add"} />{" "}
					<span>Ajouter un rappel</span>
				</Button>
				</div>
			</Modal>			
			<Tasktimers
				elementTimer = {this.state.elementTimer}
				open={this.state.modalActTimer}
				toggle={() => this.toggleActTimer()}
				ActTimer={ ActTimer => this.getActTimer(ActTimer)}/>
			</div>


		);
  }
}
export default ListTasktimers;