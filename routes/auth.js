const Router = require('koa-router');
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const AuthController = require('../controllers/AuthController');

require('../passport');

const router = new Router();

router.post('/auth/signup', 
            validateBody(schemas.authSchema), 
            AuthController.signUp);

router.post('/auth/signin', 
            validateBody(schemas.authSchema), 
            passport.authenticate('local', { session: false }), 
            AuthController.signIn);

router.post('/auth/google',
            passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
            AuthController.signIn)

module.exports = router;
