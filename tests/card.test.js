import request from "supertest";
import app from "../index.js";
import { clearDB, closeTestDB, connectTestDB } from "./setup.js";

let boardId, listId;

beforeAll(async () => await connectTestDB());
afterAll(async () => await closeTestDB());
beforeEach(async () => {
  await clearDB();
  const boardRes = await request(app).post("/api/boards").send({ title: "Board A" });
  boardId = boardRes.body._id;

  const listRes = await request(app).post(`/api/lists/${boardId}`).send({ title: "To Do" });
  listId = listRes.body._id;
});

describe("Card API", () => {
  it("should create a card", async () => {
    const res = await request(app)
      .post(`/api/cards/${listId}`)
      .send({ title: "Fix bug", description: "Details", dueDate: "2025-09-01" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Fix bug");
    expect(res.body.listId).toBe(listId);
  });

  it("should update a card", async () => {
    const card = await request(app).post(`/api/cards/${listId}`).send({ title: "Fix bug" });
    const res = await request(app).put(`/api/cards/${card.body._id}`).send({ title: "Fix login bug" });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Fix login bug");
  });

  it("should get all cards for a list", async () => {
    // Create two cards in the list
    const card1 = await request(app)
      .post(`/api/cards/${listId}`)
      .send({ title: "Card 1" });
    const card2 = await request(app)
      .post(`/api/cards/${listId}`)
      .send({ title: "Card 2" });

    // Fetch cards for the list
    const res = await request(app).get(`/api/cards/list/${listId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Should contain at least the two cards we just created
    const cardTitles = res.body.map(card => card.title);
    expect(cardTitles).toEqual(expect.arrayContaining(["Card 1", "Card 2"]));
    // All cards should have the correct listId
    res.body.forEach(card => {
      expect(card.listId).toBe(listId);
    });
  });

  it("should delete a card", async () => {
    const card = await request(app).post(`/api/cards/${listId}`).send({ title: "Fix bug" });
    const res = await request(app).delete(`/api/cards/${card.body._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Card deleted");
  });
});
