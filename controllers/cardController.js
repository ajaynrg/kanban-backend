import Card from "../models/Card.js";
import List from "../models/List.js";

export const createCard = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const { listId } = req.params;

    const card = new Card({ title, description, dueDate, listId });
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
    const { id, newListId } = req.params;
    const card = await Card.findById(id);

    if (!card) return res.status(404).json({ message: "Card not found" });

    // remove from old list
    await List.findByIdAndUpdate(card.listId, { $pull: { cards: id } });

    // add to new list
    card.listId = newListId;
    await card.save();
    await List.findByIdAndUpdate(newListId, { $push: { cards: id } });

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
