const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const UserAPI = require('./datasources/user');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        userAPI: new UserAPI()
    })
})

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})