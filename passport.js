const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const argon2 = require('argon2');

const knex = require('./db/knex');

// loads environmental variables
require('dotenv').config()

// JSON Web Token Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET,
}, async (jwt_payload, done) => {
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
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
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
}));
