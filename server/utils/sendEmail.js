const nodemailer = require("nodemailer");
const config = require("./emailConfig");

const sendEmail = async ({ to, subject, html }) => {
  let transporter = nodemailer.createTransport(config);
  console.log(to, subject, html);
  return transporter.sendMail({
    from: '"Ayeti Adorn Support 👻"',
    to,
    subject,
    html: `<img width='100%' height='20%' src="cid:logo"/> ${html}`,
    attachments: [
      {
        filename: "Ayeti.png",
        path: __dirname + "/Ayeti.png",
        cid: "logo",
      },
    ],
  });
};

module.exports = sendEmail;
