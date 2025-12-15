const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const router =express.Router();

// Configure Gmail SMTP (use App Password!)


// API endpoint
router.post("/post", async (req, res) => {

let transporter = nodemailer.createTransport({
       host: "smtp.hostinger.com",
    port: 587,
  auth: {
      user: "contact@infologia.in",
      pass: "Welcome@123",
  },
});
  try {
    const { Name, Email, Phone, Subject, Message } = req.body;
     console.log(req.body);

    // 1. Send to office mail (your Gmail for testing)
    await transporter.sendMail({
from: "contact@infologia.in>",
     to: "contact@infologia.in",
      subject: `New Contact Form: ${Subject}`,
      html: `
        <h3>New Contact Request</h3>
        <p><b>Name:</b> ${Name}</p>
        <p><b>Email:</b> ${Email}</p>
        <p><b>Phone:</b> ${Phone}</p>
        <p><b>Subject:</b> ${Subject}</p>
        <p><b>Message:</b><br/>${Message}</p>
      `,
    });

    // 2. Auto-reply to user
    await transporter.sendMail({
from: '"Infologia Technologies" <contact@infologia.in>',
  to: Email,
  subject: "Thank you for contacting us",
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
  <div class="email-container">
    <div class="email-header">
      <h2>Infologia Technologies Pvt Ltd</h2>
    </div>
    <div class="email-body">
      <p>Dear ${Name},</p>
      <p>Thank you for reaching out. We will get back to you soon.</p>
      <p>Best regards,</p>
      <p><strong>Infologia Technologies Pvt Ltd</strong></p>
    </div>
    <div class="email-footer">
      <p>This email was sent by Infologia Technologies Pvt Ltd</p>
      <p>No.15, 3rd Floor, Sarayu Park, 2nd Main Road, New Colony, Chromepet, Chennai - 600044, Tamil Nadu, India</p>
    </div>
  </div>
</body>
</html>
`,
});


    res.status(200).json({ message: "Emails sent successfully ✅" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email ❌" });
  }
});


module.exports = router;