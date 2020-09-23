const Koa = require("koa");
const { ApolloServer } = require('apollo-server-koa');
const { buildFederatedSchema } = require('@apollo/federation');

const graphqlSchemas = require('./src/graphql/index.js');
const UserAPI = require('./src/datasources/user');

const isProd = process.env.NODE_ENV === "production";

/**
 * buildFederatedSchema(graphqlSchemas) 
 * graphqlSchemas [Array] [{schema-1, resolver-1}, {schema-2, resolver-2}]
 *
 * Reference: https://www.robinwieruch.de/graphql-apollo-server-tutorial/#apollo-server-resolvers
 */
const server = new ApolloServer({
    schema: buildFederatedSchema(graphqlSchemas),
    dataSources: () => ({
        userAPI: new UserAPI()
    }),
    formatError: (error) => ({
		code: error.extensions.code,
		message: error.message,
	}),
	introspection: !isProd,
	playground: !isProd,
	mocks: false
})

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})