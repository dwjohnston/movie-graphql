import React, { Component } from 'react';
import './components/styles/App.css';

import environment from "./environment";
import { graphql, QueryRenderer } from 'react-relay';

import MovieFeature from "./components/MovieFeature";

class App extends Component {
  render() {
    return (

      <div className="App">
        <MovieFeature movieID={12} />
      </div>
      //  <QueryRenderer
      //         environment={environment}
      //         query={graphql`
      //           query AppQuery {
      //             person (id:12) {
      //               id
      //               name
      //             }  
      //           }
      //         `}
      //         variables={{}}
      //         render={({error, props}) => {
      //           if (error) {
      //             return <div>Error!</div>;
      //           }
      //           if (!props) {
      //             return <div>Loading...</div>;
      //           }
      //           return <div>User ID: {props.person.id}</div>;
      //         }}
      //       />


    );
  }
}

export default App;
