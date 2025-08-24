import request from "supertest";
import app from "../index.js";
import { clearDB, closeTestDB, connectTestDB } from "./setup.js";

beforeAll(async () => await connectTestDB());
afterAll(async () => await closeTestDB());
afterEach(async () => await clearDB());

describe("Board API", () => {
  it("should create a board", async () => {
    const res = await request(app).post("/api/boards").send({ title: "Board A" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Board A");
  });

  it("should fetch boards", async () => {
    await request(app).post("/api/boards").send({ title: "Board A" });
    const res = await request(app).get("/api/boards");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
