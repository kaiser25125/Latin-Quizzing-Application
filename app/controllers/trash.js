// Load the module dependencies
var User = require('mongoose').model('User');
//var Student = require('mongoose').model('StudentsV4');
var passport = require('passport');

var getErrorMessage=function(err){
    // Define the error message variable
    var message='';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
	switch (err.code) {
	    // If a unique index error occurs set the message error
	case 11000:
	case 11001:
	    message = 'Username already exists';
	    break;
	    // If a general error occurs set the message error
	default:
	    message = 'Something went wrong';
	}
    } else {
	// Grab the first error message from a list of possible errors
	for (var errName in err.errors) {
	    if (err.errors[errName].message) message = err.errors[errName].message;
	}
    }
    
    // Return the message error
    return message;
};

// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
    console.log(req.body);
    
    // if someone already signed in log them out
    if (req.user)
    {
	req.logout();
    }
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    if (!req.user) {
	// Create a new 'User' model instance
	var user = new User(req.body);
	var message = null;
	console.log("-------------REQUSER--------------");
	console.log(req.body);
	
	// Set the user provider property
	user.provider = 'local';
	
	// Try saving the new user document
	user.save(function(err) {
	    console.log("in save");
	    
	    // If an error occurs, use flash messages to report the error
	    if (err) {
		// Use the error handling method to get the error message
		var message = getErrorMessage(err);
		console.log(message);
		
		// Set the flash messages
		//req.flash('error', message);
		
		// Redirect the user back to the signup page
		res.json({
		    message:false,
		    errorMessage:message
		});
	    }
	    else {
		
		var stuObj = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    quizzes: []
                };
		
                var stuEntry = new Student(stuObj);
		stuEntry.save().then(function() {
	            console.log(message);
                    console.log("after save");
            	    // If the user was created successfully use the Passport 'login' method to login
            	    req.login(user, function(err) {
                	// If a login error occurs move to the next middleware
                	if (err) return next(err);
                	// Redirect the user back to the main application page
                	//return res.redirect('/login');
                        res.json({
                            message: true,
                        });
            	    });

		});
	    }
	});
    } 
    else {
	return res.redirect('/');
    }
};

// Create a new controller method that creates new 'OAuth' users
exports.saveOAuthUserProfile = function(req, profile, done) {
    // Try finding a user document that was registered using the current OAuth provider
    User.findOne({
	provider: profile.provider,
	providerId: profile.providerId
    }, function(err, user) {
	// If an error occurs continue to the next middleware
	if (err) {
	    return done(err);
	} else {
	    // If a user could not be found, create a new user, otherwise, continue to the next middleware
	    if (!user) {
		// Set a possible base username
		var possibleUsername = profile.username;
		
		// Find a unique available username
		User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
		    // Set the available user name 
		    profile.username = availableUsername;
		    
		    // Create the user
		    user = new User(profile);
		    
		    // Try saving the new user document
		    user.save(function(err) {
			// Continue to the next middleware
			return done(err, user);
		    });
		});
	    } else {
		// Continue to the next middleware
		return done(err, user);
	    }
	}
    });
};



// Create a new controller method for signing out
exports.signout = function(req, res) {
    // Use the Passport 'logout' method to logout
    req.logout();
    
    // Redirect the user back to the main application page
    res.redirect('/');
};
