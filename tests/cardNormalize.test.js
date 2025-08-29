import mongoose from "mongoose";
import Card from "../models/Card.js";
import { normalizeCardPositions } from "../utils/reorder.js";
import { clearDB, closeTestDB, connectTestDB } from "./setup.js";

let listId;

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

beforeEach(async () => {
  await clearDB();
  // Create a dummy listId for the cards
  listId = new mongoose.Types.ObjectId().toString();
});

describe("normalizeCardPositions", () => {
  it("should normalize card positions to be sequential starting from 0", async () => {
    // Insert cards with out-of-order positions
    const cards = [
      { title: "Card A", listId, position: 5 },
      { title: "Card B", listId, position: 2 },
      { title: "Card C", listId, position: 9 },
      { title: "Card D", listId, position: 1 }
    ];
    await Card.insertMany(cards);

    // Run normalization
    const normalizedCards = await normalizeCardPositions(listId);

    // Fetch cards again to check positions
    const updatedCards = await Card.find({ listId }).sort({ position: 1 });

    // Positions should be 0,1,2,3
    expect(updatedCards.length).toBe(4);
    updatedCards.forEach((card, idx) => {
      expect(card.position).toBe(idx);
    });

    // Titles should be in the order of original position sort: D (1), B (2), A (5), C (9)
    const expectedOrder = ["Card D", "Card B", "Card A", "Card C"];
    const actualOrder = updatedCards.map(card => card.title);
    expect(actualOrder).toEqual(expectedOrder);
  });

  it("should return an empty array if there are no cards in the list", async () => {
    const result = await normalizeCardPositions(listId);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});
