import Board from "../models/Board.js";
import List from "../models/List.js";

export const getLists = async (req, res) => {
  try {
    const lists = await List.find().populate('boardId', 'title');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createList = async (req, res) => {
  try {
    const { title } = req.body;
    const { boardId } = req.params;

    const list = new List({ title, boardId });
    await list.save();

    // This line finds the Board document with the given boardId and adds the new list's _id to its 'lists' array field.
    await Board.findByIdAndUpdate(boardId, { $push: { lists: list._id } });

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findByIdAndUpdate(id, req.body, { new: true });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findByIdAndDelete(id);

    if (list) {
      await Board.findByIdAndUpdate(list.boardId, { $pull: { lists: id } });
    }
    res.json({ message: "List deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
