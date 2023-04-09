import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export async function register(input) {
  const { name, email, password } = input;

  // Validar el input
  if (!name || name.length === 0) {
    throw new Error("El nombre es requerido");
  }

  if (!email || email.length === 0) {
    throw new Error("El correo electrónico es requerido");
  }

  // sanitize the email
  const sanitizedEmail = email.trim().toLowerCase();

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(sanitizedEmail)) {
    throw new Error("El correo electrónico es inválido");
  }

  if (!password || password.length === 0) {
    throw new Error("La contraseña es requerida");
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new Error("El usuario ya existe");
  }

  if (user) {
    throw new Error("El usuario ya existe");
  }

  const salt = await bcrypt.genSalt(10);
  input.password = await bcrypt.hash(password, salt);
  input.email = sanitizedEmail;

  try {
    const register = new User(input);

    register.save();
    return register;
  } catch (error) {
    console.log(error);
  }
}

export async function login(input) {
  const { email, password } = input;

  if (!email || !password) {
    throw new Error(
      "Debe proporcionar una dirección de correo electrónico y una contraseña"
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    throw new Error("Contraseña incorrecta");
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = Jwt.sign(payload, process.env.JWT);

  return {
    token,
  };
}

export async function getUser(id) {
  const user = await User.findById({ _id: id }).populate("proyects").sort({
    createAt: -1,
  });

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return user;
}

export const updateUser = async (userId, input) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, input, { new: true });
    if (!updatedUser) {
      throw new Error("El usuario no existe");
    }
    return true;
  } catch (error) {
    console.error("Error ual actualizar usuario:", error);
    throw error;
  }
};
