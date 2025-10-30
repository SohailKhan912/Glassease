import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.FROM_EMAIL || user;

let transporter;
if (host && user && pass) {
  transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

export async function sendMail({ to, subject, text, html }) {
  if (!transporter) {
    console.warn('Mailer not configured; skipping email');
    return { skipped: true };
  }
  return transporter.sendMail({ from, to, subject, text, html });
}
