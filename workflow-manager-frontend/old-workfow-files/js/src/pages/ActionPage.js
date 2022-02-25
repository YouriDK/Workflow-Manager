import React from 'react';
import Modal from "react-responsive-modal";
import { 
	Button,
	Form, 
	FormGroup, 
    Label, TabPane,Table,
    Nav,NavLink,NavItem,
	Input,TabContent } from 'reactstrap';
import {action } from '../components/ElementWF';
import classnames from 'classnames';


import { AgiirIcon } from '../utils/AgiirIcons'
import ActionButton from '../components/ActionButtons'

import * as ressourceActions from "../actions/RessourceAction";
import MailPage from "./MailPage"
var element = {}
var Compt=1;
var CodeGroovyFill = [];



class ActionPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        get : false,
        modal: false,
        activeTab :'1',

        titreAction : props.elementAction != null ? props.elementAction.name : "",
        templateAction : props.elementAction != null ? props.elementAction.template : "",
        ScriptAction : props.elementAction != null ? props.elementAction.template : "",
        activationAction : props.elementAction != null ? props.elementAction.Ex_Type : "",

       


        };
      
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
       
      }

      toggle() {	this.setState(prevState => ({	modal: !prevState.modal	}));	}
      toggleTab(tab){   if (this.state.activeTab !== tab) {   this.setState({ activeTab: tab });   }  }


    //C
    //async componentDidMount() { this.getAllGroovy() }

    async componentWillMount(){ this.getAllGroovy() }
    
    async getAllGroovy(){
        let obj = await ressourceActions.getAllGroovy();
        CodeGroovyFill =  obj
    }

    componentWillReceiveProps(nextProps){ 
		////console.log("willreceiveprops"); 
		this.setState({ 
			
			titreAction : nextProps.elementAction ? nextProps.elementAction.name : "" ,
			templateAction : nextProps.elementAction ? nextProps.elementAction.description : "" ,
            ScriptAction :nextProps.elementAction ? nextProps.elementAction.scriptID : "" ,
            activationAction :nextProps.elementAction ? nextProps.elementAction.Ex_Type : "" ,

            //activeTab : nextProps.elementAction !== null ? (nextProps.elementAction.typeAct !== null ? '3' : '2') : (nextProps.elementAction.typeAct === null ? '2' : '3')
        })  
        if (nextProps.elementAction !== null) {
            if (nextProps.elementAction.typeAct !== null){
                this.toggleTab('3')
            }
        }
	}

    handleChange(e) {
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change);
	  }
    

    onButtonClick(id){
    switch (id){
        case "done" :
            this.props.toggle();
            break;
        case "mail" :
            this.props.clean()
            this.toggleTab('3')
            break;
        case "add" :
            this.props.clean()
            this.toggleTab('2')
            break;

        case"cus-mail":
            this.props.Add("cus-mail");
            break;
    default : 
    //console.log("Error onButtonCLick EditNotif - : " + id)
    }
}

modifierAct(id){
    this.props.modifAct(id)
    this.forceUpdate()
    this.toggleTab('2')
}

onCloseModal()
{
    this.toggleTab('1')
    this.props.close("actions")
}

FillTableActions(){
    var array = []
    if( this.props.notifCurrent().length > 0 ) {
        this.props.notifCurrent().map((element) => {

            if(element.Script_langage !== undefined){
                array.push(
                    <tr key = {element.id}>
                        <td  style={{ textAlign : "left"}} >{element.name}</td>
                        <td  style={{ textAlign : "left"}}>{element.description}</td>
                        <td  style={{ textAlign : "left"}} >{element.Script_langage}</td>
                        <td  style={{ textAlign : "left"}}>{this.ExectionFr(element.Ex_Type)}</td>
                        <td>
                        <ActionButton
                            id={element.Act_id}
                            modifier = { modifier => this.modifierAct(element.Act_id) }
                            supprimer = { supprimer => this.props.Del(element.Act_id) }
                            target="notifications"
                        />
                        </td>
                    </tr>
                )}
            })
        }
        return array;
}

Validation(){
    const { titreAction , templateAction ,ScriptAction , activationAction , activeTab} = this.state;	

    switch(activeTab){
        case '2' :
        var code =null
        var ActionName = titreAction
        var ActionDescription = templateAction
        var CodeID = ScriptAction
        CodeGroovyFill.map((element) =>{
            if(element.groovyId === CodeID){
                code = element
            }
        })
        var ActionScript = code.codegroovy
        var name_script = code.nom
        var scriptID = code.groovyId
        var Slangage = "groovy"
        var actextype = activationAction 
        var notId = Math.floor(Math.random() * 100)
        if(this.props.elementAction !=null ){ notId = this.props.elementAction.Act_id}
        var Actions = new action(ActionName, ActionDescription, ActionScript,Slangage,actextype,notId,name_script,scriptID)
        
        ////console.log(Actions)
        this.props.Act(Actions)
        this.toggleTab('1')
        break;

        case'3':
            this.setState(prevState => ({	get: !prevState.get	}));
            ////console.log("Pas sur de ce qu'il doit se doit passer, A verifier ! ActionPage -  Validation")
            this.toggleTab('1')
        break;
    }
    
}

ExectionFr(ex){
    switch(ex){
        case "onEntry" :
            return "En entrée"
        case "onExit" : 
            return "En sortie"
        case "onAssignment" :
            return "A l'assignation"
        
        default : return " Choisir le type"
    }

}

