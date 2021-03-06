const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/NotValidPath", () => {
  test("status:404, returns an error message when passed an invalid path", () => {
    return request(app)
      .get("/invalid_path")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
});
describe("/api", () => {
  describe("GET", () => {
    test("status:200, returns a JSON object with a list of endpoints", () => {
      const myEndpoints = require("../endpoints.json");
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).toEqual(myEndpoints);
        });
    });
  });
  describe("invalid method request", () => {
    test("status:404, returns an error when trying to make a request that does not exist yet", () => {
      return request(app)
        .delete("/api")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
  });
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
          expect(body.reviews).toBeSortedBy(sortBy, { descending: true });
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
    test("status:404, returns an error when input an invalid category", () => {
      const invalidCategory = "NotValid";
      return request(app)
        .get(`/api/reviews?category=${invalidCategory}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Resource not found");
        });
    });
    test("status:200, returns an empty array when passed a category that exists but has no reviews in that category", () => {
      const category = "children's games";
      return request(app)
        .get(`/api/reviews?category=${category}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toEqual([]);
        });
    });
    test("status:200, returns an array of reviews limited to 10 reviews when provided no limit query", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews.length).toBe(10);
        });
    });
    test("status:200, returns an array of reviews with a specified limit", () => {
      const limit = 5;
      return request(app)
        .get("/api/reviews?limit=5")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews.length).toBe(limit);
        });
    });
    test("status:400, returns an error when provided an invalid limit query", () => {
      const notValidLimit = "NotValidLimit";
      return request(app)
        .get(`/api/reviews?limit=${notValidLimit}`)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:200, returns an array of reviews based on the page (pagination) query", () => {
      //i.e if page is 1 and limit is 10, returns reviews 1-10.
      //If page is 2 and limit is 10, returns review 11-20.
      //Calculated using p and limit! MATHSSSSS
      const pageNumber = 1;
      const limit = 6;
      let lowerLimit = limit * pageNumber - (limit - 1);

      return request(app)
        .get(
          `/api/reviews?page=${pageNumber}&limit=${limit}&sort_by=review_id&order=asc`
        )
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews.length).toBe(limit);
          body.reviews.forEach((review) => {
            expect(review.review_id).toBe(lowerLimit);
            lowerLimit++;
          });
        });
    });
    test("status:400, returns an error when passed an invalid page query", () => {
      const page = "InvalidPageNumber";
      const limit = 5;
      return request(app)
        .get(`/api/reviews?page=${page}&limit=${limit}&sort_by=review_id`)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test.todo("add total_count property");
  });
  describe("POST", () => {
    test("status:201, returns a review object", () => {
      const reviewInput = {
        owner: "mallionaire",
        title: "A title for my review",
        review_body: "A body for my review",
        designer: "A designer for my review",
        category: "euro game",
      };
      return request(app)
        .post("/api/reviews")
        .send(reviewInput)
        .expect(201)
        .then(({ body }) => {
          expect(body.review).toEqual(
            expect.objectContaining({
              owner: "mallionaire",
              title: "A title for my review",
              review_body: "A body for my review",
              designer: "A designer for my review",
              category: "euro game",
              review_id: 14,
              votes: 0,
              created_at: expect.any(String),
              comment_count: 0,
            })
          );
        });
    });
    test("status:400, returns an error when missing required input values", () => {
      const reviewInput = {
        title: "A title for my review",
        review_body: "A body for my review",
        designer: "A designer for my review",
        category: "euro game",
      };
      return request(app)
        .post("/api/reviews")
        .send(reviewInput)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:422, returns an error when input a valid value but does not exist in db", () => {
      const reviewInput = {
        owner: "NotAValidAuthor",
        title: "A title for my review",
        review_body: "A body for my review",
        designer: "A designer for my review",
        category: "euro game",
      };
      return request(app)
        .post("/api/reviews")
        .send(reviewInput)
        .expect(422)
        .then(({ body }) => {
          expect(body.message).toBe("Unprocessable entity");
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
          expect(body.review).toEqual({
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
          });
        });
    });
    test("status:404, returns an error if the review does not exist", () => {
      return request(app)
        .get("/api/reviews/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
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
          expect(body.review).toEqual({
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
    test("status:200, returns a review object that has not been updated when not passed a request body", () => {
      return request(app)
        .patch("/api/reviews/3")
        .send({})
        .expect(200)
        .then(({ body }) => {
          expect(body.review).toEqual({
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
          });
        });
    });
    test("status:200, returns a review object with an updated votes and ignores any extra properties on the body", () => {
      const voteChange = { inc_votes: 3, name: "mitch" };
      return request(app)
        .patch("/api/reviews/3")
        .send(voteChange)
        .expect(200)
        .then(({ body }) => {
          expect(body.review).toEqual({
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
    test("status:201, returns an object of the added comment (checks db for added comment)", () => {
      const reviewId = 2;
      const inputBody = {
        body: "Test for posting to comments table with already existing author",
        author: "mallionaire",
      };
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(inputBody)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              comment_id: 7,
              body: "Test for posting to comments table with already existing author",
              votes: 0,
              author: "mallionaire",
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
    test("status:400, returns an error when missing a required input, i.e missing author or body", () => {
      const reviewId = 2;
      const inputBody = {
        body: "Test for posting to comments table with already existing author",
      };

      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(inputBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:404, returns an error when passed a valid review_id but does not exist yet", () => {
      const validIdThatDoesNotExistYet = 999;
      const inputBody = {
        body: "Test for posting to comments table with already existing author",
        author: "mallionaire",
      };
      return request(app)
        .post(`/api/reviews/${validIdThatDoesNotExistYet}/comments`)
        .send(inputBody)
        .expect(422)
        .then(({ body }) => {
          expect(body.message).toBe("Unprocessable entity");
        });
    });
    test("status:422, returns an error when input an invalid author (username does not exist in db)", () => {
      const inputBody = {
        body: "Test for posting to comments table with already existing author",
        author: "NotAValidUsername",
      };
      return request(app)
        .post("/api/reviews/2/comments")
        .send(inputBody)
        .expect(422)
        .then(({ body }) => {
          expect(body.message).toBe("Unprocessable entity");
        });
    });
    test("status:422, returns an error when input a valid username that does not exist", () => {
      const reviewId = 2;
      const inputBody = {
        body: "Test for posting to comments table with already existing author",
        author: "DoesNotExistInDB",
      };
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(inputBody)
        .expect(422)
        .then(({ body }) => {
          expect(body.message).toBe("Unprocessable entity");
        });
    });
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
    test("status:404, returns an error when the comment_id does not exist", () => {
      const comment_id = 999;
      return request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Resource not found");
        });
    });
  });
  describe("PATCH", () => {
    test("status:200, returns an object of the updated comment when incremented", () => {
      const commentId = 1;
      const vote = { inc_votes: 1 };
      return request(app)
        .patch(`/api/comments/${commentId}`)
        .send(vote)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              body: expect.any(String),
              votes: 17,
              author: expect.any(String),
              review_id: expect.any(Number),
              created_at: expect.any(String),
              comment_id: commentId,
            })
          );
        });
    });
    test("status:200, returns an object of the updated comment when decremented", () => {
      const commentId = 1;
      const vote = { inc_votes: -1 };
      return request(app)
        .patch(`/api/comments/${commentId}`)
        .send(vote)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              body: expect.any(String),
              votes: 15,
              author: expect.any(String),
              review_id: expect.any(Number),
              created_at: expect.any(String),
              comment_id: commentId,
            })
          );
        });
    });
    test("status:400, returns an error when the user tries to increment the votes by more than 1", () => {
      const votes = { inc_votes: 2 };
      return request(app)
        .patch("/api/comments/1")
        .send(votes)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:200, returns an object with no changes, i.e. vote is not changed in the db", () => {
      const commentId = 1;
      const vote = {};
      return request(app)
        .patch(`/api/comments/${commentId}`)
        .send(vote)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              body: expect.any(String),
              votes: 16,
              author: expect.any(String),
              review_id: expect.any(Number),
              created_at: expect.any(String),
              comment_id: commentId,
            })
          );
        });
    });
    test("status:400, returns an error when the inc_votes input is invalid i.e. not a number", () => {
      const vote = { inc_votes: "notAValidInpud" };
      return request(app)
        .patch("/api/comments/1")
        .send(vote)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:400, returns an error when input an invalid comment_id", () => {
      const invalidId = "InvalidId";
      const vote = { inc_votes: 1 };
      return request(app)
        .patch(`/api/comments/${invalidId}`)
        .send(vote)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request");
        });
    });
    test("status:404, returns an error when input a valid comment_id that does not exist yet", () => {
      const commentId = 9999;
      const vote = { inc_votes: 1 };
      return request(app)
        .patch(`/api/comments/${commentId}`)
        .send(vote)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
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
describe("/api/users/:username", () => {
  describe("GET", () => {
    test("status:200, returns an array of a single user with their details", () => {
      const inputUsername = "bainesface";
      return request(app)
        .get(`/api/users/${inputUsername}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toEqual(
            expect.objectContaining({
              username: inputUsername,
              avatar_url: expect.any(String),
              name: expect.any(String),
            })
          );
        });
    });
    test("status:404, returns not found when input a username that does not exist", () => {
      const invalidUsername = "InvalidUsername";
      return request(app)
        .get(`/api/users/${invalidUsername}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
  });
});
