// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {

    //route for a student to create an account
    app.route('/signup')
	.post(users.signup);

    //route for a teacher to create the admin account
    app.route('/teacherSignup')
	.post(users.adminSignup);

    //logout of passport
    app.route('/logout')
	.post(users.signout);

    //get the recovery question for the admin
    app.route("/recoveryQuestion")
	.get(users.getRecoveryQ);

    //change the admin password
    app.route("/changeTeacherPassword")
	.post(users.changeTeachPass);

    //change the student password
    app.route("/changePassword")
	.post(users.changePassword);

    //change the teacher password when answering the security answer
    app.route("/recoverTeacherPassword")
	.post(users.recoverTeachPass);
    
    //resets a student's password to latin1234
    app.route("/resetStudent/:studentId")
	.post(users.resetStudentPassword);

    //deletes a student from a class and in general
    app.route("/deleteStudent/:classId/:studentId")
	.post(users.deleteStudent);

    //log in for the student
    app.route("/studentLogin")
       .post(passport.authenticate("local",{
	   failureRedirect:"/"}),
	     function(req,res){
		 res.json({
		     loggedIn:true,
		     thePath:"studentDashboard"
		 })
	     });
    //log in for the teacher
    app.route("/teacherLogin")
       .post(passport.authenticate("local"),
	     function(req,res){
		 res.json({
		     loggedIn:true,
		     thePath:"teacherDashboard"
		 })
	     });
    //gets the information for the student dashboard
    app.route("/studentDashboardInformation")
	.get(users.getUserInfo);

    //student starts a quiz by getting the information
    app.route("/quiz/:homeworkId")
	.get(users.takeHomeworkData);

    //student sees the results of taking a quiz
    app.route("/homeworkResults/:homeworkId")
	.get(users.getResults);

    //user submits answers for a homework
    app.route("/newStudentHomework/")
        .post(users.submitHomework);

    //get a blank copy of a homework
    app.route("/blankCopy/:homeworkId")
        .get(users.blankCopy);
    /*
    app.route("/teacherLogin")
       .post(passport.authenticate("local"),
	     function(req,res,info){
		 res.json({
		     loggedIn:true,
		     thePath:"teacherDashboard"
		 })
	     });
    */

};

	     

