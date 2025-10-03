import Board from "../models/Board.js";

const getBoards = async (req, res) => {
  const boards = await Board.find().populate("lists");
  res.json(boards);
};

const createBoard = async (req, res) => {
  const board = new Board({ 
    title: req.body.title, 
    description: req.body.description, 
    createdBy: req.body.createdBy
  });
  await board.save();
  res.status(201).json(board);
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  
  // First find the board to get its lists
  const board = await Board.findById(id).populate('lists');
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  
  // Delete all lists associated with this board
  if (board.lists && board.lists.length > 0) {
    const List = (await import("../models/List.js")).default;
    await List.deleteMany({ boardId: id });
  }
  
  // Delete the board
  await Board.findByIdAndDelete(id);
  res.status(204).end();
};

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const board = await Board.findByIdAndUpdate(id, updatedData, { new: true });
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  res.json(board);
}

export { createBoard, getBoards, deleteBoard, updateBoard };

