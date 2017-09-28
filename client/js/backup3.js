(function () {


    angular.module("latinQuiz", ['ngRoute']);
    var statuses={
	"toBeCompleted":"toBeCompleted",
	"Complete":"Complete",
	"didNotComplete":"didNotComplete"
    };
    var questionStatus={
        "missing":"missing",
        "modified":"modified",
        "correct":"correct",
        "wrong":"wrong"
    }
    
    var homeworkSanatize=function(hw){
	hw.questions.forEach(function(quest){
	    quest.type=quest.qType;
	    if(quest.type=="ma"){
		quest.answer=quest.answers;
	    }
	})
    }

    /*
      service for sending messages to the server
      All communication is done through here
      All inputs are shown in the functions
     */
    var latinQuizModel = function ($http) {
	//function for logging in to the application
        var login = function (username, password) {
            var student = {
                "username": username,
                "password": password
            }
            return $http.post("/studentLogin", student)
        }
	//get information for student dashboard information
	//returns an array of information for the students
	//see studentDashboardData in test.js
        var  getStudentInfo= function () 
	{
            return $http.get("/studentDashboardInformation");
        }
	//function for creating a class
	//name is a string for the name of the class
	//structure is the id for an old class to import the structure of a past class
	//no return
        var makeClass = function (name, structure) {
            var newClass = {
                "name": name,
                "structure": structure
            }
            return $http.post("/createClass", newClass)

        }
	//same as login except for teacher
        var teacherLogin = function (username, password) {
            var teacher = {
                "username": username,
                "password": password
            }
            return $http.post("/teacherLogin", teacher)
        }
	//function for deleting a class
	//cclassId is id for the class
        var deleteClass = function (cclassId) {
            return $http.post("/deleteClass/" + cclassId);
        }
	//set whether a class should be hidden
	//cclass id should be an id for a class
        var hideClass = function (cclassId) {
            return $http.post("/hideClass/" + cclassId);
        }
	//function for renaming a class
	//cclass is a class that has the id for the class
	//cclass.name is the name for the new class
        var renameClass = function (cclass) {
            return $http.post("/renameClass/" + cclass._id,{"newName":cclass.name});
        }
	//grabs all of the data for the teacher dashboard
	//see teacherDashboarddata in test.js
        var getData = function () {
            return $http.get("/classes");
        }
	
        var getQuiz = function(hwId){
            return $http.get("/quiz/"+hwId);            
        }
	//creates homework after you make it
        var postNewHomework= function(classId,chapterId,newHw){
	    //add classid and chapterid 
            return $http.post("/newHomework/"+classId +"/"+chapterId,{"newHw":newHw});
        }
	//submits student answers
         var postStudentHomework= function(newHw){
            return $http.post("/newStudentHomework/",newHw);
        }
	
        var getNewCreatedHW = function(hwId){
            return $http.get("/createHW/"+hwId);
        }
	/*
	  Gets the results of a quiz for the student
	  see the postHomeworkData()
	 */
        var getHomeworkResults = function(hwId){
            return $http.get("/homeworkResults/"+hwId);

        }
        var logout = function () {
	    return $http.post("/logout");
        }
	//get for the questionview controller
	//it is for showing all of the different answers for each question
	//for the teacher
	//see hwData in test.js
        var getHw = function (hwName) {
            return $http.get("/hwResults/" + hwName);
        }
	//get for the create class controller
	//see previousClasses in test.js for format
        var getPrevious = function () {
            return $http.get("/previousClasses");
        }
	//gets the data for a class for the teacherClass controller
	//classId is an id for a class
	//see teacherClassData
        var getClass = function (classId) {
            return $http.get("/classData/"+classId);
        }
	//get data for editing a class
	//for the teacherClassEdit controller
	//classId is an id for a class
	//see teacherEditInfo
	var getClassEditInfo=function(classId){
	    return $http.get("/classEditData/"+classId);
	}
	//for the teacherClassEdit page
	//gets all of the student names and id of a class
	//classid is an id for a class
	//see teacherEditInfo
	var getStudentInformation=function(classId){
	    return $http.get("/classStudentData/"+classId);
	}
	//deletes a student from a class
	//classid is an id for a class
	//studentId is an id for a student
	var deleteStudent=function(classId,studentId){
	    return $http.post("/deleteStudent/"+classId+"/"+studentId);
	}


	//deletes a chapter from a class
	//classid is an id for a class
	//studentId is an id for a student
	var deleteChapter=function(classId,chapterId){
	    return $http.post("/deleteChapter/"+classId+"/"+chapterId);
	}

	//adds a chapter to a class
	//classid is an id for a class
	var addChapter=function(classId,chapterName){
	    return $http.post("/addChapter/"+classId,{"chapterName":chapterName});
	}

	//resets the password for a student
	//classId is an id for a class
	//studentId is an id for a student
	var resetStudentPassword=function(studentId){
	    return $http.post("/resetStudent/"+studentId);
	}
	var setDateOfHw=function(classId,hwDataToChange){
	    //requires object with class._id
	    //requires array of objects with 
	    //chapter id
	    //homework id
	    //and new due date
	    return $http.post("/setDate/"+classId,hwDataToChange);
	}
	//controller for viewing all of the students
	//id is the classid
	//studentOverviewData
	var getStudentOverviewInfo=function(classId){
	    return $http.get("/studentOverview/"+classId);
	}
	//controller for student changing their password
	//oldPassword is the student's old password
	//new password is the new password for the student
	//reenter password is to make sure the password was typed in correctly
	var changePassword=function(oldPassword,newPassword,reenterPassword){
	    var passObj={
		"oldPassword":oldPassword,
		"newPassword":newPassword,
		"reenterPassword":reenterPassword
	    }
	    return $http.post("/changePassword",passObj);
	}
	//controller for teacher changing their password
	//oldPassword is the teacher's old password
	//new password is the new password for the teacher
	//reenter password is to make sure the password was typed in correctly
	var changeTeacherPassword=function(oldPassword,newPassword,reenterPassword){
	    var passObj={
		"oldPassword":oldPassword,
		"newPassword":newPassword,
		"reenterPassword":reenterPassword
	    }
	    return $http.post("/changeTeacherPassword",passObj);
	}
	//controller for teacher recovering their password
	//answer is the teacher's answer to the recovery questions
	//new password is the new password for the teacher
	//reenter password is to make sure the password was typed in correctly
	var recoverPassword=function(answer,newPassword,reenterPassword){
	    var passObj={
		"recoverAnswer":answer,
		"newPassword":newPassword,
		"reenterPassword":reenterPassword
	    }
	    //return $http.post("/changeTeacherPassword",{"passObj":passObj});
	    return $http.post("/recoverTeacherPassword",passObj);
	}


	//controller for student signing up to a class
	//username is the login id
	//passwordval is the value for the password
	//signupCode is the code for what class the student is signing up to
	//firstname is the firstname of the student
	//lastname is the lastname of the student
        var signup = function (username, passwordVal,signupCode, firstName, lastName) {
            var signupStudent = {
                "username": username,
                "password": passwordVal,
                "signupCode": signupCode,
                "firstName": firstName,
                "lastName": lastName
            }
            return $http.post("/signup", signupStudent);
        }
	//changes the chapter order for the teacher view
	//classid is the id for the class
	//chapterchanger is a chapter with its index and another variable called indexChange which says how to change the order
	//returns an array, see teacherEditInfo
        var changeChapterOrder = function (classId,chapterChanger){
	/*
	  Order changer must be a chapter with a indexChange item that doesn't match the index
	 */
            return $http.post("/changeChapterOrder/"+classId, {"chapterChanger":chapterChanger});
        }
	//changes the homework order for the teacher view
	//classid is the id for the class
	//homeworkchanger is a homework with its index and another variable called indexChange which says how to change the order
	//returns an array, see teacherEditInfo
        var changeHomeworkOrder = function (classId,chapterId,homeworkChanger){
	/*
	  Order changer must be a chapter with a indexChange item that doesn't match the index
	 */
            return $http.post("/changeHomeworkOrder/"+classId+"/"+chapterId, {"homeworkChanger":homeworkChanger});
        }
	//gets the recovery question for the teacher to recover the password
	//should return a key value pair where the key is question
	var getRecoveryQuestion=function(){
	    return $http.get("/recoveryQuestion");
	}
    var getBlankCopy=function(hwId){
	    return $http.get("/blankCopy/"+hwId);
	}
	//controller for teacher signing up to a class
	//username is the login id
	//passwordval is the value for the password
	//securityQuestion is the question that the teacher needs to answer to recover
	//securityAnswer is the answer to it
        var signupTeacher = function (username,firstName,lastName, passwordVal, repasswordVal,securityAnswer,securityQuestion) {
            var teacher = {
                "username": username,
                "firstName": firstName,
                "lastName": lastName,
                "password": passwordVal,
                "repassword": repasswordVal,
		"securityAnswer":securityAnswer,
		"securityQuestion":securityQuestion
            }
            return $http.post("/teacherSignup", teacher);
        }

        return {
            login: login,
	    logout:logout,
            getHw: getHw,
            postNewHomework:postNewHomework,
            getNewCreatedHW:getNewCreatedHW,
            getHomeworkResults:getHomeworkResults,
            getData: getData,
            hideClass: hideClass,
            deleteClass: deleteClass,
            teacherLogin: teacherLogin,
            signup: signup,
	    getStudentInfo:getStudentInfo,
            deleteClass: deleteClass,
            getPrevious: getPrevious,
            makeClass: makeClass,
            getClass: getClass,
            getQuiz:getQuiz,
            postStudentHomework:postStudentHomework,
            getBlankCopy:getBlankCopy,
	    renameClass:renameClass,
	    resetStudentPassword:resetStudentPassword,
	    deleteStudent:deleteStudent,
	    getClassEditInfo:getClassEditInfo,
	    getStudentInformation:getStudentInformation,
	    setDateOfHw:setDateOfHw,
	    getStudentOverviewInfo:getStudentOverviewInfo,
	    changePassword:changePassword,
	    changeChapterOrder:changeChapterOrder,
	    changeHomeworkOrder:changeHomeworkOrder,
	    changeTeacherPassword:changeTeacherPassword,
	    getRecoveryQuestion:getRecoveryQuestion,
	    recoverPassword:recoverPassword,
	    signupTeacher:signupTeacher,
	    addChapter:addChapter,
	    deleteChapter:deleteChapter
        };
    }
    /*
      Controller for the student to login
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
     */
    var studentLoginController = function ($scope, $location, latinQuizModel) {
        $scope.messageShow = true;
        $scope.username = "";
        $scope.passwordVal = "";
	//go to signup page
        $scope.signupButton = function () {
            $location.path("signup");
        }
	//go to page for changing password
        $scope.changePasswordButton = function () {
            $location.path("changePassword");
        }
	//function for logging in
        $scope.loginButton = function () {
	    //sends values
            latinQuizModel.login($scope.username, $scope.passwordVal).then(function (message) {
                var response = message.data;
		//if logged in go to the dashboard
                if (response.loggedIn == true) {
                    $location.path("studentDashboard");
                } 
		//show the error message
		else {
                    $scope.messageShow = false;
                }
            })
        }
    }
    /*
      Controller for the student to signup
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
     */
    var studentSignupController = function ($scope, $location, latinQuizModel) {
        $scope.username = "";
        $scope.messageShow = true;
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.passwordVal = "";
        $scope.repasswordVal = "";
        $scope.signupCode = "";
	$scope.error="";
	//go back to the login page
        $scope.cancelButton = function () {
            $location.path("/");
        }
	//signup for a class
        $scope.signupButton = function () {
	    console.log("people");
	    if($scope.passwordVal!=$scope.repasswordVal){
		$scope.error="Passwords do not match";
		$scope.messageShow = false;
		return;
	    }
	    else{
            latinQuizModel.signup($scope.username, $scope.passwordVal, $scope.signupCode, $scope.firstName, $scope.lastName).then(function (message) {
                var response = message.data;
		//if valid signup it will go to the dashboard
                if (response.loggedIn == true) {
                    $location.path("studentDashboard");
                } 
		//else show error
		else {
		    console.log(response);
                    $scope.error = response.message;
                    $scope.messageShow = false;
                }
            })
        }
	}
    }
    /*
      Controller for the teacher to login
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
     */
    var teacherLoginController = function ($scope, $location, latinQuizModel) {
        $scope.messageShow = true;
        $scope.username = "";
        $scope.passwordVal = "";
	//login to the application
        $scope.loginButton = function () {
                $scope.messageShow = false;
            latinQuizModel.teacherLogin($scope.username, $scope.passwordVal).then(function (message) {
                var response = message.data;
                $scope.messageShow = false;

		console.log(response);
		//if successful login go to dashboard
                if (response.loggedIn == true) {
                    $location.path("teacherDashboard");
                } 
		//else show error
            })

        }
	//go to the recover password page
	$scope.recoverPasswordButton=function(){
	    $location.path("recoverPassword");
	}
	//go to the change password page
	$scope.changePasswordButton=function(){
	    $location.path("teacherChangePassword");
	}
    }
    /*
      Controller for the teacher dashboard to see each class
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
     */
    var teacherDashboardController = function ($scope, $location, latinQuizModel) {
        $scope.classes = [];
        $scope.hideOldClasses = 2;
	$scope.deleteClassHide=true;
	$scope.classToDelete="";
	//helper function for the page
	//no actual data manage
	$scope.addEditName=function(classes){
	    classes.forEach(function(clss){
		clss.editName=true;
		clss.editWord="Edit Name";
		clss.hideWord="Hide";
		if(clss.oldStatus==1){
		    clss.hideWord="Unhide";
		}
	    })
	}
	//get the data for each class
        latinQuizModel.getData()
            .then(function (message) {
                $scope.classes = message.data.classes;
		$scope.addEditName($scope.classes);
		console.log($scope.classes);
            });

	//go to the login page for loggin out
	//NEED TO ADD HTTP REQUEST
        $scope.logout = function () {
	    console.log(latinQuizModel);
	    latinQuizModel.logout().then(function(message){
		if(!(message.data.loggedIn)){
		    $location.path("teacherLogin");
		}
	    })
	}
        
	//change whether you are showing old classes
	//1 means show
	//2 means hide
        $scope.toggleOld = function () {
	    console.log($scope.hideOldClasses);
            if ($scope.hideOldClasses == 1) {
                $scope.hideOldClasses = 2;
            } else {
                $scope.hideOldClasses = 1;
            }
        }
	//cancel deleting a class
        $scope.cancelDeleteClass = function () {
	    $scope.classToDelete="";
	    $scope.deleteClassHide=true;
	}
	//set a class to be deleted 
	//cclass is the class to attempt to delete
	//will reveal a confirm button
        $scope.tryDeleteClass = function (cclass) {
	    $scope.classToDelete=cclass;
	    $scope.deleteClassHide=false;
	}
	//hides a certain class
	//cclass is the class to hide
	//have to set the data again
        $scope.hideClass = function (cclass) {
	    latinQuizModel.hideClass(cclass._id).then(function (message) {
                $scope.classes = message.data.classes;
		$scope.addEditName($scope.classes);
	    })
        }
	//send a request to delete a class and then reset the data
        $scope.deleteClass = function () {
	    console.log($scope.classToDelete);
	    latinQuizModel.deleteClass($scope.classToDelete._id).then(function (message) {
                $scope.classes = message.data.classes;
		$scope.addEditName($scope.classes);
	    })

	    $scope.classToDelete="";
	    $scope.deleteClassHide=true;
        }
	//rename a class
	//cclass is the class to try to rename
	$scope.renameClass=function(cclass){
	    //rename the class
	    if(!cclass.editName){
		cclass.editName=true;
		console.log(cclass);
		cclass.editWord="Edit Name";
		console.log(cclass.name);
		latinQuizModel.renameClass(cclass).then(function (message) {
                    $scope.classes = message.data.classes;
		    $scope.addEditName($scope.classes);
		})
	    }
	    //make this class available to rename
	    else{
		cclass.editName=false;
		cclass.editWord="Save Name";
		console.log($scope.classes);
	    }	 
	}
	//go to the createClass page
	$scope.createClass=function(){
            $location.path("createClass");
	}
	/*
	//go to the class page page
	$scope.goToClass=function(clss){
            $location.path("/teacherClass/"+clss._id);
	}
	*/

	$scope.goToClass=function(clss){
            $location.path("/teacherClassEdit/"+clss._id);
	}


	console.log($scope.classes);
    }
    /*
      Controller for the teacher to see each question of a homework
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
      routeparams is for identifying which hw to get
     */
    var questionViewController = function ($scope, $location, latinQuizModel, $routeParams) {
	//http request for getting the data
        latinQuizModel.getHw($routeParams.hwId)
            .then(function (message) {
                $scope.hw = message.data.homework;
            });
        $scope.currentIndex = 1;
	//change which question to look at
        $scope.changeIndex = function (index) {
            $scope.currentIndex = index;
        }
	//go to the teacherDashboard 
        $scope.home = function () {
            $location.path("teacherDashboard");
        }
	//go to the teacherLogin page for logging out
        $scope.logout = function () {
            $location.path("teacherLogin");
        }
    }

    /*
      Controller for the student dashboard
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
     */
    var studentDashboardController = function ($scope, $location, latinQuizModel) {
	//http request to get info for student page
	latinQuizModel.getStudentInfo().then(function(message){
	    var response=message.data;
	    $scope.nextHW=response.nextHomework;
	    $scope.chapters=response.chapters;
	    $scope.chapters.forEach(function(element){
		$scope.adjustPic(element);
	    })
	})
	//helper function for deciding which chapter to show
	$scope.showStuff=function(chapter){
	    if(chapter.hide){
		chapter.hide=false;
	    }
	    else{
		chapter.hide=true;
	    }
	    chapter.homework.forEach(function(hw){
		hw.hide=chapter.hide;
            })
	    $scope.adjustPic(chapter);
	}
	//set which pictures to display with each chapter
	$scope.adjustPic=function(chapter){
	    if(chapter.hide){
		chapter.expandIcon="fa-plus";
	    }
	    else{
		chapter.expandIcon="fa-minus";
	    }
	    if(chapter.status==statuses.Complete){
		chapter.completeIcon="fa-check";
	    }
	    if(chapter.status==statuses.toBeCompleted){
		chapter.completeIcon="fa-ellipsis-h";
	    }
	    if(chapter.status==statuses.didNotComplete){
		chapter.completeIcon="fa-times";
	    }
	    chapter.homework.forEach(function(hw){
		if(hw.status==statuses.toBeCompleted){
		    hw.symbol="fa-ellipsis-h";
		}
		if(hw.status==statuses.Complete){
		hw.symbol="fa-check";
		}
		if(hw.status==statuses.didNotComplete){
		    hw.symbol="fa-times";
		}
	    })
	    
	}
	//go to a page to either take a homework or see the results of one
	$scope.goToHomework=function(homework){
	    if(homework.status==statuses.toBeCompleted){
		$location.path("/homework/"+homework._id);
	    }
	    else{
		$location.path("/homeworkResults/"+homework._id);
	    }
	    console.log(homework);
	}
	//go to the student login page
	$scope.goToLogout=function(){
	    $location.path("/");
	}
	//go to the change password page
	$scope.goToChangePassword=function(){
	    $location.path("/changePassword");
	}
    }
    
    var homeworkManagementController=function($scope, $location, latinQuizModel,$routeParams){
        //if the hwId is -1 that means its a blank homework, with no
        //questions imported to it
	//gets the the home work  
	if($routeParams.hwId==-1){
	    $scope.hw={
		name:"",
		dueDate:new Date(),
		endingMessage:"",
		questions:[
		]
	    }
	}
	else{
	    latinQuizModel.getNewCreatedHW($routeParams.hwId).then(function(message){
		$scope.hw=message.data.generatedHomework;
		$scope.t = $scope.hw.questions;//this ensures that the homework is organized by the index in which they appear, so the index goes
		//1,2,3,4 rather than it being a jumbled mess
		$scope.t.sort(function (a, b) {
                    return a.index - b.index;
		});
	    });
        }
    /*if($routeParams.hwId==-1){
	    $scope.hw={
		name:"",
		dueDate:new Date(),
		endingMessage:"",
		questions:[
		]
	    }
	}
	else{//otherwise, the homework does have questions imported to it
	    $scope.hw={
		name:"Homework 1",
		dueDate:new Date(2015,5,5,15),
		endingMessage:"Nice job dude",
		_id:54899564,
		questions:[
		    {
			"prompt":"What is the latin word for why?",
			"type":"fb",
			"answer":"que",
			index:2
		    },
		    {
			"prompt":"What is the term for a type of grammar that describes place?",
			"type":"mc",
			index:1,
			"options":[
			    "preposition",
			    "noun",
			    "verb"
			],
			"answer":"preposition"
		    },
		    {
			index:5,
			"type":"ma",
			"prompt":"Select the fruits",
			"options":[
                            "Turkey",
                            "Chicken",
                            "Apples",
                            "Berries",
                            "Banannas"   
			],
			"answer":[
			    "Apples",
			    "Berries",
			    "Banannas"
			]

                    },
              {   
                  index:3,
                    "type":"tf",//
                    "prompt":"Morgan likes age of empires",
                    "options":[
                        "True",
                        "False"   
                    ],
                    "answer":"True"
              },
            {
                    index:4,
                    "type":"la",
                    "prompt":"What did you do this summer?"
                }
            
		]
	    }
	    
	}
             	

   $scope.t = $scope.hw.questions;//this ensures that the homework is organized by the index in which they appear
        $scope.t.sort(function (a, b) {
  return a.index - b.index;
});*/
        $scope.spliceHere=function(index){
            $scope.hw.questions.splice(index,1);
            for( var i = index;i<$scope.hw.questions.length;i++){
                $scope.hw.questions[i].index -=1;
            }
        }
        $scope.html="";
	$scope.bulkAdd =function(){
	    var prompt;//set this up for each question type
	    var answer;
	    var options;
	    var index = $scope.html.indexOf(">");
	    while (index >=0 ) {
		var newIndex=index+1;
		var ch = $scope.html.charAt(newIndex);
		while((ch == ' ') || (ch == '\t') || (ch == '\n')){
		    //$scope.html.splice(newIndex,1);
		    //simulate splice
		    var firstPart = $scope.html.substring(0,newIndex);
		    var secondPart = $scope.html.substring(newIndex+1,$scope.html.length);
		    $scope.html= firstPart + secondPart;
		    ch = $scope.html.charAt(newIndex);
		    
		}
		index = $scope.html.indexOf(">",index+1);
	    } 
	    var open = $scope.html.indexOf("<");
	    var close = $scope.html.indexOf(">");
            var open2 = $scope.html.indexOf("<");
	    var close2 = $scope.html.indexOf(">");
	    var processedBracket = $scope.html.substring(open+1,close);
	    while (processedBracket.includes("question type")){
		// once it gets the bracket it can determine the question type
		//maybe make sure it has both the question in it as well 
		if(processedBracket.includes("fill in the blank")){
		    
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);
		    //check if it is a prompt tag
		    var openBracket = $scope.html.substring(open+1,close);
		    var closingBracket = $scope.html.substring(open2+1,close2);
		    if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
			prompt=$scope.html.substring(close+1,open2);
			prompt=prompt.trim();
			
		    }
		    //now try and find the answer
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
		    openBracket = $scope.html.substring(open+1,close);
		    closingBracket = $scope.html.substring(open2+1,close2);
		    if (openBracket.includes("answer") && closingBracket.includes("answer")){
			answer=$scope.html.substring(close+1,open2);
			answer=answer.trim();
			
			
		    }
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
		    openBracket = $scope.html.substring(open+1,close);
		    closingBracket = $scope.html.substring(open2+1,close2);
		    //push the question
		    var newQuestion={ 
			"prompt":prompt,
			"type":"fb",
			"answer":answer,
			"index":$scope.hw.questions.length+1
			
		    };
		    $scope.hw.questions.push(newQuestion);
		    
		    if (openBracket=="/question"){
			processedBracket=closingBracket;
			
		    }
		    
		} 
		else if(processedBracket.includes("long answer")){
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);
		    //check if it is a prompt tag
		    var openBracket = $scope.html.substring(open+1,close);
		    var closingBracket = $scope.html.substring(open2+1,close2);
		    if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
			prompt=$scope.html.substring(close+1,open2);
			prompt=prompt.trim();
            
		    }
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
		    openBracket = $scope.html.substring(open+1,close);
		    closingBracket = $scope.html.substring(open2+1,close2);
		    //push the question
		    var newQuestion={
			"prompt":prompt,
			"type":"la",
			"index":$scope.hw.questions.length+1
		    }
		    $scope.hw.questions.push(newQuestion);
		    
		    if (openBracket=="/question"){
			processedBracket=closingBracket;
            
		    }
        
		    
		}
		else if(processedBracket.includes("true false")){
		    
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);
		    //check if it is a prompt tag
		    var openBracket = $scope.html.substring(open+1,close);
		    var closingBracket = $scope.html.substring(open2+1,close2);
		    if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
			prompt=$scope.html.substring(close+1,open2);
			prompt=prompt.trim();
			
		    }
		    //now try and find the answer
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
		    openBracket = $scope.html.substring(open+1,close);
		    closingBracket = $scope.html.substring(open2+1,close2);
		    if (openBracket.includes("answer") && closingBracket.includes("answer")){
			answer=$scope.html.substring(close+1,open2);
			answer=answer.trim();
			if(answer == "true"){
			    answer="True";
			} 
			else if(answer == " false"){
			    answer="False";
			}
			
			
		    }
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
		    openBracket = $scope.html.substring(open+1,close);
		    closingBracket = $scope.html.substring(open2+1,close2);
		    var newQuestion={
			"prompt":prompt,
			"type":"tf",
			"answer":answer,
			"options":[
			    "True","False"
			],
			
			"index":$scope.hw.questions.length+1
		    }
		    $scope.hw.questions.push(newQuestion);        
		    if (openBracket=="/question"){
			processedBracket=closingBracket;
			
		    }
		}
		else if(processedBracket.includes("multiple answer")){
		    options=[];
		    answer=[];
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);
		    //check if it is a prompt tag
		    var openBracket = $scope.html.substring(open+1,close);
		    var closingBracket = $scope.html.substring(open2+1,close2);
		    if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
			prompt=$scope.html.substring(close+1,open2);
			prompt=prompt.trim();
			
		    }
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1)
		    openBracket = $scope.html.substring(open+1,close)
		    
		    if(openBracket.includes("options")){
			open=open2;
			close=close2;
			openBracket = $scope.html.substring(open+1,close);
			open2 = $scope.html.indexOf("<",open+1);
			close2 = $scope.html.indexOf(">",close+1);
			closingBracket = $scope.html.substring(open2+1,close2);
			while(openBracket =="option"){
			    
			    var option=$scope.html.substring(close+1,open2);
			    option=option.trim();
			    options.push(option);
			    open = $scope.html.indexOf("<",open2+1);
			    close = $scope.html.indexOf(">",close2+1);
			    open2 = $scope.html.indexOf("<",open+1);
			    close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
			    openBracket = $scope.html.substring(open+1,close);
			    closingBracket = $scope.html.substring(open2+1,close2);
			}
			//helps set opening bracket eqaual to closing bracket. Another way of moving around the brackets
			open=open2;
			close=close2;
			openBracket = $scope.html.substring(open+1,close);
			open2 = $scope.html.indexOf("<",open+1);
			close2 = $scope.html.indexOf(">",close+1);
			closingBracket = $scope.html.substring(open2+1,close2);
			open=open2;
			close=close2;
			openBracket = $scope.html.substring(open+1,close);
			open2 = $scope.html.indexOf("<",open+1);
			close2 = $scope.html.indexOf(">",close+1);
			closingBracket = $scope.html.substring(open2+1,close2);
			while(openBracket =="answer"){

			    var option=$scope.html.substring(close+1,open2);
			    option=option.trim();
			    answer.push(option);
			    open = $scope.html.indexOf("<",open2+1);
			    close = $scope.html.indexOf(">",close2+1);
			    open2 = $scope.html.indexOf("<",open+1);
			    close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
			    openBracket = $scope.html.substring(open+1,close);
			    closingBracket = $scope.html.substring(open2+1,close2);
			}
			open=open2;
			close=close2;
			openBracket = $scope.html.substring(open+1,close);
			open2 = $scope.html.indexOf("<",open+1);
			close2 = $scope.html.indexOf(">",close+1);
			closingBracket = $scope.html.substring(open2+1,close2);
			
       
			var newQuestion={
			    "prompt":prompt,
			    "type":"ma",
			    "answer":answer,
			    "options":options,
			    "index":$scope.hw.questions.length+1
                
			};   
                        $scope.hw.questions.push(newQuestion);        
			
			if (openBracket=="/question"){
			    processedBracket=closingBracket;
			}
			
			
		    }
		    
		}
		else if(processedBracket.includes("multiple choice")){
		    
		    options=[];
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1);
		    //check if it is a prompt tag
		    var openBracket = $scope.html.substring(open+1,close);
		    var closingBracket = $scope.html.substring(open2+1,close2);
		    if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
			prompt=$scope.html.substring(close+1,open2);
			prompt=prompt.trim();
			
		    }
		    open = $scope.html.indexOf("<",open2+1);
		    close = $scope.html.indexOf(">",close2+1);
		    open2 = $scope.html.indexOf("<",open+1);
		    close2 = $scope.html.indexOf(">",close+1)
		    openBracket = $scope.html.substring(open+1,close)
		    
		    if(openBracket.includes("options")){
			open=open2;
			close=close2;
			openBracket = $scope.html.substring(open+1,close);
			open2 = $scope.html.indexOf("<",open+1);
			close2 = $scope.html.indexOf(">",close+1);
			closingBracket = $scope.html.substring(open2+1,close2);
			while(openBracket =="option"){
			    
			    var option=$scope.html.substring(close+1,open2);
			    
			    option=option.trim();
			    options.push(option);
			    open = $scope.html.indexOf("<",open2+1);
			    close = $scope.html.indexOf(">",close2+1);
			    open2 = $scope.html.indexOf("<",open+1);
			    close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
			    openBracket = $scope.html.substring(open+1,close);
			    closingBracket = $scope.html.substring(open2+1,close2);
			}
			//helps set opening bracket eqaual to closing bracket. Another way of moving around the brackets
			open=open2;
			close=close2;
			openBracket = $scope.html.substring(open+1,close);
			open2 = $scope.html.indexOf("<",open+1);
			close2 = $scope.html.indexOf(">",close+1);
			closingBracket = $scope.html.substring(open2+1,close2);
			if (openBracket.includes("answer") && closingBracket.includes("answer")){
			    answer=$scope.html.substring(close+1,open2);
			    answer=answer.trim();
			    
			    
			}
			open = $scope.html.indexOf("<",open2+1);
			close = $scope.html.indexOf(">",close2+1);
			open2 = $scope.html.indexOf("<",open+1);
			close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
			openBracket = $scope.html.substring(open+1,close);
			closingBracket = $scope.html.substring(open2+1,close2);
			var newQuestion={
			    "prompt":prompt,
			    "type":"mc",
			    "answer":answer,
			    "options":options,
			    "index":$scope.hw.questions.length+1
			    
			};    
                        $scope.hw.questions.push(newQuestion);        
			
			if (openBracket=="/question"){
			    processedBracket=closingBracket;
			}
			
		    }
		}
		
	    }//end of while loop
            $scope.html="";
	}    
        $scope.questionName="";
        $scope.questionType="";
        $scope.optionNumber="";
        $scope.fbAnswer="";
        //variables that are used to generate questions
        $scope.convertInt=function(number){//nice function that helps convert strings into ints
            return parseInt(number)
        }
     $scope.questionArray = [];//the question array is what houses temporary options for the multiple choice and multiple answer questions
        
	//Range function from https://stackoverflow.com/questions/11873570/angularjs-for-loop-with-numbers-ranges
        //it is altered to meet the needs of our application
    // the array is used to generate inputs so that users can select the number of options of a multiple choice or answer and save them
	$scope.homeButton=function(){//takes the teacher home
	    $location.path("teacherDashboard");
	}
	
