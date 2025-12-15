const path = require("path");
const nodemailer = require("nodemailer");
// const hbs = require("nodemailer-express-handlebars");

var smtpTransport = nodemailer.createTransport({
  host: "smtp.hostinger.fr",
  port: 587,
  secure: false,
  auth: {
    user: "support@infologia.in",
    pass: "Welcome@123",
  },
});

const handlebarsOptions = {
  viewEngine: {
    extName: ".html",
    partialsDir: path.resolve("./public/template/"),
    layoutsDir: path.resolve("./public/template/"),
    defaultLayout: "",
  },
  viewPath: path.resolve("./public/template/"),
  extName: ".html",
};
// smtpTransport.use("compile", hbs(handlebarsOptions));

module.exports = {
  getStandardResponse,
  sendemail,
  forgortopt,
};

function forgortopt(name, otp) {
  var templates = `<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>Password Reset</title>
<style>
body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
.container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
.header { text-align: center; padding: 10px 0; }
.header img { width: 100px; }
.content { padding: 20px; text-align: center; }
.content h1 { color: #333333; }
.content p { color: #666666; }
.otp { display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 24px; font-weight: bold; color: #ffffff; background-color: #007BFF; border-radius: 5px; }
.footer { text-align: center; padding: 10px 0; color: #999999; font-size: 12px; }
</style>
</head>
<body>
<div class='container'>
<div class='header'>
</div>
<div class='content'>
<h1>Password Reset Request</h1>
<p>Hello, ${name}</p>
<p>We received a request to reset your password. Use the OTP below to reset your password. This OTP is valid for 10 minutes.</p>
<div class='otp'>${otp}</div>
<p>If you did not request a password reset, please ignore this email.</p>
</div>
<div class='footer'>
&copy; All rights reserved by  Technologies Pvt Ltd
</div>
</div>
</body>
</html>`;
  return templates;
}

function getStandardResponse(status, message, data) {
  return {
    response_code: status,
    response_message: message,
    data: data,
  };
}
async function sendemail(data) {
  const mailOptions = {
    from: "support@infologia.in", // ✅ must be added
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  try {
    const info = await smtpTransport.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return 1;
  } catch (error) {
    console.error("Error sending email:", error);
    return 0;
  }
}
