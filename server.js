const Schema = require("./graphql-schema/graphql-schema"); 


const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();


app.use('/graphql', graphqlHTTP({
  schema: Schema.schema,
  graphiql: true
}));

app.listen(4000);