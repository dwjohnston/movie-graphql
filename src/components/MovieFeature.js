import React, { Component } from 'react';

import environment from "../environment";
import { graphql, QueryRenderer } from 'react-relay';

import PersonPreview from "./PersonPreview";

import "./styles/feature.css";

class MovieFeature extends Component {



    render() {

        const { movieID } = this.props;

        return (

            <QueryRenderer
                environment={environment}
                query={graphql`
          query MovieFeatureQuery($movieID: Int!) {
            movie (restId:$movieID) {
              name
              image {
                  absoluteFilePath
              }
              starring {
                  restId
              }
            }  
          }
        `}
                variables={{ movieID }}
                render={({ error, props }) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }

                    console.log(props);
                    return <div className ="feature movie-feature">
                        <h2> {props.movie.name} </h2>

                        {props.movie.image && <img src={props.movie.image.absoluteFilePath}></img>}

                        <h3> starring </h3>

                        <div className="starring">
                            {props.movie.starring.map((v, i) => <PersonPreview key={i} personID={v.restId} />)}
                        </div>

                    </div>;
                }}
            />


        );
    }
}

export default MovieFeature;