//helps generate an array for the question array based on the number of options a user has selected,
	//it pushes and splices properly
	$scope.range = function(min, max, step) {
	    step = step || 1;
	    if($scope.questionArray.length < $scope.convertInt($scope.optionNumber)){
		for (var i = $scope.questionArray.length+1; i <= max; i += step) {
		    $scope.addNew();
		}
	    } else if(($scope.questionArray.length > $scope.convertInt($scope.optionNumber))){
		$scope.questionArray.splice($scope.convertInt($scope.optionNumber),$scope.questionArray.length);
	    }
	};
        //pushes blank inputs inside the range function
	$scope.addNew = function() {
	    
	    $scope.questionArray.push({
		option:"",
		chosen:{
		    selected:false
		}})
	}// this resets the array after that a question has been added ensuring that previous options dont appear when adding a new wustion
	$scope.resetArray = function(){
	    $scope.questionArray = [];
	    $scope.optionNumber="";
	}
	//used for multiple choice questions so that only one option is set to selected/true at a time
	$scope.resetValues=function(y){
	    for (i = 0; i < $scope.questionArray.length; i++) { 
		if(i != y){
   		    $scope.questionArray[i].chosen= {
			selected:false
		    }
		}
	    }
	}
	//this is the true false answer that is modeled with radio buttons
	$scope.tfAnswer ="";
        //this variable is used to ensure that if an error is true then a new question can not be created
        $scope.error=false;
        // this creates the question, or rejects it dependant on wat happens
	$scope.createQuestion=function(){
	    var options = [];
     $scope.error=false;//sets the error to false at the start in case of a previous error
	    var newQuestion;
	    var answer;
	    
	    // the next series of if statements prime the question that is to be added based on its type
	    
            if($scope.questionType=="fillInBlank"){
		
		newQuestion={ 
                    "prompt":$scope.questionName,
			"type":"fb",
		    "answer":$scope.fbAnswer,
		    "index":$scope.hw.questions.length+1
                    
		};
            } else if ($scope.questionType=="multipleChoice"){
		answer="";
		//this loops goes through and pushes all options in question index to the options for the created questions
		//if the given option is selected then it sets that to the answer
		for (var i = 0; i <$scope.questionArray.length; i++){
                    options.push($scope.questionArray[i].option)
                    if(Boolean($scope.questionArray[i].chosen.selected)){
                                    
			answer=$scope.questionArray[i].option
			
                    }
		}
		newQuestion={
                    "prompt":$scope.questionName,
		    "type":"mc",
		    "answer":answer,
		    "options":options,
		    "index":$scope.hw.questions.length+1
                    
		};
		
            } else if ($scope.questionType=="multipleAnswer"){
		answer=[];
		//similar strucute to mulitple choice but now pushes answers to an array
		for (var i = 0; i <$scope.questionArray.length; i++){
                    options.push($scope.questionArray[i].option)
                    if(Boolean($scope.questionArray[i].chosen.selected)){
			
			answer.push($scope.questionArray[i].option)
			
                    }
		}
		newQuestion={
                    "prompt":$scope.questionName,
		    "type":"ma",
		    "answer":answer,
		    "options":options,
		    "index":$scope.hw.questions.length+1
                    
		};
        
            } else if ($scope.questionType=="trueFalse"){
		var options = ["True","False"];
		var answer=$scope.tfAnswer;
		
            newQuestion={
                "prompt":$scope.questionName,
			"type":"tf",
			"answer":answer,
            "options":options,
			"index":$scope.hw.questions.length+1
                
            };
            
        }
    else if ($scope.questionType=="longAnswer"){

           
            newQuestion={
                "prompt":$scope.questionName,
			"type":"la",
			"index":$scope.hw.questions.length+1
                
            };
    //this ends the priming of new questions
        
    // the next series of statements check to see if critical parts of the question are missing, such as prompts answers or questions so 
    }
    if($scope.questionName=="" || $scope.questionType==""){
        $scope.error=true;
        
    }
    if($scope.questionType =="fillInBlank" && $scope.fbAnswer==""){
       $scope.error=true;
       }
    if($scope.questionType == "trueFalse" && $scope.tfAnswer==""){
        $scope.error=true;
    }
    if ($scope.questionType =="multipleChoice" || $scope.questionType =="multipleAnswer"){
       
        for (var i = 0; i <$scope.questionArray.length; i++){
            if($scope.questionArray[i].option==""){
                $scope.error=true;
            }
            
            if ($scope.questionType =="multipleChoice" && answer==""){
                $scope.error=true;
            }
            if ($scope.questionType =="multipleAnswer" && answer.length==0){
                $scope.error=true;
            }
        }

        
        
    }
    //if the error is false, the new question gets pushed and everything else gets reset so that the everything will be blank when
    //adding in a new question
    if($scope.error==false){
    $scope.hw.questions.push(newQuestion);
       $scope.questionArray=[];
        $scope.resetArray();
        $scope.questionName="";
        $scope.tfAnswer="";
        $scope.fbAnswer="";
        $scope.questionType="";
        $scope.optionNumber="";
    }
    }    
   //this function alters the answer if a user edits the text input box for a multiple choice
    $scope.alterAnswer = function(question, qIndex){

        if(question.type == "mc"){
            if(question.options.includes(question.answer)){
                console.log("Answer was not altered");
            } else{
                question.answer=question.options[qIndex];
                console.log("Answer was altered");

            }
            
        } 
        
        
    }//both tf and mc use this function to alter the answer if a user changes the radio buttons when selected in an answer
    $scope.radioAlterAnswer=function(question, qIndex){
        if(question.answer==question.options[qIndex]){
            console.log("answer not alterd")
        } else {
            console.log("ans was altered")
            question.answer = question.options[qIndex];
        }
        
    }//similar to the last function but alters the answers of multiple answer questions
