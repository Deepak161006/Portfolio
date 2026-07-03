import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup nodemailer transporter
const smtpConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'your-sending-email@gmail.com';
let transporter = null;

if (smtpConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '465'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log('[SMTP] Transporter successfully configured.');
} else {
  console.warn('[SMTP WARNING] SMTP credentials are not configured in backend/.env. Messages will be stored in messages.json but email alerts will not be sent.');
}


// Paths
const profilePath = path.join(__dirname, 'data', 'profile.json');
const messagesPath = path.join(__dirname, 'data', 'messages.json');

// Ensure messages file exists
if (!fs.existsSync(messagesPath)) {
  fs.mkdirSync(path.dirname(messagesPath), { recursive: true });
  fs.writeFileSync(messagesPath, JSON.stringify([], null, 2));
}

// Routes
// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 2. Fetch Profile Data
app.get('/api/profile', (req, res) => {
  try {
    const rawData = fs.readFileSync(profilePath, 'utf8');
    const profileData = JSON.parse(rawData);
    res.json(profileData);
  } catch (error) {
    console.error('Error reading profile data:', error);
    res.status(500).json({ error: 'Failed to read profile data' });
  }
});

// 3. Submit Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const rawMessages = fs.readFileSync(messagesPath, 'utf8');
    const messages = JSON.parse(rawMessages);

    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject: subject || 'No Subject',
      message,
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

    console.log(`[Contact Form] New message from ${name} (${email}): ${subject}`);

    // Send email alert if SMTP is configured
    if (transporter) {
      const mailOptions = {
        from: `"${name} (${email})" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.RECEIVER_EMAIL || 'mdeepak1610@gmail.com',
        subject: `New Portfolio Message: ${subject || 'No Subject'}`,
        text: `You have received a new contact form message from your portfolio website.\n\n` +
              `Visitor Details:\n` +
              `- Name: ${name}\n` +
              `- Email: ${email}\n` +
              `- Subject: ${subject || 'No Subject'}\n\n` +
              `Message:\n` +
              `${message}\n`,
        html: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px;">` +
              `<h2 style="color: #6d28d9; margin-top: 0; font-family: sans-serif;">New Portfolio Inquiry</h2>` +
              `<hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px;" />` +
              `<p><strong>Name:</strong> ${name}</p>` +
              `<p><strong>Email:</strong> <a href="mailto:${email}" style="color: #6d28d9; text-decoration: none;">${email}</a></p>` +
              `<p><strong>Subject:</strong> ${subject || 'No Subject'}</p>` +
              `<div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 20px; font-style: italic;">` +
              `${message.replace(/\n/g, '<br/>')}` +
              `</div>` +
              `</div>`
      };

      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.error('[SMTP Error] Failed to send email alert:', mailErr);
        } else {
          console.log('[SMTP] Email notification sent successfully:', info.messageId);
        }
      });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
