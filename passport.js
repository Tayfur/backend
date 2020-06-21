import passport from 'passport';
import lodash from 'lodash';
import  User  from './models/user'
import keys from './config/index';
const GoogleStrategy = require("passport-google-oauth20").Strategy;

export const initializePassport = app=>{

    app.use(passport.initialize());
    app.use(passport.session());   

    passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE.clientID,
        clientSecret: keys.GOOGLE.clientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile._json)
    }));
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});
};
