import {initializeRoutes} from './routes';
import {initializePassport} from './passport';
import {initializeExpressApp} from './setup-express';
import {initializeErrorRoutes} from './routes/error';
import {initializeDatabases} from './client/sequelize';

// view engine setup
const app = initializeExpressApp();


initializePassport(app);
initializeRoutes(app);
initializeErrorRoutes(app);
initializeDatabases(app)
module.exports = app;
