// resolvers.js
import { register, login, getUser, updateUser } from "../controllers/userController.js";
import { createProyect, getProyect, deleteProject, updateProject, searchProjects } from "../controllers/proyectControllers.js";

export const resolvers = {
  Query: {
    getUser: (_, { userId }) => getUser(userId),
    proyecto: (_, { id }) => getProyect(id),
    searchProjects: (_, { name }) => searchProjects(name),
  },
  Mutation: {
    register: async (_, { input }) => register(input),
    login: async (_, { input }) => login(input),
    createProyect: async (_, input) => createProyect(input),
    deleteProject: async (_, { id }) => deleteProject(id),
    updateProject: async (_, { id, input }) => updateProject(id, input),
    updateUser: async (_, { userId, input }) => updateUser(userId, input),
  },
};