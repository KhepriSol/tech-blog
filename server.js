const express = require('express');
const path = require('path');

const controller = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const session = require('express-session');

const session = require("express-session");
const SequlizeStore = require("connect-session-sequelize")(session.Store);

//setup session
const sess = {
    secret: 'super secret secret'
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequlizeStore({
        db: sequelize,
    }),
};
//server startup
const app = express();
const PORT = process.env.PORT || 3001;

//middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

//use controllers
app.use('/', controller);


