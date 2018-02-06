const Koa = require('koa');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');

const AuthRoute = require('./routes/auth.js');
const DashboardRoute = require('./routes/dashboard.js');

const app = new Koa();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(morgan('dev')); //Logger
app.use(bodyParser()); // Parses by default are ['json', 'form']

// Routes
app.use(AuthRoute.routes());
app.use(DashboardRoute.routes());

// Start Server
app.listen(PORT, () => {
    console.log(`Creating magic on port ${PORT}`);
});
