import express from 'express';
import bodyParser from 'body-parser';
import configureLogging from './configureLogging';
import configureNoCache from './configureNoCache';
import parseAndmapRoutes from '../routing';

const ScenariosPath = 'mocks/scenarios.json';

const app = express();
app.use(bodyParser.json());
configureLogging(app);
configureNoCache(app);
parseAndmapRoutes(app, ScenariosPath);
console.log('Mock Server is listening now...');

export default app;
