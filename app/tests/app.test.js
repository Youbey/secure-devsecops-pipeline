const request = require("supertest");
const app = require("../src/app");

test("/health", async () => {
  expect((await request(app).get("/health")).status).toBe(200);
});
test("reject bad input", async () => {
  expect(
    (await request(app).post("/api/notes").send({ text: 123 })).status,
  ).toBe(400);
});
