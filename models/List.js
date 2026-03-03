import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String},
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId},
  // Reference to the Board that contains this list
  boardId: { type: mongoose.Schema.Types.ObjectId, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }]
});

export default mongoose.model("List", listSchema);
