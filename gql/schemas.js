import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID
    name: String!
    email: String!
    password: String
    proyects: [Proyect]
  }

  type Login {
    token: String!
  }

  type Proyect {
    userId: ID
    name: String
    description: String
    image: String
    date: String
    id: ID
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateProyectInput {
    userId: ID!
    name: String!
    description: String!
    image: String
    date: String!
  }

  input UpdateProjectInput {
    name: String
    description: String
    image: String
    date: String
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  type Mutation {
    register(input: UserInput!): User!
    login(input: LoginInput!): Login!
    createProyect(input: CreateProyectInput!): Boolean!
    deleteProject(id: ID!): Boolean!
    updateProject(id: ID!, input: UpdateProjectInput!): Boolean!
    updateUser(userId: ID!, input: UpdateUserInput!): Boolean!
  }

  type Query {
    getUser(userId: ID!): User
    proyecto(id: ID!): Proyect
    searchProjects(name: String!): [Proyect]
  }
`;