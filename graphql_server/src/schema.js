const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        title: String
        created_time: String
        status: Int
        books: [Book]
    }

    type Book {
        id: ID!
        title: String
        price: Float
        user: User
    }

    type Query {
        user: User
        users: [User]
        findUser(id: ID!): User
        getUserBooks(id: ID!): User
    }
`;

module.exports = typeDefs;