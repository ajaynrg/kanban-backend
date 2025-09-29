import express from "express";
import { createBoard, getBoards, deleteBoard } from "../controllers/boardController.js";
const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.delete("/:id", deleteBoard);

export default router;
