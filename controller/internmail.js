const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

router.post("/", async function (req, res, next) {
  try {
    const jsondata = req.body;
    const resumeFilename = jsondata.resume;
    if (!resumeFilename) {
      console.error("Resume filename is missing");
      return res
        .status(400)
        .send({ message: "Resume file not found in request" });
    }
    const resumePath = path.join(__dirname, "../public/resumes", resumeFilename);
    if (!fs.existsSync(resumePath)) {
      console.error("Resume file does not exist at:", resumePath);
      return res
        .status(404)
        .send({ message: "Resume file not found on server." });
    }

    var officetransporter = {
      host: "smtp.hostinger.com",
      port: 587,
      auth: {
        user: "contact@infologia.in",
        pass: "Welcome@123",
      },
      tls: {
        rejectUnauthorized: false, 
      },
    };

    var transporter = nodemailer.createTransport(officetransporter);

    officemailOptions = {
      from: "contact@infologia.in",
      to: "hr@infologia.in",
      subject: `Internship Application from ${jsondata.firstname} ${jsondata.lastname}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .email-container {
      margin: 20px;
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
    }
    .email-header {
      background-color: #007bff;
      color: white;
      padding: 15px;
      border-radius: 8px 8px 0 0;
      text-align: center;
      font-size: 1.2em;
    }
    .email-body {
      padding: 20px;
      color: #212529;
    }
    .email-footer {
      margin-top: 20px;
      font-size: 0.9em;
      color: #6c757d;
      text-align: center;
    }
  </style>
</head>
<body>
    <div class="email-body">
    <br>
      <p>Dear Sir/Mam,</p>
      <p>I am ${jsondata.firstname + " " + jsondata.lastname}</p>
      <P>${jsondata.description}</p>
      <p>Email: ${jsondata.email}</p>
      <p>Phno: ${jsondata.phno}</p>
      <p>Education status: ${jsondata.educationstatus}</p>
      <p>Highest Qualification:${jsondata.highestqualification}</p>
      <p>University/College: ${jsondata.university_college}</p>
      <p>Current Location: ${jsondata.currentlocation}</p>
      <p>Best regards,</p>
      <p><strong>${jsondata.firstname + " " + jsondata.lastname}</strong></p>
      <br>
    </div>
    <div class="email-footer email-container">
    <p>Submitted via Infologia Technologies Internship Portal</p>
    </div>
    </div>
</html>
`,
      attachments: [
        {
          filename: resumeFilename,
          path: path.join(__dirname, "../public/resumes", resumeFilename),
        },
      ],
    };

    await transporter.sendMail(officemailOptions);
    console.log("Office mail sent");

    var mailOptions = {
      from: "contact@infologia.in",
      to: `${jsondata.email}`,
      subject: "Thank you for your application",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    .email-container {
      margin: 20px auto;
      max-width: 600px;
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
    }
    .email-header {
      background-color: #007bff;
      color: white;
      padding: 15px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .email-body {
      padding: 20px;
      color: #333;
    }
    .email-footer {
      margin-top: 20px;
      font-size: 0.9em;
      color: #6c757d;
      text-align: center;
    }
  </style>
</head>
<body>
    <div class="email-body">
    <br>
      <p>Dear ${jsondata.firstname} ${jsondata.lastname},</p>
      <p>We appreciate your interest in the internship program at <strong>Infologia Technologies Pvt Ltd</strong>.</p>
      <p>Your application has been received successfully. Our team is currently reviewing your profile and will reach out to you if your qualifications match our requirements.</p>
      <p>Thank you for considering us for your career growth. We wish you all the best.</p><br>
      <p><strong>Note: </strong> Please note that you can apply again only after 30 days.</p>
      <br>
      <p>Warm regards,</p>
      <p><strong>Infologia Technologies Pvt Ltd</strong></p>
      <br>
    </div>
    <div class="email-container">
    <div class="email-footer>
      <p>This email was sent by Infologia Technologies Pvt Ltd</p>
      <p>No.15, 3rd Floor, Sarayu Park, 2nd Main Road, New Colony, Chromepet, Chennai - 600044, Tamil Nadu, India</p>
    </div>
    </div
</body>
</html>
`};

    await transporter.sendMail(mailOptions);
    console.log("Applicant mail sent");

    return res.status(200).send({
      message: "Mail sent",
    });

  } catch (error) {
    console.error("Mail send error:", error);
    return res.status(500).send({
      message: "Failed to send email",
      error: error.message,
    });
  }
});

module.exports = router;
