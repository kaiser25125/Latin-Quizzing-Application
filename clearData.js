process.env.NODE_ENV = "testing";
process.env.PORT = 8081;


module.exports = require("./server.js");



var clearAllData = function(done)
{
    console.log("Clearing data");
//    let cb = waitForXCallbacks(2,done);
    var mongoose = require("mongoose");
    let User = mongoose.model('User');
    User.remove({}).then(function(userr)
        {
	    console.log(userr);
        });
};



clearAllData(function(){});
