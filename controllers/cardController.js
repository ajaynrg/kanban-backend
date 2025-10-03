import Card from "../models/Card.js";
import List from "../models/List.js";
import { normalizeCardPositions } from "../utils/reorder.js";

// Get cards for a list
export const getCardsByList = async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await Card.find({ listId }).sort("position");
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const { title, description, assignee, labels, dueDate, createdBy } = req.body;
    const { listId } = req.params;

    // Check if the list exists
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const card = new Card({ title, description, assignee, labels, dueDate, createdBy, listId });
    await card.save();

    await List.findByIdAndUpdate(listId, { $push: { cards: card._id } });

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(id, req.body, { new: true });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);

    if (card) {
      await List.findByIdAndUpdate(card.listId, { $pull: { cards: id } });
    }

    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const moveCard = async (req, res) => {
  try {
    const { id } = req.params; // card id
    const { targetListId, newPosition } = req.body;

    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: "Card not found" });

    // Move across lists
    if (targetListId && card.listId.toString() !== targetListId) {
      card.listId = targetListId;
    }

    // Assign temporary fractional position
    if (typeof newPosition === "number") {
      card.position = newPosition;
    }

    await card.save();

    // ✅ normalize positions in target list
    await normalizeCardPositions(card.listId);

    const updatedCards = await Card.find({ listId: card.listId }).sort({ position: 1 });
    res.json(updatedCards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
