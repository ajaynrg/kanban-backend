import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    assignee: {
      type: String,
      default: "",
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    position: {
      type: Number,
      default: 0, // used for ordering within a list
    },
    dueDate: {
      type: Date,
    },
    labels: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Card", cardSchema);
