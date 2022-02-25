import React from 'react';
import Barre from '../components/Palette/Barre'
import Palette from '../components/Palette/Palette'
import * as ressourceActions from "../actions/RessourceAction";
import AlertUtil from "../utils/AgiirUtil/AlertUtil"
import * as Kaleo from "../components/XmlKaleo"

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import {
    DiagramEngine,
    DiagramModel,
    DefaultNodeModel,
    DiagramWidget, 
    DefaultLinkModel} from "storm-react-diagrams";

import { Button } from 'reactstrap';


import { Transition ,Task  } from  "../components/ElementWF"
import ModalTask from "../Modal/ModalTask"
import NotificationsPage from "./NotificationsPage"
import ActionPage from "./ActionPage"


import {Icon} from 'react-icons-kit'
import {ic_assignment_ind} from 'react-icons-kit/md/ic_assignment_ind'
import {ic_assignment} from 'react-icons-kit/md/ic_assignment'
import {trash} from 'react-icons-kit/iconic/trash'
import {ic_build} from 'react-icons-kit/md/ic_build'
import ModalSmall from "../components/ModalSmall"

import { AgiirIconDropDown } from "../utils/AgiirIcons"


//import Modal from "react-responsive-modal";
 

//import XMLWriter from 'xml-writer'	
const engine = new DiagramEngine();

engine.installDefaultFactories();

var model = new DiagramModel();

var XMLDraft;
var XML;
var GOTID = "";
var Tsk ;
var FirstLoad = 0 ;
var condition ;
var Zoom=100;

