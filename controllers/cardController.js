import Card from "../models/Card.js";

const getCards= async (req, res) => {
  const cards = await Card.find().populate("lists");
  res.json(cards);
};

const createCard = async (req, res) => {
  const card = new Card({ title: req.body.title });
  await card.save();
  res.status(201).json(card);
};

export { createCard, getCards };
