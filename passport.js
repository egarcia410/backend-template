const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const argon2 = require('argon2');

const knex = require('./db/knex');

// loads environmental variables
require('dotenv').config()

// JSON Web Token Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET,
}, async (jwt_payload, done) => {
    try {
        // find user from jwt_payload token
        return await knex('user')
            .where({ 'id': jwt_payload.sub }) // sub is the user's id from token
            .first()
            .then(user => {
                if (!user) done(null, false);
                return done(null, user);
            })
            .catch(error => {
                console.log(error);
                return done(error, false);
            });
    } catch(error) {
        return done(error, false, error.message);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find user given the email
        const user = await knex('user')
            .where({ 'email': email })
            .first()
            .then(user => {
                if (!user) done(null, false);
                return user;
            })
            .catch(error => {
                console.log(error);
                return done(null, false);
            });
        if (await argon2.verify(user.password, password)) {
            // passwords match
            return done(null, user);
        } else {
            // passwords do not match
            return done(null, false);
        };
    } catch(error) {
        return done(error, false, error.message);
    }
}));

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(accessToken, 'accessToken');
            console.log(refreshToken, 'refreshToken');
            console.log(profile, 'profile');
            // Verify if user exists in DB based from profile.id
            await knex('user')
                .where({ 'googleId': profile.id })
                .first()
                .then(user => {
                    // User exists, return done
                    if (user) done(null, user);
                })
                .catch(error => {
                    console.log(error);
                    done(null, false);
                });
            // User does not exist, create new user
            await knex('user')
                .returning('*')
                .insert({ 'email': profile.emails[0].value, 
                        'googleId': profile.id })
                .then(user => {
                    done(null, user[0]);
                })
                .catch(error => {
                    console.log(error);
                    done(null, false);
                });
        } catch(error) {
            done(error, false, error.message);
        };
    }
));
