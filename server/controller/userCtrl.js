const User = require("../models/User");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions } = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ count: users.length, users });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new BadRequestError(`No user with id: ${userId}`);
  }

  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ user: { ...req.user, avatar: user.avatar } });
};

const updateUser = async (req, res) => {
  const { name, email, avatar } = req.body;

  if (!name || !email) {
    throw new BadRequestError("Please fill all fields");
  }

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new NotFoundError(`No user with id: ${req.user.userId}`);
  }

  user.name = name;
  user.email = email;
  user.avatar = avatar;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Profile sucessfully updated" });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!newPassword || !oldPassword)
    throw new BadRequestError("Please provide old and new password");

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.user.userId}`);
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Password!!!");
  }

  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Password sucessfully updated" });
};

const userAccess = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.user.userId}`);
  }

  user.isVerified = user.isVerified ? false : true;

  await user.save();

  res.status(StatusCodes.ACCEPTED).json({
    msg: `${user.name} has been ${user.isVerified ? "unblocked" : "blocked"}`,
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  userAccess,
};
