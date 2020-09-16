import express from 'express';
import logger from 'morgan';

export default function (server: express.Express): void {
  if (process.env.LOGGING_DISABLED) {
    console.warn("Logging disabled.Requests won't be logged");
  } else {
    console.warn('Logging enabled.Requests will be logged');
    server.use(logger('dev'));
  }
}