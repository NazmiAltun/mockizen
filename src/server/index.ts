import express from 'express';
import bodyParser from 'body-parser';
import configureLogging from './configureLogging';
import mapRoutes from '../mapRoutes';

const ScenariosPath = 'mocks/scenarios.json';

const app = express();
app.use(bodyParser.json());
configureLogging(app);
mapRoutes(app, ScenariosPath);
const server = app.listen(process.env.PORT || 8080);

export { app, server };
