const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const UserAPI = require('./datasources/user');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        userAPI: new UserAPI()
    }),
    context: ({ req }) => ({
        authScope: 'authorization'
    }),
    tracing: true // 跟踪面板，分析性能 
})

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})