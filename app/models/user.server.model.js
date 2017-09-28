'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

//Define a new 'UserSchema'
var UserSchema = new Schema({
    //first name of user
    firstName: {
	type: String,
	// Validate 'first name' value existance
	required: 'first name is required',
	trim: true
    },
    //last name of user
    lastName: {
	type: String,
	// Validate 'last name' value existance
	required: 'last name is required',
	trim: true
    },
    //designates whether or not a user is an admin/teacher
    //should only be one admin, and the front end should never be able to set this value
    administrator:{
	type:Boolean,
	"default":false
    },
    //security question for the user to set to recover password
    securityQuestion:{
	type:String,
	trim:true
    },
    //encrypted answer of the security question
    securityAnswer:{
	type:String,
	trim:true
    },
    //unique identifer of every user
    username: {
	type: String,
	unique: true,
	validate:[
	    function(username){
		return username && username.length>=6;
	    },
	    "Username needs to be 6 characters or longer"
	],
	required: 'Username is required',
	trim: true
    },
    password: {
	type: String,
	// Validate the 'password' value length
	validate: [
	    function(password) {
		return password && password.length >= 6;
	    }, 'Password needs to be 6 characters or longer'
	],
	required:"Password is required"
    },
    salt: {
	type: String
    },
    //separate salt for just the security answer
    answerSalt: {
	type: String
    },
    provider: {
	type: String,
	// Validate 'provider' value existance
	required: 'Provider is required'
    },
    //this is for students
    signupCode:{
	type: String
    },
    //must be set to true when saving if you want the password to be hashed
    //bad fix for save command always hashing password
    passwordChange:{
	type:Boolean,
	default:true
    },
    //must be set to true when saving if you want the security answer to be hashed
    //bad fix for save command always hashing security answer
    securityAnswerChange:{
	type:Boolean,
	default:true
    },
    //stores all of the users chapters
    chapters:[
	{
	    //every chapter must have a name
	    name:{
		type:String,
		required:"Every chapter must have a name"
	    },
	    //index of order for chapters
	    index:{
		type:Number
	    },
	    //status of user interacting with the chapter
	    //can be "Complete","toBeCompleted", and "didNotComplete"
	    status:{
		type:String
	    },
	    //array of homeworks
	    homework:[
		{
		    //every homework needs a name
		    name:{
			type:String,
			required:"Every Homework must have a name"
		    },
		    //message to show at the end of a quiz
		    endingMessage:{
			type:String,
			required:"Every Homework must have an endingMessage"
		    },
		    //status of user interacting with the homework
		    //can be "Complete","toBeCompleted", and "didNotComplete"
		    status:{
			type:String
		    },
		    //index of homework for ordering
		    index:{
			type:Number
		    },
		    //date that a homework is due and needs to be completed by
		    dueDate:{
			type:Date,
			required:"Every Homework must have a Due Date"
		    },
		    //time when user started a quiz
		    startDate:{
			type:Date
		    },
		    //time when user finished a quiz
		    endDate:{
			type:Date
		    },
		    //string for showing how long a user took to take a quiz
		    timeToComplete:{
			type:String
		    },
		    //array of questions for the homework
		    questions:[
			{
			    //type of a question
			    //can be 'ma','mc','la','fb', and 'tf'
			    qType:{
				type:String,
				required:"Every question must have a type"
			    },
			    //question that the user is asked
			    prompt:{
				type:String,
				required:"Every question must have a prompt"
			    },
			    //options for ma and mc for users to choose
			    options:[
				{
				    type:String
				}
			    ],
			    //answer of the question for every type except ma
			    answer:String,
			    index:{
				type:Number
			    },
			    //answer(s) for ma
			    answers:[
				{
				    type:String
				}
			    ],
			    //answer user gave for every type except ma
			    userAnswer:{
				type:String
			    },
			    //answer user gave for ma
			    userAnswers:[
				{
				type:String
				}
			    ],
			    //whether the user got question correct
			    correct:{
				type:Boolean
			    },
			    //whether the user flagged the answer
			    flag:{
				type:Boolean,
				default:false
			    },
			    //whether the user modified the question
			    modified:{
				type:Boolean,
				default:false
			    }
			}
		    ]
		}
	    ]
	}
    ],
    providerId: String,
    providerData: {},
    created: {
	type: Date,
	// Create a default 'created' value
    default: Date.now
    }
});
//attribute for user's fullName
UserSchema.virtual("fullName").get(function(){
    return this.lastName + ',' +this.firstName;
}).set(function(fullName){
    var splitName=fullName.split(',');    
    this.firstName=splitName[1]||'';
    this.lastName=splitName[0]||'';
});

// Use a pre-save middleware to hash the password and the security answer
UserSchema.pre('save', function(next) {
    //save the password
    if (this.password && this.passwordChange) {
	this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
	this.password = this.hashPassword(this.password);
	this.passwordChange=false;
    }
    //save the security answer
    if(this.securityAnswer && this.securityAnswerChange){
	this.answerSalt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
	this.securityAnswer = this.hashAnswer(this.securityAnswer);
	this.securityAnswerChange=false;
    }
    next();
});


// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};


// Create an instance method for hashing an answer
UserSchema.methods.hashAnswer = function(answer) {
	return crypto.pbkdf2Sync(answer, this.answerSalt, 10000, 64).toString('base64');
};


// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

// Create an instance method for authenticating user's security answer
UserSchema.methods.authenticateAnswer = function(answer) {
	return this.answer === this.hashAnswer(answer);
};


// Find possible not used email
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;

	// Add a 'email' suffix
	var possibleUsername = username + (suffix || '');

	// Use the 'User' model 'findOne' method to find an available unique email
	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		// If an error occurs call the callback with a null value, otherwise find find an available unique email
		if (!err) {
			// If an available unique email was found call the callback method, otherwise call the 'findUniqueemail' method again with a new suffix
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);
