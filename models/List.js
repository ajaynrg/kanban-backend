import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }]
});

export default mongoose.model("List", listSchema);
