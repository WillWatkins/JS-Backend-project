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
      console.log(review.created_at);
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
exports.categoryReferences = (array) => {
  return {};
};
