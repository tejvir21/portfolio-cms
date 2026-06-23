import nodemailer from "nodemailer";

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendContactNotification(data: ContactEmailData) {
    const { name, email, subject, message } = data;

    return this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <h3>Message</h3>
        <p>${message}</p>
      `,
    });
  }

  async sendContactConfirmation(data: ContactEmailData) {
    const { name, email, subject, message } = data;

    return this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message",
      html: `
        <h2>Hello ${name},</h2>

        <p>Thank you for contacting us.</p>
        <p>We have successfully received your message and will get back to you shortly.</p>

        <hr />

        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>

        <br />

        <p>Best Regards,</p>
        <p>Tejvir's Portfolio Team</p>
      `,
    });
  }

  async sendContactEmails(data: ContactEmailData) {
    await Promise.all([
      this.sendContactNotification(data),
      this.sendContactConfirmation(data),
    ]);
  }
}

export default new EmailService();
