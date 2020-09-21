const { gql } = require('apollo-server');

const typeDefs = gql`
    type User @key(fields: "id") {
        id: ID!
        title: String
        created_time: String
        age: Int
        status: Int
    }

    type Query {
        user: User
        users: [User]
    }
`;

module.exports = typeDefs;