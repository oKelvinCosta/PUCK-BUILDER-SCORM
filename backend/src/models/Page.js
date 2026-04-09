import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  type: String,
  order: Number,

  puckData: Object,
  version: Number,
  cover: String,

  // Page N:1 User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Page N:1 Group
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }

}, { timestamps: true });

// Índice composto para buscar páginas de um grupo em ordem
PageSchema.index({ groupId: 1, order: 1 });

// Índice para buscar páginas por usuário (se necessário no futuro)
PageSchema.index({ userId: 1 });

mongoose.connect(process.env.MONGO_URI, {
  autoIndex: true
});
export default mongoose.model("Page", PageSchema);