$scope.checkAlterAnswer=function(question, optionIndex){
    if(question.answer.includes(question.options[optionIndex])){//if you uncheck an answer
        var answerIndex= question.answer.indexOf(question.options[optionIndex]);
        question.answer.splice(answerIndex,1);
    } else {//if you check an answer
        question.answer.push(question.options[optionIndex]);
    }
}

$scope.currentQuestionIndex=-1;
$scope.currentOption =-1;
$scope.setIndex = function(index1,index2){//used by the $WATCH function
    $scope.currentQuestionIndex=index1;
    $scope.currentOption=index2;
}

//this functions swaps the index of questions in queue format

$scope.indexChanged = function(newVal,oldVal){
    var largerIndex;
    var smallerIndex;
    var difference;
    if(newVal.index > oldVal){
       largerIndex=newVal.index-1;
        smallerIndex=oldVal-1;
       } else {
        largerIndex=oldVal-1;
        smallerIndex=newVal.index-1;
       }
    difference=largerIndex-smallerIndex;
    
    var transition = $scope.hw.questions[largerIndex];
    for(i=largerIndex;i>smallerIndex;i--){
        $scope.hw.questions[i]=$scope.hw.questions[i-1];
        $scope.hw.questions[i].index=i+1;
    }
    $scope.hw.questions[smallerIndex]=transition;
    $scope.hw.questions[smallerIndex].index=smallerIndex+1;
    console.log("swapped");




}
	$scope.messageError=true;
	$scope.errorMessage="";
