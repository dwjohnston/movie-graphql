import React, { Component } from 'react';

import environment from "../environment";
import { graphql, QueryRenderer } from 'react-relay';

import "./styles/preview.css";

class MoviePreview extends Component {

    render() {

        const { movie } = this.props;

        return <div className="preview movie-preview" onClick={() => this.props.handleClick(movie)}>
            <h4> {movie.name} </h4>
            {movie.image && <img src={movie.image.absoluteFilePath}></img>}
        </div>;
    }


}

export default MoviePreview;
