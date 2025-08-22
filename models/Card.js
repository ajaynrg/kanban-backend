import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" }
});

export default mongoose.model("Card", cardSchema);
