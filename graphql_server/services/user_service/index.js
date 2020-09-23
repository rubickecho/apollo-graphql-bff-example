const Koa = require("koa");
const { ApolloServer, SchemaDirectiveVisitor } = require('apollo-server-koa');
const { buildFederatedSchema } = require('@apollo/federation');

const graphqlSchemas = require('./src/graphql/index.js');
const authMiddleware = require('./src/middlewares/auth');
const allCustomDirectives = require('./src/graphql/directives');
const UserAPI = require('./src/datasources/user');

const isProd = process.env.NODE_ENV === "production";

/**
 * buildFederatedSchema(graphqlSchemas) 
 * graphqlSchemas [Array] [{schema-1, resolver-1}, {schema-2, resolver-2}]
 * Reference: https://www.robinwieruch.de/graphql-apollo-server-tutorial/#apollo-server-resolvers
 *
 * Federation: support custom directives in federated schemas
 * Issues: https://github.com/apollographql/apollo-feature-requests/issues/145
 */
const schema = buildFederatedSchema(graphqlSchemas);
SchemaDirectiveVisitor.visitSchemaDirectives(
    schema, 
    { ...allCustomDirectives }
);

const server = new ApolloServer({
    schema: schema,
    dataSources: () => ({
        userAPI: new UserAPI()
    }),
    context: ({ ctx }) => {
        return { token: ctx.headers.authorization || '' }
    },
    formatError: (error) => ({
		code: error.extensions.code,
		message: error.message,
	}),
	introspection: !isProd,
	playground: !isProd,
    mocks: false,
    engine: false
})

const app = new Koa();
app.use(authMiddleware);

/**
 * 将graphql服务连接到koa框架
 */
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () => {
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
})