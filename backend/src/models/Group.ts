import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: String,

  // Group 1:N User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

// Índice para buscar grupos por usuário rapidamente
GroupSchema.index({ userId: 1 });

export default mongoose.model("Group", GroupSchema);