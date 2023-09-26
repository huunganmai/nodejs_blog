const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars').engine;

const SortMiddleWare = require('./app/middlewares/sortMiddleware');
const helpers = require('./helpers/handlebars');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Custom MiddleWare
app.use(SortMiddleWare);

// Override HTTP Method
app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: helpers,
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening at https://localhost:${port}`);
});
