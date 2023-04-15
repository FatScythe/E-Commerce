const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");

const createReview = async (req, res) => {
  res.status(StatusCodes.CREATED).send("Create Review");
};

const getAllReviews = async (req, res) => {
  res.status(StatusCodes.OK).send("Get All Review");
};

const getSingleReview = async (req, res) => {
  res.status(StatusCodes.OK).send("Get Single Review");
};

const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).send("Update Review");
};

const deleteReview = async (req, res) => {
  res.status(StatusCodes.OK).send("Deelete Review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
