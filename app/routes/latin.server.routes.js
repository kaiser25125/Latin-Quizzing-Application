// Load the module dependencies
var latin = require('../../app/controllers/latin.server.controller'),
	passport = require('passport');

module.exports = function(app) {
    /*
    app.route("/studentDashboardInformation")
       .get(latin.printStudent);
    */
    app.route("/createClass")
       .post(latin.createClass);
};
