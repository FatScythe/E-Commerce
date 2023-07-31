const router = require("express").Router();

const {
  createProduct,
  getAllProducts,
  getMyProducts,
  getSingleProducts,
  getSingleProductsAuth,
  deleteProduct,
  likeProduct,
  updateProduct,
} = require("../controller/productCtrl");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .post(
    [authenticateUser, authorizePermissions("admin", "seller")],
    createProduct
  )
  .get(getAllProducts);

router
  .route("/my-products")
  .get(
    [authenticateUser, authorizePermissions("admin", "seller")],
    getMyProducts
  );

router.route("/like/:id").patch(authenticateUser, likeProduct);

router.route("/auth/:id").get(authenticateUser, getSingleProductsAuth);

router
  .route("/:id")
  .get(getSingleProducts)
  .patch(
    [authenticateUser, authorizePermissions("admin", "seller")],
    updateProduct
  )
  .delete(
    [authenticateUser, authorizePermissions("admin", "seller")],
    deleteProduct
  );

module.exports = router;
