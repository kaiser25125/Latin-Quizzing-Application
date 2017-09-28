var passport = require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User = require('mongoose').model('User');

exports.localRecoverPassword=function(){
    passport.use(new LocalStrategy({
	usernameField:"username",
	securityAnswerField:"securityAnswer"
    },function(username,securityAnswer,done){
	User.findOne({
	    username:username
	    },function(err,user){
		if(err){
		    return done(err);
		}
		if(!user){
		    return done(null,false,{
			message:"Unknown user"
		    });
		}
		if(!user.authenticateAnswer(securityAnswer)){
		    return done(null, false, {
			message: 'Invalid security answer'
		    });
		}
		return done(null, user);
	    });
    }));
};
