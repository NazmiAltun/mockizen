import express from 'express';
import bodyParser from 'body-parser';
import configureLogging from './configureLogging';
import configureNoCache from './configureNoCache';
import mapRoutes from '../routing';

const ScenariosPath = 'mocks/scenarios.json';

const app = express();
app.use(bodyParser.json());
configureLogging(app);
configureNoCache(app);
mapRoutes(app, ScenariosPath);

export default app;
