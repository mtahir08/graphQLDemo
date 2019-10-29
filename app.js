const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/Schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const app = express();
app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-r4te6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
    .then(() => {
        app.listen(3000, () => {
            console.log("server is running!!!!");
        })
    })
    .catch((err) => {
        console.log(err)
    })

