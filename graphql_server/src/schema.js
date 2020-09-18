const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        title: String
    }

    type Query {
        user: User
    }
`;

module.exports = typeDefs;