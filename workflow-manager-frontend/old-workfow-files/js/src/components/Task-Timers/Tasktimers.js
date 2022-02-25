import React from 'react';
import Modal from "react-responsive-modal";
import { 
	Button,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, 
	Form, 
	FormGroup, 
	Label,
	Table, 
	Input,
	 } from 'reactstrap';

import ModalNotifTimer from './ModalNotifTimer'
import ModalMailTimer from './ModalMailTimer'
import { TaskTimer }  from '../../components/ElementWF'

import { AgiirIcon } from '../../utils/AgiirIcons'
import ActionButton from '../../components/ActionButtons'

import ActionPage from '../../pages/ActionPage' 
import NotificationsPage from '../../pages/NotificationsPage'





var element = {}
var listeAct = []
var compt = 1 

class Tasktimers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  tooltipOpen : false, 
	  timerAction : false,
	  timerNotif : false,
	  timerMail : false,
	  check_blocking : false,
	  elementTimer : null,
	  dropdownOpen: false,

	  ActionsPageModal : false,



	  titreTimer : props.elementTimer != null ? props.elementTimer.name  :  "" , 
	  dureeTimer : props.elementTimer != null ? props.elementTimer.dduration :  "", 
	  uniteTimer : props.elementTimer != null ? props.elementTimer.dscale : "",
	  uniteRecu : props.elementTimer != null ? props.elementTimer.rscale : "",
	  nomRecu : props.elementTimer != null ? props.elementTimer.rduration : "",
	 

    };

	this.toggle = this.toggle.bind(this);
	this.toggleBug = this.toggleBug.bind(this);
	this.toggleToolTip = this.toggleToolTip.bind(this);
	this.toggle_check_blocking = this.toggle_check_blocking.bind(this)
	this.handleClick = this.handleClick.bind(this)
	this.handleChange = this.handleChange.bind(this);

  }

  toggle() { this.setState(prevState => ({ modal: !prevState.modal })); }
  toggleBug() { this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen })); }

  //toggle2_0() { console.log(compt); compt =1 ; this.props.toggle}
  toggleToolTip() { this.setState(prevState => ({ tooltipOpen: !prevState.tooltipOpen })); }
  toggleActionsTimer() { this.setState(prevState => ({ timerAction: !prevState.timerAction }));}
  toggleNotifTimer() { this.setState(prevState => ({ timerNotif: !prevState.timerNotif })); }
  toggleMailTimer(){ this.setState(prevState => ({ timerMail: !prevState.timerMail })); }
  toggle_check_blocking() { this.setState(prevState => ({ check_blocking: !prevState.check_blocking })); }
  
componentWillReceiveProps(nextProps){
	this.setState({ 

		titreTimer : nextProps.elementTimer != null ? nextProps.elementTimer.name  :  "" , 
	  dureeTimer : nextProps.elementTimer != null ? nextProps.elementTimer.dduration :  "", 
	  uniteTimer : nextProps.elementTimer != null ? nextProps.elementTimer.dscale : "",
	  uniteRecu : nextProps.elementTimer != null ? nextProps.elementTimer.rscale : "",
	  nomRecu : nextProps.elementTimer != null ? nextProps.elementTimer.rduration : "",
	})
	
	
	
	
	
	listeAct = []
	this.forceUpdate()
}

  handleClick(){
	
	listeAct = []
	this.forceUpdate()
	this.props.toggle()
}

turnModalOn(options)
{
	switch(options)
	{
		case "actions" : 
			this.setState({ ActionsPageModal  : true})
			break;

		case "notifications" : 
			this.setState({ NotificationsPageModal  : true})
			break;
	}
}

turnModalOff(options)
{
	switch(options)
	{
		case"actions" : 
			this.setState({ ActionsPageModal  : false})
			break;

		case "notifications" : 
			this.setState({ NotificationsPageModal  : false})
			break;
	}
}

