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
            expect(category).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });
});
describe("/api/reviews", () => {
  describe("GET", () => {
    test("status:200 returns an array reviews", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews.length).toBe(13);
          body.reviews.forEach((review) => {
            expect(review).toEqual(
              expect.objectContaining({
                review_id: expect.any(Number),
                title: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_img_url: expect.any(String),
                review_body: expect.any(String),
                category: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
  });
});
describe("/api/reviews/:review_id", () => {
  describe("GET", () => {
    test("status:200, returns an array of a single review when passed a review_id", () => {
      return request(app)
        .get("/api/reviews/3")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            review: [
              {
                review_id: 3,
                title: "Ultimate Werewolf",
                designer: "Akihisa Okui",
                owner: "bainesface",
                review_img_url:
                  "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                review_body: "We couldn't find the werewolf!",
                category: "social deduction",
                created_at: expect.any(String),
                votes: 5,
                number_of_comments: "3",
              },
            ],
          });
        });
    });
    test("status:400, returns an error if the review does not exist", () => {
      return request(app)
        .get("/api/reviews/9999")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid path");
        });
    });
    test("status:400, returns an error if input an invalid review_id", () => {
      return request(app)
        .get("/api/reviews/notValid")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
  });
  describe("PATCH", () => {
    test("status:200, returns a review object with an updated votes property", () => {
      const voteChange = { inc_votes: 3 };
      return request(app)
        .patch("/api/reviews/3")
        .send(voteChange)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            review: [
              {
                review_id: 3,
                title: "Ultimate Werewolf",
                designer: "Akihisa Okui",
                owner: "bainesface",
                review_img_url:
                  "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                review_body: "We couldn't find the werewolf!",
                category: "social deduction",
                created_at: expect.any(String),
                votes: 8,
              },
            ],
          });
        });
    });
    test("status:400, returns an error when passed an invalid input", () => {
      return request(app)
        .patch("/api/reviews/3")
        .send({ inc_votes: "cat" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:400, returns an error when provided no body", () => {
      return request(app)
        .patch("/api/reviews/3")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:200, returns a review object with an updated votes and ignores any extra properties on the body", () => {
      const voteChange = { inc_votes: 3, name: "mitch" };
      return request(app)
        .patch("/api/reviews/3")
        .send(voteChange)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            review: [
              {
                review_id: 3,
                title: "Ultimate Werewolf",
                designer: "Akihisa Okui",
                owner: "bainesface",
                review_img_url:
                  "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                review_body: "We couldn't find the werewolf!",
                category: "social deduction",
                created_at: expect.any(String),
                votes: 8,
              },
            ],
          });
        });
    });
  });
});
