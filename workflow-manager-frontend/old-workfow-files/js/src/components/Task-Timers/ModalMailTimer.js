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
	Input,
	 } from 'reactstrap';

import { actionTimer,mail }  from '../../components/ElementWF'
import * as ressourceActions from "../../actions/RessourceAction";
var element = {}
var remplacement =``

class ModalMailTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  tooltipOpen : false, 
	  formulaire : [],
	  champ_formulaire : null,
	  user : null,
	  group : null,
	  value: `Contenu du mail`

    };

	this.toggle = this.toggle.bind(this);
	this.toggleToolTip = this.toggleToolTip.bind(this);
	this.NextChoicefields = this.NextChoicefields.bind(this);
	this.handleChange = this.handleChange.bind(this);

  }

  toggle() { this.setState(prevState => ({ modal: !prevState.modal })); }
  toggleToolTip() { this.setState(prevState => ({ tooltipOpen: !prevState.tooltipOpen })); }

  async componentDidMount(){
	let obj2 = await ressourceActions.getCurrentUser();
	this.setState({user : obj2 })
	let obj3 = await ressourceActions.getUserGroup(Number(this.state.user.companyId),Number(this.state.user.userId) );
	this.setState({group : obj3 })
	let obj4 = await ressourceActions.ddmGetAllFormInstances(this.state.user.companyId,this.state.group.groupId );
	this.setState({formulaire : obj4 })
  }

  async NextChoice(e){
	  console.log("e",e)
	let obj5 = await ressourceActions.getStructure(e);
	this.setState({champ_formulaire : obj5 })
	
  }

  getFeilds(){
	var array = []
	  if (  this.state.champ_formulaire != null ){
		var definition = this.state.champ_formulaire.definition
		if(definition){
			var def_Json = JSON.parse(definition)
			var feilds = def_Json.fields
			feilds.map((element) => {

				array.push(
					<option value={element.name}>{element.label.en_US}</option>
				)
			})
		}
	}
	return array;
}
  

NextChoicefields(e){
var balise = '[_['+e +']_]'
this.setState({value: this.state.value + '[_['+e+']_]' });

var remplace = `
temp=getFields("${e}",Wcontext); 
bodyMail = bodyMail.replace("${balise}", temp );`
remplacement = remplacement + remplace
}

handleChange(event) { this.setState({value: event.target.value}); }
	
	Validation(){
		//console.log("Let's Try");
		var ActionName = document.getElementById('ActionTimerName').value
		var ActionDescription = document.getElementById('ActionTimerDescription').value
		var from = document.getElementById('fromAdress').value
		var to = document.getElementById('toAddress').value
		var subject = document.getElementById('SubjectMail').value
		var bodym = document.getElementById('BodyMail').value
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
		List results = KaleoInstanceLocalServiceUtil.dynamicQuery(dQ);

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
			mailMessage.setFrom(fromAddress);
			mailMessage.setHTMLFormat(true)
			mailMessage.setSubject("${mailtoSend.object}");
			mailMessage.setBody(bodyMail);
			MailServiceUtil.sendEmail(mailMessage);

			

		}
		catch(AddressException e){
			System.out.println(e);
		}
		System.out.println("DONE");`.trim()


		console.log(code)

		var mailID = Math.floor(Math.random() * 100)
		var actionMail = new actionTimer(ActionName,ActionDescription,code,"groovy",mailID,mailtoSend,"Mail Perso")

		actionMail.typeAct = 1
		if(this.props.elementTimer !=null ){ actionMail.ID = this.props.elementTimer.ID}	
		this.props.ActTimer(actionMail)
	}

	
	
	fillModalAct(section){
		if(this.toggle){
			//console.log(section,element)
			if (this.props.elementTimer != null) {
				element = this.props.elementTimer
				if(element.type==="Mail Perso"){
				//console.log(element)
				switch(section){
					case 'titre':
						return element.name	
					case 'description' :
						return element.description
					case'lang':
						return element.Script_langage
					case'script':
						return element.script
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
					default :
						return "Champ Vide"
				}
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
					default :
						return "Champ Vide"

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
			toggle={this.toggle}
		>


			<ModalHeader toggle={this.props.toggle} >
			<Label className="modal-titre" >Ajout d'un mail personnalisé au Timer</Label></ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup id="">
					<div className="agiir-block-input"> 
						<Label className="FormUser" >Titre de l'action : </Label>
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
						<Label className="FormUser" >Adresse d'envoi :</Label>
						<Input  className="agiir-workflow-input" 
								type="email"
								id="fromAdress"
								defaultValue={this.fillModalAct("from")}/>
					</div>
					<div className="agiir-block-input">
						<Label className="FormUser">Destinataire :</Label>
						<Input  className="agiir-workflow-input"  
								type="email"
								id="toAddress"
								defaultValue={this.fillModalAct("Destinataire")}/>
					</div>
					<div className="agiir-block-input">
						<Label className="FormUser">Sujet :</Label>
						<Input className="agiir-workflow-input"  
								type="textarea"  
								id="SubjectMail"
								defaultValue={this.fillModalAct("sujet")}/>
					</div>
					<div className="agiir-block-input" > 
						<Label className="FormUser">Formulaires : 
						<Input className="agiir-workflow-input"
								type="select"  
								id="fieldForms"
								onClick={(e) => {	this.NextChoice(e.target.value);	}}>
							<option value='0'>Choisir formulaire</option>				
							{this.state.formulaire.map((element) => {
								return <option key={element.formInstanceId} value={element.structureId}>{element.nameCurrentValue}</option>;	
							})}	
						</Input></Label>
						<Input className="agiir-workflow-input"  
								type="select"  
								id="fields"
								onClick={(e) => {	this.NextChoicefields(e.target.value);	}} multiple > 
							
								{this.getFeilds()}				
						</Input>
					</div>		
					<div className="agiir-block-input">
						<Label className="FormUser">Contenu du mail :</Label>
						<Input className="agiir-workflow-input" 
								type="textarea"  
								id="BodyMail"
								defaultValue={this.fillModalAct("body")}
								value={this.state.value}
								onChange={this.handleChange}/>
					</div>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="success" onClick={() => this.Validation() }>Creer</Button>
				<Button color="danger" onClick={this.props.toggle}>Annuler</Button>
			</ModalFooter>
		</Modal>
      </div>
    );
  }
}
export default ModalMailTimer;