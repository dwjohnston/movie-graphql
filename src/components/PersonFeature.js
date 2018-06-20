import React, { Component } from 'react';

import environment from "../environment";
import { graphql, QueryRenderer } from 'react-relay';

import MoviePreview from "./MoviePreview";

import "./styles/feature.css";

class PersonFeature extends Component {



    render() {

        const {person} = this.props; 

        return(<div className="feature person-feature">
        <h2> {person.name} </h2>

        <div className="body">
            <div className="image-container">
                {person.image && <img src={person.image.absoluteFilePath}></img>}
            </div>
            <div>
                <p>
                    {person.biography}
                </p>
            </div>
        </div>

        <h3> Appears In </h3>

        <div className="appears-in">
            {person.appearsIn.map((movie, i) => <MoviePreview key={i} movie={movie} handleClick = {this.props.handleFeatureMovie} />)}
        </div>

    </div>

          

        );
    }
}

export default PersonFeature;
