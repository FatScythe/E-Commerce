const { createJWT, attachCookiesToResponse, isTokenValid } = require("./jwt");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");
const createHash = require("./createHash");

module.exports = {
  createTokenUser,
  attachCookiesToResponse,
  createJWT,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
};
