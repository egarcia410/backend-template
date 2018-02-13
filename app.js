const Koa = require('koa');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');

const AuthRoute = require('./routes/auth');
const DashboardRoute = require('./routes/dashboard');

const app = new Koa();
const PORT = process.env.PORT || 8080;

// loads environmental variables
require('dotenv').config()

// Middlewares
app.use(morgan('dev')); // Logger
app.use(bodyParser()); // Parses ['json', 'form'] by default

// Routes
app.use(AuthRoute.routes());
app.use(DashboardRoute.routes());

// Start Server
app.listen(PORT, () => {
    console.log(`Creating magic on port ${PORT}`);
});
