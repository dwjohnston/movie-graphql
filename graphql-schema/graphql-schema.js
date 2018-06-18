const graphql = require("graphql");


const {GraphQLString, GraphQLList,  GraphQLObjectType, GraphQLSchema} = graphql; 


const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY = require("./api-key.json").key; 

console.log(API_KEY);

const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'An actor or a crew member',
    fields: () => ({
      name: {
        type: GraphQLString,
        resolve: person => person.name,
      },
      id: {type: GraphQLString},
    //   friends: {
    //     type: new GraphQLList(PersonType),
    //     resolve: person => // Fetch the friends with the URLs `person.friends`,
    //   },
    }),

    resolve: () => {
      
    }
  });

  const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: 'A movie',
    fields: () => ({
      name: {
        type: GraphQLString,
        resolve: movie => movie.name,
      },
      id: {type: GraphQLString},
    //   friends: {
    //     type: new GraphQLList(PersonType),
    //     resolve: person => // Fetch the friends with the URLs `person.friends`,
    //   },
    }),

    resolve: () => {

    }
  });

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                }
            }
        }
    })
});


exports.schema = Schema; 