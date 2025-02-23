import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import resolvers from "./resolvers/resolvers.js";
import "dotenv/config";

dotenv.config();


mongoose
  .connect("mongodb://127.0.0.1:27017/graphQlTask")
  .then(() => {
    console.log("Database Connected..!");
  })
  .catch((err) => {
    console.log(err);
  });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  formatError: (err) => {
    return { message: err.message };
  },
});

const port = 4000;

startStandaloneServer(server, {
  listen: { port },
  context: ({ req }) => {
    const token = req.headers.authorization;
  
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET || "1998");
        return { user };
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }
    return {};
  },
})
  .then(() => {
    console.log(`Server running..! on port ${port}`);
  })
  .catch((err) => {
    console.log(err);
  });
