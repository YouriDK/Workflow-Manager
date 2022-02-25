import XMLWriter from 'xml-writer'	
import * as ressourceActions from "../actions/RessourceAction";
import AlertUtil from "../utils/AgiirUtil/AlertUtil"

export function htmlDecode(input){// Le < ne s'afficher pas correctement en XML il faut cette fonction pour bien convertir
var e = document.createElement('div');
e.innerHTML = input;
return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}


//Liste de Noeuds et de Transition
//Je ne peux pas utiliser le getNode de la lib car le map ou forEach ne passe pas dessus
export function XML(nodesList,TransitionList,WFid,nom,libelle,envoie){
    

    var xw = new XMLWriter(true); // Crée le fichier vide avec le bon encoding (et les indetations)
                xw.formatting = 'indented';//add indentation and newlines
                xw.indentChar = ' ';//indent with spaces
                xw.indentation = 2;
                xw.writer_encoding = 'UTF-8';
 
                xw.startDocument('1.0','UTF-8');
                xw.startElement('workflow-definition');
                xw.writeAttribute('xmlns', 'urn:liferay.com:liferay-workflow_7.1.0');
                xw.writeAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
                xw.writeAttribute('xsi:schemaLocation','urn:liferay.com:liferay-workflow_7.1.0 http://www.liferay.com/dtd/liferay-workflow-definition_7_1_0.xsd');		

                xw.writeElement('name', nom);
                xw.writeElement('description',libelle)
                xw.writeElement('version', '1');

                nodesList.map((node) => {
                    console.log(node)
                    if(node != null) {
                        xw.startElement(node.extras.type),
                        xw.writeElement('name', node.name),
                        xw.startElement('metadata')
                        if (node.name === "Approved" ) {
                            xw.writeCData('{"xy" :[' + node.x.toPrecision() +',' + node.y.toPrecision() +',' +' "terminal":'+"true"+']}'  )
                        }
                        else{
                            xw.writeCData('{"xy" :[' + node.x.toPrecision() +',' + node.y.toPrecision() + ']}'  )
                        }
                        
                        xw.endElement('metadata')
                        if (node.name === "Created" ) {
                            xw.writeElement('initial', 'true')
                        }
                        // On parcous la liste d'action et de notifications
                        if(( node.extras.actions.length > 0) || ( node.extras.notifications.length > 0) ){
                            xw.startElement('actions'),
                            node.extras.actions.map((element) => { 
                                xw.startElement('action'),
                                xw.writeElement('name', element.name),
                                xw.writeElement('description', htmlDecode(element.description)),
                                xw.startElement('script'),
                                xw.writeRaw(htmlDecode("&lt;") ),
                                xw.writeRaw('![CDATA['+element.script+']]>'),
                                xw.endElement('script')
                                xw.writeElement('script-language', element.Script_langage),
                                xw.writeElement('execution-type', element.Ex_Type),
                                xw.endElement('action')
                            })
                            if( node.extras.notifications.length > 0) {
                                node.extras.notifications.map((element) => {
                                    xw.startElement('notification'),
                                    xw.writeElement('name', element.name),
                                    xw.startElement('template'),
                                    xw.writeRaw(element.template),
                                    xw.endElement('template'),
                                    xw.writeElement('template-language', element.template_langage)
                                    
                                    if (element.Notification_Type.length > 0) {

                                        element.Notification_Type.map((element) => {
                                            xw.writeElement('notification-type', element)
                                        })
                                    } 
                                    else {	xw.writeElement('notification-type', "user-notification") }

                                    if (element.destinataire !== null)
                                    {
                                        xw.startElement('recipients'),
                                        xw.writeAttribute('receptionType', 'to');
                                        xw.startElement('user'),
                                        xw.writeElement('email-address', element.destinataire),
                                        xw.endElement('user'),
                                        xw.endElement('recipients')
                                    }

                                    if (element.script !== null)
                                    {
                                        xw.startElement('recipients'),
                                        xw.writeAttribute('receptionType', 'to');
                                        xw.startElement('scripted-recipient'),
                                        xw.startElement('script'),
                                        xw.writeRaw(htmlDecode("&lt;") ),
                                        xw.writeRaw('![CDATA['+element.script+']]>'),
                                        xw.endElement('script'),
                                        xw.writeElement('script-language',"groovy"),
                                        xw.endElement('scripted-recipient'),
                                        xw.endElement('recipients')
                                    }

                                    xw.writeElement('execution-type', element.Ex_Type),
                                    xw.endElement('notification')
                                })
                            }
                            xw.endElement('actions')
                            
                        }
                        if(node.extras.type === "task"){//Plusieurs type de taches donc il fallait la boucle à part
                            switch(node.extras.choix){
                                case "A" :
                                    xw.startElement('assignments'),
                                    xw.writeElement('user', ''),
                                    xw.endElement('assignments')
                                    break;
                                case 'B' :
                                    xw.startElement('assignments'),
                                    xw.startElement('roles'),
                                    node.extras.roles.map((element) => {
                                        xw.startElement('role'),
                                            xw.writeElement('role-type',element.role)
                                            xw.writeElement('name',element.name)
                                            if(element.autocreate === true){
                                                xw.writeElement('auto-create', 'true')
                                            }
                                            xw.endElement('role')
                                    })
                                    xw.endElement('roles'),
                                    xw.endElement('assignments')
                                    break;
                                case 'C' :
                                    xw.startElement('assignments'),
                                    xw.startElement('roles'),
                                    xw.startElement('role'),
                                    xw.writeElement('role-id',node.extras.RoleID),
                                    xw.endElement('role'),
                                    xw.endElement('roles'),
                                    xw.endElement('assignments')
                                    break;
                                case 'D' :
                                    xw.startElement('assignments'),
                                    xw.startElement('scripted-assignment'),
                                    xw.startElement('script'),
                                    xw.writeRaw(htmlDecode("&lt;") ),
                                    xw.writeRaw('![CDATA['+node.extras.Script+']]>'),
                                    xw.endElement('script'),
                                    xw.writeElement('script-language',node.extras.ScriptLangage),
                                    xw.endElement('scripted-assignment')
                                    xw.endElement('assignments')
                                    break;
                                case 'E' :
                                    xw.startElement('assignments'),
                                    xw.startElement('user')
                                    switch(node.extras.Dunno){
                                        case'1' :
                                            xw.writeElement('user-id',node.extras.RoleID)
                                            break;
                                        case '2':
                                            xw.writeElement('screen-name',node.extras.ScreenName)
                                            break;
                                        case '3' :
                                            xw.writeElement('email-address',node.extras.mailUser)
                                            break;
                                    }
                                    xw.endElement('user'),
                                    xw.endElement('assignments')
                                    break;
                                case 'F' :
                                    xw.startElement('assignments'),
                                    xw.startElement('resource-actions'),
                                    node.extras.RessourcesActions.map((element) => {
                                        xw.writeElement('resource-action',element)
                                            })
                                    xw.endElement('resource-actions')
                                    xw.endElement('assignments')
                                    break;
                                default :
                                    console.log("Wrong way task Node")
                            }

                            if(node.extras.TaskTimer.length > 0 ){
                                xw.startElement('task-timers'),
                                node.extras.TaskTimer.map((element) => {  
                                    console.log(element)
                                    xw.startElement('task-timer'),
                                    xw.writeElement('name', element.name),
                                    xw.startElement('delay'),
                                    xw.writeElement('duration', element.dduration),
                                    xw.writeElement('scale', element.dscale),
                                    xw.endElement('delay'),
                                    xw.startElement('recurrence'),
                                    xw.writeElement('duration', element.rduration),
                                    xw.writeElement('scale', element.rscale),
                                    xw.endElement('recurrence')
                                    if(element.block){ xw.writeElement('blocking', 'true') } else { xw.writeElement('blocking', 'false')  }
                                    xw.startElement('timer-actions'),
                                    element.timerAction.map((e) => { 
                                        console.log(e)
                                        switch(e.type){
                                            case "Actions" :
                                                xw.startElement('timer-action'),
                                                xw.writeElement('name', e.name),
                                                xw.writeElement('description', e.description),
                                                xw.startElement('script'),
                                                xw.writeRaw(htmlDecode("&lt;") ),
                                                xw.writeRaw('![CDATA['+e.script+']]>'),
                                                xw.endElement('script'),
                                                xw.writeElement('script-language', e.Script_langage),
                                                xw.endElement('timer-action')
                                            break;
                                            case "Notifications":
                                                xw.startElement('timer-notification'),
                                                xw.writeElement('name', e.name),
                                                xw.startElement('template'),
                                                xw.writeRaw(e.template),
                                                xw.endElement('template'),
                                                xw.writeElement('template-language', e.template_langage)
                                                
                                                if (e.Notification_Type.length > 0) {

                                                    e.Notification_Type.map((element) => {
                                                        xw.writeElement('notification-type', element)
                                                    })
                                                } 
                                                else {	xw.writeElement('notification-type', "user-notification") }

                                                if (e.destinataire !== null)
                                                {
                                                    xw.startElement('recipients'),
                                                    xw.writeAttribute('receptionType', 'to');
                                                    xw.startElement('user'),
                                                    xw.writeElement('email-addres', e.destinataire),
                                                    xw.endElement('user'),
                                                    xw.endElement('recipients')
                                                }

                                                xw.endElement('timer-notification')
                                                break;
                                            case "Mail Perso" :
                                                xw.startElement('timer-action'),
                                                xw.writeElement('name', e.name),
                                                xw.writeElement('description', e.description),
                                                xw.writeRaw(htmlDecode("&lt;") ),
                                                xw.writeRaw('![CDATA['+e.script+']]>'),
                                                xw.endElement('script'),
                                                xw.writeElement('script-language', e.Script_langage),
                                                xw.endElement('timer-action')
                                                break;
                                        }
                                    })
                                    xw.endElement('timer-actions')
                                    xw.endElement('task-timer')

                            })
                            
                            xw.endElement('task-timer')
                        }
                        }	
                        if(node.extras.type === "condition"){
                            xw.startElement('script'),
                            xw.writeRaw(htmlDecode("&lt;") ),
                            xw.writeRaw(node.extras.script),
                            xw.endElement('script'),
                            xw.writeElement('script-language', node.extras.script_langage)
                        }
                        //Il faut récupérer seulement ceux dont on a besoin
                        var Stock = []
                        TransitionList.map((e) => {
                            if(e.IDNode === node.id){// On tri par ID
                                Stock.push(e)
                            }
                        })
                        if(node.name === "Debut"){
                            xw.writeElement("initial","true")
                        }
                        if(node.extras.transitions.length > 0){
                            xw.startElement('transitions')
                            node.extras.transitions.map((e) => {
                                xw.startElement('transition'),
                                xw.writeElement('name',e.name),
                                xw.writeElement('target',e.target),
                                xw.endElement('transition')
                            })
                            xw.endElement('transitions')
                        }

                        xw.endElement(node.extras.type)
                    }
                })
                xw.endElement('workflow-definition'),
                xw.endDocument()
              
                console.log(xw)
                
                if (envoie === true)
                {
                    saveXml(xw.toString(), nom, libelle , WFid)
                }
                else
                {  
                    return xw
                }
                
                
}

export async function saveXml(XML,nom, description,WFid){

    let obj = await ressourceActions.getCurrentUser()

    let object2 = {}
    object2.nom = nom
    object2.description = description
    object2.workflowXmlId =  WFid
    object2.xmlFile = XML
    object2.userId = obj.userId
    object2.companyId = obj.companyId
    object2.createDate = null
    object2.modifiedDate = null

    let obj2 = await ressourceActions.pushXml(JSON.stringify(object2))
    console.log(obj2)

    AlertUtil.alert("Fichier XML créé et sauvegardé" , "success")
}