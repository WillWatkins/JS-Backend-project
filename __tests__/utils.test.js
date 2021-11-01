const format = require("pg-format");
const {
  formatCategoryData,
  formatUsersData,
  formatReviewsData,
  formatCommentsData,
} = require("../utils/utils");

describe("formatCategoryData", () => {
  test("returns an empty array when passed an empty array", () => {
    expect(formatCategoryData([])).toEqual([]);
  });
  test("returns an array with a single array inside, with formatted data for insertion into category table", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    const output = [["euro game", "Abstact games that involve little luck"]];
    expect(formatCategoryData(input)).toEqual(output);
  });
  test("returns an array of arrays with formatted data", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
      {
        slug: "social deduction",
        description: "Players attempt to uncover each other's hidden role",
      },
      { slug: "dexterity", description: "Games involving physical skill" },
      { slug: "children's games", description: "Games suitable for children" },
    ];
    const output = [
      ["euro game", "Abstact games that involve little luck"],
      [
        "social deduction",
        "Players attempt to uncover each other's hidden role",
      ],
      ["dexterity", "Games involving physical skill"],
      ["children's games", "Games suitable for children"],
    ];
    expect(formatCategoryData(input)).toEqual(output);
  });
  test("does not mutate input", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    formatCategoryData(input);
    expect(input).toEqual([
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ]);
  });
});
describe("formatUsersData", () => {
  test("returns an empty array when passed an empty array", () => {
    expect(formatUsersData([])).toEqual([]);
  });
  test("returns an array with a single array inside, with formatted data for insertion into users table", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    const output = [
      [
        "mallionaire",
        "haz",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
    ];
    expect(formatUsersData(input)).toEqual(output);
  });
  test("returns an array of arrays with formatted data", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "philippaclaire9",
        name: "philippa",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
      {
        username: "bainesface",
        name: "sarah",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      },
      {
        username: "dav3rid",
        name: "dave",
        avatar_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ];
    const output = [
      [
        "mallionaire",
        "haz",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
      [
        "philippaclaire9",
        "philippa",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      ],
      [
        "bainesface",
        "sarah",
        "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      ],
      [
        "dav3rid",
        "dave",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      ],
    ];
    expect(formatUsersData(input)).toEqual(output);
  });
  test("does not mutate input", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    formatUsersData(input);
    expect(input).toEqual([
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ]);
  });
});
describe("formatReviewsData", () => {
  test("returns an empty array when passed an empty array,", () => {
    expect(formatReviewsData([])).toEqual([]);
  });
  test("returns an array with a single array inside, with formatted data for insertion into reviews table", () => {
    const input = [
      {
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ];
    const output = [
      [
        "Agricola",
        "Uwe Rosenberg",
        "mallionaire",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        "Farmyard fun!",
        "euro game",
        new Date(1610964020514),
        1,
      ],
    ];
    expect(formatReviewsData(input)).toEqual(output);
  });
  test("returns an array of arrays with formatted data", () => {
    const input = [
      {
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: new Date(1610964020514),
        votes: 1,
      },
      {
        title: "Jenga",
        designer: "Leslie Scott",
        owner: "philippaclaire9",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Fiddly fun for all the family",
        category: "dexterity",
        created_at: new Date(1610964101251),
        votes: 5,
      },
      {
        title: "Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "bainesface",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        created_at: new Date(1610964101251),
        votes: 5,
      },
    ];
    const output = [
      [
        "Agricola",
        "Uwe Rosenberg",
        "mallionaire",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        "Farmyard fun!",
        "euro game",
        new Date(1610964020514),
        1,
      ],
      [
        "Jenga",
        "Leslie Scott",
        "philippaclaire9",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        "Fiddly fun for all the family",
        "dexterity",
        new Date(1610964101251),
        5,
      ],
      [
        "Ultimate Werewolf",
        "Akihisa Okui",
        "bainesface",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        "We couldn't find the werewolf!",
        "social deduction",
        new Date(1610964101251),
        5,
      ],
    ];
    expect(formatReviewsData(input)).toEqual(output);
  });
  test("does not mutate input array", () => {
    const input = [
      {
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ];
    formatReviewsData(input);
    expect(input).toEqual([
      {
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ]);
  });
});

describe("formatCommentsData", () => {
  test("returns an empty array", () => {
    expect(formatCommentsData([])).toEqual([]);
  });
  test("returns an array with a single array inside, with formatted data for insertion into comments table", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "bainesface",
        review_id: 2,
        created_at: new Date(1511354613389),
      },
    ];
    const output = [
      ["I loved this game too!", 16, "bainesface", 2, new Date(1511354613389)],
    ];

    expect(formatCommentsData(input)).toEqual(output);
  });
  test("returns an array of arrays with formatted data", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "bainesface",
        review_id: 2,
        created_at: new Date(1511354613389),
      },
      {
        body: "My dog loved this game too!",
        votes: 13,
        author: "mallionaire",
        review_id: 3,
        created_at: new Date(1610964545410),
      },
      {
        body: "I didn't know dogs could play games",
        votes: 10,
        author: "philippaclaire9",
        review_id: 3,
        created_at: new Date(1610964588110),
      },
    ];

    const output = [
      ["I loved this game too!", 16, "bainesface", 2, new Date(1511354613389)],
      [
        "My dog loved this game too!",
        13,
        "mallionaire",
        3,
        new Date(1610964545410),
      ],
      [
        "I didn't know dogs could play games",
        10,
        "philippaclaire9",
        3,
        new Date(1610964588110),
      ],
    ];

    expect(formatCommentsData(input)).toEqual(output);
  });
  test("does not mutate input array", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "bainesface",
        review_id: 2,
        created_at: new Date(1511354613389),
      },
    ];
    formatCommentsData(input);
    expect(input).toEqual([
      {
        body: "I loved this game too!",
        votes: 16,
        author: "bainesface",
        review_id: 2,
        created_at: new Date(1511354613389),
      },
    ]);
  });
});
