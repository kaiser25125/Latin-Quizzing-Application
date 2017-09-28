// Load the module dependencies
var User = require('mongoose').model('User');
//var Student = require('mongoose').model('StudentsV4');
var passport = require('passport');


exports.printStudent = function(req,res,next)
{
    console.log("what up doc");
    console.log(req.user);
    //res.json({"user":req.user});
}
