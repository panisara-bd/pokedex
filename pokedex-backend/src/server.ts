import express from 'express';
import payload from 'payload';
import nodemailerSendgrid from 'nodemailer-sendgrid';

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    email: {
      transportOptions: nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      }),
      fromName: 'Panisara B. D.',
      fromAddress: 'panisara.bnn@gmail.com',
    },
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  
  // Add your own express routes here

  app.listen(3000);
}

start();
