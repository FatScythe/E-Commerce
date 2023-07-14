const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const { userId, name } = req.user;
  const isProductValid = await Product.findOne({ _id: productId });

  if (!isProductValid) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  const isAlreadySubmitted = await Review.findOne({
    product: productId,
    user: userId,
  });

  if (isAlreadySubmitted) {
    throw new BadRequestError("You have already submitted a review");
  }

  req.body.user = userId;
  req.body.name = name;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "user",
      select: "name avatar",
    })
    .populate({
      path: "product",
      select: "name store",
    });
  res.status(StatusCodes.OK).send({ count: reviews.length, reviews });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId })
    .populate({
      path: "user",
      select: "name avatar",
    })
    .populate({
      path: "product",
      select: "name store",
    });
  if (!review) {
    throw new NotFoundError(`No Review with id: ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { title, comment, rating } = req.body;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) throw new NotFoundError(`No review with id: ${reviewId}`);

  checkPermissions(req.user, review.user);

  review.title = title;
  review.comment = comment;
  review.rating = rating;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) throw new NotFoundError(`No review with id: ${reviewId}`);

  checkPermissions(req.user, review.user);

  await review.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Review deleted" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
