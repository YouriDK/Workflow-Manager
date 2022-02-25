import React from 'react';
import { Button,
	Modal,
	ModalHeader, 
	ModalBody, 
	ModalFooter,
	Form, 
	FormGroup, 
	Label,
	Table, 
    Input } from 'reactstrap';
import Condition from '../ElementWorkflow/Condition'
const liferayIconPath = Liferay.ThemeDisplay.getPathThemeImages() + "/lexicon/icons.svg"
/*import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';*/

class ModalCondition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {	this.setState(prevState => ({	modal: !prevState.modal	}));	}
	
	Validation(){
		console.log("On monte La condition");
		var ConditionName = document.getElementById('ConditionName').value
		var Conditionlangage = document.getElementById('ScriptSelect').value
		var ConditionSript =  document.getElementById('ConditionScript').value
		var Cond = new Condition(ConditionName, "groovy","groovy")
		this.props.Intel(Cond)
	}

	render() {	// Comment faire monter Parent
	
    return (
      <div>
		<Modal 	id="" 
				isOpen={this.props.isOpen} 
				toggle={this.toggle} 
				className="agiir-workflow-modals"
				id="agiir-workflow-modals-condition"  
		>
			<ModalHeader toggle={this.props.toggle} >Ajout d'un noeud Condition</ModalHeader>
			<ModalBody >
				<Form>
					<FormGroup id="NotificationForm">
					
					<div className="agiir-block-input">
						<Label className="FormUser" >Nom de la condition :  </Label>
						<Input  className="agiir-workflow-input"
								type="text"
								id="ConditionName" 
								placeholder="Inserer le nom de la condition" />
					</div>
					<div  className="agiir-block-input">
						<Label className="FormUser" >Description de la condition : </Label>
						<Input  className="agiir-workflow-input"
								type="textarea"
								id="ConditionDescription" 
								placeholder="Inserer le nom de la condition" />
					</div>
					
						
					
					<div className="agiir-block-input">
						<Label className="FormUser" >Condition :</Label>
						<div className="agiir-block-condtion-create" >
						
						<Input className="agiir-workflow-text"
								type="select"
								id="condition-type"	>
							<option  key={2} value="OR" >ET</option>
							<option  key={3} value="AND" >OU</option>
						</Input>
						
						<Input className="agiir-workflow-text"
									type="select"
									id="condition-out"	>
								<option  key={2} value="OR" >Noeud 1</option>
								<option  key={3} value="AND" >Noeud 2</option>
						</Input>
						<Button id="button-add" color="success" >
						<clay-icon spritemap={liferayIconPath} symbol={"plus"}></clay-icon>{'  '}Ajouter</Button>
						</div>
						<div className = "Condition-Box">
							<Input className="agiir-workflow-text"
									type="select"
									id="condition-feild1"	>
								<option  key={2} value="OR" >Champs</option>
								<option  key={3} value="AND" >OU</option>
							</Input>
							<Input className="agiir-workflow-text"
									type="select"
									id="condition-type-Choice"	>
								<option  key={2} value="OR" >Condition</option>
								<option  key={3} value="AND" >Contient</option>
								<option  key={4} value="AND" >Ne contient pas</option>
								<option  key={5} value="AND" >Egal à</option>
								<option  key={6} value="AND" >Différent de</option>
								<option  key={7} value="AND" >Inférieur à</option>
								<option  key={8} value="AND" >Supérieur à</option>*
								<option  key={9} value="AND" >Commence par</option>
							</Input>
							<Input className="agiir-workflow-text"
									type="select"
									id="condition-feild2"	>
								<option  key={2} value="OR" >Champ</option>
								<option  key={3} value="AND" >Valeur text</option>
								<option  key={3} value="AND" >Valeur numérique</option>
							</Input>
							<Input className="agiir-workflow-text"
									type="select"
									id="condition-feild2"	>
								<option  key={2} value="OR" >Champs</option>
								<option  key={3} value="AND" >OU</option>
							</Input>
				
						</div>
					</div>
						<Table className='agiir-table-condition'>
							<thead>
								<tr>
									<th>Sélection</th>
									<th>Champ</th>
									<th>Condition</th>
									<th>Element</th>
								</tr>
							</thead>
							<tbody>
								<tr key ={88}>
									<td><Button color="secondary" >
										<clay-icon spritemap={liferayIconPath} symbol={"trash"}></clay-icon>{'  '}Supprimer</Button></td>
									<td>{"Nom"}</td>
									<td>{"EGAL A"}</td>
									<td>{"PRENOM"}</td>
								</tr>
							</tbody>
						</Table>
						<div className="Condtion-out-box">
							<div>
							<Label className="FormUser" > Noeud 1 : </Label>
							<Input  className="agiir-workflow-input"
									id="nodeYes" 
									placeholder="Nom du noeud" />
							</div>
							<div>
							<Label className="FormUser" > Noeud 2 : </Label>
							<Input  className="agiir-workflow-input"
									id="nodeNo" 
									placeholder="Nom du noeud" />
							</div>
						</div>




					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="success" onClick={() => this.Validation() }>Creer</Button>{' '} 
				<Button color="danger" onClick={this.props.toggle}>Annuler</Button>
			</ModalFooter>
		</Modal>
      </div>
    );
  }
}

export default ModalCondition;