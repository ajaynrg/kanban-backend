import Card from "../models/Card.js";

export const normalizeCardPositions = async (listId) => {
  const cards = await Card.find({ listId }).sort({ position: 1 });

  for (let i = 0; i < cards.length; i++) {
    cards[i].position = i;
    await cards[i].save();
  }

  return cards;
};
