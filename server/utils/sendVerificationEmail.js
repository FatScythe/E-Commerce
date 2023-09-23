const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}user/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the following link:<a href="${verifyEmail}"> Verify Email</a></p>`;

  await sendEmail({
    to: email,
    subject: "Email Verification",
    html: `<h1>Hello, ${name}</h1> ${message}`,
  });
};

module.exports = sendVerificationEmail;
