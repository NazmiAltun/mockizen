import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const port = process.env.PORT || 8080;
const server = express();
server.use(bodyParser.json());

if (process.env.LOGGING_DISABLED) {
  console.warn("Logging disabled.Requests won't be logged");
} else {
  console.warn('Logging enabled.Requests will be logged');
  server.use(logger('dev'));
}
server.listen(port);

export default server;
