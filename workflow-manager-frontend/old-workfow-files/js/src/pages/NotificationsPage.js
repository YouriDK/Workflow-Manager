import React from 'react';
import Modal from "react-responsive-modal";
import { 
	Button,
	Form, 
	FormGroup, 
    Label, TabPane,Table,
	Input,TabContent  } from 'reactstrap';
import {notification } from '../components/ElementWF';
import classnames from 'classnames';
import { Icon } from 'react-icons-kit'
import {plus} from 'react-icons-kit/iconic/plus'
import { AgiirIcon } from '../utils/AgiirIcons'
import ActionButton from '../components/ActionButtons'
import * as ressourceActions from "../actions/RessourceAction";
import AlertUtil from "../utils/AgiirUtil/AlertUtil"
var element = {}


class NotifcationPage extends React.Component {
    constructor(props) {
	  
        super(props);
        this.state = {
            activeTab : '1',

            modal: false,
            tooltipOpen : false, 
			modify : null,
			selectedCateg : [],
			
            check_im :false,
            check_pm:false,
            check_email:false,
			check_un :false,
			userNameFill : [],
			CodeGroovyFill : [],

			titreNotif : props.elementNotification != null ? props.elementNotification.name : "",
			templateNotif : props.elementNotification != null ? props.elementNotification.template : "",
			activationNotif : props.elementNotification != null ? props.elementNotification.Ex_Type : "",
			destiNotif : "",

           
            };
    
        
        this.toggle = this.toggle.bind(this);
        this.toggleToolTip = this.toggleToolTip.bind(this);
        this.toggle_check_email = this.toggle_check_email.bind(this)
        this.toggle_check_im =  this.toggle_check_im.bind(this)
        this.toggle_check_pm = this.toggle_check_pm.bind(this)
		this.toggle_check_un = this.toggle_check_un.bind(this)
		this.handleChange = this.handleChange.bind(this);
        
	  }
	  
	  

      toggle() { this.setState(prevState => ({ modal: !prevState.modal })); }
      toggleToolTip() { this.setState(prevState => ({ tooltipOpen: !prevState.tooltipOpen })); }
      toggle_check_email() { this.setState(prevState => ({ check_email: !prevState.check_email })); }
      toggle_check_im() { this.setState(prevState => ({ check_im: !prevState.check_im })); }
      toggle_check_pm() { this.setState(prevState => ({ check_pm: !prevState.check_pm })); }
      toggle_check_un() { this.setState(prevState => ({ check_un: !prevState.check_un })); }

      toggleTab(tab){   if (this.state.activeTab !== tab) {   this.setState({ activeTab: tab });   }  }

/*
    async componentDidMount(){
		let obj2 = await ressourceActions.getAllUsernames()
		this.setState({ userNameFill :  obj2 })

		let obj = await ressourceActions.getAllGroovy()
		this.setState({ CodeGroovyFill :  obj })
	}*/
	
	async componentWillMount()
	{
		let obj2 = await ressourceActions.getAllUsernames()
		this.setState({ userNameFill :  obj2 })

		let obj = await ressourceActions.getAllGroovy()
		this.setState({ CodeGroovyFill :  obj })
	}

	componentWillReceiveProps(nextProps){ 
		//console.log("willreceiveprops"); 
		this.setState({ 
			NotifListe : this.FillTableNotifications() ,
			titreNotif : nextProps.elementNotification ? nextProps.elementNotification.name : "" ,
			templateNotif : nextProps.elementNotification ? nextProps.elementNotification.template : "" ,
			activationNotif :nextProps.elementNotification ? nextProps.elementNotification.Ex_Type : "" ,
		})  
	}

	

	
	
	onCloseModal()
	{
		this.toggleTab('1')
		this.props.close("notifications")
		
	}
	handleChange(e) {
		let change = {};

		change[e.target.name] = e.target.value;
	
		this.setState(change);
	  }

	handleChangeType(nom)
	{
		/*
		console.log("handleChangeType" , nom)
		switch(nom)
		{
			case "email" : this.setState({check_email : !this.state.check_email });break;

			case "user":  this.setState({check_un : !this.state.check_un });break;
		}
		*/
		console.log("handleChangeType",nom);
        if (!this.state.selectedCateg.includes(nom)) {
          this.state.selectedCateg.push(nom);
        } else {
          this.state.selectedCateg.splice(
            this.state.selectedCateg.indexOf(nom),
            1
          );
        }
        this.setState({ selectedCateg: this.state.selectedCateg });
	}

