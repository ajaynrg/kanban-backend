import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  // Reference to the User who owns the board
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  // The 'lists' field is an array that stores ObjectIds referencing documents in the "List" collection.
  // This allows each Board to be associated with multiple lists, enabling a one-to-many relationship.
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }]
});

export default mongoose.model("Board", boardSchema);
