import React, { Component } from 'react';
import './components/styles/App.css';

import environment from "./environment";
import { graphql, QueryRenderer } from 'react-relay';

import MovieFeature from "./components/MovieFeature";
import PersonFeature from "./components/PersonFeature";


const MOVIE_QUERY = graphql`
query App_MovieFeature_Query($restId: Int!) {
  movie (restId:$restId) {
    name
    summary
    image {
        absoluteFilePath
    }
    starring {
        name 
        restId
        image {
          absoluteFilePath
        }
    }
  }  
}
`; 

const PERSON_QUERY= graphql`
query App_PersonFeature_Query($restId: Int!) {
  person (restId:$restId) {
    name
    biography
    image {
        absoluteFilePath
    }
    appearsIn {
        name
        restId 
        image {
          absoluteFilePath
        }
    }
  }  
}
`; 



class App extends Component {


  constructor() {
    super(); 

    this.state = {
      query: MOVIE_QUERY, 
      currentId: 12,  //Finding Nemo

      isMovie: true, 
      
    };
  }

  handleFeaturePerson = (person) => {


    console.log(person);
    this.setState({
      query: PERSON_QUERY, 
      currentId: person.restId, 
      isMovie: false
    });

  }

  handleFeatureMovie = (movie) => {
    this.setState({
      query: MOVIE_QUERY, 
      currentId: movie.restId, 
      isMovie: true
    });
  }




  render() {


    let movieID = 12; 
    return (

      <div className="App">
  <QueryRenderer
                environment={environment}
                query={this.state.query}
                variables={{restId: this.state.currentId}}
                render={({ error, props }) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }

                    console.log(props);
                    return (this.state.isMovie? 
                      <MovieFeature movie = {props.movie} handleFeaturePerson={this.handleFeaturePerson}/> : 
                      <PersonFeature person = {props.person} handleFeatureMovie={this.handleFeatureMovie}/>
                    );
                    
                }}
            />
      </div>
    );
  }
}

export default App;
