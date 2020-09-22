module.exports = {
    Query: {
        books(_, __, { dataSources }) {
            return dataSources.bookAPI.fetchAllBook();
        }
    },
    Book: {
        user(book) {
            console.log('user book', book)
            return { __typename: "User", id: book.userId }
        }
    },
    User: {
        __resolveReference(user, { dataSources }) {
            console.log('user', user)
            return {books: dataSources.bookAPI.fetchUserBooks(user.id)};
        }
    }
}