handleChange(e) {
	let change = {};
	change[e.target.name] = e.target.value;
	this.setState(change);
  }

  getActTimer(ActTimer){
	ActTimer.type = "Actions"
	listeAct.forEach(element => {
		console.log(element)
		if (( element.Act_id === ActTimer.Act_id)  ){
			var place =  listeAct.indexOf(element)
			listeAct.splice( place , 1)
			
		}
	})
	listeAct.push(ActTimer)

	
  }
  getNotifTimer(ActTimer){
	ActTimer.type = "Notifications"
	listeAct.forEach(element => {
		console.log(element)
		if (( element.Act_id === ActTimer.Act_id)  ){
			var place =  listeAct.indexOf(element)
			listeAct.splice( place , 1)
			
		}
	})
	listeAct.push(ActTimer)

	
  }

	Validation(){

		const { titreTimer , dureeTimer , uniteTimer , nomRecu ,uniteRecu} = this.state ;
		//console.log("Let's Try");
		var TimerName = titreTimer
		var TimerDelay = dureeTimer
		var DelayTime = uniteTimer
		var TimerRecu = nomRecu
		var Delayrecu = uniteRecu
		var Block = false
		var type = "Timer"
		var Ttimer = new TaskTimer( TimerName,TimerDelay,DelayTime,TimerRecu,Delayrecu,Block)
		Ttimer.type=type
		Ttimer.timerAction = listeAct
		
		/*if (document.getElementById("email").checked){	console.log(document.getElementById("email").checked); nottype.push("email") }
		if (document.getElementById("user-notification").checked){	nottype.push("user-notification") }
		if (document.getElementById("im").checked){	nottype.push("im") }
		if (document.getElementById("private-message").checked){	nottype.push("private-message") }
		if(this.props.elementNotification !=null ){ notId = this.props.elementNotification.notId}
		var notextype = document.getElementById('execution-type').value*/
		/*var mailtoSend = new mail(from, to,subject,bodym)
		var code ='import com.liferay.portal.kernel.json.JSONFactoryUtil;import com.liferay.mail.kernel.service.MailServiceUtil;import javax.mail.internet.AddressException;import javax.mail.internet.InternetAddress;import com.liferay.mail.kernel.model.MailMessage;import com.liferay.portal.kernel.util.*;InternetAddress fromAddress=null;InternetAddress toAddress=null;System.out.println("Send it");try{fromAddress=new InternetAddress("' + mailtoSend.from +'");toAddress=new InternetAddress("'+ mailtoSend.destinataire+'");MailMessage mailMessage=new MailMessage();mailMessage.setTo(toAddress);mailMessage.setFrom(fromAddress);mailMessage.setSubject("'+mailtoSend.object+'");mailMessage.setBody("' + mailtoSend.body+'");MailServiceUtil.sendEmail(mailMessage);}catch(AddressException e){System.out.println(e);}System.out.println("DONE");'
		var mailID = Math.floor(Math.random() * 100)
		var actionMail = new action(ActionName,ActionDescription,code,"groovy",actextype,mailID,null,mailtoSend)
		actionMail.typeAct = 1*/

		if(this.props.elementTimer !=null ){ Ttimer.ID = this.props.elementTimer.ID}
		console.log("Actions Timer - " , listeAct)
		console.log("Timer entier" , Ttimer)
		this.props.ActTimer(Ttimer)
	}

	onButtonClick(id){
		switch(id){
			case "Timer-Action" :
				this.setState({ elementTimer : null })
				this.turnModalOn("actions")
				break;
			case "Timer-Notif" :
				this.setState({ elementTimer : null })
				this.turnModalOn("notifications")
				break;
			case"Timer-Mail":
				this.setState({ elementTimer : null })
				this.toggleMailTimer();
				break;

			default:
				alert("Fonctionnalité en cours de developpement :) !")
		}
		
	}

	deleteTimer(id){
		listeAct.forEach(element => {
			//console.log(element)
			if (element.ID === id){
				var place =  listeAct.indexOf(element)
				listeAct.splice( place , 1)
				this.forceUpdate()//Forcer un refresh
				
			}
		})
	}

	modifyTimer(id){
		listeAct.map(element => {
			if (element.ID === id){
					this.setState({ elementTimer : element })
					this.state.elementTimer = element
					//console.log(this.state.elementTimer)
					if(this.state.elementTimer != null ){
						if(this.state.elementTimer.type === "Actions"){this.toggleActionsTimer(); }
						if(this.state.elementTimer.type === "Notifications"){this.toggleNotifTimer(); }
						if(this.state.elementTimer.type === "Mail Perso"){this.toggleMailTimer(); }
					}
			}
		})
	}


	gettimeAct(){
		var array = []
		//if( (this.props.elementTimer === null) && ( compt === 1 ) ){ listeAct = [] } 
		if(this.props.elementTimer != null){  listeAct = this.props.elementTimer.timerAction }	// pour la modification d'une liste déjà existante
		listeAct.map((element) => {
			array.push(
				<tr key = {element.ID}>
		
					<td>{element.name}</td>
					<td>{element.type}</td>
					<td>
					<ActionButton
                            id={element.ID}
                            modifier = { modifier => this.modifyTimer(element.ID) }
                            supprimer = { supprimer => this.deleteTimer(element.ID) }
                            target="notifications"
                        />
					</td>
				</tr>
			)
		})
		
		
	compt++
	return array;	

	}
	
	fillModalAct(section){
		if(this.toggle){
			if (this.props.elementTimer != null) {
				element = this.props.elementTimer
				switch(section){
					case 'titre':
						return element.name
					case'duree-timer':
						return element.dduration
					case'time1_value' :
						return element.dscale
					case 'time1_name' :
						switch(element.dscale){
						case "second" : return "Secondes"
						case "minute" : return "Minutes"
						case "hour" : return "Heures"
						case "day" : return "Jours"
						case "week" : return "Semaines"
						case "month" : return "Mois"
						case "year" : return "Annees"
						}
						
					case'duree-recu':
						return element.rduration
					case 'time2_value' :
						return element.rscale
					case 'time2_name' :
						switch(element.rscale){
						case "second" : return "Secondes"
						case "minute" : return "Minutes"
						case "hour" : return "Heures"
						case "day" : return "Jours"
						case "week" : return "Semaines"
						case "month" : return "Mois"
						case "year" : return "Annees"
						}
					case 'blocking':
						return element.block
				}
			} else {
				switch(section){
					case 'titre':
						return "Insérer le titre du timer "
					case'duree-timer':
						return 0
					case'time1_name' :
						return "Choisir échelle de temps"
					case'time1_value' :
						return "Choisir échelle de temps"
					case'duree-recu':
						return 0
					case'time2_value' :
						return 'Choisir échelle de temps'
					case'time2_name' :
						return "Choisir échelle de temps"
					case 'blocking' :
						return false
			}
		}
	}
}
cAct(){ return listeAct;}
clean(options)
	{
		this.setState({ elementTimer : null});
	}
	

