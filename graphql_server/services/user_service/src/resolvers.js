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
            console.log('user:::', user)
            return { __typename: "Book", id: user.id }
        }
    },
    Book: {
        __resolveReference(book, { dataSources }) {
            console.log('book', book)
            return {user: dataSources.userAPI.fetchUserById(book.userId)};
        }
    }
}