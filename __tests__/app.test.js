const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  //Needs to be re-written for endpoints.json format
  // describe("GET", () => {
  //   test("status:200, returns a JSON object with a list of endpoints", () => {
  //     return request(app)
  //       .get("/api")
  //       .expect(200)
  //       .then(({ body }) => {
  //         body.endpoints.forEach((endpoint) => {
  //           expect(endpoint).toEqual(
  //             expect.objectContaining({
  //               path: expect.any(String),
  //               methods: expect.any(Array),
  //             })
  //           );
  //         });
  //       });
  //   });
  // });
});
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
    test("status:200, returns an array of reviews", () => {
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
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });
    test("status:200, returns an array ordered by the input sort_by", () => {
      const sortBy = "owner";
      return request(app)
        .get(`/api/reviews?sort_by=${sortBy}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toBeSortedBy(sortBy);
        });
    });
    test("status:400, returns an error when input an invalid sory_by", () => {
      const sort_by = "invalidSort";
      return request(app)
        .get(`/api/reviews?sort_by=${sort_by}`)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:200, returns an descending ordered array when input desc", () => {
      return request(app)
        .get("/api/reviews?order=desc")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("status:400, returns an error when input an invalid order", () => {
      const invalidOrder = "InvalidOrder";
      return request(app)
        .get(`/api/reviews?order=${invalidOrder}`)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:200, returns an array of reviews filtered to a category", () => {
      const category = "dexterity";
      return request(app)
        .get(`/api/reviews?category=${category}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews.length).toEqual(1);
          body.reviews.forEach((review) => {
            expect(review.category).toEqual(category);
          });
        });
    });
    test("status: 404, returns an error when input an invalid category", () => {
      const invalidCategory = "NotValid";
      return request(app)
        .get(`/api/reviews?category=${invalidCategory}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Resource not found");
        });
    });
    test("status: 200, returns an empty array when passed a category that exists but has no reviews in that category", () => {
      const category = "children's games";
      return request(app)
        .get(`/api/reviews?category=${category}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toEqual([]);
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
                comment_count: 3,
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
describe("/api/reviews/:review_id/comments", () => {
  describe("GET", () => {
    test("status:200, returns an array of comments by their review_id", () => {
      const reviewId = 2;
      return request(app)
        .get(`/api/reviews/${reviewId}/comments`)
        .expect(200)
        .then(({ body }) => {
          expect(body.comments.length).toBe(3);

          body.comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                body: expect.any(String),
                votes: expect.any(Number),
                author: expect.any(String),
                review_id: reviewId,
                created_at: expect.any(String),
                comment_id: expect.any(Number),
              })
            );
          });
        });
    });
    test("status:404, returns an error if the review does not exist", () => {
      const reviewId = 200;
      return request(app)
        .get(`/api/reviews/${reviewId}/comments`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Resource not found");
        });
    });
    test("status:200, returns an empty array if the review_id exists but has no attributed comments yet", () => {
      const reviewId = 5;
      return request(app)
        .get(`/api/reviews/${reviewId}/comments`)
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toEqual([]);
        });
    });
  });
  describe("POST", () => {
    test("status:200, returns the added comment, has a check for ensuring comment is added to db", () => {
      const reviewId = 2;
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send({
          body: "Test for posting to comments table with already existing author",
          author: "mallionaire",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment[0]).toEqual(
            expect.objectContaining({
              comment_id: 7,
              body: "Test for posting to comments table with already existing author",
              votes: 0,
              author: "mallionaire",
              review_id: reviewId,
              created_at: expect.any(String),
            })
          );
          return request(app)
            .get(`/api/reviews/${reviewId}/comments`)
            .expect(200)
            .then(({ body }) => {
              expect(body.comments.length).toBe(4);
            });
        });
    });
    test.todo(
      "status: 400, returns an error when input an invalid author (username does not exist in db)"
    );
    test.todo(
      "status: 400, returns an error when missing a required input, i.e missing author or body)"
    );
  });
});
describe("/api/comments/:comment_id", () => {
  describe("DELETE", () => {
    test("status:204, returns nothing but deletes comment from db", () => {
      //If changing the commentId, check the number of comments in the comments table that match the comment_id and update the numberOfComments to be that, otherwise test will fail.
      const commentId = 1;
      const numberOfComments = 5;
      return request(app)
        .delete(`/api/comments/${commentId}`)
        .expect(204)
        .then(() => {
          return db.query("SELECT * FROM comments;");
        })
        .then(({ rows }) => {
          expect(rows.length).toBe(numberOfComments);
        });
    });
    test("staus:404, returns an error when the comment_id does not exist", () => {
      const comment_id = 999;
      return request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Resource not found");
        });
    });
  });
});
describe("/api/users", () => {
  describe("GET", () => {
    test("status:200, returns an array of the users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).toBe(4);
          body.users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({ username: expect.any(String) })
            );
          });
        });
    });
  });
});
describe.only("/api/users/:username", () => {
  describe("GET", () => {
    test("status:200, returns an array of a single user with their details", () => {
      const inputUsername = "mallionaire";
      return request(app)
        .get(`/api/users/${inputUsername}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.user[0]).toEqual(
            expect.objectContaining({
              username: `${inputUsername}`,
              avatar_url: expect.any(String),
              name: expect.any(String),
            })
          );
        });
    });
  });
});
