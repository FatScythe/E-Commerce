const sendEmail = require("./sendEmail");

module.exports = sendResetPasswordEmail = async ({
  name,
  email,
  passwordToken,
  origin,
}) => {
  const link = `${origin}user/reset-password?email=${email}&token=${passwordToken}`;
  const html = `<h2>Hello, ${name}</h2>
                <p>Please reset password by clicking on the following link:  <a href="${link}">Reset Password</a>
                </p>`;

  return sendEmail({ to: email, subject: "Reset Password", html });
};