//these buttons are fairly straight forward, they just help adjust the location path
$scope.logoutButton=function(){
	   $location.path("/teacherLogin");
       }
$scope.save =function(){
        latinQuizModel.postNewHomework($routeParams.classId,$routeParams.chapterId,$scope.hw).then(function(message){
	    if(message.data.messageError==true){
		$scope.messageError=false;		
		$scope.errorMessage=message.data.errorMessage;
	    }
	    else{
                $location.path("/teacherClass/"+$routeParams.classId);
	    }

        })

}
$scope.cancel=function(){
    var leave = confirm("Are you sure you want to leave?");
    if (leave == true) {
            $location.path("teacherDashboard");
    }
    
}
    //this perhaps the most complex function, as it changes the answer for a multple answer questions if a user types something in the input box
// basically sees if a change occurs between two questions, an old and new value, if the value was changed and it was an answer, the answer also gets updated to become a new vale
     $scope.$watch('hw.questions',function(newVal,oldVal){
         
         if($scope.currentQuestionIndex != -1 && $scope.currentOption !=-1){
            if(newVal[$scope.currentQuestionIndex].options[$scope.currentOption] != oldVal[$scope.currentQuestionIndex].options[$scope.currentOption]){
            if(oldVal[$scope.currentQuestionIndex].answer.includes(oldVal[$scope.currentQuestionIndex].options[$scope.currentOption])){
                var answerIndex = newVal[$scope.currentQuestionIndex].answer.indexOf(oldVal[$scope.currentQuestionIndex].options[$scope.currentOption]);
                newVal[$scope.currentQuestionIndex].answer[answerIndex]=newVal[$scope.currentQuestionIndex].options[$scope.currentOption];
                //checks to see if the oldvalue was in the answers, if it is then the old answer gets updated with the new one
            }
            $scope.currentQuestionIndex=-1;
                $scope.currentOption =-1;
          
     } 
         
         
         } 
     if($scope.t != undefined){
             $scope.t.sort(function (a, b) {
  return a.index - b.index;
});
     }
        $scope.questionName="";
        $scope.questionType="";
        $scope.optionNumber="";
        $scope.fbAnswer="";
        $scope.convertInt=function(number){
            return parseInt(number)
        }
     
     },true)
    
    }//end of controller

    /*
      Controller for the teacher to create a class
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
      routeparams is for identifying which hw to get
    */
    var createClassController = function ($scope, $location, latinQuizModel) {
        $scope.name = "";
	//get all of the previous classes
        latinQuizModel.getPrevious().then(function (message) {
            $scope.previousClasses = message.data.classes;
        });
        $scope.errorMessage = "";
        $scope.errorPresent=true;
        $scope.selectedClass = "";
	//go back to the teacherDashboard
        $scope.cancel = function () {
            $location.path("teacherDashboard");
            $scope.errorPresent = true;
        }
	//send the http message to create the class to be created
        $scope.save = function () {
            latinQuizModel.makeClass($scope.name, $scope.selectedClass).then(function (message) {
		console.log('data');
		console.log(message.data);
		console.log('data');
                if (message.data.messageError == true)  {
                    $scope.errorMessage = message.data.errorMessage;
                    $scope.errorPresent=false;
                } else{
		    $location.path("teacherDashboard");
		    $scope.errorPresent = true;}
            })
        }
    }
    //this controller is for the blank copy view
    var blankCopyController = function($scope,$location,latinQuizModel,$routeParams){
        
        latinQuizModel.getBlankCopy($routeParams.hwId).then(function(message){
            
           $scope.hw=message.data.blankCopy; 
            
            
        });
        /*$scope.hw = {
            "name": "HW 3.1",
           _id:123,

            "questions":[  
                {
                    "index":1,
                    "type":"la",
                    "prompt":"What did you do this summer?"
                },
                {   "index":2,
                    "type":"fb",
                    "prompt":"What is the term for a type of grammar that describes place?"
                    
                },
                {   "index":3,
                    "type":"tf",//
                    "prompt":"Morgan likes age of empires",
                    "options":[
                        "True",
                        "False"   
                    ]
               

                    
                },
                {
                "index":4,
                    "type":"mc",
                    "prompt":"What is Morgan's favorite food?",
                    "options":[
                        
                        "Pop Tarts",
				    "Steak",
				    "Yogurt",
				    "Apples"    
                    ]
                    
                },
                {
                "index":5,
                    "type":"ma",
                    "prompt":"Select the fruits",
                    "options":[
                        "Turkey",
                        "Chicken",
                        "Apples",
                        "Berries",
                        "Banannas"   
                    ]
                }  
            ]    
        }*/
               //go back to the student login
        $scope.logout = function () {
            console.log("bye");
            $location.path("/");
        }
	//go back to the student dashboard
        $scope.home = function () {
                        console.log("bye");

            $location.path("studentDashboard");
        }
        $scope.back = function(){
            $location.path("/homeworkResults/"+$scope.hw._id);

        }
        
    }
    var quizViewController = function ($scope, $location, latinQuizModel,$routeParams){
       latinQuizModel.getQuiz($routeParams.hwId).then(function(message){
            $scope.hw= message.data.hw;
        });
       /*$scope.hw = {
            "name": "HW 3.1",
           _id:123,

            "questions":[  
                {
                    "index":1,
                    "type":"la",
                    "prompt":"What did you do this summer?",
                    response:"",
                    flag:false
                },
                {   "index":2,
                    "type":"fb",
                    "prompt":"What is the term for a type of grammar that describes place?"
                    ,
                    response:"",
                    flag:false

                },
                {   "index":3,
                    "type":"tf",//
                    "prompt":"Morgan likes age of empires",
                    "options":[
                        "True",
                        "False"   
                    ]
                 ,
                    response:"",
                    flag:false


                    
                },
                {
                "index":4,
                    "type":"mc",
                    "prompt":"What is Morgan's favorite food?",
                    "options":[
                        
                        "Pop Tarts",
				    "Steak",
				    "Yogurt",
				    "Apples"    
                    ]
                    ,
                    response:"",
                    flag:false

                },
                {
                "index":5,
                    "type":"ma",
                    "prompt":"Select the fruits",
                    "options":[
                        "Turkey",
                        "Chicken",
                        "Apples",
                        "Berries",
                        "Banannas"   
                    ],
                    response:"",
                    flag:false

                }  
            ]    
        }*/
	   

        $scope.submit = function(){
           latinQuizModel.postStudentHomework($scope.hw).then(function(message){
                $location.path("/homeworkResults/"+$scope.hw._id);   
               
           })
              
     
        }
        $scope.flagQuestion = function(index){
            $scope.hw.questions[index].flag=true;
        }
        $scope.setResponse = function(option,index){
            console.log(option);
            console.log(index);
             $scope.hw.questions[index-1].response=option;
        }
        $scope.setResponseMa = function(option,index){
            console.log("hello");
            if ($scope.hw.questions[index-1].response==""){
                $scope.hw.questions[index-1].response=[]
            }
            if($scope.hw.questions[index-1].response.includes(option)){
                var oIndex= $scope.hw.questions[index-1].response.indexOf(option);
                $scope.hw.questions[index-1].response.splice(oIndex,1);
                
            }else{
                $scope.hw.questions[index-1].response.push(option);
            }
        }
    }
    

    /*
      Controller to see the results of a homework
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
      routeparams is for identifying which hw to get
    */
    var homeworkResultsController = function($scope, $location, latinQuizModel,$routeParams){
       latinQuizModel.getHomeworkResults($routeParams.homeworkid).then(function(message){
           $scope.results=message.data.results;           
       });
	//go back to the student login
        $scope.logout = function () {
            $location.path("/");
        }
	//go back to the student dashboard
        $scope.home = function () {
            $location.path("studentDashboard");
        }
       $scope.id = $routeParams.homeworkid;
   }    
    
    /*
      Controller to see a class
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
      routeparams is for identifying which class to get
     */
   var teacherClassController = function($scope, $location, latinQuizModel,$routeParams){
       //###################################################
       //RESPONSES USE THE QUESTION STATUS GLOBAL VARIABLES! //###################################################
       $scope.hideInfo=true;
       //controller for getting a certain class
       latinQuizModel.getClass($routeParams.classId).then(function(message){
	   $scope.class=message.data.classData;
	   console.log($scope.class);
	   $scope.class.chapters.forEach(function(chapter){
	       $scope.showStuff(chapter);
	       $scope.adjustPic(chapter);	   
	   })
       })
       //go to the page for editing this class
       $scope.editClass=function(){
	   $location.path("/teacherClassEdit/"+$routeParams.classId);
       }
       //helper for deciding which chapters to show
       $scope.showStuff=function(chapter){
	   if(chapter.hide){
	       chapter.hide=false;
	   }
	   else{
	       chapter.hide=true;
	   }
	   chapter.homework.forEach(function(hw){
	       hw.hide=chapter.hide;
           })
	   $scope.adjustPic(chapter);
       }
       //set what pictures to show for each chapter to display all of the homeworks or not
       //fa-minus mean homework shows
       //fa-plus means the homeworks are not shown
       $scope.adjustPic=function(chapter){
	   if(chapter.hide){
	       chapter.expandIcon="fa-plus";
	    }
	   else{
	       chapter.expandIcon="fa-minus";
	   }
       }
       //helper function for display
       $scope.range=function(number){
	   var numbers=[];
	   for(var i=0; i<number; i++){
	       numbers.push(i);
	   }
	   return numbers;
       }
       //sets the pictures for the table on the right side of the screen
       $scope.showChapter=function(hw){
	   $scope.hideInfo=false;
	   $scope.displayedHw=hw;
	   $scope.displayedHw.student.forEach(function(student){
	       student.responsePic=[];
	       student.responseText=[];
	       student.response.forEach(function(rspnse){
		   //red x for the student got it wrong
		   if(rspnse=="wrong"){
		       student.responsePic.push({
			   "pic":"fa-times",
			   "text":""
		       });
		   }
		   //black check for the student got it right
		   if(rspnse=="correct"){
		       student.responsePic.push({
			   "pic":"fa-check",
			   "text":""
		       });
		   }
		   //black - for the student did not complete it
		   if(rspnse=="missing"){
		       student.responsePic.push({
			   "pic":"fa-minus",
			   "text":""
		       });
		   }
		   //black QM for the item was modified after the student completed it
		   if(rspnse=="modified"){
		       student.responsePic.push({
			   "pic":"",
			   "text":"QM"
		       });
		   }
	       })
	   })
       }
       
       $scope.goToStudentOverview=function(studentId){
	   $location.path("/studentClassOverview/"+$routeParams.classId+"/"+studentId);
       }
       
       $scope.goToQuestionOverview=function(questionIndex){
	   $location.path("/questionOverview/"+$routeParams.classId+"/"+questionIndex);
       }
       $scope.homeButton=function(){
	   $location.path("/teacherDashboard");
       }
       $scope.logoutButton=function(){
	   $location.path("/teacherLogin");
       }
   }
    /*
      Controller to see each student
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
      routeparams is for identifying which class students to get
     */
    var teacherStudentViewController=function($scope, $location, latinQuizModel,$routeParams){
	//make http request to get data
	latinQuizModel.getStudentOverviewInfo($routeParams.classId).then(function(message){
	    $scope.students=message.data.studentInfo;
	    $scope.students.forEach(function(stud){
		stud.chapters.forEach(function(ch){
		    $scope.showStuff(ch);
		})
	    if($routeParams.studentId==stud._id){
		$scope.selectedStudent=stud;
	    }

	    })
	    $scope.studentDisplayPicChange();
	})
	//helper function for deciding what chapters to show
	$scope.showStuff=function(chapter,beginningStatus){
	    if(chapter.hide){
		chapter.hide=false;
	    }
	    else{
		chapter.hide=true;
	    }
	    if(chapter.status==statuses.Complete){
		chapter.completeIcon="fa-check";
	    }
	    //decide correct or incorrect
	    if(chapter.status==statuses.toBeCompleted){
		chapter.completeIcon="fa-ellipsis-h";
	    }

	    if(chapter.status==statuses.didNotComplete){
		chapter.completeIcon="fa-times";
	    }
	    //display the homeworks according to the chapter
	    chapter.homework.forEach(function(hw){
		hw.hide=chapter.hide;
		$scope.setStatusPic(hw);
            })
	    $scope.adjustPic(chapter);
	}
	//adjust the picture for whether a chapter is being displayed
	$scope.adjustPic=function(chapter){
	    if(chapter.hide){
		chapter.expandIcon="fa-plus";
	    }
	    else{
		chapter.expandIcon="fa-minus";
	    }
	}
	//set status picture for each homework
	$scope.setStatusPic=function(hw){
	    if(hw.status==statuses.Complete){
		hw.statusPic="fa-check";
	    }
	    if(hw.status==statuses.toBeCompleted){
		hw.statusPic="fa-ellipsis-h";
	    }
	    if(hw.status==statuses.didNotComplete){
		hw.statusPic="fa-times";
	    }
	}
	//go back to the teacher dashboard page
       $scope.homeButton=function(){
	   $location.path("/teacherDashboard");
       }
	//go to the login page
       $scope.logoutButton=function(){
	   $location.path("/teacherLogin");
       }

	$scope.studentDisplayPicChange=function(){
	    $scope.students.forEach(function(student){
		//set whether the student is being displayed (the picture)
		if($scope.selectedStudent==student){
		    student.statusIcon="fa-minus"
		}
		else{
		    student.statusIcon="fa-plus"
		}
		//set color for if a student is missing an assignment
		if(student.missing==false){
		    student.color="black";
		}
		else{
		    student.color="red";
		}

	    })
	}
	//change what student is being displayed
	$scope.displayStudent=function(student){
	    if(student!=$scope.selectedStudent){
		$scope.selectedStudent=student;
		$scope.studentDisplayPicChange();
	    }
	}
    }
    /*
      Controller to edit the class
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
      routeparams is for identifying which class to get
     */

   var teacherClassEditController = function($scope, $location, latinQuizModel,$routeParams){
       //http request to get the class information for editing
       latinQuizModel.getClassEditInfo($routeParams.classId).then(function(message){
	   console.log(message.data);
	   $scope.class=message.data.classInfo;
	   $scope.class.chapters.forEach(function(chapter){
	       $scope.showStuff(chapter);
	       $scope.adjustPic(chapter);
	       console.log(chapter.homework);
	       /*
	       if(homework){
		   chapter.homework.forEach(function(hw){
		       homeworkSanatize(hw);
		   })
	       }
	       */
	   })
	   $scope.createIndices($scope.class.chapters);
       })
       //http request to get the information for students to reset password or delete student
       latinQuizModel.getStudentInformation($routeParams.classId).then(function(message){
	   console.log(message.data);
	   $scope.students=message.data.students;
       })

       $scope.hideResetStudent=true;
       $scope.hideDeleteStudent=true;
       $scope.dueDateChange=true;
       $scope.dltHide=true;
       $scope.dueDateToChange=[];
       $scope.newChapterName="";
       //function for saying save the due dates, but will want the user to confirm
       $scope.trySaveDueDate=function(){
	   $scope.dueDateChange=false;
	   $scope.dueDateToChange=[];
	   console.log($scope.class.chapters);
	   //check which dates have been changed and then shows them to user
	   $scope.class.chapters.forEach(function(chapter){
	       chapter.homework.forEach(function(hw){
		   console.log(hw);
		   if(hw.date!=hw.editableDueDate){
		       console.log("if true");
		       $scope.dueDateToChange.push(hw);
		       hw.chapterName=chapter.name;
		       hw.chapter_id=chapter._id;
		   }
	       })
	   })
       }

       //change the edited dates
       $scope.confirmDateChanges=function(){
	   var arrayOfHws=[];
	   $scope.dueDateToChange.forEach(function(hw){
	       var item={
		   "chapterId":hw.chapter_id,
		   "hwId":hw._id,
		   "newDate":hw.editableDueDate
	       };
	       arrayOfHws.push(item);
	   })
	   var httpPostItem={
	       "hwsToChange":arrayOfHws
	   }
	   latinQuizModel.setDateOfHw($routeParams.classId,httpPostItem).then(function(message){
	       $scope.class=message.data.classInfo;	       
	       $scope.class.chapters.forEach(function(chapter){
		   $scope.showStuff(chapter);
		   $scope.adjustPic(chapter);
	       })
	       $scope.dueDateChange=false;
	       $scope.dueDateToChange=[];
	       $scope.createIndices($scope.class.chapters);
	   })
       }
       //go to the page for editing the homework
       $scope.goToHWPage=function(chapter,homework){
	   if(typeof homework =="undefined"){
	       $location.path("/homeworkManagement/"+$routeParams.classId+"/"+chapter._id+"/"+-1);
	   }
	   else{
	       $location.path("/homeworkManagement/"+$routeParams.classId+"/"+chapter._id+"/"+homework._id);
	   }
       }
       //function for changing whether a chapters contents are shown
       $scope.showStuff=function(chapter){
	   if(chapter.hide){
	       chapter.hide=false;
	   }
	   else{
	       chapter.hide=true;
	   }
	   chapter.homework.forEach(function(hw){
	       hw.hide=chapter.hide;
	       hw.editableDueDate=hw.date;
           })
	   $scope.adjustPic(chapter);
       }
       //sets picture for whether chapter is shown or not
       $scope.adjustPic=function(chapter){
	   if(chapter.hide){
	       chapter.expandIcon="fa-plus";
	    }
	   else{
	       chapter.expandIcon="fa-minus";
	   }
       }

       //finish editing go back to regular page
       $scope.finishEdit=function(){       
	   $location.path("/teacherClass/"+$routeParams.classId);
       }

       $scope.homeButton=function(){
	   $location.path("/teacherDashboard");
       }
       $scope.logoutButton=function(){
	   $location.path("/teacherLogin");
       }
       //function for setting what student will be deleted
       //stud is a student
       $scope.tryDeleteStudent=function(stud){
	   $scope.dltStudent=stud;
	   $scope.hideDeleteStudent=false;
	   $scope.hideResetStudent=true;
       }

       //function for setting what student will be deleted
       //stud is a student
       $scope.tryDeleteChapter=function(chapt){
	   $scope.dltChapter=chapt;
	   $scope.dltHide=false;
       }

       //function for setting what student will have their password reset
       //stud is a student
       $scope.tryResetStudentPassword=function(stud){
	   $scope.rstStudent=stud;
	   $scope.hideResetStudent=false;
	   $scope.hideDeleteStudent=true;
       }
       //send an http message to delete a student 
       //have to reset students
       //what student is determined in tryDeleteStudent
       $scope.deleteStudent=function(){
	   console.log($scope.dltStudent);
	   $scope.hideResetStudent=true;
	   $scope.hideDeleteStudent=true;
	   latinQuizModel.deleteStudent($routeParams.classId,$scope.dltStudent._id).then(function(message){
	       //$scope.students=message.data.students;
	       $scope.errorMessageShow=message.data.error;
	   });
	   //http request
       }

       //send an http message to delete a chapter
       //have to reset students
       //what student is determined in tryDeleteChapter
       $scope.deleteChapter=function(){
	   latinQuizModel.deleteChapter($routeParams.classId,$scope.dltChapter._id).then(function(message){
	       $scope.class=message.data.classInfo;
	       $scope.dltHide=true;
	       $scope.dltChapter="";
	       $scope.class.chapters.forEach(function(chapter){
		   $scope.showStuff(chapter);
		   $scope.adjustPic(chapter);
	       })
	       $scope.createIndices($scope.class.chapters);
	   });
       }

       //send an http message to reset a student's password
       //have to reset students
       //what student is determined in tryResetStudentPassword
       $scope.resetStudent=function(){
	   $scope.hideResetStudent=true;
	   $scope.hideDeleteStudent=true;
	   latinQuizModel.resetStudentPassword($scope.rstStudent._id).then(function(message){
	       //$scope.students=message.data.students;
	   });
	   //http request
       }
       //create the index arrays for each chapter
       //for changing the indices
       $scope.createIndices=function(chapters){
	   var dummyArray= [];	   
	   chapters.forEach(function(chapter){
	       chapter.indexChange=chapter.index;
	       dummyArray.push(chapter.indexChange);
	   })
           dummyArray.sort(function (a, b) {
                    return a - b;
                });
	   chapters.forEach(function(chapter){
	       chapter.possibleIndex=dummyArray;
	   })
	   $scope.createHwIndices(chapters);
       }
       //create the index arrays for each homework
       //for changing the indices
       $scope.createHwIndices=function(chapters){
	   var dummyArray= [];
	   var exampleHw;
	   chapters.forEach(function(ch){
	       ch.homework.forEach(function(hw){
		   hw.indexChange=hw.index;
		   dummyArray.push(hw.indexChange);
	       })
               dummyArray.sort(function (a, b) {
                   return a - b;
               });
	       ch.homework.forEach(function(hw){
		   hw.possibleIndex=dummyArray;
	       })
	       dummyArray= [];
	   })
       }

       $scope.addChapter=function(){
	   latinQuizModel.addChapter($routeParams.classId,$scope.newChapterName).then(function(message){
	       console.log(message.data);
	       $scope.class=message.data.classInfo;
	       $scope.class.chapters.forEach(function(chapter){
		   $scope.showStuff(chapter);
		   $scope.adjustPic(chapter);
	       })
	       $scope.createIndices($scope.class.chapters);
	   })
       }
       //sends an http request for the backend to change the order of the chapters
       //chapter is what chapter is going to change the order
       //must have an index and a indexChange
       $scope.changeOptions=function(chapter){
	   latinQuizModel.changeChapterOrder($routeParams.classId,chapter).then(function(message){
	       $scope.class=message.data.classInfo;
	       console.log(message.data);
	       $scope.class.chapters.forEach(function(chapter){
		   $scope.showStuff(chapter);
		   $scope.adjustPic(chapter);
	       })
	       $scope.createIndices($scope.class.chapters);
	   })
       }
       //sends an http request for the backend to change the order of the homeworks of a chapter
       //hw is what chapter is going to change the order
       //must have an index and a indexChange
       $scope.changeHw=function(chapter,hw){
	   latinQuizModel.changeHomeworkOrder($routeParams.classId,chapter._id,hw).then(function(message){
	       $scope.class=message.data.classInfo;
	       console.log(message.data.classInfo);
	       $scope.class.chapters.forEach(function(chapter){
		   $scope.showStuff(chapter);
		   $scope.adjustPic(chapter);
	       })
	       $scope.createIndices($scope.class.chapters);
	   })
       }
   }
    /*
      Controller for the student to change their password
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
     */
    var changePasswordController = function($scope, $location, latinQuizModel,$routeParams){
	$scope.oldPassword="";
	$scope.newPassword="";
	$scope.reenterPassword="";
	$scope.hideMessage=true;
	//sends http request to try and change the password
	$scope.changePassword=function(){
	    latinQuizModel.changePassword($scope.oldPassword,$scope.newPassword,$scope.reenterPassword).then(function(message){
		//show results of trying
		$scope.displayMessage=message.data.displayMessage;
		$scope.messageClass=message.data.displayType;
		$scope.hideMessage=false;
	    })
	}
	//go back to the student dashboard
	$scope.goBack=function(){
	    $location.path("/studentDashboard");
	}
    }
    /*
      Controller for the teacher to change their password
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
     */
    var teacherChangePasswordController = function($scope, $location, latinQuizModel,$routeParams){
	$scope.oldPassword="";
	$scope.newPassword="";
	$scope.reenterPassword="";
	$scope.hideMessage=true;
	//http message for changing the password
	$scope.changePassword=function(){
	    latinQuizModel.changeTeacherPassword($scope.oldPassword,$scope.newPassword,$scope.reenterPassword).then(function(message){
		//display the result
		$scope.displayMessage=message.data.displayMessage;
		$scope.messageClass=message.data.displayType;
		$scope.hideMessage=false;
	    })
	}
	//go back to the teacher login page
	$scope.goBack=function(){
	    $location.path("/teacherLogin");
	}
    }

    /*
      Controller for the teacher to recover their password
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
     */
    var teacherRecoverPasswordController = function($scope, $location, latinQuizModel,$routeParams){
	$scope.recoveryAnswer="";
	$scope.newPassword="";
	$scope.reenterPassword="";
	$scope.hideMessage=true;
	//http message for getting the recovery question
	latinQuizModel.getRecoveryQuestion().then(function(message){
	    $scope.recoverQuestion=message.data.question;
	    $scope.hideMessage=!(message.data.error);
		$scope.displayMessage=message.data.displayMessage;
		$scope.messageClass=message.data.displayType;

	})
	//http message for recovering the teacher password
	$scope.recoverPassword=function(){
	    latinQuizModel.recoverPassword($scope.recoveryAnswer,$scope.newPassword,$scope.reenterPassword).then(function(message){
		console.log(message);
		$scope.displayMessage=message.data.displayMessage;
		$scope.messageClass=message.data.displayType;
		$scope.hideMessage=false;
	    })
	}
	//go back to the teacher login page
	$scope.goBack=function(){
	    $location.path("/teacherLogin");
	}
    }
    /*
      Controller for the teacher to signup
      scope is the scope of the page
      location is where it's entered
      latinQuizModel is the model for requests
      CAN ONLY BE ONE TEACHER ACCOUNT FOR EACH APPLICATION
     */
    var teacherSignupController= function($scope, $location, latinQuizModel,$routeParams){
        $scope.username = "";
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.hideMessage = true;
        $scope.passwordVal = "";
        $scope.repasswordVal = "";
        $scope.securityQuestion = "";
        $scope.securityAnswer = "";
	//creates the account for the teacher
        $scope.createAccountButton = function () {
	    $scope.hideMessage=true;

	    if($scope.passwordVal!=$scope.repasswordVal){
		$scope.hideMessage=false;
		$scope.error="Passwords must be equal to each other";
	    } else if($scope.securityQuestion==""){
		$scope.hideMessage=false;
		$scope.error="There must be a security question";
	    } else if($scope.securityAnswer==""){
		$scope.hideMessage=false;
		$scope.error="There must be a security answer";
	    } else{
		//send http request
		latinQuizModel.signupTeacher($scope.username,$scope.firstName,$scope.lastName, $scope.passwordVal, $scope.repasswordVal,$scope.securityAnswer,$scope.securityQuestion).then(function (message) {
		    console.log(message);
                    var response = message.data;
                    if (response.loggedIn == true) {
			$location.path("teacherDashboard");
                    } else {
			$scope.error = response.error;
			$scope.hideMessage = false;
                    }
		})
	    }
        }
    }
    
    //DELETE THIS PLEASE!?!?!?!?!?!?!
    //to splice, get the index, split froist string to index of it, 2nd split starts at +1 of index
 var bulkAdd= function($scope, $location, latinQuizModel,$routeParams){
 
     	$scope.html="";
  $scope.processString =function(){
      var prompt;//set this up for each question type
     var answer;
     var options;
	var index = $scope.html.indexOf(">");
while (index >=0 ) {
	console.log(index);
    var newIndex=index+1;
    var ch = $scope.html.charAt(newIndex);
while((ch == ' ') || (ch == '\t') || (ch == '\n')){
    //$scope.html.splice(newIndex,1);
    //simulate splice
    var firstPart = $scope.html.substring(0,newIndex);
    var secondPart = $scope.html.substring(newIndex+1,$scope.html.length);
    $scope.html= firstPart + secondPart;
    ch = $scope.html.charAt(newIndex);
    console.log("spliced");

    }
  index = $scope.html.indexOf(">",index+1);
} 
    var open = $scope.html.indexOf("<");
    var close = $scope.html.indexOf(">");
          var open2 = $scope.html.indexOf("<");
    var close2 = $scope.html.indexOf(">");
       var processedBracket = $scope.html.substring(open+1,close);
 while (processedBracket.includes("question type")){
   console.log("in the loop");
    // once it gets the bracket it can determine the question type
     //maybe make sure it has both the question in it as well 
    if(processedBracket.includes("short answer")){
                console.log("short answer");

        open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
         open2 = $scope.html.indexOf("<",open+1);
         close2 = $scope.html.indexOf(">",close+1);
        //check if it is a prompt tag
        var openBracket = $scope.html.substring(open+1,close);
        var closingBracket = $scope.html.substring(open2+1,close2);
        if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
            prompt=$scope.html.substring(close+1,open2);
            prompt=prompt.trim();
            console.log(prompt);
            
        }
        //now try and find the answer
        open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
        open2 = $scope.html.indexOf("<",open+1);
        close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
        openBracket = $scope.html.substring(open+1,close);
        closingBracket = $scope.html.substring(open2+1,close2);
         if (openBracket.includes("answer") && closingBracket.includes("answer")){
            answer=$scope.html.substring(close+1,open2);
            answer=answer.trim();
            console.log(answer);
             
            
        }
            open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
        open2 = $scope.html.indexOf("<",open+1);
        close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
        openBracket = $scope.html.substring(open+1,close);
        closingBracket = $scope.html.substring(open2+1,close2);
        //push the question
        if (openBracket=="/question"){
            processedBracket=closingBracket;
            
        }
        
    } 
        else if(processedBracket.includes("long answer")){
        console.log("long answer");
          open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
         open2 = $scope.html.indexOf("<",open+1);
         close2 = $scope.html.indexOf(">",close+1);
        //check if it is a prompt tag
        var openBracket = $scope.html.substring(open+1,close);
        var closingBracket = $scope.html.substring(open2+1,close2);
        if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
            prompt=$scope.html.substring(close+1,open2);
            prompt=prompt.trim();
            console.log(prompt);
            
        }
        open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
        open2 = $scope.html.indexOf("<",open+1);
        close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
        openBracket = $scope.html.substring(open+1,close);
        closingBracket = $scope.html.substring(open2+1,close2);
        //push the question
        if (openBracket=="/question"){
            processedBracket=closingBracket;
            
        }
        
        
    }
        else if(processedBracket.includes("true false")){
             console.log("true false");

        open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
         open2 = $scope.html.indexOf("<",open+1);
         close2 = $scope.html.indexOf(">",close+1);
        //check if it is a prompt tag
        var openBracket = $scope.html.substring(open+1,close);
        var closingBracket = $scope.html.substring(open2+1,close2);
        if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
            prompt=$scope.html.substring(close+1,open2);
            prompt=prompt.trim();
            console.log(prompt);
            
        }
        //now try and find the answer
        open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
        open2 = $scope.html.indexOf("<",open+1);
        close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
        openBracket = $scope.html.substring(open+1,close);
        closingBracket = $scope.html.substring(open2+1,close2);
         if (openBracket.includes("answer") && closingBracket.includes("answer")){
            answer=$scope.html.substring(close+1,open2);
            answer=answer.trim();
            console.log(answer);
             if(answer == "true"){
                 answer="True";
             } 
             else if(answer == " false"){
                 answer="False";
             }
             
            
        }
            open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
        open2 = $scope.html.indexOf("<",open+1);
        close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
        openBracket = $scope.html.substring(open+1,close);
        closingBracket = $scope.html.substring(open2+1,close2);
        //push the question
        if (openBracket=="/question"){
            processedBracket=closingBracket;
            
        }
    }
        else if(processedBracket.includes("multiple answer")){
             console.log("ma");
            options=[];
            answer=[];
            open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
         open2 = $scope.html.indexOf("<",open+1);
         close2 = $scope.html.indexOf(">",close+1);
        //check if it is a prompt tag
        var openBracket = $scope.html.substring(open+1,close);
        var closingBracket = $scope.html.substring(open2+1,close2);
        if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
            prompt=$scope.html.substring(close+1,open2);
            prompt=prompt.trim();
            console.log(prompt);
            
        }
            open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
         open2 = $scope.html.indexOf("<",open+1);
         close2 = $scope.html.indexOf(">",close+1)
            openBracket = $scope.html.substring(open+1,close)
            
            if(openBracket.includes("options")){
                open=open2;
                close=close2;
                openBracket = $scope.html.substring(open+1,close);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);
                closingBracket = $scope.html.substring(open2+1,close2);
            while(openBracket =="option"){

                var option=$scope.html.substring(close+1,open2);
                console.log("adding option");
                option=option.trim();
                options.push(option);
                open = $scope.html.indexOf("<",open2+1);
                close = $scope.html.indexOf(">",close2+1);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
                openBracket = $scope.html.substring(open+1,close);
                closingBracket = $scope.html.substring(open2+1,close2);
                }
                console.log(options);
                //helps set opening bracket eqaual to closing bracket. Another way of moving around the brackets
                open=open2;
                close=close2;
                openBracket = $scope.html.substring(open+1,close);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);
                closingBracket = $scope.html.substring(open2+1,close2);
                open=open2;
                close=close2;
                openBracket = $scope.html.substring(open+1,close);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);
                closingBracket = $scope.html.substring(open2+1,close2);
                console.log(openBracket,closingBracket);
                 while(openBracket =="answer"){

                var option=$scope.html.substring(close+1,open2);
                console.log("adding answer");
                option=option.trim();
                answer.push(option);
                open = $scope.html.indexOf("<",open2+1);
                close = $scope.html.indexOf(">",close2+1);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
                openBracket = $scope.html.substring(open+1,close);
                closingBracket = $scope.html.substring(open2+1,close2);
                }
                 open=open2;
                close=close2;
                openBracket = $scope.html.substring(open+1,close);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);
                closingBracket = $scope.html.substring(open2+1,close2);
     
        console.log(openBracket);
        console.log(closingBracket);
        //push the question
        if (openBracket=="/question"){
            processedBracket=closingBracket;
        }
         
                
            }
        
    }
        else if(processedBracket.includes("multiple choice")){
            console.log("mc");
            options=[];
            open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
         open2 = $scope.html.indexOf("<",open+1);
         close2 = $scope.html.indexOf(">",close+1);
        //check if it is a prompt tag
        var openBracket = $scope.html.substring(open+1,close);
        var closingBracket = $scope.html.substring(open2+1,close2);
        if (openBracket.includes("prompt") && closingBracket.includes("prompt")){
            prompt=$scope.html.substring(close+1,open2);
            prompt=prompt.trim();
            console.log(prompt);
            
        }
            open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
         open2 = $scope.html.indexOf("<",open+1);
         close2 = $scope.html.indexOf(">",close+1)
            openBracket = $scope.html.substring(open+1,close)
            
            if(openBracket.includes("options")){
                open=open2;
                close=close2;
                openBracket = $scope.html.substring(open+1,close);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);
                closingBracket = $scope.html.substring(open2+1,close2);
            while(openBracket =="option"){

                var option=$scope.html.substring(close+1,open2);
                console.log("adding option");
                option=option.trim();
                options.push(option);
                open = $scope.html.indexOf("<",open2+1);
                close = $scope.html.indexOf(">",close2+1);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
                openBracket = $scope.html.substring(open+1,close);
                closingBracket = $scope.html.substring(open2+1,close2);
                }
                console.log(options);
                //helps set opening bracket eqaual to closing bracket. Another way of moving around the brackets
                open=open2;
                close=close2;
                openBracket = $scope.html.substring(open+1,close);
                open2 = $scope.html.indexOf("<",open+1);
                close2 = $scope.html.indexOf(">",close+1);
                closingBracket = $scope.html.substring(open2+1,close2);
                  if (openBracket.includes("answer") && closingBracket.includes("answer")){
                      answer=$scope.html.substring(close+1,open2);
                    answer=answer.trim();
                        console.log(answer);
             
            
            }
                open = $scope.html.indexOf("<",open2+1);
        close = $scope.html.indexOf(">",close2+1);
        open2 = $scope.html.indexOf("<",open+1);
        close2 = $scope.html.indexOf(">",close+1);//this code just moves the brackets up
        openBracket = $scope.html.substring(open+1,close);
        closingBracket = $scope.html.substring(open2+1,close2);
        //push the question
        if (openBracket=="/question"){
            processedBracket=closingBracket;
        }
                
            }
        }
        
}//end of while loop
  }//end of process string function
 
 }


    //directives
    var multipleChoice = function()
    {
	return {
        scope: {
 question: '=question',
setResponse: '&'
            
        },
	    templateUrl:"directives/multipleChoice.html"
	    };
    } 
    var multipleAnswer = function()
    {
	return {
   scope: {
        question: '=question',
       setResponseMa: '&'
        },
	    templateUrl:"directives/multipleAnswer.html"
	    };
    }
     var trueFalse = function()
    {
	return {
   scope: {
       setResponse: '&',
 question: '=question'    
        },
	    templateUrl:"directives/trueFalse.html"
	    };
    }
    var fillInTheBlank = function()
    {
	return {
	    scope: {
            question: '=question'    
            },
	    templateUrl:"directives/fillInTheBlank.html"
	};
    }
    var longAnswer = function()
    {
	return {
	    scope: {
		question: '=question'    
            },
	    templateUrl:"directives/longAnswer.html"
	};
    }
   //post homework directives
    var postFillInTheBlank = function()
    {
	return {
	    scope: {
            question: '=question'    
            },
	    templateUrl:"directives/postFillInTheBlank.html"
	};
    }
  var postMultipleChoice = function()
    {
	return {
	    scope: {
            question: '=question'    
            },
	    templateUrl:"directives/postMultipleChoice.html"
	};
    }
   var postMultipleAnswer = function()
    {
	return {
	    scope: {
            question: '=question'    
            },
	    templateUrl:"directives/postMultipleAnswer.html"
	};
    }
    var postTrueFalse = function()
    {
	return {
	    scope: {
		question: '=question'    
            },
	    templateUrl:"directives/postTrueFalse.html"
	};
    }
