const router = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  userAccess,
} = require("../controller/userCtrl");

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], getAllUsers);
router.route("/show").get(authenticateUser, showCurrentUser);
router.route("/update").patch(authenticateUser, updateUser);
router.route("/updatePwd").patch(authenticateUser, updateUserPassword);

router
  .route("/:id")
  .get(authenticateUser, getSingleUser)
  .patch([authenticateUser, authorizePermissions("admin")], userAccess);

module.exports = router;
