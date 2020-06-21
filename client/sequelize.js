    import mongoose from 'mongoose';
    export const initializeDatabases= app =>{


    mongoose.connect('mongodb+srv://tayfur:'+process.env.MONGO_ATLAS_PASS +'@cluster0-e7cu4.mongodb.net/Post?retryWrites=true&w=majority',
    {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify:false,
    });
    mongoose.Promise = global.Promise;
    
    
    return app
  }