import React, { Component } from 'react';

import environment from "../environment";
import { graphql, QueryRenderer } from 'react-relay';

import "./styles/preview.css";

class PersonPreview extends Component {


    click = () => {
        console.log("click");
    }

    render() {

        const { person } = this.props;

        return <div className="preview person-preview" onClick={this.click}>
            <h4> {person.name} </h4>
            {person.image && <img src={person.image.absoluteFilePath}></img>}
        </div>;
    }


}

export default PersonPreview;
