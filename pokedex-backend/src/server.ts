import express from 'express';
import payload from 'payload';
import nodemailerSendgrid from 'nodemailer-sendgrid';

require('dotenv').config();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();

const start = async () => {
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
  
  app.listen(PORT);
}

start();
