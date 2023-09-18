const router = require("express").Router();
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  getCurrentUserSales,
  createOrder,
  updateOrder,
} = require("../controller/orderCtrl");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], getAllOrders)
  .post(authenticateUser, createOrder);

router
  .route("/showCurrentUserOrder")
  .get(authenticateUser, getCurrentUserOrders);

router
  .route("/showCurrentUserSales")
  .get(authenticateUser, getCurrentUserSales);

router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch([(authenticateUser, authorizePermissions("admin"))], updateOrder);

module.exports = router;
