# Node.js nc-games (backend API project)

## Description

This project is an application created for the purpose of accessing data programmatically.

The intention is to build a backend service that mimiks the the functionality of real world services. The API will provide the information to the front end architecture. The API serves reviews, categories, comments and users

The hosted api can be found by following this [link](https://js-backend-project.herokuapp.com/api). This will display a list of available endpoints in JSON format.

If you would like to view the front end to this project, created with React, follow this [link]{https://github.com/WillWatkins/front-end-project} or view the live project [here]{https://will-nc-games.netlify.app}.

#

## Technologies and Packages

The technologies and packages used for this project are listed below:

- [Node.js](https://nodejs.org/en/) v16.9.1
- [Postgres](https://www.postgresql.org)

### Project dependencies:

- [dotenv](https://www.npmjs.com/package/dotenv) v10.0.0
- [express](https://expressjs.com) v4.17.1
- [node-postgres](https://node-postgres.com) v8.7.1
- [pg-format](https://www.npmjs.com/package/pg-format) v1.0.4

### Dev dependencies:

- [jest](https://jestjs.io) v27.3.1
- [jest-sorted](https://www.npmjs.com/package/jest-sorted) v1.0.12
- [superTest](https://www.npmjs.com/package/supertest) v6.1.6

#

## Installation

To install this api and its dependencies:

1.  Ensure you have installed:
    - Node.js
    - Postgres
2.  Fork this repo to your own github account and clone to your local machine. In the CLI insert the following:

        git clone <your-github-forked-repo-url>

3.  Within the directory for this cloned file, install the dependencies by running the following in your CLI:

        npm install

#

## Setup

1.  In order to connect to the correct database (depending if you're testing or in development), you will need to create two .env files. These files make use of the dotenv dependency and will automatically connect you to the appropriate database at run-time.

    In the main folder create the files with the following content:

    - .env.development
      - PGDATABASE=nc_games
    - .env.test
      - PGDATABASE=nc_games_test

2.  To set up the database, within the directory for this file, run the following scripts in your CLI:

        npm run setup-dbs

    and then run

        npm run seed

#

## Testing

Testing is completed using jest and supertest, which can be found in the `__tests__` folder.

To run all tests:

    npm test

alternately, to run a single test tile

    npm test __test__/<filename>

If you wish to know more about jest testing and setting up your own tests, please see https://jestjs.io for more information

#

## Summary of available endpoints

    GET     /api

    GET     /api/categories

    GET     /api/reviews
            queries:
              sort_by: owner, category, created_at, votes, title, review_id (default: created_at)
              order_by: asc, desc (default: desc)

              example /api/reviews?sort_by=owner

    GET     /api/reviews/review_id
    PATCH   /api/reviews/review_id

    GET     /api/reviews/:review_id/comments
    POST    /api/reviews/:review_id/comments

    DELETE  /api/comments/:comment_id

#

## Example request

### API path url:

    https://js-backend-project.herokuapp.com/api/

### Example result of the above API path:

```json
{
  "endpoints": {
    "GET /api": {
      "description": "serves up a json representation of all the available endpoints of the api"
    },
    "GET /api/categories": {
      "description": "serves an array of all categories",
      "queries": [],
      "exampleResponse": {
        "categories": [
          {
            "description": "Players attempt to uncover each other's hidden role",
            "slug": "Social deduction"
          }
        ]
      }
    },
    "GET /api/reviews": {
      "description": "serves an array of all reviews",
      "queries": ["category", "sort_by", "order"],
      "exampleResponse": {
        "reviews": [
          {
            "title": "One Night Ultimate Werewolf",
            "designer": "Akihisa Okui",
            "owner": "happyamy2016",
            "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "category": "hidden-roles",
            "created_at": 1610964101251,
            "votes": 5
          }
        ]
      }
    }
  }
}
```
