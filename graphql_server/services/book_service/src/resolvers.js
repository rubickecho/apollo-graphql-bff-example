module.exports = {
    Query: {
        books(_, __, { dataSources }) {
            return dataSources.bookAPI.fetchAllBook();
        }
    },
    Book: {
        user(book) {
            return { __typename: "User", id: book.userId }
        }
    },
    User: {
        __resolveReference(user, { dataSources }) {
            return {books: dataSources.bookAPI.fetchUserBooks(user.id)};
        }
    }
}