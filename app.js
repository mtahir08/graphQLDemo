const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/Schema')
const graphQlResolvers = require('./graphql/resolvers')

const app = express();
app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds137368.mlab.com:37368/${process.env.MONGO_DB}`
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log("server is running!!!!");
        })
    })
    .catch((err) => {
        console.log(err)
    })

