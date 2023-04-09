import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  proyects: [
    {type: mongoose.Schema.Types.ObjectId, ref: "Proyectos",},
  ],
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
