const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        title: String
        created_time: String
        status: Int
    }

    type Query {
        user: User
        users: [User]
        findUser(id: ID!): User
    }
`;

module.exports = typeDefs;