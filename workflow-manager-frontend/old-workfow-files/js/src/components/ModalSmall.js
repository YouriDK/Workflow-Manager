import React from "react";
import Modal from "react-responsive-modal";
import {Label, Input, Button} from 'reactstrap';
import { AgiirIcon } from '../utils/AgiirIcons'

export default class ModalSmall extends React.Component{
    
  constructor(props) {
    super(props);

    this.state = {
        openModal : false,
        nom : "",
        description : "",
    };

    this.handleChange = this.handleChange.bind(this);
       
  }

  componentWillReceiveProps(nextProps) {
      this.setState({openModal: nextProps.open,
                    nom : "",
                    description : "" ,
      })
  }

  //onCloseModal = () => { this.setState({ openModal: false });  };
  
  //onOpenModal = () => { this.setState({ openModal: true }); };
  
  message() {  console.log("Nous sommes dans le modal ! ") }
  
  
  getInfos(){
    const { titreProps , descriptionProps } = this.props
    const { nom , description } = this.state
    
   
    this.props.informations(nom,description)
    
  }

  handleChange(e) {
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change);
	  }



  render() {
    const {nom, description } = this.state;
    const { message, open , titre , descriptionProps , titreProps } = this.props;
    return (
      <Modal
        open={open}
        onClose={() => this.props.close("close")}
        center
        classNames={{modal : "agiir-modal"}}
        closeOnOverlayClick={false}
        >
         <div className="modal-header">
            <h2>{titre}</h2>
          </div>
             
        { titreProps && 
        <div className="agiir-block-input">
          <Label className="label-input" >{message}</Label>
          <Input  className="agiir-workflow-input"
                  name="nom"
                  id="nom" 
                  value={nom}
                  onChange={this.handleChange}/>
				</div>
        }
        { descriptionProps && 
          <div className="agiir-block-input">
          <Label className="label-input" >Description</Label>
            <Input  className="agiir-workflow-input"
                    name="description"
                    id="description" 
                    value={description}
                    onChange={this.handleChange}/>

            </div>

        }
        { titre === "Export XML" && <pre>{message.toString()}</pre> }

        
        <br/>
        <div className="modal-footer-buttons">
            <Button color="primary" onClick={() => this.props.close("close")}>
            <AgiirIcon icon={"ic_close"} />{" "}
            <span>Annuler</span>
            </Button>{" "}{" "}
            
            <Button
              hidden = { titreProps ? false : true}
              className="action-button"
              color="secondary"
              onClick = { () => this.getInfos()}
            >
             <AgiirIcon icon={"ic_check"} />{" "}
              <span>Valider</span>
            </Button>
          </div>
      

      </Modal>
    )}
}