import nodemailer from "nodemailer";

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // ✅ For secure=true
  secure: false, // true for 465, false for other ports
  auth: {
    user: "testehaabsyed@gmail.com",
    pass: "nfpkagjwnjviowfh", // ✅ App password, not Gmail password
  },
});

/**
 * Sends an email.
 * @param {string} to - Receiver's email.
 * @param {string} subject - Subject of the email.
 * @param {string} text - Plain text body.
 * @param {string} html - HTML body.
 * @returns {Promise<{ success: boolean, message: string }>}
 */
const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Ehaab" <testehaabsyed@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("📧 Email sent:", info.messageId);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return { success: false, message: "Email failed to send" };
  }
};

export default sendMail;
