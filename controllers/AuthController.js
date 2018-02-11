const JWT = require('jsonwebtoken');

const knex = require('../db/knex');

signToken = user => {
    return JWT.sign({
        sub: user.id, // subject
        iat: new Date().getTime(), // issuedAt
        exp: new Date().setDate(new Date().getDate() + 1) // expiresIn 1 day
    }, process.env.JWT_SECRET);
}

module.exports = {
    signUp: async (ctx, next) => {
        try {
            const { email, password } = ctx.request.value.body;

            // Check if there is an user with the same email
            const foundUser = await knex('user')
                .where({ 'email': email })
                .first()
                .then(user => {                
                    return user;
                })
                .catch(error => {
                    console.log(error);
                });
    
            if (foundUser) {
                ctx.throw(403, 'Email already in use!');
            };
    
            // Create a new user
            // Knex will return an array with an object of the new user info
            const newUser = await knex('user')
                .returning([ 'id', 'email', 'password' ])
                .insert({ 'email': email, 'password': password })
                .then(user => {
                    return user[0]
                })
                .catch(error => {
                    console.log(error);
                });
            
            // Generate the token
            const token = signToken(newUser);

            // Respond with a token
            ctx.status = 200;
            ctx.body = { token };

        } catch (error) {
            ctx.body = error.message;
        };
    },

    signIn: (ctx, next) => {
        // Generate token
        console.log('AuthContoller.signIn() called!')
    },

}
