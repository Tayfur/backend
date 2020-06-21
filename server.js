import {initializeRoutes} from './routes';
//import {initializePassport} from './passport';
import {initializeExpressApp} from './setup-express';
import {initializeErrorRoutes} from './routes/error';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://tayfur:'+process.env.MONGO_ATLAS_PASS +'@cluster0-e7cu4.mongodb.net/Post?retryWrites=true&w=majority',
{
useUnifiedTopology: true,
useCreateIndex: true,
useNewUrlParser: true
});
mongoose.Promise = global.Promise;


// view engine setup
const app = initializeExpressApp();


//initializePassport(app);
initializeRoutes(app);
initializeErrorRoutes(app);

module.exports = app;
