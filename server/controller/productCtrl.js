const Product = require("../models/Product");
const { checkPermissions } = require("../utils");
const { NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  //Only create product when user as a store
  req.body.seller = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  const count = await Product.countDocuments({});

  res.status(StatusCodes.OK).json({ count, products });
};

const getSingleProducts = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate({
    path: "reviews",
    select: "title rating comment",
  });

  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const getSingleProductsAuth = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate({
    path: "reviews",
    select: "title rating comment",
  });

  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  const isLiked = product.likedBy.includes(req.user.userId);

  res.status(StatusCodes.OK).json({ product, liked: isLiked });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }
  checkPermissions(req.user, product.seller);
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }
  checkPermissions(req.user, product.seller);
  await product.deleteOne();
  res.status(StatusCodes.OK).send({ msg: "Product deleted successfully" });
};

const likeProduct = async (req, res) => {
  const { id: productId } = req.params;
  let liked = true;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  if (product.likedBy.includes(req.user.userId)) {
    console.log(product.likedBy, "before");
    liked = false;
    product.likedBy = await product.likedBy.filter(
      (user) => user !== req.user.userId
    );
  } else {
    product.likedBy = await [...product.likedBy, req.user.userId];
  }

  await product.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: `${liked ? "Liked" : "Unliked"} this product` });
};

const uploadProductImage = async (req, res) => {
  // PERHAPS ON THE FRONTEND
  // checkPermissions(req.user, product.seller);
  res.status(StatusCodes.OK).send("Upload Product Image");
};
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  getSingleProductsAuth,
  deleteProduct,
  updateProduct,
  uploadProductImage,
  likeProduct,
};
