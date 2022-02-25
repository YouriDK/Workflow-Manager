import React from 'react';
import { 
	Button,
	Modal,
	Form, 
	FormGroup, 
	Label, 
	Input} from 'reactstrap';
import {action , mail } from '../components/ElementWF';
import * as ressourceActions from "../actions/RessourceAction";
import { AgiirIcon } from '../utils/AgiirIcons'
var element = {}
var remplacement =``

const userId = Liferay.ThemeDisplay.getUserId();
const groupId = Liferay.ThemeDisplay.getScopeGroupId();
const companyId = Liferay.ThemeDisplay.getCompanyId();

class MailPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        tooltipOpen : false, 
        formulaire : [],
        champ_formulaire : null,
        user : null,
        group : null,
		value: `Contenu du mail`,
		//structure : 0 ,

		titreAction : props.elementAction != null ? props.elementAction.name : "",
        templateAction : props.elementAction != null ? props.elementAction.description : "",
        ScriptAction : props.elementAction != null ? props.elementAction.template : "",
		activationAction : props.elementAction != null ? props.elementAction.Ex_Type : "",

		// Infos Mail
		adresseTo  : props.elementAction != null ? props.elementAction.scriptID.destinataire : "",
		adresseFrom  : props.elementAction != null ? props.elementAction.scriptID.from : "",
		mailObject  : props.elementAction != null ? props.elementAction.scriptID.object : "",
		mailBody  : props.elementAction != null ? props.elementAction.scriptID.body : "",
		mailType  : props.elementAction != null ? props.elementAction.scriptID.type : "",
  
      };
  
      this.toggle = this.toggle.bind(this);
      this.toggleToolTip = this.toggleToolTip.bind(this);
	  this.NextChoicefields = this.NextChoicefields.bind(this);
	  this.NextChoice = this.NextChoice.bind(this);
      this.handleChange = this.handleChange.bind(this);
  
    }
  
    toggle() { this.setState(prevState => ({ modal: !prevState.modal })); }
    toggleToolTip() { this.setState(prevState => ({ tooltipOpen: !prevState.tooltipOpen })); }
    
  
    /*async componentDidMount(){
        let obj2 = await ressourceActions.getCurrentUser();
        this.setState({user : obj2 })
        let obj3 = await ressourceActions.getUserGroup(this.state.user.companyId,this.state.user.userId );
        this.setState({group : obj3 })
        let obj4 = await ressourceActions.ddmGetAllFormInstances(companyId,groupId);
        this.setState({formulaire : obj4 })
       
	}*/
	async componentWillMount(){
		let obj2 = await ressourceActions.getCurrentUser();
        this.setState({user : obj2 })
        let obj3 = await ressourceActions.getUserGroup(this.state.user.companyId,this.state.user.userId );
        this.setState({group : obj3 })
        let obj4 = await ressourceActions.ddmGetAllFormInstances(companyId,groupId);
        this.setState({formulaire : obj4 })
	}

	handleChange(e) {
	let change = {};
	change[e.target.name] = e.target.value;
	this.setState(change);
	}

    async NextChoice(e){
		console.log("Structure", e)
		console.log("Valeur de la structure", e.target)
		console.log("Option de la structure", e.target.selectedOptions)
		console.log("VALEUR de la structure", e.target.selectedOptions[0].value)
		var num = parseInt(e.target.selectedOptions[0].value)
		let obj2 = await ressourceActions.getStructure(num);
		this.setState({champ_formulaire : obj2 })
	}
	
	componentWillReceiveProps(nextProps){ 
		//console.log("willreceiveprops"); 
		if (this.props.geet === true){
			console.log("CA MARCHE")
		}
		this.setState({ 
			
			titreAction : nextProps.elementAction ? nextProps.elementAction.name : "" ,
			templateAction : nextProps.elementAction ? nextProps.elementAction.description : "" ,
            ScriptAction :nextProps.elementAction ? nextProps.elementAction.scriptID : "" ,
			activationAction :nextProps.elementAction ? nextProps.elementAction.Ex_Type : "" ,
			
			adresseTo : nextProps.elementAction != null ? nextProps.elementAction.scriptID.destinataire : "",
			adresseFrom  : nextProps.elementAction != null ? nextProps.elementAction.scriptID.from : "",
			mailObject  : nextProps.elementAction != null ? nextProps.elementAction.scriptID.object : "",
			mailBody  : nextProps.elementAction != null ? nextProps.elementAction.scriptID.body : "",
			mailType  : nextProps.elementAction != null ? nextProps.elementAction.scriptID.type : "",
			
		})  
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

    getFeilds(){
        var array = []
            if (  this.state.champ_formulaire != null ){
            var definition = this.state.champ_formulaire.definition
            if(definition){
                var def_Json = JSON.parse(definition)
                var feilds = def_Json.fields
                feilds.map((element) => {
					//console.log(element)
                    array.push(
                        <option value={element.name}>{element.label.fr_FR}</option>
                    )
                })
            }
        }
        return array;
    }

    NextChoicefields(e){
        var balise = '[_['+e +']_]'
        this.setState({mailBody: this.state.mailBody + '[_['+e+']_]' });
    
        var remplace = `
        temp=getFields("${e}",Wcontext); 
        bodyMail = bodyMail.replace("${balise}", temp );`
        remplacement = remplacement + remplace
    }

    Validation(){

		const { titreAction , templateAction ,ScriptAction , activationAction , adresseTo ,adresseFrom, mailObject,
			mailBody , mailType } = this.state;	
		
		
		console.log("Création mail !!")
		var ActionName = titreAction
		var ActionDescription = templateAction
		var from =adresseFrom
		var to = adresseTo
		var subject = mailObject
		var actextype = activationAction
		var bodym = mailBody
		var mailtoSend = new mail(from, to,subject,bodym)
		
		
		var code = `
		import com.liferay.dynamic.data.mapping.service.DDMStructureLocalServiceUtil;
		import com.liferay.portal.kernel.service.WorkflowInstanceLinkLocalServiceUtil;
		import com.liferay.dynamic.data.mapping.service.DDMFormInstanceRecordVersionLocalServiceUtil;
		import com.liferay.portal.workflow.kaleo.service.KaleoInstanceLocalServiceUtil;
		import com.liferay.portal.workflow.kaleo.model.KaleoInstance;
		import com.liferay.dynamic.data.mapping.service.DDMFormInstanceLocalServiceUtil;
		import com.liferay.dynamic.data.mapping.service.DDMFormInstanceRecordLocalServiceUtil;
		import com.liferay.dynamic.data.mapping.model.DDMFormInstanceRecordVersion;
		import com.liferay.dynamic.data.mapping.model.DDMFormInstanceRecord;
		import com.liferay.portal.kernel.util.PortalClassLoaderUtil;
		import com.liferay.portal.kernel.dao.orm.DynamicQuery;
		import com.liferay.portal.kernel.dao.orm.DynamicQueryFactoryUtil;
		import com.liferay.portal.kernel.dao.orm.OrderFactoryUtil;
		import com.liferay.portal.kernel.json.JSONFactoryUtil;
		import com.liferay.mail.kernel.service.MailServiceUtil;
		import javax.mail.internet.AddressException;
		import javax.mail.internet.InternetAddress;
		import com.liferay.mail.kernel.model.MailMessage;
		import com.liferay.portal.kernel.util.*
		import com.liferay.portal.kernel.workflow.WorkflowStatusManagerUtil;
		import com.liferay.portal.kernel.workflow.WorkflowConstants;
		import com.liferay.portal.kernel.service.ServiceContext;
		import com.liferay.portal.kernel.service.ServiceContextThreadLocal;
		import com.liferay.portal.kernel.service.UserLocalServiceUtil;
		import com.liferay.document.library.kernel.service.DLFileEntryLocalServiceUtil;
		import com.liferay.portal.kernel.util.File;
		import java.io.File;
		
		String temp =''

		//We get all the FormInstances & we put it in a list
		loader = PortalClassLoaderUtil.getClassLoader();
		DynamicQuery dQ= DynamicQueryFactoryUtil.forClass(KaleoInstance.class,loader);
		List<KaleoInstance> results = KaleoInstanceLocalServiceUtil.dynamicQuery(dQ);
		record = Long.parseLong(workflowContext.entryClassPK);

		
		//Création des variables
		contenu=null;
		pj=null;
		userMail="";
		userMail_bis="";
		String a = "";
		File f = null;

		//Récupération de la liste des formulaires et celui qui nous correspond
		Long groupId = 20099;
		results.each {
				k-> if(  k.classPK.intValue() == record ){
						contenu = k
				}
		}
		//Recupération des champs
		formulaire = contenu.workflowContext
		formulaire_json = JSONFactoryUtil.createJSONObject(formulaire)
		formfields = formulaire_json.map.serviceContext.serializable.attributes.map

		check= DDMFormInstanceRecordVersionLocalServiceUtil.getDDMFormInstanceRecordVersion(record)
		check= DDMFormInstanceLocalServiceUtil.getDDMFormInstance(check.formInstanceId)
		check= DDMStructureLocalServiceUtil.getDDMStructure(check.structureId)
		check = check.definition
		check = JSONFactoryUtil.createJSONObject(check)
		check=check.fields

		// we take les adresse mails des types et on vérifie
		for (Iterator iterator = formfields.keys(); iterator.hasNext();) {
		Object o = iterator.next();
		String ob = o.toString();
		if(ob.startsWith('ddm$$AdresseMail$')) { userMail = formfields.getString(ob); }
		}

		for (Iterator iterator = formfields.keys(); iterator.hasNext();) {
		Object o = iterator.next();
		String ob = o.toString();
		if(ob.startsWith('ddm$$AdresseMailMoi$')) { userMail_bis = formfields.getString(ob); }
		}
		if (userMail == "") {userMail = userMail_bis ;}

		String bodyMail = ` + ` ''' 
		<div style = "background: url('https://i.ibb.co/8NZ4JF4/Fond-de-mail.png');height: 640px; width: 624px; text-align: left; ">
		<p style="margin-left: 70px;padding-top: 155px;font-size:small;" >  ${mailtoSend.body} <br /></p></div>''' `+ `;

		
		${remplacement}

		System.out.println("Let's Send it");

		try{
			fromAddress=new InternetAddress("${mailtoSend.from}");
			toAddress=new InternetAddress(" ${mailtoSend.destinataire}");
			MailMessage mailMessage=new MailMessage();
			mailMessage.setTo(toAddress);
			mailMessage.setHTMLFormat(true)
			mailMessage.setFrom(fromAddress);
			mailMessage.setSubject("${mailtoSend.object}");
			mailMessage.setBody(bodyMail);
			MailServiceUtil.sendEmail(mailMessage);
		}
		catch(AddressException e){
			System.out.println(e);
		}
		System.out.println("DONE");`.trim()
		//console.log(code)
		
		if(this.props.elementAction !=null )
		{ 
			var mailID = this.props.elementAction.Act_id
		}
		else
		{
			var mailID = Math.floor(Math.random() * 100)
		}
		console.log("MailID : " , mailID , "props" , this.props.elementAction ? this.props.elementAction.Act_id : "NULL")
		var actionMail = new action(ActionName,ActionDescription,code,"groovy",actextype,mailID,null,mailtoSend)
		actionMail.typeAct = 1;
		

		//console.log("1er niveau " , actionMail)
		this.props.ActM(actionMail)
	
}
    
    fillModalAct(section){
		if(this.toggle){
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
					case 'Destinataire' :
						return element.scriptID.destinataire
					case 'from' :
						return element.scriptID.from
					case 'sujet' :
						return element.scriptID.object
					case 'body' :
						return element.scriptID.body



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
					case 'Destinataire' :
						return 'choisir le destinataire'
					case 'from' :
						return 'noreply@liferay.com'
					case 'sujet' :
						return "Sujet/Objet du mail"
					case 'body' :
						return "Contenu du mail"

			}
		}
	}
}

