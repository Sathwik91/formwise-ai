import * as functions from 'firebase-functions';
import express from 'express';
import { Resend } from 'resend';

const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));
app.use(express.json());

// 🔐 Middleware for API Key verification
app.use((req, res, next) => {
  const clientKey = req.headers['x-api-key'];
  const validKey = process.env.CONTACT_API_KEY;

  if (!clientKey || clientKey !== validKey) {
    functions.logger.warn('Unauthorized access attempt detected.');
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  next(); // Proceed to the next middleware or route handler
  return;
});

app.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sathwikmoolyais051@gmail.com',
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    functions.logger.error('Email sending failed:', error);
    return res.status(500).json({ error: 'Email failed to send' });
  }
});

// Export the secured function with secret support (GCF v2)
export const sendContactEmail = functions
  .https.onRequest(
    {
      region: 'us-central1',
      secrets: ['RESEND_API_KEY', 'CONTACT_API_KEY']
    },
    app
  );
