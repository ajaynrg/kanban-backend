import express from "express";
import { createCard, deleteCard, getCardsByList, moveCard, updateCard } from "../controllers/cardController.js";

const router = express.Router();

router.post("/:listId", createCard);    // add card to a list
router.put("/:id", updateCard);         // update card
router.delete("/:id", deleteCard);      // delete card
router.put("/:id/move/:targetListId", moveCard); // move card between lists
router.get("/list/:listId", getCardsByList);  // GET /cards/list/:listId

export default router;
