import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "default.png",
  },
  linkedin: {
    type: String,
  },
  mail: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
