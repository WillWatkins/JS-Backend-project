## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### ESSENTIAL POST `/api/reviews/1/comments` COMPLETE

Assertion: expected 400 to equal 201
Hints:

- use a 201: Created status code for a successful `POST` request

### ESSENTIAL POST `/api/reviews/1/comments` ?

Assertion: expected { message: 'Bad request' } to contain key 'comment'
Hints:

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README

### ESSENTIAL POST `/api/reviews/1/comments` COMPLETE

Assertion: Cannot read properties of undefined (reading 'votes')
Hints:

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations

### ESSENTIAL POST `/api/reviews/10000/comments` COMPLETE

Assertion: expected 400 to be one of [ 404, 422 ]
Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist

### ESSENTIAL POST `/api/reviews/1/comments` COMPLETE

Assertion: expected 400 to be one of [ 404, 422 ]
Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid username that does not exist

### FURTHER PATCH `/api/comments/1000` COMPLETE

Assertion: expected 200 to equal 404
Hints:

- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist
