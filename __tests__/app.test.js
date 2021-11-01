const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/categories", () => {
  describe("GET", () => {
    test("status:200, returns an array of categories", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body.categories.length).toBe(4);
          body.categories.forEach((category) => {
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
});
