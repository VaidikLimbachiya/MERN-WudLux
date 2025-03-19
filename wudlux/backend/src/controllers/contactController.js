const Contact = require("../models/Contact");
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save contact details in DB
    await Contact.create({ name, email, message });

    // Send to admin from your official domain, with user’s email in reply-to
    await resend.emails.send({
      from: 'Wudlux Decor <smitthakar199@gmail.com>',
      to: process.env.ADMIN_EMAIL || "vadikl5726@gmail.com",
      reply_to: email, // USER’S submitted email will show here!
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(201).json({ message: "Message received successfully." });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Server error" });
  }
};
