process.env.NODE_ENV = "e2etesting";
process.env.PORT = 8081;


module.exports = require("./server.js");



var clearAllData = function(done)
{
	console.log("Clearing data");
//    let cb = waitForXCallbacks(2,done);
    var mongoose = require("mongoose");
    let User = mongoose.model('User');
    let clss=mongoose.model('Class');
    User.remove({}).then(function(userr)
        {
                clss.remove({},done);
        });
};



clearAllData(function(){});