modifyAct(modifAct){
	console.log("modifyAct" ,modifAct)
		listeAct.forEach((element) => { 
			if(element.Act_id === modifAct){
				console.log(element)
				this.setState({ elementTimer : element})
				this.state.elementTimer = element 

				console.log("Timer  - Modif " , this.state.elementTimer)
				if(this.state.elementTimer != null){
					if(this.state.elementTimer.typeAct != null){
						console.log("Mail")
						//alert("on veut modifier un mail")
						//this.toggleMail();
						//alert("modify act" + modifAct)
						this.setState({ elementTimer : element})
					}
					else{
						console.log("Action simple")
						this.setState({ elementTimer : element})
					}
					
					}
					else{console.log("Vide Pas d'elemenent")}
				
			}
		})
	

}

DelAct(Sup){
	this.clean("actions")
	listeAct.forEach(element => { 
			if(element.Act_id === Sup){
				var place =  listeAct.indexOf(element)
				listeAct.splice( place , 1)
			}
	})

}

DelNotif(Sup){
	this.clean("actions")
	listeAct.forEach(element => { 
			if(element.notId === Sup){
				var place =  listeAct.indexOf(element)
				listeAct.splice( place , 1)
			}
	})

}


	

	render() {
		const { titreTimer , dureeTimer ,uniteTimer ,nomRecu ,  uniteRecu} = this.state ;
		const { open } = this.props
    return (
      <div>
	<Modal 	
			open={open}
			onClose={() => this.props.toggle()}
			center
			classNames={{modal : "agiir-modal"}}
			closeOnOverlayClick={false}>

			<div className="modal-header">
				<h2 >Ajout d'un Rappel</h2>
			</div>
			
			<div>
				<Form>
					<FormGroup id="">
					<div className="agiir-block-input">
						<Label className="FormUser" >Nom du rappel  </Label>
						<Input	type="text"
								className="agiir-workflow-input" 
								name="titreTimer"
								id="titreTimer" 
								value={titreTimer}
								onChange={this.handleChange}/>
					</div>
					<div className="agiir-block-input">
						<Label className="FormUser">Durée du timer </Label>
						<Input type="number"
								className="agiir-workflow-input"
								name="dureeTimer"
								id="dureeTimer" 
								value={dureeTimer}
								onChange={this.handleChange}/>

						<Input	type="select"
								className="agiir-workflow-input"	
								name="uniteTimer"
								id="uniteTimer" 	
								onChange={this.handleChange} 
								value={uniteTimer}>
							<option value="second" selected={uniteTimer == "second"} >Secondes </option>
							<option value="minute" selected={uniteTimer == "minute"} >Minutes</option>
							<option value="hour" selected={uniteTimer == "hour"} >Heures</option>
							<option value="day"selected={uniteTimer == "day"} >Jours</option>
							<option value="week" selected={uniteTimer == "week"} >Semaines</option> 
							<option value="month" selected={uniteTimer == "month"} >Mois</option>
							<option value="year" selected={uniteTimer == "year"} >Années</option>
						</Input>
					</div>
					<div hidden className="agiir-block-input" >
						<Label className="Blocking" check>
							<Input 
								className="agiir-workflow-input" 
								type="checkbox" id="blocking" 
								checked={this.state.check_blocking} 
								onClick={this.toggle_check_blocking} /> 
								Bloquage 
						</Label>
					</div>

					<div className="agiir-block-input">
						<Label className="FormUser" >Fréquence du rappel (<em>Combien de fois doit-il se répéter </em> )  </Label>
						<Input type="number"
								className="agiir-workflow-input"
								name="nomRecu"
								id="nomRecu" 
								value={nomRecu}
								onChange={this.handleChange}/>
						<Input
								type="select"
								className="agiir-workflow-input"	
								name="uniteRecu"
								id="uniteRecu" 	
								onChange={this.handleChange} 
								value={uniteRecu}>
							<option value="second" selected={uniteRecu == "second"} >Secondes </option>
							<option value="minute" selected={uniteRecu == "minute"} >Minutes</option>
							<option value="hour" selected={uniteRecu == "hour"} >Heures</option>
							<option value="day"selected={uniteRecu == "day"} >Jours</option>
							<option value="week" selected={uniteRecu == "week"} >Semaines</option> 
							<option value="month" selected={uniteRecu == "month"} >Mois</option>
							<option value="year" selected={uniteRecu == "year"} >Années</option>
						</Input>
					</div>
					<div className="agiir-block-input">
						<Label className="FormUser" >Actions du rappel    </Label>
					</div>
					<div className="check-box">
						<ButtonDropdown 
							isOpen={this.state.dropdownOpen} 
							toggle={() => this.toggleBug()} 
							className="dropDown-workflow"
							color="primary">
						<DropdownToggle caret>   
						<AgiirIcon icon={"ic_add"} />{" "}
						<span>Ajouter un action</span></DropdownToggle>
						<DropdownMenu>
							<DropdownItem onClick={() => this.onButtonClick("Timer-Action") } >
							<AgiirIcon icon={"ic_people"} />{" "}{'  '}Actions</DropdownItem>
							<DropdownItem onClick={() => this.onButtonClick("Timer-Notif") } >
							<AgiirIcon icon={"ic_assignment_ind"} />{" "}{'  '}Notifications</DropdownItem>
							
						</DropdownMenu>
						</ButtonDropdown>
					</div>
						
						
					


		

					<div className="agiir-workflow-input">
						<Table id='AffAct'>
							<thead>
								<tr hidden={ listeAct.length > 0 ? false : true } >
									
									<th>Nom</th>
									<th>Type</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>{this.gettimeAct()}</tbody>
							
						</Table>
					</div>

					</FormGroup>
				</Form>
			</div>
			<div className="modal-footer-buttons" >
				
				<Button color="primary" onClick={this.handleClick}>
					<AgiirIcon icon={"ic_close"} />{" "}
					<span>Annuler</span>
				</Button>{" "}
				<Button color="secondary" onClick={() => this.Validation() }>
					<AgiirIcon icon={"ic_check"} />{" "}
					<span>Valider</span>
				</Button>{' '} 
			</div>
		</Modal>

		<ActionPage 
			elementAction = {this.state.elementTimer}
			isOpen={this.state.ActionsPageModal}
			close ={close => this.turnModalOff(close)}
			modifAct = { modifAct => this.modifyAct(modifAct)}
			Act ={Act => this.getActTimer(Act)}	
			notifCurrent = { notifCurrent => this.cAct()}
			Del={ Del => this.DelAct(Del)}
			ActM ={ActM => this.getActTimer(ActM)}
			clean = { clean => (this.clean("actions"))} />

		<NotificationsPage 
			elementNotification = {this.state.elementTimer} 
			isOpen={this.state.NotificationsPageModal} 
			close ={close => this.turnModalOff(close)}
			Notif={Notif => this.getNotifTimer(Notif)}
			Sup={ Sup => this.DelNotif(Sup)}
			notifCurrent = { notifCurrent => this.cAct() }
			modifNotif = {modifNotif => this.modifyAct(modifNotif)}
			clean = { clean => (this.clean("notifications"))}
			/>


		<ModalNotifTimer
			elementTimer = {this.state.elementTimer}
			isOpen={this.state.timerNotif}
			toggle={() => this.toggleNotifTimer()}
			ActTimer={ ActTimer => this.getActTimer(ActTimer)}/> 

		<ModalMailTimer
			elementTimer = {this.state.elementTimer}
			isOpen={this.state.timerMail}
			toggle={() => this.toggleMailTimer()}
			ActTimer={ ActTimer => this.getActTimer(ActTimer)}/>

      </div>
    );
  }
}
export default Tasktimers;