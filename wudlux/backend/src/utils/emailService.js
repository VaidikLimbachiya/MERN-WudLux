    const nodemailer = require("nodemailer");

    exports.sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "vaidiklimbachiya.incdesign@gmail.com", // Replace with your Mailtrap user
            pass: "incdesign@2312", // Replace with your Mailtrap password
            },
        });

        const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (err) {
        console.error("Error sending email:", err.message);
        throw new Error("Email service error");
    }
    };
