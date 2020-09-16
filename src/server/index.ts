import express from 'express';
import bodyParser from 'body-parser';
import configureLogging from './configureLogging';
import mapRoutes from '../mapRoutes';

const server = express();
server.use(bodyParser.json());
configureLogging(server);
mapRoutes(server);
server.listen(process.env.PORT || 8080);

export default server;