var postLongAnswer = function()
    {
	return {
	    scope: {
		question: '=question'    
            },
	    templateUrl:"directives/postLongAnswer.html"
	};
    }
var blankFillInTheBlank = function()
    {
	return {
	    scope: {
		question: '=question'    
            },
	    templateUrl:"directives/blankFillInTheBlank.html"
	};
    }
var blankLongAnswer = function(){
    	return {
	    scope: {
		question: '=question'    
            },
	    templateUrl:"directives/blankLongAnswer.html"
	};
}
var blankMultipleChoice = function(){
    	return {
	    scope: {
		question: '=question'    
            },
	    templateUrl:"directives/blankMultipleChoice.html"
	};
}
var blankMultipleAnswer = function(){
    	return {
	    scope: {
		question: '=question'    
            },
	    templateUrl:"directives/blankMultipleAnswer.html"
	};
}
var blankTrueFalse = function(){
    	return {
	    scope: {
		question: '=question'    
            },
	    templateUrl:"directives/blankTrueFalse.html"
	};
}

    
    var routingConfig = function ($routeProvider) {
        $routeProvider
	//student login page
            .when("/", {
                templateUrl: "studentLogin.html",
                controller: "studentLoginController"
            })
	//student signup page
	    .when("/signup", {
                templateUrl: "studentSignup.html",
                controller: "studentSignupController"
            })
	//student change password page
	    .when("/changePassword", {
                templateUrl: "changePass.html",
                controller: "changePasswordController"
            })
	//teacher login page
	    .when("/teacherLogin", {
                templateUrl: "teacherLogin.html",
                controller: "teacherLoginController"
            })
	//student dashboard page
	    .when("/studentDashboard", {
                templateUrl: "studentDashboard.html",
                controller: "studentDashboardController"
            })
	//takes you to the quiz/homework view page in which you take
        //the homework and post it
	    .when("/homework/:homeworkid", {
                templateUrl: "quizview.html",
                controller: "homeworkController"
            })
	//homework results page so that students can see results
	    .when("/homeworkResults/:homeworkid", {
                templateUrl: "postquiz.html",
                controller: "homeworkResultsController"
            })
	//page for teacher to see all of the classes
	    .when("/teacherDashboard", {
                templateUrl: "teacherDashboard.html",
                controller: "teacherDashboardController"
            })
	//page for student to take a quiz on
	    .when("/quiz/:hwId", {
                templateUrl: "quizview.html",
                controller: "quizViewController"
            })
	//page for teacher to view all of the questions of a homework and see how the students did
	    .when("/questionView/:hwId", {
                templateUrl: "questionview.html",
                controller: "questionViewController"
            })
	//page for teacher to create a class
	    .when("/createClass", {
                templateUrl: "createclass.html",
                controller: "createClassController"
            })
	//page for teacher to change and edit a homework assignment
	    .when("/homeworkManagement/:classId/:chapterId/:hwId", {
                templateUrl: "homeworkManagement.html",
                controller: "homeworkManagementController"
            })
	//page for teacher to view a class
	    .when("/teacherClass/:classId", {
                templateUrl: "teacherClassSelected.html",
                controller: "teacherClassController"
            })
	//page for teacher to edit a class
	    .when("/teacherClassEdit/:classId", {
                templateUrl: "teacherClassEdit.html",
                controller: "teacherClassEditController"
            })
	//page for teacher to see every student
	    .when("/teacherStudentOverview/:classId/:studentId", {
                templateUrl: "teacherStudentView.html",
                controller: "teacherStudentViewController"
            })
	//page for teacher to change their password
	    .when("/teacherChangePassword", {
                templateUrl: "teacherChangePass.html",
                controller: "teacherChangePasswordController"
            })
	//page for teacher to recover password
	    .when("/recoverPassword", {
                templateUrl: "teacherRecoverPassword.html",
                controller: "teacherRecoverPasswordController"
            })
	//page for teacher to create account
	    .when("/firstAccess", {
                templateUrl: "teacherSignup.html",
                controller: "teacherSignupController"
            })
        .when("/bulkAdd", {
                templateUrl: "bulkAdd.html",
                controller: "bulkAdd"
            })
        .when("/blankCopy/:hwId", {
                templateUrl: "blankCopy.html",
                controller: "blankCopyController"
            })
            .otherwise({
                redirectTo: "/badlink"
            });

    }

    angular.module("latinQuiz")
        .config(['$routeProvider', routingConfig])
        .controller("bulkAdd", bulkAdd)
        .controller("studentLoginController", studentLoginController)
        .controller("studentSignupController", studentSignupController)
        .controller("teacherLoginController", teacherLoginController)
        .controller("teacherDashboardController", teacherDashboardController)
        .controller("studentDashboardController", studentDashboardController)
        .controller("teacherClassEditController",teacherClassEditController)
        .controller("homeworkManagementController",homeworkManagementController)
        .controller("homeworkResultsController",homeworkResultsController)
        .controller("teacherStudentViewController",teacherStudentViewController)
        .controller("changePasswordController",changePasswordController)
        .controller("teacherChangePasswordController",teacherChangePasswordController)
        .controller("teacherRecoverPasswordController",teacherRecoverPasswordController)
        .controller("teacherSignupController",teacherSignupController)
        .controller("questionViewController", questionViewController)
        .controller("createClassController", createClassController)
        .controller("quizViewController",quizViewController)
        .controller("teacherClassController",teacherClassController)
        .controller("blankCopyController",blankCopyController)
        .directive("multipleChoice",multipleChoice)
        .directive("multipleAnswer",multipleAnswer)
        .directive("trueFalse",trueFalse)
        .directive("fillInTheBlank",fillInTheBlank)
        .directive("longAnswer",longAnswer)
        .directive("postMultipleChoice",postMultipleChoice)
        .directive("postMultipleAnswer",postMultipleAnswer)
        .directive("postTrueFalse",postTrueFalse)
        .directive("postFillInTheBlank",postFillInTheBlank)       
        .directive("postLongAnswer",postLongAnswer)
        .directive("blankMultipleChoice",blankMultipleChoice)
        .directive("blankMultipleAnswer",blankMultipleAnswer)
        .directive("blankTrueFalse",blankTrueFalse)
        .directive("blankFillInTheBlank",blankFillInTheBlank)
        .directive("blankLongAnswer",blankLongAnswer)
        .service("latinQuizModel", latinQuizModel);

})();
