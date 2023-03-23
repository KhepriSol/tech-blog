"use strict";

var express = require("express");

var path = require("path"); //paths


var controller = require("./controllers"); //handlebars


var exphbs = require("express-handlebars"); //Sequelize


var sequelize = require("./config/connection"); //Session


var session = require("express-session");

var SequlizeStore = require("connect-session-sequelize")(session.Store); //set up the actual session


var sess = {
  secret: "super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequlizeStore({
    db: sequelize
  })
}; //initialize the server

var app = express();
var PORT = process.env.PORT || 3306; //middlewear

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, "public")));
app.use(session(sess)); //use controllers

app.use("/", controller); //set handlebars as render engine

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    return console.log("Now listening on port ".concat(PORT));
  });
});
process.on('uncaughtException', function (err) {
  console.log(err);
});
//# sourceMappingURL=server.dev.js.map
