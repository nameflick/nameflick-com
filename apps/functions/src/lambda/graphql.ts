import { ApolloServer } from "apollo-server-lambda";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers, createContext } from "@0xflick/graphql";
import {
  createLogger,
  deserializeSessionCookie,
  expireSessionCookie,
  serializeSessionCookie,
} from "@0xflick/backend";
import type { LambdaContextFunctionParams } from "apollo-server-lambda/dist/ApolloServer";

const logger = createLogger({
  name: "graphql",
});
const apolloContext = await createContext({
  ssmParamName: process.env.SSM_PARAM_NAME,
  ssmRegion: process.env.SSM_REGION,
});

function setCookie(
  res: LambdaContextFunctionParams["express"]["res"],
  token: string
) {
  logger.info("Setting cookie");
  res.setHeader("set-cookie", serializeSessionCookie(token, "/api/"));
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ express }) {
    return {
      ...apolloContext,
      setToken: (token: string) => setCookie(express.res, token),
      getToken: () => {
        logger.info("Getting cookie", express.req.headers.cookie);
        return deserializeSessionCookie(express.req.headers.cookie);
      },
      clearToken: () => {
        logger.info("Clearing cookie");
        express.res.setHeader("set-cookie", expireSessionCookie("/api/"));
      },
    };
  },
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export const handler = server.createHandler();
