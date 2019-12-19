const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/Schema')
const graphQlResolvers = require('./graphql/resolvers')
const isAuth = require('./middleware/is-auth')

const app = express();
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-methods', 'POST, GET, OPTIONS, DELETE, PUT')
    res.setHeader('Access-Control-Allow-headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    }
    next()
})
app.use(isAuth)

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds137368.mlab.com:37368/${process.env.MONGO_DB}`
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        app.listen(4000, () => {
            console.log("server is running!!!!");
        })
    })
    .catch((err) => {
        console.log(err)
    })

