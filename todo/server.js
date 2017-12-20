const express = require('express')
const axios = require('axios')
const expressGraphQL = require('express-graphql')
const {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLList
} = require('graphql')
const app = express()
const uri = 'http://localhost:3000/'

// First We create a model and set fields and types

const TodoObject = new GraphQLObjectType({
    // name of object (model)
    name: "Todo",
    // Object fields are being described here
    fields: () => ({
        id: { type: GraphQLString },
        todo: { type: GraphQLString },
        isDone: { type: GraphQLBoolean },
    })
})

// Now we need to make query
const queryObject = new GraphQLObjectType({
    name: 'Todoquery',
    fields: {
        create: {
            type: TodoObject,
            args: {
                todo: { type: new GraphQLNonNull(GraphQLString) },
                isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parentValue, args) {
                return axios.post(`${uri}todos`, args)
                    .then(res => res.data)
                    .catch(err => err)
            }
        },
        todos: {
            type: new GraphQLList(TodoObject),
            resolve(parentValue, args) {
                return axios.get(`${uri}todos`)
                    .then(res => res.data)
                    .catch(err => err)
            }
        },
        todo: {
            type: TodoObject,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get(`${uri}todos/${args.id}`)
                    .then(res => res.data)
                    .catch(err => err)
            }
        },
        update: {
            type: TodoObject,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                todo: { type: GraphQLString },
                isDone: { type: GraphQLBoolean },
            },
            resolve(parentValue, args) {
                return axios.patch(`${uri}todos/${args.id}`, args)
                    .then(res => res.data)
                    .catch(err => err)
            }
        },
        delete: {
            type: TodoObject,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete(`${uri}todos/${args.id}`)
                    .then(res => res.data)
                    .catch(err => err)
            }
        },

    }
})

const schema = new GraphQLSchema({

    query: queryObject
})
app.use(expressGraphQL({ schema, graphiql: true }))

app.listen(4000, () => console.log("app is running on port 4000"));