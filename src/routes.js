import { Route, makeRouteConfig } from 'found';
import React from 'react';
import { graphql } from 'react-relay';

import App from "./App"; 
import MovieFeature from "./components/MovieFeature"; 
import PersonFeature from "./components/PersonFeature";


const MovieQuery = graphql`
query routes_MovieFeature_Query($movieId: Int!) {
    movie (restId:$movieId) {
      name
      summary
      image {
          absoluteFilePath
      }
      starring {
          name 
          image {
            absoluteFilePath
          }
      }
    }  
  }
`;

const PersonQuery = graphql`
query routes_PersonFeature_Query($personId: Int!) {
    person (restId:$personId) {
      name
      image {
          absoluteFilePath
      }
      appearsIn {
          name 
          image {
            absoluteFilePath
          }
      }
    }  
  }
`;

export default makeRouteConfig(
    <Route
        path="/"
        Component={App}
    >
        <Route
            Component={MovieFeature}
            query={MovieQuery}
            path="/movie/:id" 
            prepareVariables={params => {
                console.log(params); 
                return {
                    movieId : params.id
                }; 
            }}
        />
        <Route
            Component={PersonFeature}
            query={PersonQuery}
            path="/person/:id"
            prepareVariables={params => ({ ...params, status: 'any' })}
        />
    </Route>,
);