class DesignerPage extends React.Component {
    constructor(props) {
		super(props) 
		this.state = {
            currentPage : 'Start',
            dEngine: null,
			nodes:[],
			links : [],
            ID: "Vide",
			transis: [] ,
            IDLink : "NONE",
            
            //Sélection des notif et Act du noeud sélectionné
            currentNotif : [],
            currentAct : [],
            
            //autres
            nodeModif : null,

            // toggle
			modalTask : false,
			ActionsPageModal : false,
			NotificationsPageModal : false,
			ActEdit : false,
			EditNotif : false,
			elementAct : null,
			elementNotif : null,
			ModalTskValidation : false,

			ModalS :  false , 
			messageMS : "",
			titre : "",
			description : false , 
			titreActivation : false,

			typeInfos : "",
			validationGroup : false, 

        
		}

		this.handleClickEditNotifications= this.handleClickEditNotifications.bind(this)
		this.handleClickEditAction =this.handleClickEditAction.bind(this)
		this.turnModalOn = this.turnModalOn.bind(this)
		this.turnModalOff = this.turnModalOff.bind(this)
		this.handleClickModif = this.handleClickModif.bind(this)
		this.handleClickDel = this.handleClickDel.bind(this)
	   this.handleClickDraft = this.handleClickDraft.bind(this)
	   this.ImportJSON =  this.ImportJSON.bind(this)
    }


toggleActions() {	this.setState(prevState => ({	ActionsPageModal: !prevState.ActionsPageModal	}));	}
toggleNotif() {	this.setState(prevState => ({	NotificationsPageModal: !prevState.NotificationsPageModal	}));	}
toggleValidationTask() {	this.setState(prevState => ({	ModalTskValidation: !prevState.ModalTskValidation	}));	}

cNotif(){	return this.state.currentNotif;	}
cAct(){	return this.state.currentAct;	}

turnModalOn(option)
{
	switch(option)
	{
		case "state" : 
			this.setState({ messageMS : "Titre de l'état  ",
							ModalS : true,
							titre : "Ajout d'un état",
							titreActivation : true,
							description : false,
							typeInfos :"state"
						});
				break;

		case "warning" : 
			this.setState({ titre : "Vous n'avez pas choisi de noeud ou alors il n'existe plus !  ",
							ModalS : true,
							description : false,
							titreActivation : false,
							messageMS : "",
				});
				break;
		case "publish" : 
			this.setState({ titre : "Pré-publication workflow  ",
							messageMS : "Titre du workflow",
							titreActivation : true,
							ModalS : true,
							description : true,
							typeInfos : "publication"
					});
		break;
					
		case "save" : 
			this.setState({ titre : "Enregistrement  ",
							messageMS : "Titre de la sauvegarde",
							titreActivation : true,
							ModalS : true,
							description : true,
							typeInfos : "save"
					});
		break;
		case "tache" : 
			this.setState ({ modalTask : true	});
		break;
	
		case "error":
			this.setState({ titre : "Erreur de création de la tâche ! ",
			ModalS : true,
			description : false,
			titreActivation : false,
			messageMS : "",
		});
		break
		case "see" :
			this.setState({ titre : "Export XML",
				ModalS : true,
				description : false,
				titreActivation : false,
				messageMS : Kaleo.XML(this.state.nodes,this.state.transis,model.getID(),"Pré-vue XML","A défnir",false),
			});
			break;
break;

			
	}
}

turnModalOff(option)
{
	switch(option)
	{
		case "close" : 
			this.setState({ ModalS : false })
			break;
		case "notifications" :
			this.setState({ NotificationsPageModal : false })
			break;
		case "actions" : 
			this.setState({ ActionsPageModal : false})
			break;
		case "tache" :
			this.setState({ modalTask : false})
			
	}
}


handleClickEditNotifications(e,data){	this.toggleNotif()	}
handleClickEditAction(e,data){	this.toggleActions()	}

componentDidMount(){
	model = new DiagramModel();
	this.loadDiagram()
	
	//Il faut l'appeler là sinon il faut cliquer deux fois sur Designer pour faire apparaitre
	this.componentWillReceiveProps()

}
componentWillReceiveProps(){
	//Pas sur de comprendre pourquoi il faut ces deux vérifications
	if(this.props.sauvegarde !==  [] && this.props.sauvegarde.length > 0) {
		this.ImportJSON(this.props.sauvegarde)
	}
	
}

clean(options)
{
	switch(options)
	{
		case "notifications" : this.setState({ elementNotif : null}); break;
		
		case "actions" : this.setState({ elementAct : null}); break;
	}
}


loadDiagram() {
	

	//Loading of the diagramm for the first time
	//this.setState({ nodes: [] }); ça supprime les noeuds initiaux dans le state no lo sé porqué
	var start = new  DefaultNodeModel("Debut", "#003e79" );
	var end = new DefaultNodeModel( "Fin", "#e5224b");
	let portStart = start.addOutPort("➡");
	let portEnd = end.addInPort("⬅");

	start.setPosition(20, 20);
	end.setPosition(700, 300);
	start.addListener({
		selectionChanged : () => {
			if (start.isSelected() )
			{	this.keepID(start.id)	}
		}	
	});

	end.addListener({
		selectionChanged : () => {
			if (end.isSelected() )
				{	this.keepID(end.id) 	}
		},
			
	});
	
	start.name = "Debut"
	end.name = "Fin"
	start.extras.delete = false
	end.extras.delete = false
	start.extras.type = "state"
	end.extras.type = "state"
	start.extras.initial=true
	end.extras.initial=false
	start.extras.actions = []
	start.extras.transitions = []
	start.extras.notifications = []
	start.extras.transitions = []

	end.extras.actions = []
	end.extras.transitions = []
	end.extras.notifications = []
	end.extras.transitions = []
	
	

	////console.log("Chargement Premiers Noeuds")
	this.state.nodes.push(start);
	this.state.nodes.push(end);
	////console.log(this.state.nodes)


	model.addAll(start,end);
	this.ListenerModel();
	
	this.Update()
}

addListLink(element){
	element.addListener({
		selectionChanged :(e) =>{
			////console.log( "addListLink - " , e.entity.id)
			this.setState({ID : e.entity.id })
			
		}	
	});

}

addListNode(element){
	element.addListener({
		
		selectionChanged : () => {
			if (element.isSelected() )
			{
				////console.log( "addListNode  " )
				GOTID = element.getID()
				this.keepID( GOTID )
			}
		}	
	});
}

ListenerModel(){
	model.addListener({
		linksUpdated:(entity) => {
			if(entity.isCreated){
				entity.link.addListener({
					targetPortChanged:() => { 
						// On ajoute un label dès qu'on a atteint un autre Noeud avec notre Link
						var LinkIntel = entity.link
						//Le Lien prend le nom du noeud où on vise
						var LabelName =LinkIntel.getTargetPort().parent.name //on nomme directement le lien avec le noeud cible
						LinkIntel.addLabel(LabelName)
						LinkIntel.name = LabelName
						LinkIntel.extras="Link"
						var NewTrans = new Transition(
						// On crée une tranisition qu'on envoie dans un state pour les avoir plus simplement
							LinkIntel.name,
							LinkIntel.getTargetPort().parent.name,
							LinkIntel.id,
							LinkIntel.getSourcePort().parent.id)
							var So = model.getNode(LinkIntel.getSourcePort().parent.id)
							if (So != null )
							{ 
								So.extras.transitions.push(NewTrans)
							}
							 
							//On met directement dans le noeud cette fois pour tout stocké dans le noeud
					},
					selectionChanged :(e) =>{
						this.setState({ID : e.entity.id })
						////console.log(" ListenerModel  - " , this.state.ID)
					}
				})
			}

			if(entity.isCreated === false){
				////console.log(entity)
				////console.log("Delete - " + entity.link.id)
				var toDel = model.getNode(entity.link.getSourcePort().parent.id)
				var toDelID = entity.link.id
				if(toDel != null){
					toDel.extras.transitions.forEach( element => { 
						// On cherche par ID et on supprime pour le rajouter à nouveau avec la liste Actions updtate
						if(element.IDLink === toDelID ) { 
							var place =  toDel.extras.transitions.indexOf(element)
							toDel.extras.transitions.splice( place , 1)
						}
					});

				}
			}

		},
		
		
		
	})

	
}

FillValidationNode(Intels){

	Tsk = Intels;
	if( Tsk !== null) { 
	if (Tsk.name != null) {var nodetask = new DefaultNodeModel(Tsk.name, "#fcbc0f"); }
	else {var nodetask = new DefaultNodeModel("Task", "#fcbc0f"); }

	let Task0 = nodetask.addInPort("⬅  ");
	let Task1 = nodetask.addOutPort("  ➡");
		
	nodetask.setPosition(140,130)
	nodetask.extras.actions = []
	nodetask.extras.transitions = []
	nodetask.extras.notifications = []
	nodetask.extras.transitions = []
	nodetask.extras.type = "task"
	nodetask.extras.choix = Tsk.Choix
	nodetask.extras.roleID = Tsk.roleID
	nodetask.extras.TaskTimer = Intels.TaskTimer
	nodetask.extras.taskPattern = Intels
	nodetask.addListener({
		selectionChanged : () => {
			if (nodetask.isSelected() )
			{
				GOTID = nodetask.getID()
				this.keepID( GOTID )
			}
		}	
	});
	

	switch(Tsk.Choix){
		case 'A':
			break;
		case 'B' :
			nodetask.extras.roles = Tsk.roles
			break;
		case 'C' : 
			nodetask.extras.RoleID = Tsk.RoleID
			break;
		case 'D' : 
			nodetask.extras.ScriptLangage = Tsk.ScriptLangage
			nodetask.extras.Script = Tsk.Script
			break;
		case 'E':
			nodetask.extras.RoleID = Tsk.RoleID
			nodetask.extras.ScreenName = Tsk.ScreenName
			nodetask.extras.mailUser = Tsk.mailUser
			nodetask.extras.Dunno = Tsk.Dunno
			break;
		case 'F' :
			nodetask.extras.RessourcesActions=Tsk.RessourcesActions
			break;
	}

	Tsk = new Task('Dunno')

	
	var Accept = new DefaultNodeModel("Accepter", "#039a8b");
		
	let Port1 = Accept.addInPort("⬅  ");
	let Port2 = Accept.addOutPort("  ➡");
	Accept.setPosition(440,50)
	
	
	Accept.extras.actions = []
	Accept.extras.notifications = []
	Accept.extras.type = "state"
	Accept.extras.transitions = []

	Accept.addListener({
			selectionChanged : () => {
				if (Accept.isSelected() )
				{
					GOTID = Accept.getID()
					this.keepID( GOTID )
				}
			}
	});
	
	
	

	var Refus = new DefaultNodeModel("Refuser", "#ff6177");
		
	let Port3 = Refus.addInPort("⬅  ");
	let Port4 = Refus.addOutPort("  ➡");
	Refus.setPosition(440,180)
		
	
	Refus.extras.actions = []
	Refus.extras.notifications = []
	Refus.extras.type = "state"
	Refus.extras.transitions = []

	Refus.addListener({
			selectionChanged : () => {
				if (Refus.isSelected() )
				{
					GOTID = Refus.getID()
					this.keepID( GOTID )
				}
			}
	});
	
	this.state.nodes.push(nodetask);
	this.state.nodes.push(Refus);
	this.state.nodes.push(Accept); 

	var link4 = new DefaultLinkModel()
	link4.addLabel("Accepter")
	link4.setSourcePort(Task1)
	link4.setTargetPort(Port1) 
	

	var link5 = new DefaultLinkModel()
	link5.addLabel("Refuser")
	link5.setSourcePort(Task1)
	link5.setTargetPort(Port3) 
	model.addAll(link5,link4,Accept,Refus,nodetask);

	var newTran1 = new Transition("Accepter","Accepter",link4.id,nodetask.id)
	var newTran2 = new Transition("Refuser","Refuser",link5.id,nodetask.id)
	nodetask.extras.transitions.push(newTran1)
	nodetask.extras.transitions.push(newTran2)

	this.Update();
	}
}


Update(){
	engine.setDiagramModel(model);
	this.setState({dEngine: engine})
}

getState(){		return this.state.ID	}// On retourne l'ID du Noeud sélectionné
getType(){
	var Type = null
	var Node = model.getNode(this.getState())
	if (Node !== null)  { Type = Node.extras }
	if( Type !== null ) { 
		////console.log("Type", Type.type)
		return Type.type }
	
}
getStatut(){
	var Type = null
	var Node = model.getNode(this.getState())
	if (Node !== null)  { Type = Node.extras }
	if( Type !== null ) { return Type.delete }
}
loading(){ alert("Fonctionnalité à implémenter :) !") }

keepID(id) { // Mystère et Boule de gomme
	this.state.ID = id ;// Passe quand il veut
	this.setState({ID: id})// Passe mais je ne sais pas pourquoi quand il veut aussi donc faut les deux

	//On charge aussi le contenu actions/notifications pour utiliser celle-ci et les gerer
	if (model.getNode(this.state.ID) != null) {
		this.setState({ currentNotif : model.getNode(this.state.ID).extras.notifications })
		this.setState({ currentAct : model.getNode(this.state.ID).extras.actions })
}
}
handleClickModif(e, data){
	////console.log(e)
	var tempLink = model.getLink(data.ID)
	var tempNode = model.getNode(data.ID)
	//console.log("handleClickModif")
	if (tempNode != null) {
		this.setState({ nodeModif : tempNode.extras.taskPattern})
		this.turnModalOn("tache")
	}
	else {
		if (tempLink != null) {
			//console.log(tempLink)
			alert("On ne peut pas modifier un lien :)")
		}
		else {
			//console.log("Erreur handleClickModif : " + data.ID)
			//console.log("Element handleClickModif -> " + tempLink)
		}
	}

	this.Update() 

}

DelLinks(id)
{   if ( model.getLink(id) !== null) {
	model.removeLink(id)
	this.state.transis.forEach( element => {
	if(element.id === id ) { 
		var place =  this.state.transis.indexOf(element)
		this.state.transis.splice( place , 1)
			 	}
			});
			this.Update() 
		}
	else 
	{
		//console.log(" l'id ", id ," n'existe pas ")
	}
}

handleClickDel(e,data) {
	////console.log("handleClickDel - Suppression :" + data.ID)
	var tempLink = model.getLink(data.ID)
	var tempNode = model.getNode(data.ID)
	var tempPorts = tempNode.getPorts();
	

	var iteration = 0;
	var iterationBis = 0;
	var port = null
	var links = null
	var identifiant = null

	while ( tempPorts[Object.keys(tempPorts)[iteration]] !== undefined )
	{
		port = tempPorts[Object.keys(tempPorts)[iteration]]

		iteration++
		links = port.getLinks()
		//console.log("LINKS - Group" , iteration , links)
		while ( links[Object.keys(links)[iterationBis]] !== undefined )
		{
			identifiant = links[Object.keys(links)[iterationBis]]
			//console.log("Links number " , iterationBis , identifiant )
			this.DelLinks(identifiant.id)
			iterationBis++;
		}
	}
	////console.log("tempNode" , tempNode)

	if (tempNode != null) {
		model.removeNode(data.ID)
		this.state.nodes.forEach( element => { // On cherche par ID et on supprime pour le rajouter à nouveau avec la liste Actions updtate
			if(element.id === data.ID ) { 
				var place =  this.state.nodes.indexOf(element)
				this.state.nodes.splice( place , 1)
			}
		});
		
	}
	else {
		if (tempLink != null) {
			////console.log(tempLink)
			model.removeLink(data.ID)
			this.state.transis.forEach( element => { // On cherche par ID et on supprime pour le rajouter à nouveau avec la liste Actions updtate
				if(element.id === data.ID ) { 
					var place =  this.state.transis.indexOf(element)
					this.state.transis.splice( place , 1)
				}
			});
		}
		else {
			//console.log("Erreur handleClickDel : " + data.ID)
			//console.log("Element handleClickDel -> " + tempLink)
		}
	}

	this.Update() 
}
async handleClickDraft(nom, description){
	//console.log("Creation ....")
	let obj = await ressourceActions.getCurrentUser()
	//console.log(obj)

	let object2 = {}
	var str = JSON.stringify(model.serializeDiagram(), null, 4)
	object2.nom = nom
	object2.description = description
	object2.workflowId = model.getID()
	object2.jsonFile = str
	object2.userId = obj.userId
	object2.companyId = obj.companyId
	object2.createDate = null
	object2.modifiedDate = null
	//console.log(str)
	let obj2 = await ressourceActions.pullJsonWF(JSON.stringify(object2))
	//console.log("JSON SEND")
	//console.log(obj2)
	AlertUtil.alert("Sauvegarde effectuée ! " , "success");


}
FillTaskNode(Intels){
	Tsk = Intels;
	if (Intels !== null ){
    if (Tsk.name != null) {var nodetask = new DefaultNodeModel(Tsk.name, "#fcbc0f"); }
    else {var nodetask = new DefaultNodeModel("Task", "#fcbc0f"); }

    let Task0 = nodetask.addInPort("⬅  ");
    let Task1 = nodetask.addOutPort("  ➡");
    this.state.nodes.push(nodetask); 

    nodetask.extras.actions = []
    nodetask.extras.transitions = []
    nodetask.extras.notifications = []
    nodetask.extras.transitions = []
    nodetask.extras.type = "task"
    nodetask.extras.choix = Tsk.Choix
    nodetask.extras.roleID = Tsk.roleID
    nodetask.extras.TaskTimer = Intels.TaskTimer
    nodetask.extras.taskPattern = Intels
    nodetask.addListener({
        selectionChanged : () => {
            if (nodetask.isSelected() )
            {
                GOTID = nodetask.getID()
                this.keepID( GOTID )
            }
        }	
    });
    ////console.log(nodetask)

    // Passage de Object à Array
    var Group = model.getNodes()
    var Group2 = Object.assign(Group)
    ////console.log(Group2)


    for (const property in Group2) {
        var element = Group2[property]
        if(element.extras.type === "task"){
            //console.log("FillTaskNode -  tache ! ")
            if(element.extras.taskPattern.ID === Intels.ID ){
                //console.log(" Delete - Task")
                model.removeNode(element.id)
                this.state.nodes.forEach( e => { // On cherche par ID et on supprime pour le rajouter à nouveau avec la liste Actions updtate
                    if(e.id === element.id ) { 
                        var place =  this.state.nodes.indexOf(e)
                        this.state.nodes.splice( place , 1)
                    }
                });

            }
      }
    }
    this.Update();

    
    model.addAll(nodetask);
    this.Update();

    switch(Tsk.Choix){
        case 'A':
            break;
        case 'B' :
            nodetask.extras.roles = Tsk.roles
            break;
        case 'C' : 
            nodetask.extras.RoleID = Tsk.RoleID
            break;
        case 'D' : 
            nodetask.extras.ScriptLangage = Tsk.ScriptLangage
            nodetask.extras.Script = Tsk.Script
            break;
        case 'E':
            nodetask.extras.RoleID = Tsk.RoleID
            nodetask.extras.ScreenName = Tsk.ScreenName
            nodetask.extras.mailUser = Tsk.mailUser
            nodetask.extras.Dunno = Tsk.Dunno
            break;
        case 'F' :
            nodetask.extras.RessourcesActions=Tsk.RessourcesActions
			break;
	
    }

Tsk = new Task('Dunno')
}
}

newNodesState(name,width,height,color){
		
	var node6 = new DefaultNodeModel(name, color);
	
	let Stat0 = node6.addInPort("⬅  ");
	let Stat1 = node6.addOutPort("  ➡");
	node6.setPosition(width,height)
	this.state.nodes.push(node6); 
	
	node6.extras.actions = []
	node6.extras.notifications = []
	node6.extras.type = "state"
	node6.extras.transitions = []

	node6.addListener({
			selectionChanged : () => {
				if (node6.isSelected() )
				{
					GOTID = node6.getID()
					this.keepID( GOTID )
				}
			}
	});
	
	model.addAll(node6);
	this.Update();
	

}
GetNotif(Notif){
	var nodeNotif = model.getNode(this.getState()) 

	if ((this.state.ID === "Vide" ) || ( nodeNotif === null )) { 
		this.turnModalOn("warning")
	}
	else {	nodeNotif.extras.notifications.map((element) => {
			if(element.notId === Notif.notId )
			this.DelNotif(element.notId)
		})
		
			nodeNotif.extras.notifications.push(Notif)
			//Pour lors de la sauvegarde qu'il ne soit pas forget too'
			model.removeNode(this.getState())
			model.addNode(nodeNotif)
	}
	//this.toggleNotif();
}
getAct(Act){
	var NodeAction = model.getNode(this.getState())  
	
	
	if ((this.state.ID === "Vide" ) || ( NodeAction === null )) { 
			this.turnModalOn("warning")
		}
	
	
	
	
	else { NodeAction.extras.actions.map((element) => {
		if(element.Act_id === Act.Act_id )
		this.DelAct(element.Act_id)
		})	
		NodeAction.extras.actions.push(Act)
		//Pour assurer que l'action soit sauvé durant la sauvegarde sous forme JSON
		model.removeNode(this.getState())
		model.addNode(NodeAction)
	}
	//this.toggleActions();

}
DelNotif(Sup) {
	var nodeNotif = model.getNode(this.getState()) 


	if ( (this.state.ID === "Vide" ) || ( nodeNotif === null ) ) { 
		this.turnModalOn("warning")
	}

	else {	nodeNotif.extras.notifications.forEach(element => { 
			if(element.notId === Sup){
				var place =  nodeNotif.extras.notifications.indexOf(element)
				nodeNotif.extras.notifications.splice( place , 1)
			}
	})
			//Pour lors de la sauvegarde qu'il ne soit pas forget too'
			model.removeNode(this.getState())
			model.addNode(nodeNotif)
	}
	this.Update()

}
DelAct(Sup){
	this.clean("actions")
	var nodeNotif = model.getNode(this.getState()) 

	if ( (this.state.ID === "Vide" ) || ( nodeNotif === null ) ) { 
		this.turnModalOn("warning")
	}
	
	else {	nodeNotif.extras.actions.forEach(element => { 
			if(element.Act_id === Sup){
				var place =  nodeNotif.extras.actions.indexOf(element)
				nodeNotif.extras.actions.splice( place , 1)
			}
	})
			//Pour lors de la sauvegarde qu'il ne soit pas forget too'
			model.removeNode(this.getState())
			model.addNode(nodeNotif)
	}
	this.Update()
}
modifyNotif(Sup){
	//console.log("modifyNotif",Sup)
	var nodeNotif = model.getNode(this.getState()) 

	if ( (this.state.ID === "Vide" ) || ( nodeNotif === null ) ) { 
		this.turnModalOn("warning")
	}
	else {	nodeNotif.extras.notifications.forEach(element => { 
			if(element.notId === Sup){
				////console.log(element)
				this.setState({ elementNotif : element})
				//this.toggleNotif();
		}
	})
	this.forceUpdate()
	}
}
modifyAct(modifAct){
	//console.log("modifyAct" ,modifAct)

	var nodeNotif = model.getNode(this.getState()) 

	if ( (this.state.ID === "Vide" ) || ( nodeNotif === null ) ) { 
		this.turnModalOn("warning")
	}
	else {	nodeNotif.extras.actions.forEach(element => { 
			if(element.Act_id === modifAct){
				//console.log(element)
				this.setState({ elementAct : element})
				this.state.elementAct = element 

				//console.log(this.state.elementAct)
				if(this.state.elementAct != null){
					if(this.state.elementAct.typeAct != null){
						//console.log("Mail")
						//alert("on veut modifier un mail")
						//this.toggleMail();
						//alert("modify act" + modifAct)
						this.setState({ elementAct : element})
					}
					else{
						//console.log("Action simple")
						this.setState({ elementAct : element})
					}
					
					}
					
				
			}
		})
	}

}
menuBarre(id){
	switch(id){
		case "Zoom" :
			engine.zoomToFit();
			break;
		case "starOver" :
			model = new DiagramModel();
			this.setState({ID: " Vide"})
			this.setState({transis: [] })
			this.setState({nodes: [] })
			this.setState({ IDLink : "NONE"})
			this.loadDiagram()
			break;
		/*case "xml":
			this.togglexmlsave()
			break;
		case "jsonSave":
			this.toggleJson();
			break;
		case "xmlList" :
			this.togglexmlList()
			break;
		*/
		case "notifications" :
			this.toggleNotif() 
			break;

		case "actions" :
			this.toggleActions() 
			break;
/*
		case "Groovy" :
			this.togglegroovy()
			break;
		
		case "add-act" :
			this.setState({elementAct : null})
			
			break;

		case "add" :
			this.setState({elementNotif : null})
			break;
			/*
		case "delete-notif" :
			this.DelNotif();
			break;

		case "add-groovy" :
			this.toggleGroovyAdd()
			break;
		
		case "Help":
			this.toggleHelp();
			break;
		case "Act_modifier":
			this.loading();
			break; 

		*/case "plus":
			Zoom =Zoom+10
			model.setZoomLevel(Zoom)
			this.Update()
			break;
		case "moins":
			Zoom =Zoom-10
			model.setZoomLevel(Zoom) 
			this.Update()
			break;
/*
		case "cus-mail":
			this.setState({elementAct : null})
			this.toggleMail();
			break;
*/


		default : 
			//console.log("menuBarre erreur : " + id)
			this.loading();
	}
}
ImportJSON(text){
	//console.log("Chargement Sauvegarde")
	var JSONdraft = JSON.parse(text);

	engine.installDefaultFactories();
	model = new DiagramModel();
	model.deSerializeDiagram(JSONdraft,engine)
	this.ListenerModel()
	this.Update()

	//Il faut tout réinitialialiser et remettre à zéro
	this.setState({ ID: " Vide"})
	this.setState({ transis: [] })
	this.setState({ IDLink : "NONE"})
	this.setState({ links : [] })
	this.setState({ nodes : [] })


	var NewNodes = model.getNodes()
	var NewLinks = model.getLinks()
	//console.log(model.getLinks())
	//console.log(model.getNodes())
	var compteur =  0
	var newArray = []
	var newArray1 = []

	//Elle récupère les Noeuds pour pouvoir les mettre dans un states
	while ( NewNodes[Object.keys(NewNodes)[compteur]] != undefined ){
		newArray.push(NewNodes[Object.keys(NewNodes)[compteur]])
		this.addListNode(NewNodes[Object.keys(NewNodes)[compteur]])
		////console.log(NewNodes[Object.keys(NewNodes)[compteur]])
		compteur++;
	}

	compteur = 0 ;
	while ( NewLinks[Object.keys(NewLinks)[compteur]] != undefined ){
		newArray1.push(NewLinks[Object.keys(NewLinks)[compteur]])
		this.addListLink(NewLinks[Object.keys(NewLinks)[compteur]])
		compteur++;
	}

	// On remplace avec l'import
	this.setState({ links : newArray1 })
	this.setState({ nodes : newArray })

	//Il faut rajouter les listenner qui ont disparu
	this.state.links.forEach(element => {
		this.addListLink(element) // dans le state
	})

	this.state.nodes.forEach(element => {
		this.addListNode(element)
	})
	this.forceUpdate();
	this.Update()
	//console.log("On vide")
	this.props.sauvegarde =  []
}

useInformations(nom, description,options){
	const { nodes , transis } = this.state
	//console.log("Parametres", options, nom,description)
	switch(options)
	{
		case "state":
			//console.log("Création ETAT") 
			this.createState(nom); 
			break;
		case "publication" : 
			//console.log("sauvegarde XML")
			Kaleo.XML(nodes,transis,model.getID(),nom,description,true)
			break;
		case "save": 
			//console.log("Enregistrement")
			this.handleClickDraft(nom, description)
			break;
	}
	this.turnModalOff("close")
}

createState(name){
	var node6 = new DefaultNodeModel(name, "#fb9744");
	let Stat0 = node6.addInPort("⬅  ");
	let Stat1 = node6.addOutPort("  ➡");
	this.state.nodes.push(node6); 
	
	node6.extras.actions = []
	node6.extras.notifications = []
	node6.extras.type = "state"
	node6.extras.transitions = []

	node6.addListener({
		selectionChanged : () => {
			if (node6.isSelected() )
			{
				GOTID = node6.getID()
				this.keepID( GOTID )
			}
		}
	});
	model.addAll(node6);

	//console.log("Actualisation pour l'état")
	this.Update()
	
}
mousetime(e)
{   //console.log(e)
	//console.log(e.selectionModels)
	e.selectionModels.forEach(element =>{
		//console.log("X : ",element.model.x  , "Y : " , element.model.y )

		
		if (element.model.listeners !==  [] )
		{		console.log(element.model)
			if (element.model.x < 0 ) 
			{
				element.model.setPosition(0,element.model.y)
			}
			else if (element.model.x > 850 ) 
			{
				element.model.setPosition(820,element.model.y)
			}
			if  (element.model.y > 375 ) 
			{
				element.model.setPosition(element.model.x,375)
			}
			else if (element.model.y < 0 ) 
			{
				element.model.setPosition(element.model.x,0)
			}
			if ( (element.model.x < 0 ) && (element.model.y < 0 ) )
			{
				element.model.setPosition(0,0)
			}

		}
	
	})
}
buildNodes(id){
	//this.loading()
	switch(id){/*
		case 'Condition' :
			this.loading();
			//this.toggleCond();
			break;*/
	case"Validation":
		//this.toggleValidationTask();
		//console.log("Creation Validation")
		this.setState({ validationGroup : true ,
						nodeTemp : null,
						nodeModif : null })
		this.turnModalOn("tache")
		break;
	case "Yes":
		this.newNodesState("Accepter",200,200,"#039a8b")
		break;
	case"No":
		this.newNodesState("Refuser",250,250,"#ff6177")
		break;
	case"Try":
		this.loading()
		break;

		/*case 'Join' :
			var OP = prompt("Nom : ")
			var node3 = new DefaultNodeModel(OP, "green");
			let Join0 = node3.addInPort("⬅IN-");
			let Join1 = node3.addOutPort("OUT➡");
			this.state.nodes.push(node3); 
			
			node3.extras.Actions = []
			node3.extras.Transitions = []
			node3.extras.Notifications = [] 
			node3.extras.Type="join"
			node3.extras.Transitions = []

			node3.addListener({
					selectionChanged : () => {
						if (node3.isSelected() )
						{
							GOTID = node3.getID()
							this.keepID( GOTID )
						}
					}	
			});
			model.addAll(node3);
			break;
		case 'XOR' :
			var OK = prompt("Nom : ")
			var node4 = new DefaultNodeModel(OK, "rgb(236, 233, 29)");
			let XOR0 = node4.addInPort("⬅IN-");
			let XOR1 = node4.addOutPort("OUT➡");
			this.state.nodes.push(node4); 
			node4.extras.Actions =[]
			node4.extras.Notifications = []
			node4.extras.Type="join-xor"
			node4.extras.Transitions = []

			node4.addListener({
					selectionChanged : () => {
						if (node4.isSelected() )
						{
							GOTID = node4.getID()
							this.keepID( GOTID )
						}
					}
			});
			model.addAll(node4);
			break;
		case 'Fork' :
			var FR = prompt("Nom : ")
			var node5 = new DefaultNodeModel(FR, "blue");
			let Cond0 = node5.addInPort("⬅IN-");
			let Cond1 = node5.addOutPort("OUT➡");
			this.state.nodes.push(node5); 
			node5.extras.Actions = []
			node5.extras.Notifications = []
			node5.extras.Type = 'fork'
			node5.extras.Transitions = []

			node5.addListener({
			selectionChanged : () => {
						if (node5.isSelected() )
						{
							GOTID = node5.getID()
							this.keepID( GOTID )
						}
					}
					});
			model.addAll(node5);
			break;*/
		case 'State' :
			//console.log("Modal turn on")
			
			this.turnModalOn("state")


		break;
		case 'task' :
			//console.log("Creation Tache")
			this.setState({ 
				nodeTemp : null ,
				nodeModif : null,
				validationGroup : false,
			})
			
			this.turnModalOn("tache")
			break;
		default :
		//console.log("Dear Peasant, You did wrong : -> " + id );
		break ;
	}
	
//}
this.Update()
}

getActMail(ActM){
	////console.log(ActM)
	var NodeAction = model.getNode(this.getState())  
	if ((this.state.ID === "Vide" ) || ( NodeAction === null )) { 
				this.turnModalOn("warning")
			}
	else {
		////console.log("BOOM")
		NodeAction.extras.actions.map((element) => {
		if(element.Act_id === ActM.Act_id )
			this.DelAct(element.Act_id)
		})	
		NodeAction.extras.actions.push(ActM)
		//Pour assurer que l'action soit sauvé durant la sauvegarde sous forme JSON
		model.removeNode(this.getState())
		model.addNode(NodeAction)
	}
		
	
}
render() {
	const { ID, ModalS , messageMS,titre , description , 
		titreActivation, typeInfos , modalTask , validationGroup} = this.state;
	return (
		<div className="responsive-container" >
		
			<Barre
				ID = {this.getState()}
				Choix = {id => this.menuBarre(id) }
				Import = {this.ImportJSON} 
			/>
			<div className="agiir-workflow-design">
		<Palette callback={id => this.buildNodes(id)} />
		<ContextMenuTrigger id="RightClick">
			{this.state.dEngine && <DiagramWidget diagramEngine={this.state.dEngine} 
                                                    allowCanvasTranslation={true}
													actionStillFiring={(e) => this.mousetime(e)}
													smartRouting={true}
													deleteKeys={['space']}
													
													allowLooseLinks={true}
													onWheel={false}
													allowCanvasZoom={false}
													maxNumberPointsPerLink={0}/>}
				
		</ContextMenuTrigger>
		<ContextMenu id="RightClick"   >
			{ ID !=="Vide"  && this.getType() !== "state" && 
			<MenuItem className="agiir-workflow-contextmenu" 
						attributes={{id : "MenuItem" }}
						data={{ID : this.getState()}} 
						hidden={true} 
						onClick={this.handleClickModif}>
				<Icon size={16} icon={ic_build}/>{' '}
				Modifier
			</MenuItem>}
			{ ID !=="Vide"  && this.getStatut() !== false && 
			<MenuItem className="agiir-workflow-contextmenu" 
						attributes={{id : "MenuItem" }}
						data={{ID : this.getState()}}  
						onClick={this.handleClickDel}>
				<Icon size={16} icon={trash}/> {' '}
				Supprimer
			</MenuItem>}

			<MenuItem className="agiir-workflow-contextmenu"
						attributes={{id : "MenuItem" }} 
						data={{ID : this.getState()}}  
						onClick={this.handleClickEditNotifications}>
				<Icon size={16} icon={ic_assignment}/> {' '}
				Notifications
			</MenuItem>

			<MenuItem className="agiir-workflow-contextmenu"
						attributes={{id : "MenuItem" }} 
						data={{ID : this.getState()}}  
						onClick={this.handleClickEditAction}>
				<Icon size={16} icon={ic_assignment_ind}/> {' '}
				Actions
			</MenuItem>

		</ContextMenu>

		<NotificationsPage 
			elementNotification = {this.state.elementNotif} 
			isOpen={this.state.NotificationsPageModal} 
			close ={close => this.turnModalOff(close)}
			toggle={() => this.toggleNotif()} 
			Notif={Notif => this.GetNotif(Notif)}
			Add={ Add => this.menuBarre(Add)} 
			Sup={ Sup => this.DelNotif(Sup)}
			notifCurrent = { notifCurrent => this.cNotif() }
			modifNotif = {modifNotif => this.modifyNotif(modifNotif)}
			clean = { clean => (this.clean("notifications"))}
			/>

		<ActionPage 
			elementAction = {this.state.elementAct}
			isOpen={this.state.ActionsPageModal}
			close ={close => this.turnModalOff(close)}
			toggle={() => this.toggleActions()}
			Act ={Act => this.getAct(Act)}	
			Add={ Add => this.menuBarre(Add)}
			Del={ Del => this.DelAct(Del)}
			ActM ={ActM => this.getActMail(ActM)}
			notifCurrent = { notifCurrent => this.cAct()}
			modifAct = { modifAct => this.modifyAct(modifAct)} 
			clean = { clean => (this.clean("actions"))} />

	
	

		</div>
		<div className="agiir-workflow-validation" >
		<Button 
		hidden = {true}
			id="button-draft" 
			color="yellow" 
			onClick={() => this.turnModalOn("see")} >

			<AgiirIconDropDown icon={"ic_remove_red_eye"} />{" "}
			<span>Voir</span> 
		</Button>&nbsp; &nbsp; &nbsp;
		<Button 
			id="button-draft" 
			color="primary" 
			onClick={() => this.turnModalOn("save")} >

			<AgiirIconDropDown icon={"ic_save"} />{" "}
			<span>Enregistrer</span> 
		</Button>

		<Button 
			id="button-save" 
			color="secondary" 
			onClick={ () => this.turnModalOn("publish") } >
				<AgiirIconDropDown icon={"ic_send"} />{" "}
				<span>Pré-publier</span>
		</Button>
	</div>

	<ModalTask 	
		nodeModif = {this.state.nodeModif}
		open={modalTask} 
		close ={close => this.turnModalOff("tache")}
		Intels={Intels => this.FillTaskNode(Intels)}
		IntelVal={Intels => this.FillValidationNode(Intels)}
		error = {error => this.turnModalOn("error")}
		validationGroup ={validationGroup}/>

	<ModalSmall 
		open={ModalS}
		close ={close => this.turnModalOff(close)}
		titre={titre} 
		message = {messageMS}
		descriptionProps={description}
		titreProps={titreActivation}
		informations = { (nom,description) => this.useInformations(nom,description,typeInfos)}
	/>

		</div>
		
	);
}
    



}


export default DesignerPage
