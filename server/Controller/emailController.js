import nodemailer from "nodemailer";



 export const sendEmail = async (req, res) => {
  const { name, senderEmail, message, receiverEmail, subject } = req.body;
  console.log("Received email data:", req.body);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
        from: `"${"Portfolio App"}" <${process.env.EMAIL_USER}>`,
        to: receiverEmail,
        replyTo: senderEmail,
        subject: "New Contact Message from Your Portfolio",
        html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
    <h2 style="color: #4A90E2;">📬 New Contact Message</h2>
    
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
    
    <hr style="margin: 20px 0;" />
    
    <p><strong>Message:</strong></p>
    <p style="margin-left: 10px; padding-left: 10px; border-left: 3px solid #4A90E2;">
      ${message.replace(/\n/g, '<br/>')}
    </p>
    
    <hr style="margin: 20px 0;" />
    <p style="font-size: 0.9em; color: #777;">Sent via your portfolio website 🚀</p>
  </div>
`,
      };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "success", payload:req.body });
  } catch (error) {
    console.error("Mail sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
 }
