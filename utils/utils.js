exports.formatCategoryData = (array) => {
  if (array === undefined || array.length < 1) return [];
  else {
    const sqlInsert = array.map((category) => {
      return [category.slug, category.description];
    });
    return sqlInsert;
  }
};
exports.formatUsersData = (array) => {
  if (array === undefined || array.length < 1) return [];
  else {
    const sqlInsert = array.map((user) => {
      return [user.username, user.name, user.avatar_url];
    });
    return sqlInsert;
  }
};
exports.formatReviewsData = (array) => {
  if (array === undefined || array.length < 1) return [];
  else {
    const sqlInsert = array.map((review) => {
      return [
        review.title,
        review.designer,
        review.owner,
        review.review_img_url,
        review.review_body,
        review.category,
        review.created_at,
        review.votes,
      ];
    });
    return sqlInsert;
  }
};

exports.formatCommentsData = (array) => {
  if (array === undefined || array.length < 1) return [];
  else {
    const sqlInput = array.map((comment) => {
      return [
        comment.body,
        comment.votes,
        comment.author,
        comment.review_id,
        comment.created_at,
      ];
    });
    return sqlInput;
  }
};
