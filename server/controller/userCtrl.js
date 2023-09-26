const User = require("../models/User");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions } = require("../utils");
const cloudinary = require("cloudinary");
const fs = require("fs");

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
  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError("Please fill all fields");
  }

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new NotFoundError(`No user with id: ${req.user.userId}`);
  }

  user.name = name;
  user.email = email;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Profile sucessfully updated" });
};

const updateUserAvatar = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("Please upload an image");
  }
  const profilePic = req.files.pfp;

  if (!profilePic.mimetype.startsWith("image")) {
    throw new BadRequestError("Please provide an image");
  }
  if (profilePic.size > process.env.MAX_SIZE) {
    throw new BadRequestError(`Image size must not be larger than 3 MB`);
  }
  const options = {
    use_filename: true,
    folder: "Ayeti-Adorn/users",
    public_id: req.user.userId,
    unique_filename: false,
    overwrite: true,
  };

  const result = await cloudinary.v2.uploader.upload(
    profilePic.tempFilePath,
    options
  );

  fs.unlinkSync(profilePic.tempFilePath);

  const user = await User.findOne({ _id: req.user.userId });

  user.avatar = result.secure_url;

  await user.save();

  res.status(StatusCodes.ACCEPTED).json({
    image: { src: result.secure_url },
    msg: "Profile Picture has been updated",
  });
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
  updateUserAvatar,
  updateUserPassword,
  userAccess,
};
