var config = require('./config');
var mongoose = require("mongoose");

module.exports = function()
{
    var db = mongoose.connect(config.db);

    console.log("registering mongoose");
    //attach models to mongoose
    require('../app/models/user.server.model.js');
    require('../app/models/class.server.model.js');
    
    

    return db;
}
