import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(to: string, otp: string, name: string) {
  const html = `
    <div style="max-width:480px;margin:0 auto;font-family:'Segoe UI',system-ui,sans-serif;background:#0b1a33;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#112244,#0b1a33);padding:32px 24px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.2)">
        <h1 style="color:#d4af37;font-size:22px;margin:0">UET Lahore LMS</h1>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:2px;margin-top:4px">LEARNING MANAGEMENT SYSTEM</p>
      </div>
      <div style="padding:32px 24px;background:#fff">
        <p style="color:#333;font-size:15px;margin:0 0 4px">Hello <strong>${name}</strong>,</p>
        <p style="color:#666;font-size:14px;margin:0 0 24px">Use the following OTP to verify your email address. This code expires in <strong>10 minutes</strong>.</p>
        <div style="background:#f8f9fa;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px">
          <span style="font-size:32px;font-weight:700;letter-spacing:8px;color:#0b1a33">${otp}</span>
        </div>
        <p style="color:#999;font-size:12px;margin:0;text-align:center">If you didn't request this, please ignore this email.</p>
      </div>
      <div style="padding:16px 24px;text-align:center;background:#f8f9fa;border-top:1px solid #eee">
        <p style="color:#bbb;font-size:11px;margin:0">&copy; ${new Date().getFullYear()} University of Engineering & Technology, Lahore</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: 'UET LMS — Email Verification OTP',
    html,
  });
}