const express = require("express");
const router = express.Router();
// const { IsAuth } = require("../../../middlewares/auth");
const {
  getReviews,
  addReview,
  updateReview,
  blockReview,
  deleteReview,
} = require("../../controllers/User/review_controller");

router.get("/get-reviews-ratings", getReviews);
// router.post(
//   "/add-reviews-ratings",
//   // IsAuth,
//   catchAsyncFunc(async (req, res, next) => {
//     const reviewData = req.body;
//     reviewData.user = req.user.id;

//     const product = await connection
//       .collection("products")
//       .findOne({ _id: ObjectID(reviewData.product_id) });
//     if (product) {
//       reviewData.product = product;
//     } else {
//       helper.sendError(res, { errors: "Product not found." });
//     }
//     const is_exist = await Review.findOne({ user: req.user.id });
//     if (is_exist) {
//       return helper.sendError(res, { errors: "Review already exist." }, req);
//     } else {
//       const result = await Review.create(reviewData);
//       helper.sendSuccess(res, { review: result }, req, "Success");
//     }
//   })
// );
router.post("/add_review", addReview);
router.put("/update_review", updateReview);
router.put("/soft_del_review", blockReview);
router.delete("/perm_del_review", deleteReview);

module.exports = router;