render() {
	const { titreAction , templateAction ,ScriptAction , activationAction , 
		adresseTo , adresseFrom, mailObject,
		mailBody , mailType } = this.state;	
    return (
      <div >
          <Form>
				<FormGroup id="">
					<div className="agiir-block-input">
						<Label className="FormUser" >Titre de l'action</Label>
						<Input  type="text"
								className="agiir-workflow-input" 
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
					<div className="agiir-block-input">
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
					<div className="agiir-block-input">
					<Label className="FormUser" >Adresse d'envoi :</Label>
					<Input  className="agiir-workflow-input" 
							type="email"
							name="adresseFrom"
							id="adresseFrom" 
							value={adresseFrom}
							onChange={this.handleChange}/>
					</div>
					<div className="agiir-block-input">
					<Label className="FormUser" >Destinataire :</Label>
					<Input  className="agiir-workflow-input" 
							type="email"
							name="adresseTo"
							id="adresseTo" 
							value={adresseTo}
							onChange={this.handleChange}/>
					</div>
					<div className="agiir-block-input">
					<Label className="FormUser" >Sujet :</Label>
					<Input className="agiir-workflow-input" 
							type="textarea"  
							name="mailObject"
							id="mailObject" 
							value={mailObject}
							onChange={this.handleChange}/>
					</div>
					<div className="agiir-block-input" > 
						<Label className="FormUser">Formulaires : </Label>
						<Input className="agiir-workflow-input" 
								type="select"  
								id="fieldForms"
								onChange={this.NextChoice} >
							<option value='0'>Formulaires</option>				
							{this.state.formulaire.map((element) => {
								return <option key={element.formInstanceId} value={element.structureId}  >{element.nameCurrentValue}</option>;	
							})}	
						</Input>
						<br/>
						<Input className="agiir-workflow-input" 
								type="select"  
								id="fields"
								onClick={(e) => {	this.NextChoicefields(e.target.value);	}} multiple > 
								{this.getFeilds()}				
						</Input>
					</div>	
					<div className="agiir-block-input" >
						<Label className="FormUser" >Contenu du mail :</Label>
						<Input className="agiir-workflow-input" 
								type="textarea"
								bsSize="lg"  
								name="mailBody"
								id="mailBody" 
								value={mailBody}
								onChange={this.handleChange}/>
					</div>
					</FormGroup>
				</Form>
				<br/>
				<br/>
				<div className="modal-footer-buttons" >
				<Button color="primary" onClick={() => this.props.getBack() } > <AgiirIcon icon={"ic_close"} />{" "} <span>Annuler</span> </Button>{' '}
				<Button color="secondary" onClick={() => this.Validation() } >
					<AgiirIcon icon={ this.props.elementAction  != null ? "ic_mode_edit"  : "ic_add" } />{" "} { this.props.elementAction  != null ? "Modifier"  : "Ajouter" }
				</Button> 
      			</div>
	  </div>
      )}


}

export default MailPage