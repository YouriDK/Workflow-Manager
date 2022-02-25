import React from 'react';
import { Table,} from 'reactstrap';
import * as ressourceActions from "../actions/RessourceAction";
import CustomPagination from "../components/CustomPagination";
import ActionButton from "../components/ActionButtons"


class SavePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        listJson: [],

        pageCount : 5,
        page : 1,
        rowsPerPage : 5,

      };
    }
    toggle() {this.setState(prevState => ({ toggle: !prevState.toggle}));	}


//async componentDidMount() { this.getWFJson(); }

async componentWillMount() { this.getWFJson(); }


async getWFJson(){
    let obj = await ressourceActions.getAllJsonWF();
    this.setState({listJson : obj })
    console.log("Liste JSON")
    console.log(obj)
}

async deleteJsonAPI(wf){
    let obj = await ressourceActions.deleteJsonWF(wf);
    this.getWFJson();
    this.forceUpdate();
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
                <td>{result}</td>
                <td>{element.nom}</td>
                <td>{element.description}</td>
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




render() {	
    const {page,rowsPerPage} = this.state;	
    return (
        <div className="responsive-container" >
        <h1 className="grand-titre" > Liste des sauvegardes</h1>
        <hr class="home-page-hr" />
        <Table id='agiir-workflow-modals-jsonList'>
            <thead>
                <tr>
                    <th>Date de création</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.FillTableJson(page - 1 ,rowsPerPage)}
            </tbody>
        </Table>
        <CustomPagination
              list={this.state.listJson}
              itemsPerPage={rowsPerPage}            
              handlePageChange={this.handlePageChange}
        /> 
            


        </div>
            
    );
}
}

export default SavePage;