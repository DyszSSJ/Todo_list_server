import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./gql/schemas.js";
import { resolvers } from "./gql/resolvers.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

mongoose.set("strictQuery", true);
const db = process.env.DB;

mongoose.connect(db, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa");
  server();
});

async function server(){
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } =  await startStandaloneServer(server,{
        port: process.env.PORT || 4000,
    });

    console.log(`Server ready at ${url}`);
}