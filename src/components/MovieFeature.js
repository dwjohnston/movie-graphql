import React, { Component } from 'react';

import environment from "../environment";
import { graphql, QueryRenderer } from 'react-relay';

import PersonPreview from "./PersonPreview";

import "./styles/feature.css";

class MovieFeature extends Component {



    render() {

        const {movie} = this.props; 

        return(<div className="feature movie-feature">
        <h2> {movie.name} </h2>

        <div className="body">
            <div className="image-container">
                {movie.image && <img src={movie.image.absoluteFilePath}></img>}
            </div>
            <div>
                <p>
                    {movie.summary}
                </p>
            </div>
        </div>

        <h3> starring </h3>

        <div className="starring">
            {movie.starring.map((person, i) => <PersonPreview key={i} person={person} />)}
        </div>

    </div>

          

        );
    }
}

export default MovieFeature;
