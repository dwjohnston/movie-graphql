import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

 import environment from "./environment"; 
 import {graphql, QueryRenderer} from 'react-relay';


class App extends Component {
  render() {
    return (

 <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            person (id:12) {
              id
              name
            }  
          }
        `}
        variables={{}}
        render={({error, props}) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>User ID: {props.person.id}</div>;
        }}
      />


    );
  }
}

export default App;
