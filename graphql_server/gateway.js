const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set('authorization', context.token);
    }
}

const gateway = new ApolloGateway({
    serviceList: [
        { name: "user", url: "http://localhost:4001/graphql"},
        { name: "book", url: "http://localhost:4002/graphql"}
    ],
    buildService({ name, url }) {
        return new AuthenticatedDataSource({ url });
    },
    __exposeQueryPlanExperimental: false
});

(async () => {
    const server = new ApolloServer({
        gateway,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return { token };
        },
        // engine: false,
        subscriptions: false
    });

    server.listen().then(({url}) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})();