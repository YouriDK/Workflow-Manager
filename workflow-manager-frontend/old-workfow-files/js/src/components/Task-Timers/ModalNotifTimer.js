import React from 'react';
import { 
	Button,
	Modal,
	ModalHeader, 
	ModalBody, 
	ModalFooter,
	Form, 
	FormGroup, 
	Label, 
	Input
	 } from 'reactstrap';
import { notificationTimer  }  from '../../components/ElementWF'
var element = {}

class ModalNotifTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  tooltipOpen : false, 
	  modify : null,
	  check_im :false,
	  check_pm:false,
	  check_email:false,
	  check_un :false,

    };

	this.toggle = this.toggle.bind(this);
	this.toggleToolTip = this.toggleToolTip.bind(this);
	this.toggle_check_email = this.toggle_check_email.bind(this)
	this.toggle_check_im =  this.toggle_check_im.bind(this)
	this.toggle_check_pm = this.toggle_check_pm.bind(this)
	this.toggle_check_un = this.toggle_check_un.bind(this)
  }

  toggle() { this.setState(prevState => ({ modal: !prevState.modal })); }
  toggleToolTip() { this.setState(prevState => ({ tooltipOpen: !prevState.tooltipOpen })); }
  toggle_check_email() { this.setState(prevState => ({ check_email: !prevState.check_email })); }
  toggle_check_im() { this.setState(prevState => ({ check_im: !prevState.check_im })); }
  toggle_check_pm() { this.setState(prevState => ({ check_pm: !prevState.check_pm })); }
  toggle_check_un() { this.setState(prevState => ({ check_un: !prevState.check_un })); }

  /*componentDidMount(){
	  console.log("OUI")
	  this.fillModal("email")
	  this.fillModal("private-message")
	  this.fillModal("user-notification")
	  this.fillModal("im")
  }*/
	
	Validation(){
		//console.log("Let's Try");
		var notname = document.getElementById('NotificationTimerName').value
		var nottemp = document.getElementById('NotificationTimerTemplate').value
		var nottemplang = document.getElementById('template-langage').value
		var nottype = []
		var notId = Math.floor(Math.random() * 100)
		if (document.getElementById("email").checked){	 nottype.push("email") }
		if (document.getElementById("user-notification").checked){	nottype.push("user-notification") }
		if (document.getElementById("im").checked){	nottype.push("im") }
		if (document.getElementById("private-message").checked){	nottype.push("private-message") }
		//if(this.props.elementNotification !=null ){ notId = this.props.elementNotification.notId}
		
		var NotificationsTimer = new notificationTimer(notname, nottemp,nottemplang,nottype,notId,"Notifications","Notifications")
		if(this.props.elementTimer !=null ){ NotificationsTimer.ID = this.props.elementTimer.ID}
		console.log(NotificationsTimer)
		this.props.ActTimer(NotificationsTimer)
	}
	
	fillModal(section){
		//console.log(section)
		if(this.toggle){
			if(this.props.elementTimer !=null ){
				// Si c'est une modification il faut mettre ce qu'il avait déjà
				element = this.props.elementTimer
				switch(section){
					case 'titre':
						return element.name	
					case 'lang':
						return element.template_langage
					case'template':
						return element.template
					case'activation_value':
						return element.Ex_Type
					case'email':
					element.Notification_Type.map(element =>{
						if(element === "email" ) {this.toggle_check_email() };	
					})
					break;
					case'user-notification':
					element.Notification_Type.map(element =>{
						if(element === "user-notification" )   {this.toggle_check_un()}	
					})
					break;
					case'im':
					element.Notification_Type.map(element =>{
						if(element === "im" )   {this.toggle_check_im()}	
					})
					break;
					case'private-message':
					element.Notification_Type.map(element =>{
						if(element === "private-message" )   {this.toggle_check_pm()}	
					})
					break;

					
				}
			}
			else{//Sinon faut mettre les éléments par défaut
				switch(section){
					case 'titre':
						return "Insérer le titre de la Notification"
					case'lang' :
						return "Choisir le langage du template"
					case'template':
						return "Insérer le template"
					case'activation_value':
						return '0'
					/*case 'activation_name' :
						return "Choisir type d'activation"*/
					case'email':
						console.log(this.state.check_email)
						if(this.state.check_email) {this.toggle_check_email() };	
						break;
					case'user-notification':
						console.log(this.state.check_un)
						if(this.state.check_un)   {this.toggle_check_un()}	
						break;
					case'im':
						console.log(this.state.check_im)
						if(this.state.check_im)   {this.toggle_check_im()}
						break;
					case'private-message':
						console.log(this.state.check_pm)
						if(this.state.check_pm)   {this.toggle_check_pm()}
						break;
					
						
			}
		}

	}

	}

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
			<Label className="modal-titre" >Ajout d'une Notification au Timer</Label></ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup id="">
					<div className="agiir-block-input"> 
						<Label >Titre de la notification</Label>
						<Input  className="agiir-workflow-input" 
								type="text"
								id="NotificationTimerName" 
								defaultValue={this.fillModal("titre")}/>
					</div>
					<div className="agiir-block-input"> 
						<Label className="FormUser" >Langage du template :</Label>
						<Input className="agiir-workflow-input"
								type="select"
								id="template-langage"	>
							<option value={this.fillModal("lang")} >{this.fillModal("lang")}</option>
							<option value="freemarker" > freemarker </option>
							<option disabled value="velocity" >velocity	</option>
						</Input>
					</div>
					<div className="agiir-block-input"> 
						<Label className="FormUser" >Template de la notification :</Label>
						<Input className="agiir-workflow-input" 
								type="textarea"  
								id="NotificationTimerTemplate"
								defaultValue={this.fillModal("template")}/>
					</div>
					
					
					<div id="BlockCheck" >
						<Label className="FormUser" >Type de la notification :  </Label>
						<Label check>	<Input className="agiir-workflow-text" type="checkbox" id="email" checked={this.state.check_email} onClick={this.toggle_check_email} />email</Label>
						<Label check>	<Input className="agiir-workflow-text" type="checkbox" id="user-notification" checked={this.state.check_un} onClick={this.toggle_check_un} /> user-notification</Label>
						<Label check>	<Input className="agiir-workflow-text" type="checkbox" id="im" checked={this.state.check_im} onClick={this.toggle_check_im} /> instant-message</Label>
						<Label check>	<Input className="agiir-workflow-text" type="checkbox" id="private-message" checked={this.state.check_pm} onClick={this.toggle_check_pm}/> private-message</Label>
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
export default ModalNotifTimer;