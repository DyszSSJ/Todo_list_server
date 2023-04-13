import "dotenv/config";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./gql/schemas.js";
import { resolvers } from "./gql/resolvers.js";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  }
};

connectToMongoDB();

async function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: "http://localhost:3000/",
      credentials: true,
    }
  });

  const { url } = await startStandaloneServer(serverApollo, {
    port: process.env.PORT || 4000
  });

  console.log(`Servidor corriendo en la url ${url}`);
}

server();
