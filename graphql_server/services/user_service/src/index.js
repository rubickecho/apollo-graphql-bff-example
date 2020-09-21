const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const UserAPI = require('./datasources/user');

const server = new ApolloServer({
    schema: buildFederatedSchema([{
        typeDefs,
        resolvers,  
    }]),
    dataSources: () => ({
        userAPI: new UserAPI()
    }),
    context: ({ req }) => ({
        authScope: 'authorization'
    }),
    tracing: true // 跟踪面板，分析性能 
})

server.listen({ port: 4001 }).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})