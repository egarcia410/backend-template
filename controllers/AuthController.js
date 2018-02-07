const knex = require('../db/knex');

module.exports = {
    signUp: (ctx, next) => {
        // Email & Password
        console.log(ctx.request.value.body);
        console.log('AuthContoller.signUp() called!')
    },

    signIn: (ctx, next) => {
        // Generate token
        console.log('AuthContoller.signIn() called!')
    },

}
