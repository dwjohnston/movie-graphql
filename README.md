# Movie browser using GraphQL. 

This is a simple movie/actor browser React application, using a GraphQL wrapper around the [themoviedb.org](https://developers.themoviedb.org/3) REST API. 

## Some technical details

- Scaffolded with [create-react-app](https://github.com/facebook/create-react-app)
- Uses [Relay](https://facebook.github.io/relay/docs/en/quick-start-guide.html) for react intergration. 
- create-react-app isn't particularly helpful with babel transforms - so uses the [setup technique mentioned here](https://hackernoon.com/using-create-react-app-with-relay-modern-989c078fa892) to add the relay babel transform. 


## Running it in your development environment

First, you will need to get an API key from [themoviedb.org](https://developers.themoviedb.org/3/getting-started/introduction)
. 
Put it in a json file in `./graphql-schema/api-key.json` in the following format: 

```
{
  key: "mysecretkey"
}
```

Open three terminal windows. 


**Terminal one:**

```
  nodemon server.js
```

(starts the graphql server running)

**Terminal two:**

```
npm run relay 
```

(parses the react code for graphql queries)


**Terminal three:**

```
npm start
```
(start frontend development server)


## (Lack of) routing

I looked at implemented some kind of routing (so links to a specific person or movie could be saved). The official relay document [suggests](https://facebook.github.io/relay/docs/en/routing.html) using [found-relay](https://github.com/relay-tools/found-relay) for relay-modern. However, this is appears to be still in development and documentation is very sparse. 

The alternative would be to use the technique using `universal-router` described in [this Hackernoon article](https://hackernoon.com/using-create-react-app-with-relay-modern-989c078fa892). 

## No caching

Everytime the user clicks a movie/person - the GraphQL server will refetch the REST API data, even if the user has already viewed that data. Some kind of caching should be used, [as outlined in the official GraphQL documentation here](https://graphql.org/learn/caching/). 



