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
  await Board.findByIdAndDelete(id);
  res.status(204).end();
};

export { createBoard, getBoards, deleteBoard };

