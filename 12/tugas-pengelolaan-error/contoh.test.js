const supertest = require("supertest");
const { app } = require(".");

describe("GET /", function () {
  it("should return an error object", async () => {
    const result = await supertest(app).get("/");

    expect(result.status).toBe(500);
    expect(result.body.error.code).toBe(500);
    expect(result.body.error.message).toBe("Ini contoh error");
  });
});
