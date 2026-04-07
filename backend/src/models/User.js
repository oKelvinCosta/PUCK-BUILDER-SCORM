import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  active: {
    type: Boolean,
    default: true
  },

  lastLogin: {
    type: Date
  }

}, { timestamps: true });

export default mongoose.model("User", UserSchema);