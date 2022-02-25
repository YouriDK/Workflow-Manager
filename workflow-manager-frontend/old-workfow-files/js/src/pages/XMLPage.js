import React from 'react';
import { Button,Table,} from 'reactstrap';
import * as ressourceActions from "../actions/RessourceAction";

import CustomPagination from "../components/CustomPagination";
import ActionButton from "../components/ActionButtons"
import { AgiirIconCat } from "../utils/AgiirIcons"

class XMLPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        listXml: [],
        nom : "Vide",
        tooltipOpen1 : false ,
        tooltipOpen2 : false ,


        pageCount : 5,
        page : 1,
        rowsPerPage : 5,

        xml : false,
        JSON : false,

        //Partie JSON
        listJson : [],

        pageCountJSON : 5,
        pageJSON : 1,
        rowsPerPageJSON : 5,
     
  
      };
    

    }
async getAllXml(){
    let obj = await ressourceActions.getAllXml();
    this.setState({listXml : obj })
    
}
async getWFJson(){
    let obj = await ressourceActions.getAllJsonWF();
    this.setState({listJson : obj })
}

async deleteJsonAPI(wf){
    let obj = await ressourceActions.deleteJsonWF(wf);
    this.getWFJson();
    this.forceUpdate();
}
  

componentWillMount()
{
    this.getAllXml()
    this.getWFJson(); 
}

/*
async componentDidMount() {
    this.getAllXml()
    this.getWFJson();
}*/

async deleteXMLAPI(xml){
    let obj2 = await ressourceActions.deleteXml( JSON.stringify(xml));
    console.log(obj2)
    this.getAllXml()
    this.forceUpdate()
}

deleteXML(id){
    var del = {}
    this.state.listXml.map((element) => { 
        console.log(element)
        if (element.workflowXmlId === id ) {
            console.log("element ->" , element)					
            del = element 
        }
    })
    console.log("Supprimer" + del)
    console.log(del)
   this.deleteXMLAPI(del)
   this.getAllXml()
}
downloadXML(id){
    var del = null
    console.log("Download")
    this.state.listXml.map((element) => { 
        if ( element.workflowXmlId ===id) {
            del = element
        }
    })
    this.setState({ nom : del.nom })
    this.state.nom = del.nom
    this.sauver(del.xmlFile)
}
onButtonClick(id) {
		
    console.log(id)
    switch (id){

        case "delete" : 
            
            var del = {}
            var id = null
            this.state.listXml.map((element) => { 
                console.log(element)
                id = element.workflowXmlId
                if (document.getElementById(id).checked) {	
                    console.log("valeur ->" , document.getElementById(id))
                    console.log("element ->" , element)					
                    del = element
                    
                }
            })
            console.log("Supprimer" + del)
            console.log(del)
            this.deleteXML(del)
            
            break;

        case "done" : 
            this.props.toggle();
            break;

        case "import" :

            console.log("Download")
            this.state.listXml.map((element) => { 
                id = element.workflowXmlId
                if (document.getElementById(id).checked) {
                    del = element
                }
            })
            this.setState({ nom : del.nom })
            this.state.nom = del.nom
            this.sauver(del.xmlFile)
            this.props.toggle()
        break;
    default : console.log("onButtonClick - barre - xml " +id )
    }
}

importJson(id){
    var del = null
    console.log("import")
    this.state.listJson.map((element) => { 
        if (element.workflowId === id) {
            
            del = element
        }
    })
    this.props.Import(del.jsonFile);
}

deleteJson(id){
    var del = null
    console.log("Supprimer")
    this.state.listJson.map((element) => { 
        if (element.workflowId === id) {
            
            del = element
        }
    })
    this.deleteJsonAPI(JSON.stringify(del))
}

async deleteXML(id){
    var del = {}
    this.state.listXml.map((element) => { 
        console.log(element)
        if (element.workflowXmlId === id) {	
            console.log("valeur ->" , document.getElementById(id))
            console.log("element ->" , element)					
            del = element
            
        }
    })
    console.log("Supprimer" + del)
    console.log(del)
    await this.deleteXMLAPI(del)
    this.forceUpdate()
}

sauver(XMLDraft){
    const { nom } = this.state;
    var YouNamedIt = nom;
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
        elem.download = YouNamedIt+".xml";

        var evt = new MouseEvent("click", { bubbles: true,cancelable: true,view: window,});
        elem.dispatchEvent(evt);

        setTimeout(function(){
            window.URL.revokeObjectURL(url);  
        }, 100);
    }

}


