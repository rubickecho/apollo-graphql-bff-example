module.exports = {
    Query: {
        user(_, __, { dataSources }) {
            return dataSources.userAPI.getUser();
        },
        users(_, __, { dataSources }) {
            return dataSources.userAPI.getAllUser();
        }
    },
    User: {
        book(user) {
            return { __typename: "Book", id: user.id }
        }
    },
    Book: {
        __resolveReference(book, { dataSources }) {
            return {user: dataSources.userAPI.fetchUserById(book.userId)};
        }
    }
}