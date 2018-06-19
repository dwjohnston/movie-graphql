import React, { Component } from 'react';

import environment from "../environment";
import { graphql, QueryRenderer } from 'react-relay';

import "./styles/preview.css";

class PersonPreview extends Component {



    render() {

        const {personID} = this.props; 

        return (

            <QueryRenderer
                environment={environment}
                query={graphql`
          query PersonPreviewQuery($personID: Int!) {
            person (restId:$personID) {
              name
              image {
                  absoluteFilePath
              }
            }  
          }
        `}
                variables={{personID}}
                render={({ error, props }) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }
                    return <div className ="preview person-preview">
                        <h4> {props.person.name} </h4> 
                        {props.person.image && <img src = {props.person.image.absoluteFilePath}></img>}
                    </div>;
                }}
            />


        );
    }
}

export default PersonPreview;
