const router = require("express").Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controller/reviewCtrl");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router.route("/").post(authenticateUser, createReview).get(getAllReviews);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, authorizePermissions("admin"), deleteReview);

module.exports = router;
