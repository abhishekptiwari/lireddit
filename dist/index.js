"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("graphql");
const hello_1 = require("./resolvers/hello");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver],
        }),
    });
    apolloServer.applyMiddleware({ app });
    app.get('/', (_, res) => {
        res.send('Hello ');
    });
    app.listen(4000, () => {
        console.log('Server started on localhost:4000');
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map