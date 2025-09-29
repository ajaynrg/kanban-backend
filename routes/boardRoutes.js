import express from "express";
import { createBoard, getBoards, deleteBoard, updateBoard } from "../controllers/boardController.js";
const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.put("/:id", updateBoard);
router.delete("/:id", deleteBoard);

export default router;
