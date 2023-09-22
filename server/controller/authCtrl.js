const User = require("../models/User");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const {
  createTokenUser,
  attachCookiesToResponse,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please fill all fields");
  }
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    password,
    email,
    role,
    verificationToken,
  });

  // const host = req.get("host");
  // console.log(`host: ${host}`);

  const origin = process.env.DOMAIN;

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Please check your email to verify your account" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Invalid Credentials!!!");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new BadRequestError("Invalid Credentials");

  if (!user.isVerified)
    throw new UnauthenticatedError("Please verify your email");

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, tokenUser);

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new NotFoundError("Verification Failed");
  if (verificationToken !== user.verificationToken)
    throw new BadRequestError("Invalid Credential");

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Logged Out Sucessfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError("Please provide an email");

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    const origin = process.env.DOMAIN;

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { email, passwordToken, newPassword } = req.body;

  if (!email || !passwordToken || !newPassword)
    throw new BadRequestError("Please fill all fields");

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(passwordToken) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = newPassword;
      user.passwordToken = "";
      user.passwordTokenExpirationDate = null;

      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ msg: "Password has been reset" });
};

module.exports = {
  login,
  register,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
};