FillTableJson(page,rowsPerPage){
    var array = []
    var date =null;
    var options = { year: "numeric", month: "short", day: "numeric" };
    var result = null;
    this.state.listJson.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element) => {
        date = new Date(element.createDate)
        result = date.toLocaleDateString('fr', options);
        array.push(
            <tr key = {element.workflowId}>
                
                <td style={{ textAlign : "left"}} >{element.nom}</td>
                <td style={{ textAlign : "left"}} >{element.description}</td>
                <td style={{ textAlign : "left"}} >{result}</td>
                <td style={{ textAlign : "left"}}>Brouillon</td>
                <td>
                <ActionButton
                    id={element.groovyId}
                    modifier = { modifier => this.importJson(element.workflowId)}
                    supprimer = { supprimer => this.deleteJson(element.workflowId) }
                    target="Groovy"
                />
        
                </td>
                
            </tr>
        )
    })    	
    return array;
}

List(infos){

    console.log("List", infos )
    switch(infos){
        case "XML" : this.setState({ xml : !this.state.xml}) ;break;
        case "JSON"  : this.setState({ JSON : !this.state.JSON}) ;break;
    }
}

FillTableXml(page,rowsPerPage){
    var array = []
    var date =null;
    var options = { year: "numeric", month: "short", day: "numeric" };
    var result = null;
    this.state.listXml.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element) => {
        date = new Date(element.createDate)
        result = date.toLocaleDateString('fr', options);
        array.push(
            <tr key = {element.workflowXmlId}>
                
                <td style={{ textAlign : "left"}} >{element.nom}</td>
                <td style={{ textAlign : "left"}} >{element.description}</td>
                <td style={{ textAlign : "left"}} >{result}</td>
                <td style={{ textAlign : "left"}} >Validée</td>
                <td> 
                <ActionButton
                    id={element.groovyId}
                    modifier = { modifier => this.downloadXML(element.workflowXmlId)}
                    supprimer = { supprimer => this.deleteXML(element.workflowXmlId) }
                    target="XML"
                />
                </td>
                
            </tr>
        )
    })
    
	 
    return array;
}

handlePageChange =  pageNumber => {
    this.setState({ page: pageNumber.selected + 1 });
  };

  handlePageChangeJSON =  pageNumber => {
    this.setState({ pageJSON: pageNumber.selected + 1 });
  };

render() {		
    const {page,rowsPerPage, xml, JSON , rowsPerPageJSON , pageJSON} = this.state;
    return (
        <div className="responsive-container">
            <div style={{ display : "flex" , justifyContent : "space-between"}}>
                <h1 className="grand-titre" onClick={() => this.List("XML")} > Liste des workflows</h1>
                <Button outline color="link"  onClick={() => this.List("XML")} ><AgiirIconCat color="primary" icon={xml ? "ic_keyboard_arrow_down"  : "ic_keyboard_arrow_up"} /> </Button>
            </div>
            <hr class="home-page-hr" />
            { xml && 
                <div>
            <Table hover striped bordered id='agiir-workflow-modals-jsonList'>
                <thead>
                    <tr>
                        
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Date de création</th>
                        <th>Etat</th> 
                        <th style={{ textAlign : "center"}} >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.FillTableXml(page - 1 ,rowsPerPage)}
                </tbody>
            </Table>
            <CustomPagination
              list={this.state.listXml}
              itemsPerPage={rowsPerPage}            
              handlePageChange={this.handlePageChange}
            />
            </div> }
            <br/><br/>
            <div style={{ display : "flex" , justifyContent : "space-between"}} >
                 <h1 className="grand-titre" onClick={() => this.List("JSON")} > Liste des sauvegardes</h1>
                <Button  outline color="link" onClick={() => this.List("JSON")} > <AgiirIconCat icon={JSON ?  "ic_keyboard_arrow_down"  : "ic_keyboard_arrow_up"} /> </Button>
            </div>
            <hr class="home-page-hr" />
                    { JSON && 
                        <div>
                        <Table hover striped bordered id='agiir-workflow-modals-jsonList'>
                            <thead>
                                <tr>
                                    
                                    <th>Nom</th>
                                    <th>Description</th>
                                    <th>Date de création</th>
                                    <th>Etat</th> 
                                    <th style={{ textAlign : "center"}}>Actions</th>
                                </tr>
                            </thead>
                    <tbody> {this.FillTableJson(pageJSON - 1 ,rowsPerPageJSON)} </tbody>
                        </Table>
                        <CustomPagination
                            list={this.state.listJson}
                            itemsPerPage={rowsPerPageJSON}            
                            handlePageChange={this.handlePageChangeJSON} /> 
                    </div> }
            
        </div>
            
    );
}
}
export default XMLPage;
