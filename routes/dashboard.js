const Router = require('koa-router');

const DashboardController = require('../controllers/DashboardController');

const router = new Router();

router.get('/dashboard', DashboardController.dashboard);

module.exports = router;
