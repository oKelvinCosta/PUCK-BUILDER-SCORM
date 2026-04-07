import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: String,

  usersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

export default mongoose.model("Group", GroupSchema);