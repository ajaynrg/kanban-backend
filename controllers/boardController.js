import Board from "../models/Board.js";

const getBoards = async (req, res) => {
  const boards = await Board.find().populate("lists");
  res.json(boards);
};

const createBoard = async (req, res) => {
  const board = new Board({ title: req.body.title });
  await board.save();
  res.status(201).json(board);
};

export { createBoard, getBoards };

