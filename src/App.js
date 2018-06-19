import React, { Component } from 'react';
import './components/styles/App.css';

import environment from "./environment";
import { graphql, QueryRenderer } from 'react-relay';

import MovieFeature from "./components/MovieFeature";

class App extends Component {



  //Redux might 

  render() {


    let movieID = 12; 
    return (

      <div className="App">
  <QueryRenderer
                environment={environment}
                query={graphql`
          query AppQuery($movieID: Int!) {
            movie (restId:$movieID) {
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
                    return <MovieFeature movie = {props.movie}/> ;
                }}
            />
      </div>
    );
  }
}

export default App;
