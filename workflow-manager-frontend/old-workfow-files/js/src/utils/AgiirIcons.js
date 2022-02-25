import { Icon } from "react-icons-kit";
import React from "react";
import * as Ic from 'react-icons-kit/md'

export class AgiirIcon extends React.Component{
    constructor(props) {
      super(props);
    }

    render() {
        return( <Icon size={22} icon={Ic[this.props.icon]} /> );
    }

  }


  export class AgiirIconDropDown extends React.Component{
    constructor(props) {
      super(props);
    }

    render() {
        return( <Icon size={18} icon={Ic[this.props.icon]} /> );
    }

  }

  export class AgiirIconMeta extends React.Component{
    constructor(props) {
      super(props);
    }

    render() { return( <Icon className="agiir-buttons" size={22} icon={Ic[this.props.icon]} /> ); }

  }

  export class AgiirIconCat extends React.Component{
    constructor(props) {
      super(props);
    }

    render() { return( <Icon size={24} icon={Ic[this.props.icon]} /> ); }

  }