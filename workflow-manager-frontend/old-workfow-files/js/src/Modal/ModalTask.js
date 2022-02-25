import React from 'react';
import * as ressourceActions from "../actions/RessourceAction";
import { Task ,Role }  from '../components/ElementWF'
import ListTasktimers from '../components/Task-Timers/ListTasktimers';
import { AgiirIcon , AgiirIconDropDown} from '../utils/AgiirIcons'
import Modal from "react-responsive-modal";
import AlertUtil from "../utils/AgiirUtil/AlertUtil"

import { 
	Button,
	Form, 
	FormGroup, 
	Label,
	Collapse,
	Input,
	Jumbotron,
	Container, 
	Table} from 'reactstrap';

var element = {}
var Use = new Task('To define')
var Control = 0 ;
var Try = 0;;

class ModalTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			tache : Use,
			modal: false,
			Choice1 :false,
			Choice2 :false,
			Choice3 :false,
			Choice4 :false,
			Choice5 :false,
			Choice6 :false,
			collapse: false,
			Pick1 : false,
			Pick2 : false,
			Pick3 :false,
			ActiveChoice : '' ,
			ListUsers : [],
			modalTimer : false,
			userNameFill : [],
			CodeGroovyFill : [],
			userRolesFill : [],

			nomTache : props.nodeModif != null ? props.elementAction.name : "" ,
			taskList :  props.nodeModif != null ? props.elementAction.Choix : "", 
    };

		this.toggle = this.toggle.bind(this);
		this.handleClick = this.handleClick.bind(this)// Pour remettre le modal à zéro
		this.handleChange = this.handleChange.bind(this);
  }

  	toggle() {this.setState(prevState => ({	modal: !prevState.modal	}));	}
	toggle1() { this.setState(state => ({ Choice1: !state.Choice1 }));	}
	toggle2() { this.setState(state => ({ Choice2: !state.Choice2 }));	}
	toggle3() { this.setState(state => ({ Choice3: !state.Choice3 }));	}
	toggle4() { this.setState(state => ({ Choice4: !state.Choice4 }));	}
	toggle5() { this.setState(state => ({ Choice5: !state.Choice5 }));	}
	toggle6() { this.setState(state => ({ Choice6: !state.Choice6 }));	}
	toggle7(K) { this.setState(state => ({ Pick1: K }));	}
	toggle8(K) { this.setState(state => ({ Pick2: K }));	}
	toggle9(K) { this.setState(state => ({ Pick3: K }));	}
	toggleTimer() {this.setState(prevState => ({	modalTimer: !prevState.modalTimer	}));	}
	

	handleChange(e) {
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change);
		switch(e.target.value)
		{
			case 'B':
				this.setState({ Choice2 : true})
				break;

			case 'D' : 
				this.setState({ Choice4 : true })
				break;

			case 'E' : 
				this.setState({ Choice5 : true })
				break;
		}
	 
	  }

	async componentDidMount(){
		let obj = await ressourceActions.getAllGroovy()
		this.setState({ CodeGroovyFill :  obj })

		let obj2 = await ressourceActions.getAllUsernames()
		this.setState({ userNameFill :  obj2 })

		let obj3 = await ressourceActions.getAllRoles()
		this.setState({ userRolesFill :  obj3 })
	}
	
	componentWillReceiveProps(nextProps){ 
		const { nomTache , taskList } = this.state
		//{this.props.nodeModif ? (this.props.nodeModif.Choix === 'B' ) : 
		////console.log("willreceiveprops - Modal task");
		////console.log("WILL" , this.state.nomTache)
        this.setState({
		nomTache : nextProps.nodeModif != null ? props.elementAction.name : "" ,
	    taskList :  nextProps.nodeModif != null ? props.elementAction.Choix : "", 
		})
		if (nextProps.nodeModif != null)
		{
			////console.log("willreceiveprops - PROPS");
			nextProps.nodeModif.roles.map((e) =>{
				Use.roles.push(e)
			})
			////console.log("CHOIX - ", nextProps.nodeModif.Choix )
			Use.Choix = nextProps.nodeModif.Choix 
			this.setState({ ActiveChoice : nextProps.nodeModif.Choix  })

			switch(nextProps.nodeModif.Choix)
			{
				case 'B':
					this.setState({ Choice2 : true})
					break;

				case 'D' : 
					this.setState({ Choice4 : true })
					break;

				case 'E' : 
					this.setState({ Choice5 : true })
					break;
			}
		} 

	}
	NextStep(e){
		
		this.Reboot()
		if(this.props.nodeModif != null ){
			if(Control === 0){
			  //console.log("componentWillReceiveProps -  ModalTask")
			  Use = this.props.nodeModif
			  Control++ 
			}
		}
		this.forceUpdate() 
		switch(e){
			case 'A' :
				this.setState({ActiveChoice : e })
				this.toggle1()
				break;
			case 'B' :
				
				this.toggle2()
				this.setState({ActiveChoice : e })
				break;
			case 'C' :
				this.toggle3()
				this.setState({ActiveChoice : e })
				break;
			case 'D' :
				this.toggle4()
				this.setState({ActiveChoice : e })
				break;
			case 'E' :
				this.toggle5()
				this.setState({ActiveChoice : e })
				break;
			case 'F' :
				this.toggle6()
				this.setState({ActiveChoice : e })
				break;
			default:
				//console.log("Rater")
				//console.log(e)
				//this.Reboot()
				this.setState({ActiveChoice : e })
				break;
		}
	}

	GetRole(){// Il faudra rajouter des condition si c'est vide ou autre
		var Role1 = document.getElementById('RoleName').value
		var Role2 = document.getElementById('RoleType').value
		var Role3 = Math.floor(Math.random() * 100)
		var RoletoAdd = new Role(Role1,Role2,Role3)
		if (document.getElementById("AutoC").checked){	RoletoAdd.autocreate = true }
		Use.roles.push(RoletoAdd)
		this.forceUpdate();// Ceci va actualiser le tableau après l'ajout afficher le nouveau venu
	}

	Reboot(){ // pour remettre à zéro quand on retourne en arrière
		if (this.state.Choice1) { this.toggle1()}
		if (this.state.Choice2) { this.toggle2()}
		if (this.state.Choice3) { this.toggle3()}
		if (this.state.Choice4) { this.toggle4()}
		if (this.state.Choice5) { this.toggle5()}
		if (this.state.Choice6) { this.toggle6()}
	}

	letDeleteTimer(DeleteTimer){
		Use.TaskTimer.forEach((element) => {
			if(element.ID === DeleteTimer.ID){
			var place =  Use.TaskTimer.indexOf(element)
			Use.TaskTimer.splice( place , 1)
			this.setState({ tache : Use })
			this.forceUpdate()
			}
		})

		
	}

	GetRessources(){
		var GetRS = document.getElementById("RAName").value
		alert( "Ressources actions Ajoutés => Nom : " + GetRS)
		Use.RessourcesActions.push(GetRS)

	}
  	handleChange5(e) {
		this.toggle7(e.target.checked)
		this.toggle8(!e.target.checked)
		this.toggle9(!e.target.checked)
	}
	handleChange1(e) {
		this.toggle7(!e.target.checked)
		this.toggle8(e.target.checked)
		this.toggle9(!e.target.checked)
	}
	handleChange2(e) {
		this.toggle7(!e.target.checked)
		this.toggle8(!e.target.checked)
		this.toggle9(e.target.checked)
	}

	handleClick(){
		Use = new Task('To define')
		Try = 1
		Control = 0
		this.Reboot()
		this.setState({ tache : Use })
		this.props.close()
		this.forceUpdate()
  	}

	getRoles(){
		const { nodeModif } = this.props
		var array = []
		//On récupère la liste de role du props pour pouvoir modifier ou autre

		Use.roles.map((element) => {
				array.push(
					<tr key = {element.Roleid}>
						<td>{element.role}</td>
						<td>{element.name}</td>
						<td>
							<Button onClick={() => this.deleteRoles(element.Roleid)}>
								<AgiirIconDropDown icon={"ic_delete"}/>
							</Button>
						</td>
					</tr>
				)
			})
		return array;	
	}
	Validation(){	
		const {CodeGroovyFill , nomTache } = this.state;
		var check = 0;
		switch(this.state.ActiveChoice){
			case 'A' :
				//console.log(" Choix A  ")
				var TName = nomTache
				Use.name = TName
				Use.Choix = 'A'
				break;
			case 'B' :
				//console.log(" Choix B  : ")
				var TName = nomTache
				Use.name = TName
				Use.Choix = 'B'
				break;
			case 'C' :
				//console.log(" Choix C  : ")
				var TName = nomTache
				var TRoleID = document.getElementById('RoleID').value
				Use.name = TName
				//On nettoie les autres Champs
				Use.roles =[]
				Use.ScriptLangage = ''
				Use.Script =''
				Use.RoleID = ''
				Use.ScreenName =''
				Use.mailUser = ''
				Use.Scriptname = ''

				Use.RoleID = TRoleID
				Use.Choix = 'C'
				break;
			case 'D' :
				var code =null
				//console.log(" Choix D  : ")
				var TName = nomTache
				var Slangage = "groovy"
				var CodeID =document.getElementById('TaskScript').value
				CodeGroovyFill.map((element) =>{
					if(element.groovyId === CodeID){
						code = element
					}
				})
				if ( code === null) { 
					//console.log("Nous avons un code Null ! ")
					AlertUtil.alert("Vous n'avez pas sélectionné de script !" , "error") 
				}
				var ScriptDraft = code.codegroovy
				var ScriptName = code.nom 


				Use.roles =[]
				Use.ScriptLangage = ''
				Use.Script =''
				Use.RoleID = ''
				Use.ScreenName =''
				Use.mailUser = ''
				Use.Scriptname = ''
				
				Use.Scriptname = ScriptName
				Use.name = TName
				Use.ScriptLangage = Slangage
				Use.Script = ScriptDraft
				Use.Choix = 'D'
				break;
			case 'E' :
				//console.log(" Choix E  : ")

				Use.roles =[]
				Use.ScriptLangage = ''
				Use.Script =''
				Use.RoleID = ''
				Use.ScreenName =''
				Use.mailUser = ''
				Use.Scriptname = ''

				var TName = nomTache
				Use.name = TName
				/*if(this.state.Pick1) {
					Use.RoleID = document.getElementById('UserID').value
					Use.Dunno = '1'
				}*/
			
				Use.ScreenName = document.getElementById('ScreenName').value
				Use.Dunno = '2'
				/*if(this.state.Pick3){
						Use.mailUser =  document.getElementById('EmailUser').value
						Use.Dunno = '3'
				}*/
				Use.Choix='E'
				break;
			case 'F' :
				//console.log(" Choix F  : ")
				var TName = nomTache

				Use.roles =[]
				Use.ScriptLangage = ''
				Use.Script =''
				Use.RoleID = ''
				Use.ScreenName =''
				Use.mailUser = ''
				Use.Scriptname = ''

				Use.name = TName
				Use.Choix='F'
				break;
			default:
				this.props.error();
				check = 1 ;
				break;
		}
		
		if(this.props.nodeModif != null ) { Use.ID = this.props.nodeModif.ID }
		var New = Use
		if( check === 1 ) New = null
		//console.log("Task Up")
		//console.log(New)
		if( this.props.validationGroup === false )
		{
			//console.log("Tache")
			this.props.Intels(New)
		}
		else 
		{
			//console.log("Validation")
			this.props.IntelVal(New) 
		}
		
		
		Use = new Task("Indéfini")
		Try = 1
		Control = 0 
		this.setState({ ActiveChoice : '' })
		this.Reboot()
		this.props.close("tache")
		this.forceUpdate()		
	}

	deleteRoles(id){
		Use.roles.map((element) => {
			if (element.Roleid === id){	
				var place =  Use.roles.indexOf(element)
				Use.roles.splice( place , 1)
				this.forceUpdate();// Ceci va actualiser le tableau après l'ajout afficher le nouveau venu
				}
		})
	}

	getActTimer(ActTimer){
		Use.TaskTimer.forEach(element => {
			if (( element.ID === ActTimer.ID)  ){
				var place =  Use.TaskTimer.indexOf(element)
				Use.TaskTimer.splice( place , 1)
				
			}
		})
		Use.TaskTimer.push(ActTimer)
		this.setState({ tache : Use })
		this.forceUpdate()
	}

	fillListScript(){
		var array = []
		this.state.CodeGroovyFill.map((element) => {
			array.push( <option key={element.groovyId}   value={element.groovyId}>{element.nom}</option> )	
		})
		return array
	}
	fillListName(section){
		const {userNameFill} = this.state;
		var array = []
		switch(section){
			case "id" : 
			userNameFill.map((element) => {
				array.push( <option key={element.id} value={element.id}>{element.id}</option> )	
			})
			break;

			case "nom" :
			userNameFill.map((element) => {
				array.push(<option key={element.id} value={element.screenName}>{element.fullName}</option>)
			})
			break;

			case "email" :
			userNameFill.map((element) => {
				array.push( <option key={element.id} value={element.emailAddress}>{element.emailAddress}</option>)
			})
			break;
		}
		return array;
	}

	onButtonClick(id){
		switch(id){
			case 'delete': 
				this.deleteRoles()
				break;

			case 'recall' :
				this.toggleTimer()
				break;
			default:
				alert("En cours, patientez svp :) !")
		}
	}

	fillModalTask(section){
	if(this.toggle){
		if (this.props.nodeModif != null) {
			element = this.props.nodeModif
			switch(section){
				case 'titre':
					return element.name	
				case 'Role_ID' :
					return element.RoleID
				case'lang':
					return element.ScriptLangage
				case 'code_value' : 
					return element.Script
				case 'code_name' : 
					return element.Scriptname
				case 'user_id' :
					return element.RoleID
				case 'user_name' : 
					return element.ScreenName
				case 'user_mail' :
					return element.mailUser

				default :
					return "Champ Vide"
			}
		
		} else {
			switch(section){
				case 'titre':
					return "Insérer le titre de la tache"
				case 'Role_ID' :
					return 10000
				case'lang' :
					return "Choisir le langage du script"
				case 'code_value' : 
					return '0'
				case 'code_name' : 
					return " Selectionner Script"
				case 'user_id' :
					return "Insérer ID de l'utilisateur"
				case 'user_name' : 
					return "Choisir le nom de l'utilisateur"
				case 'user_mail' :
					return "Insérer addresse email de l'utilisateur"

				default :
					return "Champ Vide"

		}
	}
	}
	}



	render() {
		const  {open} = this.props;
		const { nomTache , taskList} = this.state;
    return (
	
      <div>
				
					<Modal
						open={open}
						onClose={() => this.props.close("close")}
						center
						classNames={{modal : "agiir-modal"}}
						closeOnOverlayClick={false}
						>
					
					<div className="modal-header modal-header-menu">
						<h2 >Ajout d'une tâche</h2>
						<Button 
							style={{ marginRight: "15px"}}
							active 
							id="Label"
							color="yellow"
							onClick={() => this.onButtonClick("recall")}>
							<AgiirIcon icon={"ic_hourglass_full"} />{" "}
							<span>Ajouter un rappel</span>
						</Button>
					</div>
					
					<div className="agiir-workflow-modals-task-body" >
						<Form>
							<FormGroup>
							<div className="agiir-block-input">
								<Label className="label-input" >Nom de la tache </Label>
								<Input  className="agiir-workflow-input"
										name="nomTache"
										id="nomTache" 
										value={nomTache}
										onChange={this.handleChange}/>
							</div>
							<div className="agiir-block-input">
								<Label for="TaskCreate" className="label-input" >Sélection de(s) validateur(s) </Label>
								<Input type="select"  
										className="agiir-workflow-input"
										onClick={(e) => {	this.NextStep(e.target.value);	}}
										name="taskList"
										id="taskList" 	
										onChange={this.handleChange} 
										value={taskList}>
									<option value='0' selected={taskList == '0' } >Choisir type de la tache(acteur(s))</option>
									<option hidden value='A'>Assigner au créateur</option>
									<option value='B' selected={taskList == 'B' }>Assigner à un ou plusieurs rôles</option>
									<option	hidden value='C'>Assigner à un rôle précis</option>
									<option value='D' selected={taskList == 'D' } >Assigner par un script</option>
									<option value='E'selected={taskList == 'E' } >Assigner à un utilisateur spécifique</option>
									<option hidden value='F'>Spécifier plusieurs actions ressources</option>
								</Input>
							</div>
							</FormGroup>
						</Form>
						<Collapse isOpen={this.state.Choice1}>
							<Jumbotron fluid className="agiir-workflow-input" >
								<Container fluid>
									<h4 id="text-jumbo"> Assignation au créateur du workflow </h4>
								</Container>
							</Jumbotron>
						</Collapse>
						<Collapse isOpen={this.state.Choice2}>
							<Form>
								<FormGroup >
									
										<div >
											<div className="agiir-block-input">
												<Input  type="select"  
														id="RoleName" 
														className="agiir-workflow-input">
													<option value='0'>Choisir le type de rôle</option>
													<option value='organization'>Organisation</option>
													<option value='regular'>Regulier</option>
													<option	value='site'>Site</option>
												</Input>
												<div hidden className="agiir-block-input" >
												<Input  type="checkbox" id="AutoC"/>
												<Label id="check-auto-task">Auto-Création</Label>
												</div>
											</div>
											
											<div className="agiir-block-input">
												<Input type="select" 
														name="selectMulti" 
														id="RoleType" 
														className="agiir-workflow-input">
													<option value='0'>Choisir le nom du role</option>				
													{this.state.userRolesFill.map((element) => {
															return <option key={element.classPK} value={element.name}>{element.name}</option>;	
														})}										
												</Input>
											</div>
											<div className="buttons-task-add-delete">
												
												<Button  
													id="Label"  
													onClick={(e) => {	this.GetRole() }}>
														<AgiirIconDropDown icon={"ic_add"}/>{' '}
														<span>Ajouter un rôle</span>
												</Button>
											</div>

											<div className="agiir-workflow-input">
												<Table className="agiir-workflow-input">
													<thead>
														<tr hidden={ Use.roles.length > 0 ? false : true }>
															
															<th>Type</th>
															<th>Nom</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														{this.getRoles()}
													</tbody>
												</Table>
											</div>

										</div>
								</FormGroup>
							</Form>
						</Collapse>
						<Collapse isOpen={this.state.Choice3}>
							<Form>
								<FormGroup id="NotificationForm">
								<div className="agiir-block-input">
									<Label for="ConditionCreate">Affecter à un rôle précis :</Label>
										<Input  
											className="label-input"
											type="number"
											id="RoleID" 
											className="agiir-workflow-input"											
											defaultValue={this.fillModalTask("Role_ID")}/>
								</div>
										
								</FormGroup>
							</Form>
						</Collapse>
							<Collapse isOpen={this.state.Choice4}>
								<Form>
									<FormGroup id="NotificationForm">
									<div hidden className="agiir-block-input">
										<Label for="ConditionCreate">Langage du script :</Label>
										<Input type="select" 
												name="select" 
												id="ScriptSelect" 
												className="agiir-workflow-input">
											<option value={this.fillModalTask("lang")} >{this.fillModalTask("lang")}</option>
											<option value="groovy" >groovy</option>
											<option disabled="beanshell" >beanshell</option>
											<option disabled value="drl" >drl</option>
											<option disabled value ="javascript ">javascript</option>
											<option disabled value="python" >python</option>
											<option disabled value="ruby ">ruby</option>
										</Input>
									</div>
									<div className="agiir-block-input">
										<Label className="label-input" >Script :</Label>
										<Input type="select" 
												name="selectMulti"
												id="TaskScript"
												className="agiir-workflow-input">
											<option value={this.fillModalTask("code_value")} >{this.fillModalTask("code_name")}</option>				
											{this.fillListScript()}									
										</Input>
									</div>
									</FormGroup>
								</Form>
							</Collapse>
							<Collapse isOpen={this.state.Choice5}>
								<Form name="PickScpecific">
								
									<FormGroup >
									<div className="agiir-block-input" hidden>
									<Label for="ConditionCreate">Affecter à un utilisateur spécifique :</Label>
										<Label check > 
											<Input 
												className="label-input" 
												type="radio" 
												name="Pick"  
												id="Choix1"  
												onChange={this.handleChange.bind(this)} />
											User-id 
										</Label>
											
										
										<Input type="select" 
												name="selectMulti" 
												id="UserID" 
												disabled={!this.state.Pick1}
												className="agiir-workflow-input" >
											<option value={this.fillModalTask("user_id")}>{this.fillModalTask("user_id")}</option>				
											{this.fillListName("id")}										
										</Input>
									</div>
									<div className="agiir-block-input">
									<Label className="label-input" >Nom de l'utilisateur </Label>

										<Input type="select" 
												name="selectMulti" 
												id="ScreenName" 
												className="agiir-workflow-input">
											<option value={this.fillModalTask("user_name")}>{this.fillModalTask("user_name")}</option>				
											{this.fillListName("nom")}										
										</Input>
									</div>
									<div className="agiir-block-input" hidden>
										<Label check>
											<Input 
												className="label-input "
												type="radio" 
												name="Pick"  
												id="Choix3" 
												onChange={this.handleChange2.bind(this)} />
											E-Mail
										</Label>					

										<Input type="select" 
												name="selectMulti" 
												id="EmailUser" 
												disabled={!this.state.Pick3}
												className="agiir-workflow-input">
											<option value={this.fillModalTask("user_mail")}>{this.fillModalTask("user_mail")}</option>				
											{this.fillListName("email")}										
										</Input>
									</div>			
										
									</FormGroup>
								</Form>
							</Collapse>
							<Collapse isOpen={this.state.Choice6}>
								<div id="Container1">
									<Form>
										<FormGroup>
											<div className="agiir-block-input">
											<Label for="ConditionCreate">Specifier les ressources d'actions</Label>
												<Input  className="label-input"
														id="RAName" 
														placeholder="Insérer l'action de ressource" />
											</div>
										
									<div id="buttons-task-add-delete">
										<Button id="Ajouter" outline 
												className="label-input"
												color="primary" 
												active 
												onClick={(e) => {	this.GetRessources() }}>Ajouter</Button>{' '}
									</div>
									</FormGroup>
									</Form>
								</div>
							</Collapse>
					</div>
					<br/>
					<br/>
					<div className="modal-footer-buttons">
					
						{" "}
						<Button color="primary" onClick={this.handleClick}>
						<AgiirIcon icon={"ic_close"} />{" "}
							<span>Annuler</span></Button>{' '}
						<Button color="secondary" onClick={() => this.Validation() }>
						<AgiirIcon icon={"ic_check"} />{" "}
						<span>Valider</span></Button>{' '}
					</div>
				</Modal>

				<ListTasktimers
					elementTache = {this.state.tache}
					isOpen={this.state.modalTimer} 
					close={() => this.toggleTimer()}
					DeleteTimer = { DeleteTimer => this.letDeleteTimer(DeleteTimer)}
					ActTimer={ ActTimer => this.getActTimer(ActTimer)}/>
				
      </div>
    );
  }
}
export default ModalTask;

/*<ListTasktimers
	elementTache = {this.state.tache}
	isOpen={this.state.modalTimer} 
	toggle={() => this.toggleTimer()}
	DeleteTimer = { DeleteTimer => this.letDeleteTimer(DeleteTimer)}
	ActTimer={ ActTimer => this.getActTimer(ActTimer)}/>*/