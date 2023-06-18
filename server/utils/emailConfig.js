module.exports = {
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GMAIL_ACCT,
    pass: process.env.GMAIL_PWD,
  },
};
