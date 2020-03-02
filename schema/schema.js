const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

// dummy data
var books = [
    { name: 'Test', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'John', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'Jane', genre: 'Scifi', id: '3', authorId: '3' },
    { name: 'Hero Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'Color Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'Fantastic Light', genre: 'Scifi', id: '6', authorId: '3' },
]

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 86, id: '2' },
    { name: 'Terry Pratchet', age: 75, id: '3' },

]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve (parent, args) {
                return _.find(authors, { id: parent.authorId });    
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});