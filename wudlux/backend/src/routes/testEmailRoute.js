// testEmailRoute.js
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

// load env
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer transport verify failed:", error);
  } else {
    console.log("✅ Nodemailer transporter ready");
  }
});

router.get("/send-test", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "🔔 TEST EMAIL from /send-test route",
      text: "This is a test email from your backend system.",
    });

    console.log("✅ Test Email sent:", info.response);
    res.json({ success: true, msg: "Test email sent", info: info.response });
  } catch (err) {
    console.error("❌ Test Email failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
