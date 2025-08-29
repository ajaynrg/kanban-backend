import request from "supertest";
import app from "../index.js";
import { clearDB, closeTestDB, connectTestDB } from "./setup.js";

let boardId;

beforeAll(async () => await connectTestDB());
afterAll(async () => await closeTestDB());
beforeEach(async () => {
  await clearDB();
  const res = await request(app).post("/api/boards").send({ title: "Board A" });
  boardId = res.body._id;
});

describe("List API", () => {
  
  it("should create a list under a board", async () => {
    const res = await request(app).post(`/api/lists/${boardId}`).send({ title: "To Do" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("To Do");
    expect(res.body.boardId).toBe(boardId);
  });

  it("should update a list", async () => {
    const list = await request(app).post(`/api/lists/${boardId}`).send({ title: "To Do" });
    const res = await request(app).put(`/api/lists/${list.body._id}`).send({ title: "In Progress" });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("In Progress");
  });

  it("should delete a list", async () => {
    const list = await request(app).post(`/api/lists/${boardId}`).send({ title: "To Do" });
    const res = await request(app).delete(`/api/lists/${list.body._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("List deleted");
  });
});
