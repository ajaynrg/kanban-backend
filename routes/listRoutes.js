import express from "express";
import { createList, getLists } from "../controllers/listController.js";
const router = express.Router();

router.get("/", getLists);
router.post("/", createList);

export default router;
