process.env.NODE_ENV = process.env.NODE_ENV|| "development";
process.env.PORT = process.env.PORT || 3000;

var mongoose = require("./config/mongoose");
var db = mongoose();

console.log("mongoose was started");
var express = require("./config/express");
var app = express();

var passport = require("./config/passport");
var passport= passport();

var port = process.env.PORT;
app.listen(port);
console.log("Server running on port "+port);

module.exports = app;
