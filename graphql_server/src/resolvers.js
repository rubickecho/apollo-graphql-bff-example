module.exports = {
    Query: {
        user: (_, __, {
            dataSources
        }) => dataSources.userAPI.getUser()
    }
}