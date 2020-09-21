const { gql } = require('apollo-server');

const typeDefs = gql`
    type Book @key(fields: "id") {
        id: ID!
        title: String
        price: Float
        user: User @provides(fields: "title")
    }

    #-The extend keyword indicates that Product is an entity that is defined in another
    #implementing service (in this case, the products service).
    #
    #-The @key directive indicates that Product uses the upc field as its primary key. This value
    #must match the value of exactly one @key defined in the entity's originating service, even if
    #the entity defines multiple primary keys.
    #
    #-The upc field must be included in the stub because it is part of the specified @key. It also
    #must be annotated with the @external directive to indicate that the field originates in another service.
    extend type User @key(fields: "id") {
        id: ID! @external
        title: String @external
        books: [Book]
    }

    type Query {
        books: [Book]
    }
`;

module.exports = typeDefs;