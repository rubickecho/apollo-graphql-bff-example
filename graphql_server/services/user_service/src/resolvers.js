module.exports = {
    Query: {
        user(_, __, { dataSources }) {
            return dataSources.userAPI.getUser();
        },
        users(_, __, { dataSources }) {
            return dataSources.userAPI.getAllUser();
        }
    }
}