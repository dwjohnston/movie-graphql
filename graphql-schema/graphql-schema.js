const graphql = require("graphql");
const fetch = require("node-fetch");

const { GraphQLString, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema } = graphql;

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = require("./api-key.json").key;

let IMAGE_URL, PROFILE_SIZES, POSTER_SIZES;


fetch(`${BASE_URL}/configuration?api_key=${API_KEY}`).then(res => res.json()).then(json => {
  IMAGE_URL = json.images.base_url;
  PROFILE_SIZES = json.images.profile_sizes;
  POSTER_SIZES = json.images.poster_sizes;
});

function fetchResponseByURL(relativeURL) {
  let url = `${BASE_URL}${relativeURL}?api_key=${API_KEY}`;
  return fetch(url).then(res => {
    let json = res.json();
    return json;
  });
}

function fetchPerson(id) {
  return fetchResponseByURL('/person/' + id);
}

function fetchPersonCastCredits(id) {
  return fetchResponseByURL(`/person/${id}/movie_credits`).then(json => json.cast);
}


function fetchMovie(id) {
  return fetchResponseByURL('/movie/' + id);
}


function fetchMovieCast(id) {
  return fetchResponseByURL(`/movie/${id}/credits`).then(json => json.cast);
}





function fetchMovieImages(id) {
  return fetchResponseByURL(`/movie/${id}/images`).then(json => json.posters[0]);
}

function fetchPersonImages(id) {
  return fetchResponseByURL(`/person/${id}/images`).then(json => json.profiles[0]);
}

console.log(API_KEY);

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'An actor or a crew member',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: person => {
        console.log(person);
        return person.name;
      }
    },
    id: { type: GraphQLInt },

    image: {
      type: ImageType,
      resolve: person => fetchPersonImages(person.id)
    },


    appearsIn: {
      type: new GraphQLList(MovieType),
      resolve: person => {
        return fetchPersonCastCredits(person.id)
      }
    }
    //   friends: {
    //     type: new GraphQLList(PersonType),
    //     resolve: person => // Fetch the friends with the URLs `person.friends`,
    //   },
  }),


});


// const CreditType = new GraphQLObjectType({
//   name: 'Credit',
//   description: '...',
//   fields: () => ({
//     name: {
//       type: GraphQLString,
//       resolve: movie => movie.title,
//     },
//     id: { type: GraphQLInt },
//     //   friends: {
//     //     type: new GraphQLList(PersonType),
//     //     resolve: person => // Fetch the friends with the URLs `person.friends`,
//     //   },
//   }),

// });


const ImageType = new GraphQLObjectType({
  name: "Image",
  description: "...",

  fields: () => ({
    height: {
      type: GraphQLInt,
    },
    width: {
      type: GraphQLInt,
    },
    absoluteFilePath: {
      type: GraphQLString,
      resolve: image => {
        console.log(IMAGE_URL, "AA")
        return `${IMAGE_URL}/w185${image.file_path}`;  //Todo properly ref image sizes
      }
    }
  })

});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'A movie',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: movie => movie.title,
    },
    image: {
      type: ImageType,
      resolve: movie => fetchMovieImages(movie.id)
    },
    id: { type: GraphQLInt },


    starring: {
      type: GraphQLList(PersonType),
      resolve: movie => fetchMovieCast(movie.id)
    }
    //   friends: {
    //     type: new GraphQLList(PersonType),
    //     resolve: person => // Fetch the friends with the URLs `person.friends`,
    //   },
  }),

});

const QueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (root, args) => fetchPerson(args.id)
    },
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (root, args) => fetchMovie(args.id)

    }
  })

});

const Schema = new GraphQLSchema({
  query: QueryType

});


exports.schema = Schema; 