const router = require("express").Router();
const {
  createStore,
  getAllStores,
  getStore,
  getMyStore,
  updateStore,
  deleteStore,
} = require("../controller/storeCtrl");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router.route("/").get(getAllStores).post(authenticateUser, createStore);

router
  .route("/my-store")
  .get([authenticateUser, authorizePermissions("admin", "seller")], getMyStore);

router
  .route("/:id")
  .get(getStore)
  .patch(
    [authenticateUser, authorizePermissions("admin", "seller")],
    updateStore
  )
  .delete(
    [authenticateUser, authorizePermissions("admin", "seller")],
    deleteStore
  );

module.exports = router;
