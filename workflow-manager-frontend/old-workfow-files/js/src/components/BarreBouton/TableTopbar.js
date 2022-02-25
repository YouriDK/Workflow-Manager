import React from "react";
import { Button, ButtonGroup } from "reactstrap";
const liferayIconPath = Liferay.ThemeDisplay.getPathThemeImages() + "/lexicon/icons.svg"

class TableTopbar extends React.Component {
	constructor(props) {
        super(props);
    }


    render() {
        
        return (
            <ButtonGroup vertical = {this.props.vertical ? this.props.vertical : false } className="agiir-component-tabletopbar">
                {this.props.items.map(btn => (
                    <Button key={btn.id} onClick={() => this.props.callback(btn.id)} id={btn.id} className={btn.className} color ={btn.color} disabled={btn.disable}>
                    	<clay-icon spritemap={liferayIconPath} symbol={btn.icon}></clay-icon> {btn.title}
                    </Button>
                ))}
            </ButtonGroup>
        )
    }
}

export default TableTopbar;