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
	Input } from 'reactstrap';
	import action from '../ElementWorkflow/Action';
	import mail from '../ElementWorkflow/mail'
var element = {}
var remplacement =``


class ModalMail extends React.Component {
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
	////console.log("On charge la liste des Formulaires")
	const temp = this
	// Si il n'y a pas les await il s'éxécute dans le désordre
	await Liferay.Service(
		'/user/get-current-user',
		function(obj) {
			////console.log(obj)
			temp.setState({ user : obj })
			////console.log(temp.state.user)
		}
		
	  ); 
 	
	await Liferay.Service(
		'/group/get-user-group',
		{
		  companyId: temp.state.user.companyId,
		  userId: temp.state.user.userId
		},
		function(obj) {
			temp.setState({ group : obj })
		}
	  );
	await Liferay.Service(
		'/ddm.ddmforminstance/get-form-instances',
		{
		  companyId: temp.state.user.companyId,
		  groupId: 20126,
		  start: 0,
		  end: 100000
		},
		function(obj) {
			temp.setState({ formulaire : obj })
		}
	  );
  }


	NextChoice(e){
	/*//console.log("Next")
	//console.log(this.state.user)
	//console.log(this.state.group)
	//console.log(this.state.formulaire)*/
	var Structure_ID = e
	const temp1 = this
	Liferay.Service(
		'/ddm.ddmstructure/get-structure',
		{
			structureId: Structure_ID
		},
		function(obj) {
			temp1.setState({ champ_formulaire : obj })
			
		}
		);
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

	handleChange(event) {
	this.setState({value: event.target.value});
	}

	NextChoicefields(e){
	var balise = '[_['+e +']_]'
	this.setState({value: this.state.value + '[_['+e+']_]' });

	var remplace = `
	temp=getFields("${e}",Wcontext); 
	bodyMail = bodyMail.replace("${balise}", temp );`
	remplacement = remplacement + remplace
	}
  
	
	Validation(){
		var ActionName = document.getElementById('ActionName').value
		var ActionDescription = document.getElementById('ActionDescription').value
		var from = document.getElementById('fromAdress').value
		var to = document.getElementById('toAddress').value
		var subject = document.getElementById('SubjectMail').value
		var actextype = document.getElementById('execution-type').value
		var bodym = document.getElementById('BodyMail').value
		var mailtoSend = new mail(from, to,subject,bodym)
		
		var code = `
		import java.util.concurrent.TimeUnit;
		import com.liferay.dynamic.data.mapping.service.DDMFormInstanceRecordVersionLocalServiceUtil;
		import com.liferay.portal.kernel.service.WorkflowInstanceLinkLocalServiceUtil;
		import com.liferay.portal.kernel.workflow.WorkflowStatusManagerUtil;
		import com.liferay.portal.kernel.workflow.WorkflowConstants;
		import com.liferay.portal.workflow.kaleo.service.KaleoInstanceLocalServiceUtil;
		import com.liferay.portal.workflow.kaleo.model.KaleoInstance;
		import com.liferay.dynamic.data.mapping.service.DDMFormInstanceLocalServiceUtil;
		import com.liferay.dynamic.data.mapping.service.DDMFormInstanceRecordLocalServiceUtil;
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
		
		System.out.println("Départ Mail + Balises");
		String temp =''

		//We get all the FormInstances & we put it in a list
		loader = PortalClassLoaderUtil.getClassLoader();
		DynamicQuery dQ= DynamicQueryFactoryUtil.forClass(KaleoInstance.class,loader);
		List results = KaleoInstanceLocalServiceUtil.dynamicQuery(dQ);

		//We find the more recent
		Depart = results[0].createDate
		max=results[0]
		results.each {
		k-> if(  k.createDate > Depart ){
		Depart = k.createDate
		max=k
			}
		}
		// The informations is in the workflowcontext so :
		first=max.workflowContext
		Wcontext = JSONFactoryUtil.createJSONObject(first)



		String bodyMail = ` + ` '''   ${mailtoSend.body}''' `+ `;

		public String getFields(String get, Object toto){
			//System.out.println(get);
			toto = toto.map.serviceContext.serializable.attributes.map
			for (Iterator iterator = toto.keys(); iterator.hasNext();) {
			Object o = iterator.next();
			String ob = o.toString();
			//System.out.println(ob);
			if(ob.startsWith('ddm$$'+ get)) { return toto.getString(ob); }
		  }
		}
		
		${remplacement}

		System.out.println("Let's Send it");

		try{
			fromAddress=new InternetAddress("${mailtoSend.from}");
			toAddress=new InternetAddress(" ${mailtoSend.destinataire}");
			MailMessage mailMessage=new MailMessage();
			mailMessage.setTo(toAddress);
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

		
		var mailID = Math.floor(Math.random() * 100)
		var actionMail = new action(ActionName,ActionDescription,code,"groovy",actextype,mailID,null,mailtoSend)
		actionMail.typeAct = 1
		if(this.props.elementAction !=null ){ actionMail.ID = this.props.elementAction.ID}
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
	
    return (
      <div>
		<Modal 	id="agiir-workflow-modals-notification" 
				isOpen={this.props.isOpen} 
				toggle={this.toggle} 
				className="agiir-workflow-modals"
		>
			<ModalHeader toggle={this.props.toggle} >
			
			<Label className="modal-titre" >Ajout d'une action</Label></ModalHeader>
			<ModalBody >
				<Form>
					<FormGroup id="">
					<div className="agiir-block-input">
						<Label className="FormUser" >Titre de l'action</Label>
						<Input  id="ActionName"
								type="text"
								className="agiir-workflow-input" 
								defaultValue={this.fillModalAct("titre")}
								/>
					</div>
					<div className="agiir-block-input">
						<Label className="FormUser" >Description de l'action </Label>
						<Input id="ActionDescription" 
								type="text"
								className="agiir-workflow-input"
								defaultValue={this.fillModalAct("description")}
								/>
					</div>
					<div className="agiir-block-input">
					<Label className="FormUser" >Activation de l'action du noeud</Label>
						<Input className="agiir-workflow-input"
							type="select"
							id="execution-type"	>
							<option value={this.fillModalAct("type")} >{this.fillModalAct("type")}</option>	
							<option value="onEntry" >En entrée </option>
							<option value="onExit" >En sortie</option>
							<option value="onAssignment" >A l'assignation</option>
						</Input>
					</div>
					<div className="agiir-block-input">
					<Label >Adresse d'envoi :</Label>
					<Input  className="agiir-workflow-input" 
							type="text"
							id="fromAdress" 
							defaultValue={this.fillModalAct("from")}/>
					</div>
					<div className="agiir-block-input">
					<Label className="FormUser" >Destinataire :</Label>
					<Input  className="agiir-workflow-input" 
							type="text"
							id="toAddress" 
							defaultValue={this.fillModalAct("Destinataire")}/>
					</div>
					<div className="agiir-block-input">
					<Label className="FormUser" >Sujet :</Label>
					<Input className="agiir-workflow-input" 
							type="textarea"  
							id="SubjectMail"
							defaultValue={this.fillModalAct("sujet")}/>
					</div>
					<div className="Form-check" > 
						<Label className="FormUser">Formulaires : 
						<Input className="agiir-workflow-input" 
								type="select"  
								id="fieldForms"
								onClick={(e) => {	this.NextChoice(e.target.value);	}}>
							<option value='0'>Formulaires</option>				
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
						<Label className="FormUser" >Contenu du mail :</Label>
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
				<Button color="success" onClick={() => this.Validation() }>Creer</Button>{' '} 
				<Button color="danger" onClick={this.props.toggle}>Annuler</Button>
			</ModalFooter>
		</Modal>
      </div>
    );
  }
}
export default ModalMail;