    Validation(){
		const { titreNotif , templateNotif , activationNotif , CodeGroovyFill , destiNotif} = this.state;
		var code = null
		var CodeID = destiNotif === "Script"  ? document.getElementById('TaskScript').value : null
		CodeGroovyFill.map((element) =>{
			if(element.groovyId === CodeID){
				code = element
			}
		})
		if ( code === null) { 
			console.log("Nous avons un code Null ! ")
			AlertUtil.alert("Vous n'avez pas sélectionné de script !" , "error") 
		}

		
		var notname = titreNotif;
		var nottemp = templateNotif
		var nottemplang = "freemarker";
		var nottype = this.state.selectedCateg
		var notId = Math.floor(Math.random() * 100)
		if(this.props.elementNotification !=null ){ notId = this.props.elementNotification.notId}
		var notextype = activationNotif
		var adress  = destiNotif === "Name"  ? document.getElementById('ScreenName').value : null 
		var script = destiNotif === "Script"  ? code.codegroovy : null
		var ScriptName = destiNotif === "Script"  ? code.nom  : null 
		var Notifications = new notification(notname, nottemp,nottemplang,nottype,notextype,notId,adress,script,ScriptName)
        this.props.Notif(Notifications)
		this.toggleTab('1');
		this.setState({ titreNotif : ""})
    }

