import express from 'express';
import payload from 'payload';

require('dotenv').config();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const app = express();

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info('Payload initialised');
    },
  });

  app.listen(PORT);
};

start();
