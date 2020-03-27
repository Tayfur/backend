import passport from 'passport';
import lodash from 'lodash';
import  User  from './models/db/user'
import {Strategy as LocalStrategy} from 'passport-local';
export const initializePassport = app=>{

    app.use(passport.initialize());
    app.use(passport.session());   

passport.use(new LocalStrategy
(
    function(username,password,done)
    {
        User.findOne({
            where:{
                username:username,
                password:password,
            }
        }).then(user =>
            {
        if(!user){
            return done (null,false);
        }
        
        return done (null,lodash.pick(user,['_id','username','password']));
  
    });
    }
    
));
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});
};
