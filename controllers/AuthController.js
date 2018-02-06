const knex = require('../db/knex');

module.exports = {
    register: (ctx, next) => {
        console.log('AuthContoller.register() called!')
    },

    login: (ctx, next) => {
        console.log('AuthContoller.login() called!')
    },

}
