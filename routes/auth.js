const Router = require('koa-router');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const AuthController = require('../controllers/AuthController');

const router = new Router();

router.post('/auth/signup', validateBody(schemas.authSchema), AuthController.signUp);
router.post('/auth/signin', AuthController.signIn);

module.exports = router;
