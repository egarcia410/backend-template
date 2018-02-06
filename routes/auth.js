const Router = require('koa-router');

const AuthController = require('../controllers/AuthController');

const router = new Router();

router.post('/auth/register', AuthController.register);

router.post('/auth/login', AuthController.login);

module.exports = router;
