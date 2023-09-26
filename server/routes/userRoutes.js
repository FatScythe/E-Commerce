const router = require("express").Router();
const rateLimit = require("express-rate-limit");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserAvatar,
  updateUserPassword,
  userAccess,
} = require("../controller/userCtrl");

const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  limit: 2,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "You can make changes again, in less than 15min",
});

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], getAllUsers);
router.route("/show").get(authenticateUser, showCurrentUser);
router.route("/update").patch(authenticateUser, updateUser);
router.route("/updatePwd").patch(authenticateUser, updateUserPassword);
router
  .route("/updatePic")
  .patch(authenticateUser, userLimiter, updateUserAvatar);

router
  .route("/:id")
  .get(authenticateUser, getSingleUser)
  .patch([authenticateUser, authorizePermissions("admin")], userAccess);

module.exports = router;
