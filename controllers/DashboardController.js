const knex = require('../db/knex');

module.exports = {
    dashboard: (ctx, next) => {
        console.log('DashboardController.dashboard() called!')
    },

}
