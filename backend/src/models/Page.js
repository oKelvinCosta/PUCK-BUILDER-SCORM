import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  type: String,
  order: Number,

  puckData: Object,
  version: Number,

  usersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  groupsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }

}, { timestamps: true });

export default mongoose.model("Page", PageSchema);