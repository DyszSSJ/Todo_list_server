import "dotenv/config";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./gql/schemas.js";
import { resolvers } from "./gql/resolvers.js";
import express from "express";
import cors from "cors";



const corsUrl = [
  {
    origin: "http://localhost:3000",
    credentials: true,
  } 
]

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
  });

  await serverApollo.start();

  const app = express();

  // Habilitar solicitudes CORS de cualquier origen
  app.use(
    cors({
      origin: corsUrl
    })
  );

  // Obtener el middleware de GraphQL
  const graphqlMiddleware = serverApollo.getMiddleware({ path: "/" });

  // Agregar el middleware de GraphQL a express
  app.use(graphqlMiddleware);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}

server();
