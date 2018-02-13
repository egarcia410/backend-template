const Router = require('koa-router');
const passport = require('passport');

const DashboardController = require('../controllers/DashboardController');

require('../passport');

const router = new Router();

router.get('/dashboard', 
            passport.authenticate('jwt', { session: false }), 
            DashboardController.dashboard);

module.exports = router;
