import React from 'react';
import { Button, Input, Label, Table} from 'reactstrap';
import * as ressourceActions from "../actions/RessourceAction";
import Modal from "react-responsive-modal";
import CustomPagination from "../components/CustomPagination";
import ActionButton from "../components/ActionButtons"
import { AgiirIcon } from "../utils/AgiirIcons"

var text2=""

class GroovySaving extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        listGroovy: [],
        user : null,
        nom : "Vide",
        isOpen : false,

        pageCount : 5,
        page : 1,
        rowsPerPage : 5,



      }
}


turnModalOn()
{
    this.setState({ isOpen : true})
}
turnModalOff()
{
    this.setState({ isOpen : false})
}

async getAllGroovy(){
    let obj = await ressourceActions.getAllGroovy();
    this.setState({listGroovy : obj })
}
async componentWillMount(){
    //console.log("componentWillMount - GroovyPage")
    this.getAllGroovy()
    let obj2 = await ressourceActions.getCurrentUser();
    this.setState({user : obj2 })
}
/*
async componentDidMount() {
   this.getAllGroovy()
    let obj2 = await ressourceActions.getCurrentUser();
    this.setState({user : obj2 })
}*/

async deleteGroovyAPI(wf){
    let obj3 = await ressourceActions.deleteGroovy(wf);
    //console.log(obj3)
    this.getAllGroovy();
    this.forceUpdate();
}
async addGroovy(wf){
    let obj4 = await ressourceActions.addGroovy(wf);
    //console.log(obj4)
    this.getAllGroovy()
    this.forceUpdate()
}



deleteGroovy(id){
    var del =""
    //console.log("Supprimer")   
    this.state.listGroovy.map((element) => { 
    if (element.groovyId === id) { del = element  } })
    this.deleteGroovyAPI(del)

}

FillTableGroovy(page,rowsPerPage){
    var array = []
    var date =null;
    var options = { year: "numeric", month: "short", day: "numeric" };
    var result = null;
    if( this.state.listGroovy.length > 0 ) {
            this.state.listGroovy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element) => {
                date = new Date(element.createDate)
                result = date.toLocaleDateString('fr', options);
                array.push(
                    <tr key = {element.groovyId}>
                        
                        <td style={{ textAlign : "left"}} >{result}</td>
                        <td style={{ textAlign : "left"}} >{element.nom}</td>
                        <td style={{ textAlign : "left"}} >{element.description}</td>
                        <td style={{ textAlign : "left"}} >{element.type}</td>
                        <td>
                        <ActionButton
                            id={element.groovyId}
                            modifier = { modifier => this.importGroovy(element.groovyId)}
                            supprimer = { supprimer => this.deleteGroovy(element.groovyId) }
                            target="Groovy"
                        />
                        
                        
                        </td>
                    </tr>
                )
            })
            }

        return array;
    
}

importGroovy(id){
    var del =""
    //console.log("Download")
    this.state.listGroovy.map((element) => { 
    if (element.groovyId === id) { del = element  } })
    this.setState({ nom : del.nom })
    this.state.nom = del.nom
    this.sauver(del.codegroovy)
}
onChangeHandler = event=>{ //lit le texte
    var input = event.target;
    var reader = new FileReader();
    const temp = this;

    reader.readAsText(input.files[0]);	
    reader.onload = function(){// Fonction async donc il n'attend pas
        var text = reader.result;
        //console.log(text)
        text2 = text
    };	
}
async onButtonClick(id) {
    //console.log(id)
    var del = null
    switch (id){
        case "add" :
            let object2 = {}
            object2.groovyId = Math.random().toString(36).substr(2, 16);
            object2.nom = document.getElementById('GroovyName').value
            object2.description = document.getElementById('GroovyDes').value 
            object2.type = document.getElementById('GrovvyType').value 
            object2.codegroovy = text2
            object2.userId = this.state.user.email
            object2.companyId = this.state.user.company
            object2.createDate = null
            object2.modifiedDate = null
            console.log(object2)
            await this.addGroovy(object2)
            this.toggle();
            break;
        case "add-groovy" :
            //console.log("Activation")
            this.turnModalOn()
            break;

        case "delete" : 
            //console.log("Supprimer")
            
            var id = null
            this.state.listGroovy.map((element) => { 
                id = element.groovyId
                if (document.getElementById(id).checked) {
                    
                    del = element
                }
            })
            await this.deleteGroovy(del)
            break;

        case "done" : 
            this.toggle();
            break;

        case "import" :

            //console.log("Download")
            this.state.listGroovy.map((element) => { 
                id = element.groovyId
                if (document.getElementById(id).checked) {
                    del = element
                }
            })
            this.setState({ nom : del.nom })
            this.state.nom = del.nom
            this.sauver(del.codegroovy)
            this.toggle()
        break;
    default : console.log("onButtonClick - GroovyAdd " + id )
    }
}


