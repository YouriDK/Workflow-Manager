import React from 'react';
import { Button,
	Modal,
	ModalHeader, 
	ModalBody, 
	ModalFooter,
	Form, 
	FormGroup, 
	Label, 
	Input } from 'reactstrap';

import { actionTimer  }  from '../../components/ElementWF'
import * as ressourceActions from "../../actions/RessourceAction";
var element = {};



class ModalActionTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  CodeGroovyFill :[],
	 
	  
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() { this.setState(prevState => ({ modal: !prevState.modal }));
    
}

	async componentDidMount(){
		let obj = await ressourceActions.getAllGroovy()
		this.setState({ CodeGroovyFill :  obj })
	}

	fillListScript(){
		var array = []
		this.state.CodeGroovyFill.map((element) => {
			array.push( <option key={element.groovyId}   value={element.groovyId}>{element.nom}</option> )	
		})
		return array
	}


	Validation(){
		var ActionName = document.getElementById('ActionTimerName').value
		var ActionDescription = document.getElementById('ActionTimerDescription').value
		var CodeID =document.getElementById('actionTimerScript').value
		var Slangage = document.getElementById('ScriptTimerSelect').value
		
		var notId = Math.floor(Math.random() * 100)
		var scriptID = notId
		
		var ActionsTimer = new actionTimer(ActionName, ActionDescription,CodeID, Slangage,notId,scriptID,"Actions")
		if(this.props.elementTimer !=null ){ ActionsTimer.ID = this.props.elementTimer.ID}
		
	
		this.props.ActTimer(ActionsTimer)
		
	}

	fillModalAct(section){
		if(this.toggle){
			//console.log(this.props.elementAction)
			if (this.props.elementTimer != null) {
				element = this.props.elementTimer

				switch(section){
					case 'titre':
						return element.name	
					case 'description' :
						return element.description
					case'lang':
						return element.Script_langage
					case'script':
						return element.script
					case'type':
						if(element.Ex_Type === "onEntry") { return "En entrée " }
						if(element.Ex_Type === "onExit") { return "En sortie" }
						if(element.Ex_Type === "onAssignment") { return "A l'assignation" }
					case "Script":
						return element.script
					case'script_id':
						return element.scriptID
					case 'script_name': 	
						return element.script_name



				}
			} else {
				switch(section){
					case 'titre':
						return "Insérer le titre de l'action"
					case'description':
						return "Insérer la description de l'action"
					case'lang' :
						return "Choisir le langage du script"
					case'script_name':
						return 'Choisir le script'
					case 'type' :
						return "Choisir type d'activation"
					case'script_id' :
						return 1
					case "Script":
						return "Insérer le script"

			}
		}
	}
}////*name="selectMulti" */

  render() {
    return (
      <div>
		<Modal 	
			centered = {true}
			size ="lg"
			scrollable={true}
			className="agiir-workflow-modals"
			isOpen={this.props.isOpen} 
			toggle={this.toggle}>
				
			<ModalHeader toggle={this.props.toggle} >
			<Label className="modal-titre" >Ajout d'une action au Timer</Label></ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<div className="agiir-block-input">
							<Label className="FormUser">Nom de l'action :</Label>
							<Input  id="ActionTimerName"
									type="text"
									className="agiir-workflow-input" 
									defaultValue={this.fillModalAct("titre")}/>
						</div>
						<div className="agiir-block-input">
							<Label className="FormUser">Description de l'action :</Label>
							<Input id="ActionTimerDescription" 
									type="text"
									className="agiir-workflow-input"
									defaultValue={this.fillModalAct("description")}/>
						</div>
						<div className="agiir-block-input">
							<Label className="FormUser">Langage du script :</Label>
							<Input type="select" 
									name="select" 
									id="ScriptTimerSelect" 
									className="agiir-workflow-input">
								<option value={this.fillModalAct("lang")} >{this.fillModalAct("lang")}</option>
								<option value="groovy" >groovy</option>
								<option disabled value="beanshell" >beanshell</option>
								<option disabled value="drl" >drl</option>
								<option disabled value ="javascript">javascript</option>
								<option disabled value="python" >python</option>
								<option disabled value="ruby">ruby</option>
							</Input>
						</div>
						<div className="agiir-block-input">
							<Label for="ConditionCreate">Script</Label>
							<Input type="select" 
									name="selectMulti"
									id="actionTimerScript"
									className="agiir-workflow-input">
								<option value='0' >Choisir le script</option>				
								{this.fillListScript()}										
							</Input>
						</div>			
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="success" onClick={()=> this.Validation()}  >Creer</Button>{' '}
				<Button color="danger" onClick={this.props.toggle}>Annuler</Button>
			</ModalFooter>
		</Modal>

      </div>
    );	
	}
}

export default ModalActionTimer;