    fillModal(section){
		// Inutile
			if(this.props.elementNotification !=null ){
				// Si c'est une modification il faut mettre ce qu'il avait déjà
				element = this.props.elementNotification
				switch(section){
					case 'titre':
                        console.log("NAME",element.name	)
						return element.name	
					case 'lang':
                        console.log("LANG",element.template_langage	)
						return element.template_langage
					case'template':
						return element.template
					case'activation_value':
						return element.Ex_Type
					case 'activation_name' :
                        if(element.Ex_Type === "onEntry") { return "En entrée " }
                        if(element.Ex_Type === "onExit") { return "En sortie" }
                        if(element.Ex_Type === "onAssignment") { return "A l'assignation" }
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
			} else {//Sinon faut mettre les éléments par défaut
			  console.log("VIDE")
			  console.log(this.props.elementNotification)
				switch(section){
					case 'titre':
						console.log("Vide titre")
						return "Insérer le titre de la Notification"
						break;
					case'lang' :
						return "Choisir le langage du template"
						break;
					case'template':
						return "Insérer le template"
						break;
					case'activation_value':
						return '0'
						break;
					case 'activation_name' :
						return "Choisir type d'activation"
						break;
					case'email':
						//console.log(this.state.check_email)
						//if(this.state.check_email) {this.toggle_check_email() };	
						this.setState({check_email : false })
						break;
					case'user-notification':
						//console.log(this.state.check_un)
						//if(this.state.check_un)   {this.toggle_check_un()}
						
						this.setState({check_un : false })	
						break;
					case'im':
						//console.log(this.state.check_im)
						//if(this.state.check_im)   {this.toggle_check_im()}
						this.setState({check_im : false })
						break;
					case'private-message':
					this.setState({check_pm : false })
						//console.log(this.state.check_pm)
						//if(this.state.check_pm)   {this.toggle_check_pm()}
						break;
					
						
			}
		}

	

    }
    modifierNotif(id){
        this.props.modifNotif(id)
        this.forceUpdate()
        this.toggleTab('2')
        
    }
    onButtonClick(id){
		switch (id){
			case "done" :
				this.props.clean()
				this.setState({selectedCateg : []})
				this.forceUpdate()
                this.toggleTab('1')
				break;
			case "add" :
				this.props.clean()
				this.setState({selectedCateg : []})
				this.forceUpdate()
                this.toggleTab('2')
				break;
			case "modifier":
				this.props.notifCurrent().forEach( element => { 	
					if( (document.getElementById(element.notId).checked) ) {
						this.props.modifNotif(element.notId);
						console.log("Modification : " + element.notId) 	
					}
				})
				break;
			
			case "cus-mail":
				this.props.Add("cus-mail");
				break;
					
		default : 
		console.log("Error onButtonCLick EditNotif - : " + id)
		}
    }

    ExectionFr(ex){
        switch(ex){
            case "onEntry" :
                return "En entrée" ; break;
            case "onExit" : 
                return "En sortie" ; break;
            case "onAssignment" :
				return "A l'assignation" ; break;
			default : return "Choisir le type" ; break;
        }

	}

	fillListScript(){
		var array = []
		this.state.CodeGroovyFill.map((element) => {
			array.push( <option key={element.groovyId}   value={element.groovyId}>{element.nom}</option> )	
		})
		return array
	}

	fillListName(){
	const {userNameFill} = this.state;
	var array = []
		
		userNameFill.map((element) => {
			array.push(<option key={element.id} value={element.emailAddress}>{element.fullName}</option>)
		})
	
	return array;
}
			
    
    FillTableNotifications(){
		var array = [];
		if( this.props.notifCurrent().length > 0 ) {
			this.props.notifCurrent().map((element) => {
				if (element.Notification_Type !== undefined ){
				array.push(
					<tr key = {element.notId}>
						<td  style={{ textAlign : "left"}} >{element.name}</td>
						<td  style={{ textAlign : "left"}} >{ element.Notification_Type.toString()}</td>
						<td  style={{ textAlign : "left"}} >{this.ExectionFr(element.Ex_Type)}</td>
						<td>
						<ActionButton
							id={element.notId}
							modifier = { modifier => this.modifierNotif(element.notId)}
							supprimer = { supprimer => this.props.Sup(element.notId) }
							target="notifications"
                		/>
						</td>
					</tr>
				) }
			})
		}
		return array;	
    }
    
    render() {		
		const { selectedCateg , titreNotif , templateNotif , activationNotif, destiNotif} = this.state;

        return (
            <div className="responsive-container"  >
           
				<Modal
					open={this.props.isOpen}
					onClose={()  => this.onCloseModal()}
					classNames={{ modal: "agiir-modal" }}
					center
					closeOnOverlayClick={false}
					
				>
              <div className="modal-header modal-header-menu" >
				   <h2 className="modal-titre" >{ this.state.activeTab === '1' ? "Liste de Notifications" : "Ajout d'une Notification"}</h2>
				   
			</div>
                <div>
          

            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                <Table hover striped bordered id='AffAct'>
						<thead>
							<tr hidden={ this.props.notifCurrent().length > 0 ? false : true }>
								<th >Nom</th>
								<th >Type</th>
								<th  >Exécution</th>
								<th style={{ textAlign : "center"}}>Actions</th>
							</tr>
						</thead>
						<tbody>	{this.FillTableNotifications()}	</tbody>
					</Table>
                </TabPane>
                <TabPane tabId="2">
                <Form>
					<FormGroup id="">
					<div className="agiir-block-input">
						<Label className="FormUser" >Titre de la notification</Label>
						<Input  className="agiir-workflow-input" 
								type="text"
								name="titreNotif"
								id="titreNotif" 
								value={titreNotif}
								onChange={this.handleChange}/>
					</div>
					{/* La langue sera toujours freemarker donc nous allons caché cet input et ne plus l'utilisr pour l'instant*/ }
					<div hidden className="agiir-block-input">
						<Label className="FormUser" >Langage du template :</Label>
						<Input className="agiir-workflow-input"
								type="select"
								id="template-langage"	>
							<option value="freemarker" > freemarker </option>
							<option disabled value="velocity" >velocity	</option>
						</Input>
					</div>
					<div className="agiir-block-input">
						<Label className="FormUser" >Template de la notification :</Label>
						<Input className="agiir-workflow-input" 
								type="textarea"  
								name="templateNotif"
								id="templateNotif" 
								value={templateNotif}
								onChange={this.handleChange}/>
					</div>
					
					<div className="agiir-block-input">
					<div >
						<Label className="FormUser" >Type de la notification :  </Label>
						<div className="agiir-filters-item agiir-filters-container" >
							<Input className="agiir-workflow-text" 
									type="checkbox" id="email" 
									checked={selectedCateg.includes("email")}
									onChange={() => this.handleChangeType("email")}/>
							
							<span className="checkmark checkmark-cat" onClick={() => this.handleChangeType("email")} ></span>
							Email
						</div>
						<div className="agiir-filters-item agiir-filters-container" >
							<Input className="agiir-workflow-text" 
									type="checkbox" id="user-notification" 
									checked={selectedCateg.includes("user-notification")}
									onChange={() => this.handleChangeType("user-notification")} /> 
							<span className="checkmark checkmark-cat" onClick={() => this.handleChangeType("user-notification")} ></span>Notification utilisateur 
						</div>
					</div>
						<div hidden>
						<Label check>	
							<Input className="agiir-workflow-text" 
									type="checkbox" 
									id="im" 
									checked={this.state.check_im} 
									onClick={this.toggle_check_im} /> instant-message
						</Label>
						<Label check>	
							<Input 
								className="agiir-workflow-text" 
								type="checkbox" 
								id="private-message" 
								checked={this.state.check_pm} 
								onClick={this.toggle_check_pm}/> private-message
						</Label>
						</div>
					</div>
					<div className="agiir-block-input">
						<Label className="FormUser" > Type d'activation </Label>
						<Input className="agiir-workflow-input"
								type="select"
								name="activationNotif"
								id="activationNotif" 	
								onChange={this.handleChange} 
								value={activationNotif}>
							<option key={1} value="0" selected={activationNotif == "0"} >{this.ExectionFr(activationNotif)}</option>
							<option  key={2} value="onEntry" selected={activationNotif == "onEntry"} > En entrée </option>
							<option  key={3} value="onExit" selected={activationNotif == "onExit"}>En sortie</option>
							{/*<option  key={4} value="onAssignment" selected={activationNotif == "onAssignment"}> A l'assignation </option>*/}
						</Input>
					</div>

					<div className="agiir-block-input">
						<Label className="FormUser" > Destinataire de la notification </Label>
						<Input className="agiir-workflow-input"
								type="select"
								name="destiNotif"
								id="destiNotif" 	
								onChange={this.handleChange} 
								value={destiNotif}>
							<option key={1} value="0" selected={destiNotif == "0"} >{this.ExectionFr(destiNotif)}</option>
							<option  key={2} value="Name" selected={destiNotif == "Name"} > Nom du destinataire </option>
							<option  key={3} value="Script" selected={destiNotif == "Script"}> Script </option>
							</Input>
					</div>

					{ destiNotif === "Name"   &&
					<div className="agiir-block-input">
						<Label className="label-input" >Destinataire </Label>

						<Input type="select" 
								name="selectMulti" 
								id="ScreenName" 
								className="agiir-workflow-input">
							<option value="0" >Choisir le nom du destinataire</option>				
							{this.fillListName()}										
						</Input>
					</div>
					}
					{ destiNotif === "Script" &&
					<div className="agiir-block-input">
						<Label className="label-input" >Script :</Label>
						<Input type="select" 
								name="selectMulti"
								id="TaskScript"
								className="agiir-workflow-input">
											
							{this.fillListScript()}									
						</Input>
					</div>}
					</FormGroup>
				</Form>
                </TabPane>
            </TabContent>
            
         
                

            </div>
            <div className="modal-footer-buttons" >
                { this.state.activeTab === '1' ? 
				<div>
					<Button color="primary" onClick={() => this.onCloseModal()}>
						<AgiirIcon icon={"ic_close"} />{" "} 
						<span>Fermer</span>
					</Button>{" "}
					<Button 
						color="secondary" 
						className="modal-header-buttons"
						onClick={() => this.onButtonClick("add")}
						id="modal-buttons"
						hidden={this.state.activeTab === '2' ? true : false }> 
						<AgiirIcon icon={"ic_add"} />{" "}
						<span>Ajouter une notification</span>
					</Button>
				
					
				</div> : 
				
				<div>
					<br/><br/>
				<Button color="primary" onClick={() => this.onButtonClick("done")}>
					<AgiirIcon icon={"ic_close"} />{" "} 
					<span>Annuler</span>
				</Button>{" "}
				<Button color="secondary" onClick={() => this.Validation() }> 
						<AgiirIcon icon={ this.props.elementNotification  != null ? "ic_mode_edit"  : "ic_add" } />{" "} 
						{ this.props.elementNotification  != null ? "Modifier"  : "Ajouter" }
				</Button>
				
				
				</div>}
            </div>
            </Modal>
                
                
                
            </div>)
    }

}
export default NotifcationPage;