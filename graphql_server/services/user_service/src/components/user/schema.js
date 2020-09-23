const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date

    type User @key(fields: "id") {
        id: ID!
        title: String
        created_time: Date
        age: Int
        """
        用户状态 1: 正常 -1: 禁用
        """
        status: Int
    }

    extend type Book @key(fields: "userId") {
        userId: Int @external
        user: User
    }

    type Query {
        user: User
        users: [User]
    }
`;

module.exports = typeDefs;