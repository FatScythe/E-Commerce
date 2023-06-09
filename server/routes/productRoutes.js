const router = require("express").Router();

const {
  createProduct,
  getAllProducts,
  getSingleProducts,
  getSingleProductsAuth,
  deleteProduct,
  likeProduct,
  updateProduct,
  uploadProductImage,
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
  .route("/upload")
  .post(
    [authenticateUser, authorizePermissions("admin", "seller")],
    uploadProductImage
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
