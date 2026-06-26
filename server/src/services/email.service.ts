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

  // async sendContactNotification(data: ContactEmailData) {
  //   const { name, email, subject, message } = data;

  //   return this.transporter.sendMail({
  //     from: process.env.EMAIL_USER,
  //     to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
  //     subject: `New Contact Form: ${subject}`,
  //     html: `
  //       <h2>New Contact Form Submission</h2>

  //       <p><strong>Name:</strong> ${name}</p>
  //       <p><strong>Email:</strong> ${email}</p>
  //       <p><strong>Subject:</strong> ${subject}</p>

  //       <h3>Message</h3>
  //       <p>${message}</p>
  //     `,
  //   });
  // }

  // async sendContactConfirmation(data: ContactEmailData) {
  //   const { name, email, subject, message } = data;

  //   return this.transporter.sendMail({
  //     from: process.env.EMAIL_USER,
  //     to: email,
  //     subject: "We received your message",
  //     html: `
  //       <h2>Hello ${name},</h2>

  //       <p>Thank you for contacting us.</p>
  //       <p>We have successfully received your message and will get back to you shortly.</p>

  //       <hr />

  //       <p><strong>Subject:</strong> ${subject}</p>
  //       <p><strong>Message:</strong></p>
  //       <p>${message}</p>

  //       <br />

  //       <p>Best Regards,</p>
  //       <p>Tejvir's Portfolio Team</p>
  //     `,
  //   });
  // }

  async sendContactNotification(data: ContactEmailData) {
    const { name, email, subject, message } = data;

    return this.transporter.sendMail({
      from: `${process.env.NAME} <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Inquiry: ${subject}`,
      html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#333;">
        <h2 style="margin-bottom:8px;">📩 New Contact Form Submission</h2>

        <p>You have received a new inquiry through your portfolio website.</p>

        <table style="border-collapse:collapse;">
          <tr>
            <td style="padding:6px 16px 6px 0;"><strong>Name</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td style="padding:6px 16px 6px 0;"><strong>Email</strong></td>
            <td>
              <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">
                ${email}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 16px 6px 0;"><strong>Subject</strong></td>
            <td>${subject}</td>
          </tr>
        </table>

        <hr style="margin:24px 0;" />

        <h3>Message</h3>

        <p style="white-space:pre-wrap;">${message}</p>

        <hr style="margin:24px 0;" />

        <p style="font-size:13px;color:#666;">
          This email was automatically generated from your portfolio contact form.
        </p>
      </div>
    `,
    });
  }

  async sendContactConfirmation(data: ContactEmailData) {
    const { name, email, subject, message } = data;

    return this.transporter.sendMail({
      from: `${process.env.NAME} <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me",
      html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#333;">
        <h2>Hello ${name},</h2>

        <p>
          Thank you for reaching out through my portfolio website.
          I have successfully received your message and appreciate your interest.
        </p>

        <p>
          I'll review your inquiry and get back to you as soon as possible,
          typically within <strong>1–2 business days</strong>.
        </p>

        <hr style="margin:24px 0;" />

        <h3>Your Message</h3>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <p style="white-space:pre-wrap;">${message}</p>

        <hr style="margin:24px 0;" />

        <p>
          While you wait, feel free to explore my portfolio and recent projects:
        </p>

        <p>
          <a
            href="${process.env.PORTFOLIO_URL}"
            target="_blank"
            style="color:#2563eb;text-decoration:none;font-weight:bold;"
          >
            🌐 Visit My Portfolio
          </a>
        </p>

        <br />

        <p>
          Thank you once again. I look forward to connecting with you.
        </p>

        <p>
          Best regards,<br />
          <strong>${process.env.NAME}</strong><br />
          ${process.env.DESIGNATION}
        </p>

        <p style="font-size:13px;color:#666;">
          © ${new Date().getFullYear()} ${process.env.NAME}. All rights reserved.
        </p>
      </div>
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
