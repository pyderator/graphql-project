import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { UserResolver } from "./Resolvers/User";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";
const main = async () => {
  await createConnection();
  const redisStore = connectRedis(session);
  const client = redis.createClient();
  const app = express();
  app.use(
    session({
      store: new redisStore({ client }),
      secret: "adsada",
      saveUninitialized: false,
      resave: false,
      name: "session_id",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 years
      },
    }),
  );
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
    }),
  });

  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("Listening on port 4000"));
};

main();