sauver(XMLDraft){
    var YouNamedIt = this.state.nom;
    var items =XMLDraft
    var donne="";

    for(var i=0;i<items.length;i++){

        donne+=items[i];
    }
    
    if(navigator.msSaveOrOpenBlob){

        var blobObject = new Blob([donne], { type: "text/plain" });
        window.navigator.msSaveOrOpenBlob(blobObject,YouNamedIt+".json");
    }
    else{
        var blob = new Blob([donne], {type: "text/plain"});
        var  url = window.URL.createObjectURL(blob);

        var elem = document.createElement('a');
        elem.href = url;
        elem.download = YouNamedIt+".groovy"
        var evt = new MouseEvent("click", { bubbles: true,cancelable: true,view: window,});
        elem.dispatchEvent(evt);

        setTimeout(function(){
            window.URL.revokeObjectURL(url);  
        }, 100);
    }

}
handlePageChange =  pageNumber => {
    this.setState({ page: pageNumber.selected + 1 });
  };

 handlePageChangeJSON =  pageNumber => {
    this.setState({ page: pageNumber.selected + 1 });
  };

render() {	
 
    const {page,rowsPerPage,isOpen } = this.state;	
    return (
        <div  >
            <div  className="responsive-container">
            <div className="modal-header-menu"  >	
            <h1 className="grand-titre"  > Liste des scripts</h1>
                <Button 
                    active 
                    id="Label"
                    color="secondary"
                    onClick={() => this.onButtonClick("add-groovy")}>
                    <AgiirIcon icon={"ic_add"  } /> {" "}
                    <span> Ajouter une action </span>
                </Button>   
            </div>
            <hr class="home-page-hr" />
           
                
                    <Table hover striped bordered id='agiir-workflow-modals-jsonList'>
                        <thead>
                            <tr>
                                <th>Date de création</th> 
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th style={{ textAlign : "center"}} >Actions</th>
                            </tr>
                        </thead>
                        <tbody> {this.FillTableGroovy(page - 1 ,rowsPerPage)} </tbody>
                    </Table> 
                    <CustomPagination
                        list={this.state.listGroovy}
                        itemsPerPage={rowsPerPage}            
                        handlePageChange={this.handlePageChange}  />
                    
               
            </div>
            <Modal 	id="" 
                open={isOpen}
                onClose={() => this.turnModalOff()}
                center
                classNames={{modal : "agiir-modal"}}
                closeOnOverlayClick={false}
			>
                <div className="modal-header">
                    <h2 >Ajout d'un script</h2>
                </div>
                <div>
                <div className="agiir-block-input">
                    <Label className="FormUser" >Nom du script </Label>
                    <Input type="text" className="FormUser" id="GroovyName" placeholder="Nom du Code groovy" />
                </div>
                <div className="agiir-block-input">   
                    <Label className="FormUser" >Description du script </Label>
                    <Input type="textarea" className="FormUser" id="GroovyDes" placeholder="Description du Code groovy" />
                </div>
                <div className="agiir-block-input">
                    <Label className="FormUser" >Import du script</Label>
                    <Input type="file" className="FormUser" id="GroovyCode" placeholder="Code groovy" onChange={this.onChangeHandler} />
                </div>
                <div className="agiir-block-input">
                    <Label className="FormUser" >Type du script</Label>
                    <Input  type="select"  
                            id="GrovvyType" 
                            className="FormUser">
                        <option value='Actions'>Actions</option>
                        <option value='Notifications'>Notifications</option>
                        <option value='Autre'>Autre</option>
                    </Input>
                </div>
                </div>
                <br/><br/>
				<div className="modal-footer-buttons">	
                <Button 
                    active 
                    color="primary"
                    onClick={() => this.onButtonClick("cancel")}>
                        <AgiirIcon icon={"ic_close"} />{" "}
                        <span>Annuler</span></Button>
                {'  '}
                <Button 
                    active 
                    color="secondary"
                    onClick={() => this.onButtonClick("add")}>
                    <AgiirIcon icon={"ic_add"} />{" "}
                    <span>Ajouter</span></Button>
				</div>
				</Modal>
        </div>
            
    );
}
}
export default GroovySaving;