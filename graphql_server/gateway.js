const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
    serviceList: [
        { name: "user", url: "http://localhost:4001/graphql"},
        { name: "book", url: "http://localhost:4002/graphql"}
    ],
    __exposeQueryPlanExperimental: false
});

(async () => {
    const server = new ApolloServer({
        gateway,
        engine: false,
        subscriptions: false
    });

    server.listen().then(({url}) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})();