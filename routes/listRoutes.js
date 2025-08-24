import express from "express";
import { createList, deleteList, updateList } from "../controllers/listController.js";

const router = express.Router();

router.post("/:boardId", createList);     // add list to a board
router.put("/:id", updateList);           // update list title
router.delete("/:id", deleteList);        // delete list

export default router;
