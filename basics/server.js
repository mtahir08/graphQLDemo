const express = require('express');
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
const app = express();

const myTodos = [
    { id: "1", todo: 'My first todo', isDone: false },
    { id: "2", todo: 'My second todo', isDone: true },
    { id: "3", todo: 'My third todo', isDone: false }
];

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
        createTodo: {
            type: TodoObject,
            args: {
                todo: { type: new GraphQLNonNull(GraphQLString) },
                isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parentValue, args) {
                // myTodos = [...myTodos, args]
                console.log(args);
                return [...myTodos, args]
            }
        },
        todos: {
            type: new GraphQLList(TodoObject),
            resolve(parentValue, args) {
                console.log(myTodos);
                return myTodos
            }
        },
        todo: {
            type: TodoObject,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return myTodos.find((val) => val.id == args.id)
            }
        }
    }
})

const schema = new GraphQLSchema({

    query: queryObject
})
app.use(expressGraphQL({ schema, graphiql: true }))

app.listen(4000, () => console.log("app is running on port 4000"));