fillModalAct(section){
		if(this.toggle){
			////console.log(this.props.elementAction)
			if (this.props.elementAction != null) {
				element = this.props.elementAction

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

			}
		}
	}
}

getActMail(ActM){
    ////console.log("2ème niveau"  , ActM)
    this.props.ActM(ActM)
    this.toggleTab('1')
    
}

onCloseModal()
	{
		this.toggleTab('1')
		this.props.close("actions")
	}
    
render() {	
    const { titreAction , templateAction ,ScriptAction , activationAction } = this.state;	
    return (
        <div className="responsive-container">

            <Modal
                open={this.props.isOpen}
                onClose={() => this.onCloseModal()}
                classNames={{ modal: "agiir-modal" }}
                center
                closeOnOverlayClick={false}
				> 
            <div className="modal-header modal-header-menu" >
                <h2 bsSize="lg" className="modal-titre" >{ this.state.activeTab === '1' ? "Liste d'actions" : "Ajout d'une action"}</h2>
            </div>
            <div>
       
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                <Table hover striped bordered id='AffAct'>
                    <thead>
                        <tr  hidden={ this.props.notifCurrent().length > 0 ? false : true } >
                            
                            <th >Nom</th>
                            <th >Description</th>
                            <th >Langage</th>
                            <th >Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.FillTableActions()}
                        </tbody>  
					</Table>
                </TabPane>
                <TabPane tabId="2">
                <Form>
					<FormGroup >
					<div className="agiir-block-input">
						<Label className="FormUser" >Titre de l'action</Label>
                        <Input  
                            className="agiir-workflow-input"
                            type="text"
                            name="titreAction"
                            id="titreAction" 
                            value={titreAction}
                            onChange={this.handleChange}/>
					</div>
					<div className="agiir-block-input">
						<Label className="FormUser" >Description de l'action </Label>
						<Input type="text"
								className="agiir-workflow-input"
                                name="templateAction"
                                id="templateAction" 
                                value={templateAction}
                                onChange={this.handleChange}/>
					</div>
					<div hidden className="agiir-block-input">
						<Label className="FormUser" >Langage du script </Label>
						<Input type="select" 
								name="select" 
								id="ScriptSelect" 
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
						<Label className="FormUser" >Script </Label>
                        <Input className="agiir-workflow-input"
                                type="select" 
								name="ScriptAction"
								id="ScriptAction" 
                                value={ScriptAction}
                                onChange={this.handleChange}>

							<option value="0" selected={ScriptAction == "0"} >Choisir le script</option>				
							{CodeGroovyFill.map((element) => {
								return <option key={element.groovyId}   value={element.groovyId} selected={ScriptAction == element.groovyId }>{element.nom}</option>;	
							})}										
						</Input>
					</div>


					<div className="agiir-block-input">
						<Label className="FormUser" >Activation de l'action du noeud</Label>
						<Input className="agiir-workflow-input"
							type="select"
                            name="activationAction"
                            id="activationAction" 	
                            onChange={this.handleChange} 
                            value={activationAction}>
                            <option key={1} value="0" selected={activationAction == "0"} >{this.ExectionFr(activationAction)}</option>
							<option key={2} value="onEntry" selected={activationAction == "onEntry"} >En entrée </option>
							<option key={3} value="onExit" selected={activationAction == "onExit"} >En sortie</option>
							<option key={4} value="onAssignment"selected={activationAction == "onAssignment"} >A l'assignation</option>
						</Input>
					</div>
						
					</FormGroup> 
				</Form>
                </TabPane>
                <TabPane tabId="3">
                <Table id='AffAct'>
                <MailPage  
                    elementAction = {this.props.elementAction}
                    ActM ={ActM => this.getActMail(ActM)}
                    geet = {this.state.get}
                    getBack = { () => this.toggleTab('1') }
                    />
					</Table>
                </TabPane>
            </TabContent>
            
            
            </div>
            <div className="modal-footer-buttons" >
                { this.state.activeTab === '1' ? 
                <Button color="yellow" onClick={() => this.onCloseModal()} >
                    <AgiirIcon icon={"ic_close"} />{" "} 
                    <span>Fermer</span>
                </Button> : 
                <div> <Button color="primary" onClick={() => this.toggleTab('1') } hidden={ this.state.activeTab === '3' ? true : false }> <AgiirIcon icon={"ic_close"} />{" "} <span>Annuler</span> </Button>{' '}
                <Button color="secondary" onClick={() => this.Validation() } hidden={ this.state.activeTab === '3' ? true : false  }> <AgiirIcon icon={ this.props.elementAction  != null ? "ic_mode_edit"  : "ic_add" } />{" "} { this.props.elementAction  != null ? "Modifier"  : "Ajouter" }</Button> </div> }
                <Button 
                    color="secondary" 
                    className="modal-header-buttons"
                    onClick={() => this.onButtonClick("mail")}
                    id="modal-buttons"
                    hidden={this.state.activeTab === '3'  || this.state.activeTab === '2'? true : false }> 
                    <AgiirIcon icon={"ic_add"} />{" "}
                    <span>Ajouter un mail Personnalisé</span> 
                </Button>
                <Button 
                    color="primary" 
                    className="modal-header-buttons"
                    onClick={() => this.onButtonClick("add")}
                    id="modal-buttons"
                    hidden={this.state.activeTab === '2' || this.state.activeTab === '3'  ? true : false }>
                    <AgiirIcon icon={"ic_people"} />{" "}
                    <span>Ajouter une action</span> </Button>
              
            </div>
            </Modal>
                
                
                
            </div>)
    }

}
export default ActionPage;