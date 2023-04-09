import User from "../models/User.js";
import Proyectos from "../models/Proyectos.js";

export async function createProyect({ input }) {
  const { userId, name, description, image, date } = input;

  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const newProyecto = new Proyectos({
    userId,
    name,
    description,
    image,
    date,
  });

  user.proyects.push(newProyecto._id);
  await newProyecto.save();
  await user.save();

  return true;
}

export const getProyect = async (id) => {
  try {
    const proyect = await Proyectos.findById(id);
    if (!proyect) {
      throw new Error("Proyecto no encontrado");
    }
    return proyect;
  } catch (error) {
    throw new Error("Error al obtener el proyecto");
  }
};

export const deleteProject = async (id) => {
  try {
    const deletedProject = await Proyectos.findByIdAndDelete(id);

    if (!deletedProject) {
      throw new Error("No se encontró el proyecto para eliminar.");
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    return false;
  }
};

export const updateProject = async (id, input) => {
  try {
    const updatedProject = await Proyectos.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      throw new Error("No se encontró el proyecto para actualizar.");
    }

    return true;
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    return false;
  }
};

export const searchProjects = async (name) => {
  try {
    const proyectos = await Proyectos.find({});
    console.log(proyectos);

    const proyectosFiltrados = proyectos.filter((proyecto) =>
      proyecto?.name?.toLowerCase().includes(name.toLowerCase())
    );

    return proyectosFiltrados;
  } catch (error) {
    console.error("Error al buscar proyectos:", error);
    throw new Error("Error al buscar proyectos");
  }
};
