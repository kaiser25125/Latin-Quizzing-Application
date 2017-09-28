// Load the module dependencies
var User = require('mongoose').model('User');

var passport = require('passport');
var clss =require("mongoose").model("Class");
//status for homeworks and chapters
var statuses={
    "toBeCompleted":"toBeCompleted",
    "Complete":"Complete",
    "didNotComplete":"didNotComplete"
};
//status for the questions
var questionStatus={
    "missing":"missing",
    "modified":"modified",
    "correct":"correct",
    "wrong":"wrong"
}
//converts milliseconds to human readable string
var millisToMinutesAndSeconds=function(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

//gets rid of answers for student so they can't see it
var sanatizeStudentAnswers=function(chaps){
    var storage=chaps;
    storage.forEach(function(ch){
	if(ch.homework.length>0){
	    ch.homework.forEach(function(hw){
		hw.questions.forEach(function(quest){
		    quest.answer="";
		    quest.answers=[];
		})
	    })
	}
    })
    return storage;
}
//updates the status of homeworks and chapters for all students
var updateStudents=function(use,done,callback,homeworkForChange){   
    var acc=0;
    User.find({administrator:false},function(err,studs){
	studs.forEach(function(stud){
	    stud.chapters.forEach(function(chap){
		chap.homework.forEach(function(hw){
		    var operator=true;
		    //parse through the questions
		    hw.questions.forEach(function(quest){
			if((quest.userAnswer==undefined) && (quest.userAnswers.length==0) &&(!quest.modified)){
			    operator=false;
			}
		    })
		    //set the homework status to didNotComplete if a homework was not completed
		    if(operator==false){
			hw.status=statuses.didNotComplete;
		    }
		    //set the homework status to Complete if all questions were completed
		    else{
			hw.status=statuses.Complete;
		    }
		    //set the homework status to toBeCompleted if it wasn't completed but the due date hasn't passed
		    if((hw.dueDate.getTime()>(new Date()).getTime()) && (hw.status==statuses.didNotComplete) && (hw.status!=statuses.Complete)){
			hw.status=statuses.toBeCompleted;
		    }
		})
		chap.status="";
		chap.homework.forEach(function(hw){
		    //sets the chapter to did not complete if there is a homework that wasn't completed
		    if(hw.status==statuses.didNotComplete){
			chap.status=statuses.didNotComplete;
		    }
		    //sets the chapter to to be completed if there is no did not complete
		    else if(chap.status!=statuses.didNotComplete && hw.status==statuses.toBeCompleted){
			chap.status=statuses.toBeCompleted;
		    }
		    //sets the chapter to to be completed if there is no did not complete
		    if(chap.status!=statuses.didNotComplete && chap.status!=statuses.toBeCompleted){
			chap.status=statuses.Complete;
		    }
		})
	    })
	    //saves all of the students
	    stud.save(function(err){
		acc++;
		if(err){
		    return next(err);
		}
		//once all of the students are saved
		if(acc==studs.length){
		    //if homework for change is undefined that means we should use this callback
		    if(homeworkForChange==undefined){
			//check callback
			if(callback!=undefined){
			    callback(use,done);
			}
		    }
		    else{
			//if homework for change is defined that means we should use this callback
			callback(use,done,homeworkForChange);
		    }
		}
	    })
	})
    })
}
//updates every homework about whether students got questions right or wrong
var updateHws=function(done){
    User.find({administrator:false},function(err,students){
	if(err){
	    return done(err);
	}
	var acc=0;
	var brek=students.length;
	students.forEach(function(stud){
	    stud.chapters.forEach(function(ch){
		ch.homework.forEach(function(hw){
		    console.log("hw");
		    hw.questions.forEach(function(quest){
			console.log("0");
			try{
			    //if the question is modified automatically set to it being correct
			    if(!(quest.modified)){
				//if the question is not multiple answer then check quest.answer because there will not be multiple answers
				if(quest.qType!="ma"){
				    if(quest.userAnswer==quest.answer){
					quest.correct=true;
				    }
				    else{
					quest.correct=false;
				    }
				    if(quest.userAnswer!=undefined && quest.qType=="la"){
					quest.correct=true;
				    }
				}
				//for multiple answer need to check quest.answers because there could be multiple answers
				else{
				    var lowerCaseArrays=[];
				    quest.userAnswers.forEach(function(answer){
					lowerCaseArrays.push(answer.toLowerCase());
				    })
				    var crtLowerCaseArrays=[];
				    quest.answers.forEach(function(answer){
					crtLowerCaseArrays.push(answer.toLowerCase());
				    })
				    if(JSON.stringify(lowerCaseArrays)==JSON.stringify(crtLowerCaseArrays)){
					quest.correct=true;
				    }
				    else{
					quest.correct=false;
				    }
				}
			    }
			    else{
				quest.correct=true;
			    }
			}
			catch(exc){
			    console.log(exc);
			}
		    })
		})
	    })
	    //save all of the students
	    stud.save(function(err){
		if(err){
		    return done(err);
		}
		//do a callback when all are saved
		if(brek==acc){
		    done();
		}
	    })
	})
    })
}
//function that gets the next homework that is due for the student
var getNextHw=function(stud){
    var smallest=Number.MAX_VALUE;
    var selected;
    stud.chapters.forEach(function(ch){
	ch.homework.forEach(function(hw){
	    var checker=(hw.dueDate.getTime()-(new Date().getTime()));
	    //if the date is after now and is the smallest
	    if(checker>0 && checker<smallest && hw.status!=statuses.Complete){
		//set the return value to this and then return once loops are done
		smallest=checker;
		selected=hw;
	    }
	})
    })
    return selected;
}

//function that validates whether the user is administrator
//user is a passport user, res is the response of the function
var validateUser=function(user,res){
    //if the user is not signed in
    if(typeof(user) =="undefined"){
	res.json({
	    error:true,
	    message:"You are not signed in as an administrator"
	})
	return false;
    }
    //if the user is not administrator
    if(!user.administrator){
	res.json({
	    error:true,
	    message:"You are not signed in as an administrator"
	})
	return false;
    }
    return true;
}



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
//req.body.username,req.body.firstName,req.body.lastName,req.body.securityAnswer,req.body.securityQuestion, and req.body.password must be set
exports.signup = function(req, res, next) {
    if(req.user){
	req.logout();
    }
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    if (!req.user) {
	// Create a new 'User' model instance
	var user = new User(req.body);
	var message = null;
	if(typeof req.body.signupCode ==="undefined"){
	    res.json({
		error:true,
		loggedIn:false,
		message:"You must have a signup Code"
	    })
	    return;
	}
	//check the provided class and make sure it is valid
	clss.findOne({_id:req.body.signupCode},function(err,cls){
	    if(err){
		res.json({
		    error:true,
		    loggedIn:false,
		    message:"You must have a valid signup code"
		})
		return;
	    }
	    else{
		//if the class is not defined
		if(cls==undefined){
		    res.json({
			error:true,
			loggedIn:false,
			message:"You must have a valid signup code"
		    })
		    return;
		}
		//set values for the student
		user.chapters=cls.chapters;
		user.provider = 'local';
		user.administrator=false;
		user.securityQuestion="";
		user.securityAnswer="";
		// Try saving the new user document
		user.save(function(err) {
		    // If an error occurs, send an error message back
		    if (err) {
			var messge=err.errors;
			var mess="";
			if(err.name=="MongoError"){
			    res.json({
				error:true,
				message:"Username already exists",
				loggedIn:false
			    });
			    return;
			}
			//function for parsing errors
			Object.keys(messge).forEach(function(key){
			    mess=mess+messge[key].message+" ";
			})
			res.json({
			    error:true,
			    message:mess.trim(),
			    loggedIn:false
			});
			return;
		    }
		    else{
			//save the user to the class of the signupcode
			cls.students.push(user._id);
			cls.save(function(err){
			    if(err){
				return next(err);
			    }
			})
				
			// If the user was created successfully use the Passport 'login' method to login
			req.login(user, function(err) {
			    // If a login error occurs move to the next middleware
			    if (err){
				res.json({
				    loggedIn:false,
				    message:"Something went wrong"
				})
				return next(err);
			    }
			    else{		
				// Redirect the user back to the main application page
				res.json({
				    loggedIn:true,
				    user:user
				})
			    }
			});
		    }
		});
	    }
	})
    } 
    else 
    {
	return res.redirect("/");
    }
};

// Create a new controller method that creates new 'admin users' users
//req.body.username,req.body.firstName,req.body.lastName,req.body.securityAnswer,req.body.securityQuestion, and req.body.password must be set
exports.adminSignup = function(req, res, next) {
    if(req.user){
	req.logout();
    }
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    if (!req.user) {
	// Create a new 'User' model instance
	var user = new User(req.body);
	var message = null;
	
	// Set the user provider property
	user.provider = 'local';
	User.find({administrator:true},function(err,users){
	    if(err){
		return next(err);
	    }
	    else{
		//there can only be one administrator
		if(users.length==0){
		    user.administrator=true;
		    user.save(function(err) {
			// If an error occurs, send a message
			if (err) {
			    message=err.errors;
			    var mess="";
			    Object.keys(message).forEach(function(key){
				mess=mess+message[key].message+" ";
			    })

			    res.json({
				error:mess,
				loggedIn:false
			    });
			    return;
			}
			else{
			    // If the user was created successfully use the Passport 'login' method to login
			    req.login(user, function(err) {
				// If a login error occurs move to the next middleware
				if (err){
				    return next(err);
				}
				else{		
				    // Redirect the user back to the main application page
				    res.json({
					loggedIn:true
				    })
				}
			    });
			    
			}
		    })
		}
		//there was already a teacher account
		else{
		    message="Permission denied, there is already a teacher account";
		    res.json({
			error:message,
			loggedIn:false
		    });
		    return;
		}
	    }
	})
	
			    
    }
    else {
	return res.redirect("/");
    }
};

/*
  Get the recovery question of the administrator account
*/
exports.getRecoveryQ =function(req,res,done){
    //find the admin
	User.findOne({administrator:true},function(err,adminUser){
		if (err){
			return done(err);
		} else {
		    //if the admin doesn't exist
		    if(adminUser==null || adminUser==undefined){
			res.json({
			    error:true,
			    displayMessage:"There is no admin user",
			    displayType:"warningMessage"
			})
			return;
		    }
		    //send the recovery question
		    else{
			res.json({question:adminUser.securityQuestion});
		    }
		}
	});

}
/*
  Function that changes the admin password if they get the security answer correct
  req.body.recoverAnswer and req.body.newPassword must be set
*/
exports.recoverTeachPass = function(req,res,done){
    User.findOne({administrator:true},function(err,adminUser){
	if (err){
	    return done(err);
	} else {
	    //if they answered the correct security answer change their password
	    if(adminUser.securityAnswer==adminUser.hashAnswer(req.body.recoverAnswer)){
		adminUser.password = req.body.newPassword;
		adminUser.passwordChange=true;
		adminUser.save(function(err){
		    //if an error occurs send it
		    if(err){
			var messge=err.errors;
			var mess="";
			if(err.name=="MongoError"){
			    res.json({
				error:true,
				displayMessage:"A password is required",
				displayType:"warningMessage"
			    });
			    return done(err);
			}
			Object.keys(messge).forEach(function(key){
			    mess=mess+messge[key].message+" ";
			})
			res.json({
			    error:true,
			    displayMessage:mess.trim(),
			    displayType:"warningMessage"
			});
			return done(err);
		    } else {
			//send that the password was successfully changed
			//displayType is a css class in ../../client/css/index.css
			res.json({displayMessage:"Password was changed",displayType:"confirmMessage"})
		    }
		
});
	    }
	    else{
		//send a message if they got the answer incorrect
		res.json({
		    error:true,
		    displayMessage:"The answer was incorrect",
		    displayType:"warningMessage"
		});

	    }
	}
    });
}

/*
  Resets a student password to latin1234
  administrator should be signed in
  req.params.studentId needs to be set
*/
exports.resetStudentPassword = function(req,res,done){
    //if the user is not admin stop
    if(!(validateUser(req.user,res))){
	return;
    }
    //find the student 
    User.findOne({_id:req.params.studentId},function(err,student){
	if (err){
	    return done(err);
	} else {
	    //set the password
            student.password="latin1234";
	    //set the password to be hashed
            student.passwordChange=true;
            student.save(function(err){
		if(err){
                    return done(err);
		} else {
                    res.json({student:student})
		}
		
            })
	}
    });
}

/*
  Change the teacher password 
  req.body should have an oldPassword and a newPassword
*/
exports.changeTeachPass = function(req,res,done){
     User.findOne({administrator:true},function(err,adminUser){
	if (err){
	    return done(err);
	} else 
	 {  
	     //if they got the password correct
             if(adminUser.password == adminUser.hashPassword(req.body.oldPassword)){
		 adminUser.password=req.body.newPassword;
		 adminUser.passwordChange=true;
		 //save the change
		 adminUser.save(function(err){
		     //if an error occurs send the error
		     if(err){
			 var messge=err.errors;
			 var mess="";

			 if(err.name=="MongoError"){
			     res.json({
				 error:true,
				 displayMessage:"A password is required",
				 displayType:"warningMessage"
			     });
			     return done(err);
			 }
			 Object.keys(messge).forEach(function(key){
			     mess=mess+messge[key].message+" ";
			 })
			 res.json({
			     error:true,
			     displayMessage:mess.trim(),
			    displayType:"warningMessage"
			 });
			 return done(err);
		     }    
		     //if success
		     else 
		     {
			 res.json({displayMessage:"Password was changed",displayType:"confirmMessage"})
		     }       
                 });
             } 
	     else 
	     {
		 //if the user did not enter in the correct password
		 res.json({displayMessage:"Enter in correct old password",displayType:"warningMessage"})
             }
	     
	     
	     
	 }
     });
}

// Create a new controller method for signing out
exports.signout = function(req, res) {
    req.logout();
    res.json({
	loggedIn:false
    })
};
//controller for deleting a student in general and from their class
//req.params should have req.params.classId and req.params.studentId
exports.deleteStudent = function(req,res,done){
    if(!(validateUser(req.user,res))){
	return;
    }
    //find the class
    clss.findOne({_id:req.params.classId},function(err,cls){
	if(err){
	    return done(err);
	}
	else{
	    //find the student
	    var st=cls.students.find(function(stud){
		return stud==req.params.studentId;
	    });
	    //if the student didn't exist
	    if(typeof st=="undefined"){
		res.json({
		    error:true,
		    message:"This student does not exist"
		});
		return;
	    }
	    var i=cls.students.indexOf(st);
	    cls.students.splice(i,1);
	    //delete student from class
	    cls.save(function(err){
		if(err){
		    return done(err);
		}
		else{
		    //delete student from users
		    User.remove({_id:req.params.studentId},function(err){
			if (err){
			    return done(err);
			} 
			else{
			    res.json({
				error:false,
				message:"The student was deleted"
			})
			}
		    })
		}
	    })

	}
    })
    
}
/*
  Gets the information for the student dashboard
  req.user needs to be signed in
*/
exports.getUserInfo = function(req,res,done){
    //if they are not signed in
    if(req.user==undefined){
	res.json({
	    error:true,
	    message:"You did not sign in"
	})
	return;
    }    
    //if they are an admin
    if(req.user.administrator){
	res.json({
	    error:true,
	    message:"You did not sign in"
	})
	return;
    }
    var callback=function(req,done){
	//find the user and send the info
	User.findOne({administrator:false,_id:req.user._id},function(err,usr){
	    if(err){
		return done(err);
	    }
	    else{
		var nextHw=getNextHw(usr);
		var chaps=sanatizeStudentAnswers(usr.chapters);
		res.json({
		    chapters:chaps,
		    nextHomework:nextHw,
		    student:{
			firstName:usr.firstName,
			lastName:usr.lastName
		    }
		});
	    }
	})
    }
    updateStudents(req,done,callback);

}
/*
  Controller for changing student password
  req.user needs to be signed in
  req.body.oldPassword and req.body.newPassword must be set
*/
exports.changePassword = function(req,res,next){
    //if they are not signed in
    if(req.user==undefined){
	res.json({
	    error:true,
	    message:"You did not sign in"
	})
	return;
    }    
    //if they are an admin
    if(req.user.administrator){
	res.json({
	    error:true,
	    message:"You did not sign in"
	})
	return;
    }
    User.findOne({_id:req.user._id},function(err,usr){
	if(err){
	    return done(err);
	}
	else{
	    //user had to get password correct
	    if(usr.password==usr.hashPassword(req.body.oldPassword)){
		usr.passwordChange=true;
		usr.password=req.body.newPassword;
		//save the password
		usr.save(function(err){
		    //if there was an error
		    if(err){
			var messge=err.errors;
			var mess="";
			if(err.name=="MongoError"){
			    res.json({
				error:true,
				displayMessage:"Password needs to be entered",
				displayType:"warningMessage",
			    });
			    return;
			}
			Object.keys(messge).forEach(function(key){
			    mess=mess+messge[key].message+" ";
			})
			res.json({
			    error:true,
			    displayMessage:mess.trim(),
			    displayType:"warningMessage",
			});
			return next(err);
		    }
		    //password was changed successfully
		    else{
			res.json({
			    error:false,
			    displayType:"confirmMessage",
			    displayMessage:"Password was change successfully"
			})
		    }
		})
	    }
	    //password was incorrect
	    else{
		res.json({
		    error:true,
		    displayType:"warningMessage",
		    displayMessage:"Password was incorrect"
		})
	    }
	}
    })
}
/*
  Getter that gets the data for a homework for the user to take it
  req.user must be signed in
  req.params.homeworkId must be set
*/
exports.takeHomeworkData=function(req,res,done){
    if(req.user==undefined){
	res.json({
	    error:true,
	    message:"You are not signed in"
	})
	return;
    }
    if(req.user.administrator){
	res.json({
	    error:true,
	    message:"You are not a student"
	})
	return;
    }

    var callback=function(req,done){
	User.findOne({administrator:false,_id:req.user._id},function(err,usr){
	    if(err){
		return done(err);
	    }
	    var parse;
	    var homeworkToReturn;
	    var chaps=req.user.chapters;
	    //get rid of answers
	    chaps=sanatizeStudentAnswers(chaps);
	    //find the homework
	    chaps.forEach(function(ch){
		parse=ch.homework.find(function(hw){
		    return hw._id==req.params.homeworkId;
		})
		if(parse!=undefined){
		    homeworkToReturn=parse;
		}
	    })
	    //send questions
	    res.json({
		hw:homeworkToReturn,
		error:false
	    })
	    //save start time
	    usr.chapters.forEach(function(ch){
		var k=ch.homework.find(function(hw){
		    return hw._id==req.params.homeworkId;
		})
		if(k!=undefined){
		    k.startDate=new Date();
		}
	    })
	    usr.save(function(err){
		if(err){
		    return done(err);
		}
	    })

	})
    }
    updateStudents(req,done,callback);

}
/*
  Controller for submitting a homework
  req.user must be signed in
  req.body.HW must be set 
*/
exports.submitHomework=function(req,res,done){
    if(req.user==undefined){
	res.json({
	    error:true,
	    message:"You are not signed in"
	})
	return;
    }
    if(req.user.administrator){
	res.json({
	    error:true,
	    message:"You are not a student"
	})
	return;
    }

    if(req.body.HW.questions==undefined){
	res.json({
	    error:true,
	    message:"You are not signed in"
	})
	return;
    }
    //find the user
    User.findOne({administrator:false,_id:req.user._id},function(err,usr){
	if(err){
	    return done(err);
	}
	//if no user
	if(usr==undefined || usr.chapters.length==0){
	    res.json({
		error:true,
		message:"Error has occurred"
	    })
	    return;
	}
	//server side homework copy
	var homework;
	usr.chapters.forEach(function(ch){
	    var choice=ch.homework.find(function(hw){
		return hw._id==req.body.HW._id;
	    })
	    if(choice!=undefined){
		homework=choice;
	    }
	})
	try{
	    //if the homework was to be completed
	    if(homework.status==statuses.toBeCompleted){
		req.body.HW.questions.forEach(function(question){
		    //bad variable name, correctQuest is just parsing through all questions
		    var correctQuest=homework.questions.find(function(quest){
			return quest._id==question._id;
		    })
		    //if the type is multiple answer save response to userAnswers
		    if(correctQuest.qType=="ma"){
			correctQuest.userAnswers=question.response;
		    }
		    //else save it to userAnswer
		    else{
			correctQuest.userAnswer=question.response;
		    }
		    //if the user flagged it, flag it
		    correctQuest.flag=question.flag;
		    correctQuest.modified=false;
		})
		//set the end time of the quiz
		homework.endDate=new Date();
		//calculate time to take
		if(homework.startDate!=undefined){
		    homework.timeToComplete=millisToMinutesAndSeconds(homework.endDate.getTime()-homework.startDate.getTime());
		}
		//save the homework
		usr.save(function(err){
		    if(err){
			return done(err);
		    }
		    //update right or wrong
		    updateHws(done);
		    res.json({
			error:false,
			homework:homework
		    })
		})
	    }
	}
	catch(err){
	    return done(err)
	}	
    })
}
/*
  Get the results of a homework
  req.user must be signed in
  req.params.homeworkId must be set
*/
exports.getResults=function(req,res,done){
    if(req.user==undefined){
	res.json({
	    error:true,
	    message:"You are not signed in"
	})
	return;
    }
    var callback=function(req,done){
	//find the user
	User.findOne({administrator:false,_id:req.user._id},function(err,usr){
	    if(err){
		return done(err);
	    }
	    var returner="";
	    //find the homework
	    usr.chapters.forEach(function(ch){
		var choice=ch.homework.find(function(hw){
		    return hw._id==req.params.homeworkId;
		})
		if(choice!=undefined){
		    returner=choice;
		}
	    })
	    //parse through and check if a question was modified
	    returner.questions.forEach(function(quest){
		if(quest.modified){
		    quest.prompt=quest.prompt+" ***THIS QUESTION HAS BEEN MODIFIED*** ";
		}
	    })
	    //check to see if someone is trying to steal answers
	    if(!(returner.status==statuses.toBeCompleted)){
		res.json({
		    results:returner,
		    error:false
		})
	    }
	    else{
		res.json({
		    results:"Nice try",
		    error:true
		})
	    }
	})
    }
    updateStudents(req,done,callback);
}
/*
  Send a blank copy of the homework
  req.user must be signed in
  req.params.homeworkId must be set
*/
exports.blankCopy=function(req,res,done){
    if(req.user==undefined){
	res.json({
	    error:true,
	    message:"You are not signed in"
	})
	return;
    }
    //find the clss
    clss.findOne({_id:req.user.signupCode},function(err,cls){
	var response;
	try{
	    //find the homework
	    cls.chapters.forEach(function(ch){
		var choice;
		choice=ch.homework.find(function(hw){
		    return req.params.homeworkId==hw._id;
		})
		if(choice!=undefined){
		    response=choice;
		}
	    })
	    //send the homework
	    res.json({
		blankCopy:response
	    })
	}
	catch(err){
	    console.log(err);
	}
    });
}
