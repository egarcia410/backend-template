const knex = require('../db/knex');

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
            const user = await knex('user')
                .returning([ 'id', 'email', 'password' ])
                .insert({ 'email': email, 'password': password })
                .then(user => {
                    return user[0]
                })
                .catch(error => {
                    console.log(error);
                });
                
            // Respond with a token
            ctx.body = user;

        } catch (error) {
            ctx.body = error.message;
        };
    },

    signIn: (ctx, next) => {
        // Generate token
        console.log('AuthContoller.signIn() called!')
    },

}
