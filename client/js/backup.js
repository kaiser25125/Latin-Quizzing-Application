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

    var exampleData = function () {
        return {
            teacherWholeData: {
                "classes": [
                    {
                        "name": "Spring 2017",
                        "_id": "123456789",
                        "student signup code": "abcdef",
                        "active": "true",
                        "students": [
                            {
                                "firstName": "alex",
                                "lastName": "luken",
                                "_id": "stu1",
                                "password": "abc123",
                                "salt": "jack",
                                "homework": [
                                    {
                                        "name": "first vocab",
                                        "_id": "1hw",
                                        "endingMessage": "Congratulations you finished it",
                                        "timestampStart": "2012-04-23T18:25:43.511Z",
                                        "timestampEnd": "2012-04-23T18:28:43.511Z",
                                        "grade": "1/2",
                                        "questions": [
                                            {
                                                "type": "mc",
                                                "prompt": "What is the latin word for you",
                                                "correct": "tu",
                                                "options": [
						    "tu",
						    "eres",
						    "what"
						],
                                                "studentResponse": "tu"
					    },
                                            {
                                                "type": "fb",
                                                "prompt": "What is the term for a type of grammar that describes place",
                                                "correct": "preposition",
                                                "options": [
						],
                                                "studentResponse": "asdf"
					    }
					]
				    },
                                    {
                                        "name": "second vocab",
                                        "_id": "2hw",
                                        "endingMessage": "Congratulations you finished the second assignment",
                                        "timestampStart": "2012-04-24T18:25:43.511Z",
                                        "timestampEnd": "2012-04-24T18:28:43.511Z",
                                        "grade": "1/2",
                                        "questions": [
                                            {
                                                "type": "la",
                                                "prompt": "What are you confused about",
                                                "correct": "",
                                                "options": [
						]
					    },
                                            {
                                                "type": "ma",
                                                "prompt": "What are terms for grammar",
                                                "correct": ["preposition", "noun", "verb"],
                                                "options": [
						    "preposition",
						    "noun",
						    "verb",
						    "alex"
						],
                                                "studentResponse": ["alex"]
					    }
					]
				    }
				]
			    },
                            {
                                "firstName": "tim",
                                "lastName": "Mains",
                                "_id": "stu2",
                                "password": "qwer",
                                "salt": "jack",
                                "homework": [
                                    {
                                        "endingMessage": "Congratulations you finished it",
                                        "timestampStart": "2012-04-24T18:25:43.511Z",
                                        "timestampEnd": "2012-04-24T18:28:43.511Z",
                                        "name": "third vocab",
                                        "grade": "1/2",
                                        "_id": "3hw",
                                        "questions": [
                                            {
                                                "type": "tf",
                                                "prompt": "Alex is amazing at latin",
                                                "correct": "f",
                                                "options": [
						],
                                                "studentResponse": "f"
					    },
                                            {
                                                "type": "fb",
                                                "prompt": "What is the term for a type of grammar that is a thing",
                                                "correct": "noun",
                                                "options": [
						],
                                                "studentResponse": "alex"
					    }
					]
				    },
                                    {
                                        "name": "fourth vocab",
                                        "_id": "4hw",
                                        "endingMessage": "good for you",
                                        "grade": "1/2",
                                        "timestampStart": "2012-04-25T18:25:43.511Z",
                                        "timestampEnd": "2012-04-25T18:28:43.511Z",
                                        "questions": [
                                            {
                                                "type": "la",
                                                "prompt": "What else are you confused about",
                                                "correct": "",
                                                "options": [
						],
                                                "studentResponse": "fudge sickle"
					    },
                                            {
                                                "type": "ma",
                                                "prompt": "What are good adjectives",
                                                "correct": ["fast", "slow"],
                                                "options": [
						    "fast",
						    "slow",
						    "dumb",
						    "stupid"
						],
                                                "studentResponse": ["alex", "slow"]
					    }
					]
				    }
				]
			    }
			],
                        "chapters": [
                            {
                                "name": "section 1",
                                "order": "1",
                                "_id": "ch1",
                                "homework": [
                                    {
                                        "name": "first vocab",
                                        "_id": "1hw",
                                        "endingMessage": "Congratulations you finished it",
                                        "questions": [
                                            {
                                                "type": "mc",
                                                "prompt": "What is the latin word for you",
                                                "correct": "tu",
                                                "options": [
						    "tu",
						    "eres",
						    "what"
				]
					    },
                                            {
                                                "type": "fb",
                                                "prompt": "What is the term for a type of grammar that describes place",
                                                "correct": "preposition",
                                                "options": [
						]
					    }
					]
				    },
                                    {
                                        "name": "second vocab",
                                        "_id": "2hw",
                                        "endingMessage": "Congratulations you finished the second assignment",
                                        "questions": [
                                            {
                                                "type": "la",
                                                "prompt": "What are you confused about",
                                                "correct": "",
                                                "options": [
						]
					    },
                                            {
                                                "type": "ma",
                                                "prompt": "What are terms for grammar",
                                                "correct": ["preposition", "noun", "verb"],
                                                "options": [
						    "preposition",
						    "noun",
						    "verb",
						    "alex"
						]
					    }
					]
				    }
				]
			    },
                            {
                                "name": "section 2",
                                "order": "1",
                                "_id": "ch2",
                                "homework": [
                                    {
                                        "name": "third vocab",
                                        "_id": "3hw",
                                        "endingMessage": "Nice job",
                                        "questions": [
                                            {
                                                "type": "tf",
                                                "prompt": "Alex is amazing at latin",
                                                "correct": "f",
                                                "options": [
				]
			    },
                                            {
                                                "type": "fb",
                                                "prompt": "What is the term for a type of grammar that is a thing",
                                                "correct": "noun",
                                                "options": [
				]
			    }
			]
		    },
                                    {
                                        "name": "fourth vocab",
                                        "_id": "4hw",
                                        "endingMessage": "good for you",
                                        "questions": [
                                            {
                                                "type": "la",
                                                "prompt": "What else are you confused about",
                                                "correct": "",
                                                "options": [
				]
			    },
                                            {
                                                "type": "ma",
                                                "prompt": "What are good adjectives",
                                                "correct": ["fast", "slow"],
                                                "options": [
				    "fast",
				    "slow",
				    "dumb",
				    "stupid"
				]
			    }
			]
		    }
		]
	    }
	]
	}
    ]
            },
            studentClassData: [
                {
                    "name": "Spring 2017",
                    "_id": "123456789",
                    "student signup code": "abcdef",
                    "active": "true"
		},
                {
                    "name": "Fall 2017",
                    "_id": "123456789",
                    "student signup code": "abcdef",
                    "active": "true"
		},
                {
                    "name": "Fall 2016",
                    "_id": "123456789",
                    "student signup code": "abcdef",
                    "active": "false"
		},
                {
                    "name": "spring 2016",
                    "_id": "123456789",
                    "student signup code": "abcdef",
                    "active": "false"
		}
	    ]
        }
    }


    var latinQuizModel = function ($http) {

        var changeName = function (cclass, newname) {
            return $http.posts("/renameClass/" + cclass, newname)
        }
        var login = function (username, password) {
            var student = {
                "username": username,
                "password": password
            }
            return $http.post("/studentLogin", student)
        }
	//get informatino for student dashboard information
        var  getStudentInfo= function () 
	{
            return $http.get("/studentDashboardInformation");
        }
        var makeClass = function (name, structure) {
            var newClass = {
                "name": name,
                "structure": structure
            }
            return $http.post("/createClass", newClass)

        }
        var teacherLogin = function (username, password) {
            var teacher = {
                "username": username,
                "password": password
            }
            return $http.post("/teacherLogin", teacher)
        }
        var deleteClass = function (cclassId) {
            return $http.post("/deleteClass/" + cclassId);
        }
	//it's a toggle
        var hideClass = function (cclass) {
            return $http.post("/hideClass/" + cclass._id);

        }
        var renameClass = function (cclass) {
	    console.log(cclass);
            return $http.post("/renameClass/" + cclass._id,cclass.name);
        }
	//data for teacher dashboard
        var getData = function () {
            return $http.get("/classes");
        }
        var getQuiz = function(hwId){
            return $http.get("/quiz/"+hwId);

            
        }
        var getHomeworkResults = function(hwId){
            return $http.get("/homeworkResults/"+hwId);

        }
        var logout = function () {

            //to be done later!
        }
        var getHw = function (hwName) {
            return $http.get("/hwResults/" + hwName);
        }
        var getPrevious = function () {
            return $http.get("/previousClasses");
        }
	//get teacher class data
        var getClass = function (classId) {
            return $http.get("/classData/"+classId);
        }
	var getClassEditInfo=function(classId){
	    return $http.get("/classEditData/"+classId);
	}
	//for the teacherClassEdit page
	var getStudentInformation=function(classId){
	    return $http.get("/classStudentData/"+classId);
	}
	var deleteStudent=function(classId,studentId){
	    return $http.post("/deleteStudent/"+classId+"/"+studentId);
	}
	var resetStudentPassword=function(classId,studentId){
	    return $http.post("/resetStudent/"+classId+"/"+studentId);
	}
	var setDateOfHw=function(hwDataToChange){
	    //requires object with class._id
	    //requires array of objects with 
	    //chapter id
	    //homework id
	    //and new due date
	    return $http.post("/setDate",hwDataToChange);
	}
	var getStudentOverviewInfo=function(classId){
	    return $http.get("/studentOverview/"+classId);
	}
	var changePassword=function(oldPassword,newPassword,reenterPassword){
	    var passObj={
		"oldPassword":oldPassword,
		"newPassword":newPassword,
		"reenterPassword":reenterPassword
	    }
	    return $http.post("/changePassword",passObj);
	}

        var signup = function (username, passwordVal, repasswordVal, signupCode, firstName, lastName) {
            var signupStudent = {
                "username": username,
                "password": passwordVal,
                "repassword": repasswordVal,
                "signupCode": signupCode,
                "firstName": firstName,
                "lastName": lastName
            }
            return $http.post("/signup", signupStudent);
        }

        var changeChapterOrder = function (classId,chapterChanger){
	/*
	  Order changer must be a chapter with a indexChange item that doesn't match the index
	 */
            return $http.post("/changeOrder/"+classId, {"chapterChanger":chapterChanger});
        }

        return {
            login: login,
            getHw: getHw,
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
	    renameClass:renameClass,
            signup: signup,
	    resetStudentPassword:resetStudentPassword,
	    deleteStudent:deleteStudent,
	    getClassEditInfo:getClassEditInfo,
	    getStudentInformation:getStudentInformation,
	    setDateOfHw:setDateOfHw,
	    getStudentOverviewInfo:getStudentOverviewInfo,
	    changePassword,changePassword,
	    changeChapterOrder,changeChapterOrder
        };
    }

    var studentLoginController = function ($scope, $location, latinQuizModel) {
        $scope.messageShow = true;
        $scope.username = "";
        $scope.passwordVal = "";
        $scope.signupButton = function () {
            $location.path("signup");
        }
        $scope.changePasswordButton = function () {
            $location.path("changePassword");
        }
        $scope.loginButton = function () {

            latinQuizModel.login($scope.username, $scope.passwordVal).then(function (message) {

                var response = message.data;
                if (response.loggedIn == true) {
                    $location.path("studentDashboard");
                } else {
                    $scope.messageShow = false;
                }
            })
        }
    }
    var studentSignupController = function ($scope, $location, latinQuizModel) {
        $scope.username = "";
        $scope.messageShow = true;
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.passwordVal = "";
        $scope.repasswordVal = "";
        $scope.signupCode = "";
        $scope.cancelButton = function () {
            $location.path("/");
        }
        $scope.signupButton = function () {
            latinQuizModel.signup($scope.username, $scope.passwordVal, $scope.repasswordVal, $scope.signupCode, $scope.firstName, $scope.lastName).then(function (message) {

                var response = message.data;
                if (response.loggedIn == true) {
                    $location.path("studentDashboard");

                } else {
                    $scope.error = response.error;

                    $scope.messageShow = false;

                }


            })
        }
    }


    var teacherLoginController = function ($scope, $location, latinQuizModel) {
        $scope.messageShow = true;
        $scope.username = "";
        $scope.passwordVal = "";
        $scope.loginButton = function () {

            latinQuizModel.teacherLogin($scope.username, $scope.passwordVal).then(function (message) {

                var response = message.data;
                if (response.loggedIn == true) {
                    $location.path("teacherDashboard");

                } else {
                    $scope.messageShow = false;

                }


            })

        }

    }

    var teacherDashboardController = function ($scope, $location, latinQuizModel) {
        $scope.classes = [];
        $scope.hideOldClasses = 2;
	$scope.deleteClassHide=true;
	$scope.classToDelete="";
	/*
	$scope.classes=[
	    {
		"name":"Latin 110 Spring 2018",
		"oldStatus":0
	    },
	    {
		"name":"Latin 210 Spring 2018",
		"oldStatus":0
	    },
	    {
		"name":"Latin 210 Spring 2016",
		"oldStatus":1
	    },
	    {
		"name":"Latin 210 Spring 2017",
		"oldStatus":1
	    }
	];	
	$scope.addEditName($scope.classes);
	*/
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

        latinQuizModel.getData()
            .then(function (message) {
                $scope.classes = message.data.classes;
		$scope.addEditName($scope.classes);
		console.log($scope.classes);
            });

        $scope.createClass = function () {
            $location.path("createClass");
        }
        $scope.logout = function () {
            $location.path("teacherLogin");
        }
        $scope.toggleOld = function () {
	    console.log($scope.hideOldClasses);
            if ($scope.hideOldClasses == 1) {
                $scope.hideOldClasses = 2;
            } else {
                $scope.hideOldClasses = 1;
            }
        }
        $scope.cancelDeleteClass = function () {
	    $scope.classToDelete="";
	    $scope.deleteClassHide=true;
	}
	
        $scope.tryDeleteClass = function (cclass) {
	    $scope.classToDelete=cclass;
	    $scope.deleteClassHide=false;
	}
        $scope.hideClass = function (cclass) {
	    latinQuizModel.hideClass(cclass).then(function (message) {
                $scope.classes = message.data.classes;
		$scope.addEditName($scope.classes);
	    })
        }
        $scope.deleteClass = function () {
	    console.log($scope.classToDelete);
	    latinQuizModel.deleteClass($scope.classToDelete._id).then(function (message) {
                $scope.classes = message.data.classes;
		$scope.addEditName($scope.classes);
	    })

	    $scope.classToDelete="";
	    $scope.deleteClassHide=true;
        }
	$scope.renameClass=function(cclass){
	    if(!cclass.editName){
		cclass.editName=true;
		console.log(cclass);
		cclass.editWord="Edit Name";
		latinQuizModel.renameClass(cclass).then(function (message) {
                    $scope.classes = message.data.classes;
		    $scope.addEditName($scope.classes);
		})
	    }
	    else{
		cclass.editName=false;
		cclass.editWord="Save Name";
		console.log($scope.classes);
	    }	 
	}
	$scope.createClass=function(){
            $location.path("createClass");
	}
	console.log($scope.classes);
    }

    var questionViewController = function ($scope, $location, latinQuizModel, $routeParams) {

        latinQuizModel.getHw($routeParams.hwId)
            .then(function (message) {
                $scope.hw = message.data.homework;
            });
        $scope.currentIndex = 1;
        $scope.changeIndex = function (index) {
            $scope.currentIndex = index;

        }
        /*      $scope.hw = {
            "name": "HW 3.1",
            "questions": [
                {
                    "prompt": "What is the latin word for you?",
                    "answer": "tu",
                    "numberCorrect": "3",
                    "students": [
                        {
                            "name": "Morgan Hites",
                            "response": "tu"



                        },
                        {

                            "name": "Alex Luken",
                            "response": "tu"
                        },
                        {

                            "name": "Dave Toth",
                            "response": "you"
                        },
                        {

                            "name": "Jane Doe",
                            "response": "tu"
                        }




                    ]


                },
                {

                    "prompt": "What is my favorite food",
                    "answer": "pop tarts",
                    "numberCorrect": "0",

                    "students": [
                        {
                            "name": "Morgan Hites",
                            "response": "bread"



                        },
                        {

                            "name": "Alex Luken",
                            "response": "meat"
                        },
                        {

                            "name": "Dave Toth",
                            "response": "fruit"
                        },
                        {

                            "name": "Jane Doe",
                            "response": "veggies"
                        }

                    ]
		    
	}*/

        $scope.home = function () {
            $location.path("teacherDashboard");
        }

        $scope.logout = function () {

            $location.path("teacherLogin");

        }
    }


    var studentDashboardController = function ($scope, $location, latinQuizModel) {
	latinQuizModel.getStudentInfo().then(function(message){
	    var response=message.data;
	    $scope.nextHW=response.nextHomework;
	    $scope.chapters=response.chapters;
	    $scope.chapters.forEach(function(element){
		$scope.adjustPic(element);
	    })
	})
	
	/*
	$scope.nextHW={
	    "name":"fourth vocab",
	    "_id":"4hw",
	    "endingMessage":"good for you",
	    "status":statuses.toBeCompleted,
	    "dueDate":new Date(2020,1,1),
	    "dateString":(new Date(2020,1,1)).toString(),
	    "hide":false,
	    "questions":[
		{
		    "type":"la",
		    "prompt":"What else are you confused about",
		    "correct":"",
		    "options":[
		    ]
		},
		{
		    "type":"ma",
		    "prompt":"What are good adjectives",
		    "correct":["fast","slow"],
		    "options":[
			"fast",
			"slow",
			"dumb",
			"stupid"
		    ]
		}
	    ]
	}

        $scope.chapters = [
            {
                "name": "section 1",
                "order": "1",
                "_id": "ch1",
                "expandIcon": "fa-plus",
                "completeIcon": "fa-check-circle",
                "hide": true,
                "homework": [
                    {
                        "name": "first vocab",
                        "_id": "1hw",
                        "endingMessage": "Congratulations you finished it",
                        "symbol": "fa-times",
			"dueDate":new Date(2017,6,2),
			"dateString":(new Date(2017,6,2)).toString(),
                        "hide": true,
                        "questions": [
                            {
                                "type": "mc",
                                "prompt": "What is the latin word for you",
                                "correct": "tu",
                                "options": [
				    "tu",
				    "eres",
				    "what"
				]
			    },
                            {
                                "type": "fb",
                                "prompt": "What is the term for a type of grammar that describes place",
                                "correct": "preposition",
                                "options": [
				]
			}
			]
		    },
		    {
			"name":"second vocab",
			"_id":"2hw",
			"endingMessage":"Congratulations you finished the second assignment",
			"status":statuses.Complete,
			"dueDate":new Date(2017,6,2),
			"dateString":(new Date(2017,6,2)).toString(),
			"hide":true,
			"questions":[
			    {
				"type":"la",
				"prompt":"What are you confused about",
				"correct":"",
				"options":[
				]
			    },
                            {
                                "type": "ma",
                                "prompt": "What are terms for grammar",
                                "correct": ["preposition", "noun", "verb"],
                                "options": [
				    "preposition",
				    "noun",
				    "verb",
				    "alex"
				]
			    }
			]
		    }
		]
	    },
	    {
		"name":"section 2",
		"order":"1",
		"_id":"ch2",
		//"completeIcon":"fa-check-circle",
		"status":statuses.didNotComplete,
		"hide":false,
		"homework":[
		    {
			"name":"third vocab",
			"_id":"3hw",
			"endingMessage":"Nice job",
			"status":statuses.didNotComplete,
			"dueDate":new Date(2017,6,5),
			"dateString":(new Date(2017,6,5)).toString(),
			"hide":false,
			"questions":[
			    {
				"type":"tf",
				"prompt":"Alex is amazing at latin",
				"correct":"f",
				"options":[
				]
			    },
                            {
                                "type": "fb",
                                "prompt": "What is the term for a type of grammar that is a thing",
                                "correct": "noun",
                                "options": [
				]
			    }
			]
		    },
		    {
			"name":"fourth vocab",
			"_id":"4hw",
			"endingMessage":"good for you",
			"status":statuses.toBeCompleted,
			"dueDate":new Date(2020,1,1),
			"dateString":(new Date(2020,1,1)).toString(),
			"hide":false,
			"questions":[
			    {
				"type":"la",
				"prompt":"What else are you confused about",
				"correct":"",
				"options":[
				]
			    },
                            {
                                "type": "ma",
                                "prompt": "What are good adjectives",
                                "correct": ["fast", "slow"],
                                "options": [
				    "fast",
				    "slow",
				    "dumb",
				    "stupid"
				]
			    }
			]
		    }
		]
	    },
	    {
		"name":"section 3",
		"order":"1",
		"_id":"ch3",
		//"completeIcon":"fa-check-circle",
		"status":statuses.toBeCompleted,
		"hide":false,
		"homework":[
		    {
			"name":"fifth vocab",
			"_id":"5hw",
			"endingMessage":"Nc job",
			"status":statuses.toBeCompleted,
			"hide":false,
			"dueDate":new Date(2020,1,1),
			"dateString":(new Date(2020,1,1)).toString(),
			"questions":[
			    {
				"type":"tf",
				"prompt":"Morgan is amazing at latin",
				"correct":"f",
				"options":[
				]
			    },
			    {
				"type":"fb",
				"prompt":"What is the term for a type of grammar that is a thing",
				"correct":"noun",
				"options":[
				]
			    }
			]
		    },
		    {
			"name":"Sixth vocab",
			"_id":"6hw",
			"endingMessage":"good fr you",
			"status":statuses.toBeCompleted,
			"hide":false,
			"dueDate":new Date(2020,1,1),
			"dateString":(new Date(2020,1,1)).toString(),
			"questions":[
			    {
				"type":"la",
				"prompt":"What else are you confused about",
				"correct":"",
				"options":[
				]
			    },
			    {
				"type":"ma",
				"prompt":"What are good adjectives",
				"correct":["fast","slow"],
				"options":[
				    "fast",
				    "slow",
				    "dumb",
				    "stupid"
				]
			    }
			]
		    }
		]
	    }
		]
	*/

	    
    
        
        

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
	
	$scope.goToHomework=function(homework){
	    if(homework.status==statuses.toBeCompleted){
		$location.path("/homework/"+homework._id);
	    }
	    else{
		$location.path("/homeworkResults/"+homework._id);
	    }
	    console.log(homework);
	}
	$scope.goToLogout=function(){
	    $location.path("/");
	}
	$scope.goToChangePassword=function(){
	    $location.path("/changePassword");
	}
    }

    var homeworkManagementController=function($scope, $location, latinQuizModel,$routeParams){
        
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
	    $scope.hw={
		name:"Homework 1",
		dueDate:new Date(2015,5,5,15),
		endingMessage:"Nice job dude",
		questions:[
		    {
			"prompt":"What is the latin word for why?",
			"type":"fb",
			"answer":"que",
			"index":1
		    },
		    {
			"prompt":"What is the term for a type of grammar that describes place?",
			"type":"mc",
			"index":2,
			"options":[
			    "preposition",
			    "noun",
			    "verb"
			],
			"answer":"preposition"
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
			"answer":[
			    "Apples",
			    "Berries",
			    "Banannas"
			]

                    },
              {   
                  "index":3,
                    "type":"tf",//
                    "prompt":"Morgan likes age of empires",
                    "options":[
                        "True",
                        "False"   
                    ],
                    "answer":"True"
              },
            {
                    "index":4,
                    "type":"la",
                    "prompt":"What did you do this summer?"
                }
            
		]
	    }
	    
	}//Range function from https://stackoverflow.com/questions/11873570/angularjs-for-loop-with-numbers-ranges
   
        $scope.questionName="";
        $scope.questionType="";
        $scope.optionNumber="";
        $scope.fbAnswer="";
        $scope.convertInt=function(number){
            return parseInt(number)
        }
     $scope.questionArray = [];
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
$scope.addNew = function() {

    $scope.questionArray.push({
        option:"",
        chosen:{
        selected:false
        }})
  }
$scope.resetArray = function(){
    $scope.questionArray = [];
    $scope.optionNumber="";
}
$scope.questionArray = [];
     $scope.resetValues=function(y){
    for (i = 0; i < $scope.questionArray.length; i++) { 
   if(i != y){
   	$scope.questionArray[i].chosen= {
    selected:false
    }
   }
}
    }
     $scope.tfAnswer ="";
        $scope.error=false;
$scope.createQuestion=function(){//adding validation later
  var options = [];
     $scope.error=false;
    var newQuestion;
    var answer;
        if($scope.questionType=="fillInBlank"){
            
               newQuestion={ "prompt":$scope.questionName,
			"type":"fb",
			"answer":$scope.fbAnswer,
			"index":$scope.hw.questions.length+1
                
            };
        } else if ($scope.questionType=="multipleChoice"){
            answer="";
            for (var i = 0; i <$scope.questionArray.length; i++){
                options.push($scope.questionArray[i].option)
                if(Boolean($scope.questionArray[i].chosen.selected)){
                                    
                    answer=$scope.questionArray[i].option
                    console.log(answer);

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
            
        }//reset portion
    if($scope.questionName=="" || $scope.questionType==""){
        $scope.error=true;
        
    }
    if($scope.questionType =="fillInBlank" && $scope.fbAnswer==""){
       $scope.error=true;
       }
    if($scope.questionType == "trueFalse" && $scope.tfAnswer==""){
        $scope.error=true;
    }
    if ($scope.questionType =="multipleChoice" || $scope.questionType =="multipleChoice"){
        for (var i = 0; i <$scope.questionArray.length; i++){
            if($scope.questionArray[i].option==""){
                $scope.error=true;
            }
            
            if ($scope.questionType =="multipleChoice" && answer==""){
                $scope.error=true;
                console.log("hellow");
            }
            if ($scope.questionType =="multipleAnswer" && answer.length==0){
                $scope.error=true;
            }
        }

        
        
    }

    if($scope.error==false){
    $scope.hw.questions.push(newQuestion);
       $scope.questionArray=[];
        $scope.questionName="";
        $scope.tfAnswer="";
        $scope.fbAnswer="";
        $scope.questionType="";
        $scope.optionNumber="";
    }
    }    
   
    $scope.alterAnswer = function(question, qIndex){

        if(question.type == "mc"){
            if(question.options.includes(question.answer)){//checks to see if 
                console.log("Answer was not altered");
            } else{
                question.answer=question.options[qIndex];
                console.log("Answer was altered");

            }
            
        } else if(question.type == "ma"){
            var i =0;
        
        }
        
        
    }
    $scope.radioAlterAnswer=function(question, qIndex){//both tf and mc use this
        if(question.answer==question.options[qIndex]){
            console.log("answer not alterd")
        } else {
            console.log("ans was altered")
            question.answer = question.options[qIndex];
        }
        
    }
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
$scope.setIndex = function(index1,index2){
    $scope.currentQuestionIndex=index1;
    $scope.currentOption=index2;
}
  
     $scope.$watch('hw.questions',function(newVal,oldVal){
         if($scope.currentQuestionIndex != -1){
            if(newVal[$scope.currentQuestionIndex].options[$scope.currentOption] != oldVal[$scope.currentQuestionIndex].options[$scope.currentOption]){
            if(oldVal[$scope.currentQuestionIndex].answer.includes(oldVal[$scope.currentQuestionIndex].options[$scope.currentOption])){
                var answerIndex = newVal[$scope.currentQuestionIndex].answer.indexOf(oldVal[$scope.currentQuestionIndex].options[$scope.currentOption]);
                newVal[$scope.currentQuestionIndex].answer[answerIndex]=newVal[$scope.currentQuestionIndex].options[$scope.currentOption];
                //checks to see if the oldvalue was in the answers, if it is then the old answer gets updated with the new one
            }
            $scope.currentQuestionIndex=-1;
                $scope.currentOption =-1;
          
     } else{
         console.log("hello");
     }
         
         
         }//
        },true)
    
    }//end of controller

	
    var homeworkController=function($scope,$location,$route,latinQuizModel){
    }
/*    var homeworkResultsController=function($scope,$location,$route,latinQuizModel){

        $scope.showStuff = function (chapter) {
            if (chapter.hide) {
                chapter.hide = false;
            } else {
                chapter.hide = true;
            }
            chapter.homework.forEach(function (hw) {
                hw.hide = chapter.hide;
            })
        }

}*/
    var createClassController = function ($scope, $location, latinQuizModel) {
        $scope.name = "";
        latinQuizModel.getPrevious().then(function (message) {


            $scope.previousClasses = message.data.previousClasses;
        });
        /*$scope.previousClasses =  [
            {
                "name": "Latin 110",
                "term": "Fall 2016"
            },
            {

                "name": "Latin 210",
                "term": "Fall 2016"
            },
            {
                "name": "Latin 110",
                "term": "Fall 2015"
            },
            {
                "name": "Latin 210",
                "term": "Fall 2015"

                    } ]*/



        $scope.errorMessage = "";
        $scope.errorPresent=true;
        $scope.selectedClass = "";
        $scope.cancel = function () {
            $location.path("teacherDashboard");
            $scope.errorPresent = true;

        }
        $scope.save = function () {
            if ($scope.name == "" || $scope.selectedClass == "") {
                $scope.errorPresent = false;//no longer hiding error
            } else {
                latinQuizModel.makeClass($scope.name, $scope.selectedClass).then(function (message) {
                    if (message.data.error == true)  {
                        $scope.errorMessage = message.data.error;
                        $scope.errorPresent=false;
                    } else{
			$location.path("teacherDashboard");
			$scope.errorPresent = true;}
		    

                })
		
		
            }
        }
        
	
	
	
    }
    
    
    var quizViewController = function ($scope, $location, latinQuizModel,$routeParams){
        
        latinQuizModel.getQuiz($routeParams.hwId).then(function(message){
            $scope.hw= message.data.hw;
        });
        
       
            
            /*{
            "name": "HW 3.1",

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
        
        $scope.submit = function(){
            
            
            //does something
        }
    }
    


    var homeworkResultsController = function($scope, $location, latinQuizModel,$routeParams){
       //green answer is right one, checked one is user response
       latinQuizModel.getHomeworkResults($routeParams.homeworkid).then(function(message){
           $scope.results=message.data.results;
           
       });
      //$scope.results = 
       /*{
            "name": "HW 3.1",

            "questions":[  
                {   "index":1,
                    "type":"la",
                    "prompt":"What did you do this summer?",
                    "response":"I had fun and made a MEAN app!!! GO ANGULAR!",
                                        "correct":true

                    
                },
                {   "index":2,
                    "type":"fb",
                    "prompt":"What is the term for a type of grammar that describes place?",
                    "response":"preposition",
                                        "correct":true


                },
                {
                    "index":3,
                    "type":"tf",//
                    "prompt":"Morgan likes age of empires",
                    "options":[
                        "True",
                        "False"   
                    ],
                    "response":"True",
                    "answer":"True",
                    "correct":true
                    

                    
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
                    ] ,
                    "response":"Yogurt",
                    "answer":"Pop Tarts",
                    "correct":false
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
                    "response":[
                        
                        "Turkey",
                        "Chicken",
                        "Apples"
                        
                        
                        
                    ],
                    "answer":[
                        "Berries",
                        "Banannas",
                        "Apples",
                    ],
                    "correct":false
                }  
            ]    
        }*/
          $scope.logout = function () {

            $location.path("/");
        }
            $scope.home = function () {
            $location.path("studentDashboard");
        }
       $scope.id = $routeParams.homeworkid;
       console.log();    
   }    
    
   
   var teacherClassController = function($scope, $location, latinQuizModel,$routeParams){
       //###################################################
       //RESPONSES USE THE QUESTION STATUS GLOBAL VARIABLES! //###################################################
       $scope.hideInfo=true;
       latinQuizModel.getClass($routeParams.classId).then(function(message){
	   $scope.class=message.data.classData;
	   console.log($scope.class);
	   $scope.class.chapters.forEach(function(chapter){
	       $scope.showStuff(chapter);
	       $scope.adjustPic(chapter);	   
	   })
       })
       /*
       $scope.class ={
           "name":"Latin 210",
           "term":"Spring 2018",
           "signupCode":"AAAAAA",
           "chapters":[
               {
                   "name":"Section 1",
                   "homework":[
                       {
                        "name":"Vocab practice",
                        "completed":4,
                        "total":4,
                        "date":new Date(2017,6,2,9),
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                                response:[
                                    "modified",
                                    "correct",
                                    "correct",
                                    "correct"
                                ],
                                time:"2:25"
                                
                            },
                            {
                                "name":"Morgan Hites",
                                response:[
                                    "missing",
                                    "missing",
                                    "missing",
                                    "missing"
                                ],
                                time:"-:--"
                                
                                
                            },
                            {
                                "name":"Tim Mains",
                                response:[
                                    "modified",
                                    "correct",
                                    "wrong",
                                    "wrong"
                                ],
                                time:"1:43"    
                            },
                            {
                                "name":"Dave Toth",
                                response:[
                                    "wrong",
                                    "correct",
                                    "wrong",
                                    "correct"
                                ],
                                time:"3:03"   
                            }  
                        ],
                        "correctFraction":[
                            {
                                "correct":1,
                                "total":3
                            },
                            {
                                "correct":2,
                                "total":3
                            },
                            {
                                 "correct":2,
                                "total":3
                            },
                            {
                                 "correct":1,
                                "total":3
                            }
                            
                            
                        ], 
                        "flag":[
                            {
                            "flagged":0,
                            "total":1
                        },
                                {
                            "flagged":0,
                            "total":3
                        },
                            {
                            "flagged":0,
                            "total":3
                        },
                                {
                            "flagged":2,
                            "total":3
                        }
                                ]
                          
                       },
                       {
                        "name":"Verb practice",
                        "completed":4,
                        "total":4,
                        "date":new Date(2017,6,5,9),
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                                response:[
                                    "wrong",
                                    "correct",
                                    "correct",
                                    "correct"
                                ],
                                time:"2:55"
                                
                            },
                            {
                                "name":"Morgan Hites",
                                response:[
                                    "wrong",
                                    "correct",
                                    "modified",
                                    "correct"
                                ],
                                time:"3:00"
                                
                                
                            },
                            {
                                "name":"Tim Mains",
                                response:[
                                    "wrong",
                                    "correct",
                                    "modified",
                                    "wrong"
                                ],
                                time:"5:23"    
                            },
                            {
                                "name":"Dave Toth",
                                response:[
                                    "wrong",
                                    "correct",
                                    "wrong",
                                    "correct"
                                ],
                                time:"3:03"   
                            }  
                        ],
                        "correctFraction":[
                            {
                                "correct":0,
                                "total":4
                            },
                            {
                                "correct":4,
                                "total":4
                            },
                            {
                                 "correct":1,
                                "total":2
                            },
                            {
                                 "correct":3,
                                "total":4
                            }
                            
                            
                        ], 
                        "flag":[
                            {
                            "flagged":0,
                            "total":4
                        },
                                {
                            "flagged":0,
                            "total":4
                        },
                            {
                            "flagged":0,
                            "total":4
                        },
                                {
                            "flagged":2,
                            "total":4
                        }
                                ]    
                       }
                   ]
                   
                   
               },
               {
                      "name":"Section 2",
                   "homework":[
                       {
                        "name":"Vocab practice",
                        "completed":4,
                        "total":4,
                        "date":new Date(2017,6,2,9),
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                                response:[
                                    "modified",
                                    "correct",
                                    "correct",
                                    "correct"
                                ],
                                time:"2:25"
                                
                            },
                            {
                                "name":"Morgan Hites",
                                response:[
                                    "missing",
                                    "missing",
                                    "missing",
                                    "missing"
                                ],
                                time:"-:--"
                                
                                
                            },
                            {
                                "name":"Tim Mains",
                                response:[
                                    "modified",
                                    "correct",
                                    "wrong",
                                    "wrong"
                                ],
                                time:"1:43"    
                            },
                            {
                                "name":"Dave Toth",
                                response:[
                                    "wrong",
                                    "correct",
                                    "wrong",
                                    "correct"
                                ],
                                time:"3:03"   
                            }  
                        ],
                        "correctFraction":[
                            {
                                "correct":1,
                                "total":3
                            },
                            {
                                "correct":2,
                                "total":3
                            },
                            {
                                 "correct":2,
                                "total":3
                            },
                            {
                                 "correct":1,
                                "total":3
                            }
                            
                            
                        ], 
                        "flag":[
                            {
                            "flagged":0,
                            "total":1
                        },
                                {
                            "flagged":0,
                            "total":3
                        },
                            {
                            "flagged":0,
                            "total":3
                        },
                                {
                            "flagged":2,
                            "total":3
                        }
                                ]
                          
                       },
                       {
                        "name":"Verb practice",
                        "completed":4,
                        "total":4,
                        "date":new Date(2017,6,5,9),
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                                response:[
                                    "wrong",
                                    "correct",
                                    "correct",
                                    "correct"
                                ],
                                time:"2:55"
                                
                            },
                            {
                                "name":"Morgan Hites",
                                response:[
                                    "wrong",
                                    "correct",
                                    "modified",
                                    "correct"
                                ],
                                time:"3:00"
                                
                                
                            },
                            {
                                "name":"Tim Mains",
                                response:[
                                    "wrong",
                                    "correct",
                                    "modified",
                                    "wrong"
                                ],
                                time:"5:23"    
                            },
                            {
                                "name":"Dave Toth",
                                response:[
                                    "wrong",
                                    "correct",
                                    "wrong",
                                    "correct"
                                ],
                                time:"3:03"   
                            }  
                        ],
                        "correctFraction":[
                            {
                                "correct":0,
                                "total":4
                            },
                            {
                                "correct":4,
                                "total":4
                            },
                            {
                                 "correct":1,
                                "total":2
                            },
                            {
                                 "correct":3,
                                "total":4
                            }
                            
                            
                        ], 
                        "flag":[
                            {
                            "flagged":0,
                            "total":4
                        },
                                {
                            "flagged":0,
                            "total":4
                        },
                            {
                            "flagged":0,
                            "total":4
                        },
                                {
                            "flagged":2,
                            "total":4
                        }
                                ]    
                       }
                   ]
                   
               },
               {   "name":"Section 3",
                   "homework":[
                       {
                        "name":"Vocab practice",
                        "completed":4,
                        "total":4,
                        "date":new Date(2017,6,2,9),
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                                response:[
                                    "modified",
                                    "correct",
                                    "correct",
                                    "correct"
                                ],
                                time:"2:25"
                                
                            },
                            {
                                "name":"Morgan Hites",
                                response:[
                                    "missing",
                                    "missing",
                                    "missing",
                                    "missing"
                                ],
                                time:"-:--"
                                
                                
                            },
                            {
                                "name":"Tim Mains",
                                response:[
                                    "modified",
                                    "correct",
                                    "wrong",
                                    "wrong"
                                ],
                                time:"1:43"    
                            },
                            {
                                "name":"Dave Toth",
                                response:[
                                    "wrong",
                                    "correct",
                                    "wrong",
                                    "correct"
                                ],
                                time:"3:03"   
                            }  
                        ],
                        "correctFraction":[
                            {
                                "correct":1,
                                "total":3
                            },
                            {
                                "correct":2,
                                "total":3
                            },
                            {
                                 "correct":2,
                                "total":3
                            },
                            {
                                 "correct":1,
                                "total":3
                            }
                            
                            
                        ], 
                        "flag":[
                            {
                            "flagged":0,
                            "total":1
                        },
                                {
                            "flagged":0,
                            "total":3
                        },
                            {
                            "flagged":0,
                            "total":3
                        },
                                {
                            "flagged":2,
                            "total":3
                        }
                                ]
                          
                       },
                       {
                        "name":"Verb practice",
                        "completed":4,
                        "total":4,
                        "date":new Date(2017,6,5,9),
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                                response:[
                                    "wrong",
                                    "correct",
                                    "correct",
                                    "correct"
                                ],
                                time:"2:55"
                                
                            },
                            {
                                "name":"Morgan Hites",
                                response:[
                                    "wrong",
                                    "correct",
                                    "modified",
                                    "correct"
                                ],
                                time:"3:00"
                                
                                
                            },
                            {
                                "name":"Tim Mains",
                                response:[
                                    "wrong",
                                    "correct",
                                    "modified",
                                    "wrong"
                                ],
                                time:"5:23"    
                            },
                            {
                                "name":"Dave Toth",
                                response:[
                                    "wrong",
                                    "correct",
                                    "wrong",
                                    "correct"
                                ],
                                time:"3:03"   
                            }  
                        ],
                        "correctFraction":[
                            {
                                "correct":0,
                                "total":4
                            },
                            {
                                "correct":4,
                                "total":4
                            },
                            {
                                 "correct":1,
                                "total":2
                            },
                            {
                                 "correct":3,
                                "total":4
                            }
                            
                            
                        ], 
                        "flag":[
                            {
                            "flagged":0,
                            "total":4
                        },
                                {
                            "flagged":0,
                            "total":4
                        },
                            {
                            "flagged":0,
                            "total":4
                        },
                                {
                            "flagged":2,
                            "total":4
                        }
                                ]    
                       }
                   ]},
               
               {   
                   "name":"Section 4",
                   "homework":[
                       {
                        "name":"Vocab practice",
                        "completed":4,
                        "total":4,
                        "date":new Date(2017,6,2,9),
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                                response:[
                                    "modified",
                                    "correct",
                                    "correct",
                                    "correct"
                                ],
                                time:"2:25"
                                
                            },
                            {
                                "name":"Morgan Hites",
                                response:[
                                    "missing",
                                    "missing",
                                    "missing",
                                    "missing"
                                ],
                                time:"-:--"
                                
                                
                            },
                            {
                                "name":"Tim Mains",
                                response:[
                                    "modified",
                                    "correct",
                                    "wrong",
                                    "wrong"
                                ],
                                time:"1:43"    
                            },
                            {
                                "name":"Dave Toth",
                                response:[
                                    "wrong",
                                    "correct",
                                    "wrong",
                                    "correct"
                                ],
                                time:"3:03"   
                            }  
                        ],
                        "correctFraction":[
                            {
                                "correct":1,
                                "total":3
                            },
                            {
                                "correct":2,
                                "total":3
                            },
                            {
                                 "correct":2,
                                "total":3
                            },
                            {
                                 "correct":1,
                                "total":3
                            }
                            
                            
                        ], 
                        "flag":[
                            {
                            "flagged":0,
                            "total":1
                        },
                                {
                            "flagged":0,
                            "total":3
                        },
                            {
                            "flagged":0,
                            "total":3
                        },
                                {
                            "flagged":2,
                            "total":3
                        }
                                ]
                          
                       },
                       {
                        "name":"Verb practice",
                        "completed":4,
                        "total":4,
                        "date":new Date(2017,6,5,9),
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                                response:[
                                    "wrong",
                                    "correct",
                                    "correct",
                                    "correct"
                                ],
                                time:"2:55"
                                
                            },
                            {
                                "name":"Morgan Hites",
                                response:[
                                    "wrong",
                                    "correct",
                                    "modified",
                                    "correct"
                                ],
                                time:"3:00"
                                
                                
                            },
                            {
                                "name":"Tim Mains",
                                response:[
                                    "wrong",
                                    "correct",
                                    "modified",
                                    "wrong"
                                ],
                                time:"5:23"    
                            },
                            {
                                "name":"Dave Toth",
                                response:[
                                    "wrong",
                                    "correct",
                                    "wrong",
                                    "correct"
                                ],
                                time:"3:03"   
                            }  
                        ],
                        "correctFraction":[
                            {
                                "correct":0,
                                "total":4
                            },
                            {
                                "correct":4,
                                "total":4
                            },
                            {
                                 "correct":1,
                                "total":2
                            },
                            {
                                 "correct":3,
                                "total":4
                            }
                            
                            
                        ], 
                        "flag":[
                            {
                            "flagged":0,
                            "total":4
                        },
                                {
                            "flagged":0,
                            "total":4
                        },
                            {
                            "flagged":0,
                            "total":4
                        },
                                {
                            "flagged":2,
                            "total":4
                        }
                                ]    
                       }
                   ]}
           ]
       }
       */
       $scope.editClass=function(){
	   $location.path("/teacherClassEdit/"+$routeParams.classId);
       }
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
       
       $scope.adjustPic=function(chapter){
	   if(chapter.hide){
	       chapter.expandIcon="fa-plus";
	    }
	   else{
	       chapter.expandIcon="fa-minus";
	   }
       }
       $scope.range=function(number){
	   var numbers=[];
	   for(var i=0; i<number; i++){
	       numbers.push(i);
	   }
	   return numbers;
       }
       
       $scope.showChapter=function(hw){
	   $scope.hideInfo=false;
	   $scope.displayedHw=hw;
	   $scope.displayedHw.student.forEach(function(student){
	       student.responsePic=[];
	       student.responseText=[];
	       student.response.forEach(function(rspnse){
		   if(rspnse=="wrong"){
		       student.responsePic.push({
			   "pic":"fa-times",
			   "text":""
		       });
		   }
		   if(rspnse=="correct"){
		       student.responsePic.push({
			   "pic":"fa-check",
			   "text":""
		       });
		   }
		   if(rspnse=="missing"){
		       student.responsePic.push({
			   "pic":"fa-minus",
			   "text":""
		       });
		   }
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
       $scope.editButton=function(){
	   $location.path("/teacherClassEdit/"+$routeParams.classId);
       }

   }
    var teacherStudentViewController=function($scope, $location, latinQuizModel,$routeParams){
	/*
	$scope.students=[
	    {
		"name":"Alex Luken",
		"_id":0022,
		"total":14,
		"completed":12,
		"missing":false,
		"chapters":[
		    {
			"name":"Section 1",
			"status":statuses.Complete,
			"homework":[
			    {
				"date":new Date(2017,6,2,9),
				"dateString":(new Date(2017,6,2,9)).toString(),
				"name":"vocab practice",
				"status":statuses.Complete,
				"_id":600
			    },
			    {
				"date":new Date(2017,6,3,9),
				"dateString":(new Date(2017,6,3,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.Complete,
				"_id":601
			    }

			]
		    },
		    {
			"name":"Section 2",
			"status":statuses.Complete,
			"homework":[
			    {
				"date":new Date(2017,6,4,9),
				"dateString":(new Date(2017,6,4,9)).toString(),
				"name":"vocab practice",
				"status":statuses.Complete,
				"_id":602
			    },
			    {
				"date":new Date(2017,6,5,9),
				"dateString":(new Date(2017,6,5,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.Complete,
				"_id":603
			    }

			]
		    },
		    {
			"name":"Section 3",
			"status":statuses.Complete,
			"homework":[
			    {
				"date":new Date(2017,6,2,9),
				"dateString":(new Date(2017,6,2,9)).toString(),
				"name":"vocab practice",
				"status":statuses.Complete,
				"_id":604
			    },
			    {
				"date":new Date(2017,6,3,9),
				"dateString":(new Date(2017,6,3,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.Complete,
				"_id":605
			    }

			]
		    },
		    {
			"name":"Section 4",
			"status":statuses.Complete,
			"homework":[
			    {
				"date":new Date(2017,6,2,9),
				"dateString":(new Date(2017,6,2,9)).toString(),
				"name":"vocab practice",
				"status":statuses.Complete,
				"_id":606
			    },
			    {
				"date":new Date(2017,6,3,9),
				"dateString":(new Date(2017,6,3,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.Complete,
				"_id":607
			    }
			]
		    },
		    {
			"name":"Section 5",
			"status":statuses.toBeCompleted,
			"homework":[
			    {
				"date":new Date(2017,6,2,9),
				"dateString":(new Date(2017,6,2,9)).toString(),
				"name":"vocab practice",
				"status":statuses.toBeCompleted,
				"_id":608
			    },
			    {
				"date":new Date(2017,6,3,9),
				"dateString":(new Date(2017,6,3,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.toBeCompleted,
				"_id":609
			    }
			]
		    }

		]
	    },
	    {
		"name":"Morgan Hites",
		"_id":0024,
		"total":14,
		"completed":11,
		"missing":true,
		"chapters":[
		    {
			"name":"Section 1",
			"status":statuses.Complete,
			"homework":[
			    {
				"date":new Date(2017,6,2,9),
				"dateString":(new Date(2017,6,2,9)).toString(),
				"name":"vocab practice",
				"status":statuses.Complete,
				"_id":600
			    },
			    {
				"date":new Date(2017,6,3,9),
				"dateString":(new Date(2017,6,3,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.Complete,
				"_id":601
			    }

			]
		    },
		    {
			"name":"Section 2",
			"status":statuses.Complete,
			"homework":[
			    {
				"date":new Date(2017,6,4,9),
				"dateString":(new Date(2017,6,4,9)).toString(),
				"name":"vocab practice",
				"status":statuses.Complete,
				"_id":602
			    },
			    {
				"date":new Date(2017,6,5,9),
				"dateString":(new Date(2017,6,5,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.Complete,
				"_id":603
			    }

			]
		    },
		    {
			"name":"Section 3",
			"status":statuses.Complete,
			"homework":[
			    {
				"date":new Date(2017,6,2,9),
				"dateString":(new Date(2017,6,2,9)).toString(),
				"name":"vocab practice",
				"status":statuses.Complete,
				"_id":604
			    },
			    {
				"date":new Date(2017,6,3,9),
				"dateString":(new Date(2017,6,3,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.Complete,
				"_id":605
			    }

			]
		    },
		    {
			"name":"Section 4",
			"status":statuses.didNotComplete,
			"homework":[
			    {
				"date":new Date(2017,6,2,9),
				"dateString":(new Date(2017,6,2,9)).toString(),
				"name":"vocab practice",
				"status":statuses.Complete,
				"_id":606
			    },
			    {
				"date":new Date(2017,6,3,9),
				"dateString":(new Date(2017,6,3,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.didNotComplete,
				"_id":607
			    }
			]
		    },
		    {
			"name":"Section 5",
			"status":statuses.toBeCompleted,
			"homework":[
			    {
				"date":new Date(2017,6,2,9),
				"dateString":(new Date(2017,6,2,9)).toString(),
				"name":"vocab practice",
				"status":statuses.toBeCompleted,
				"_id":608
			    },
			    {
				"date":new Date(2017,6,3,9),
				"dateString":(new Date(2017,6,3,9)).toString(),
				"name":"verb conjugation",
				"status":statuses.toBeCompleted,
				"_id":609
			    }
			]
		    }

		]
	    }

	]*/
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

	    if(chapter.status==statuses.toBeCompleted){
		chapter.completeIcon="fa-ellipsis-h";
	    }

	    if(chapter.status==statuses.didNotComplete){
		chapter.completeIcon="fa-times";
	    }

	    chapter.homework.forEach(function(hw){
		hw.hide=chapter.hide;
		$scope.setStatusPic(hw);
            })
	    $scope.adjustPic(chapter);
	}
	
	$scope.adjustPic=function(chapter){
	    if(chapter.hide){
		chapter.expandIcon="fa-plus";
	    }
	    else{
		chapter.expandIcon="fa-minus";
	    }
	}
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
       $scope.homeButton=function(){
	   $location.path("/teacherDashboard");
       }
       $scope.logoutButton=function(){
	   $location.path("/teacherLogin");
       }

	//FIX WHEN YOU SWITCH TO HTTP YOU NOB SMUCKER
	/*
	$scope.selectedStudent.chapters.forEach(function(ch){
		$scope.showStuff(ch);
	})
	*/					
	console.log($scope.selectedStudent);
	$scope.studentDisplayPicChange=function(){
	    $scope.students.forEach(function(student){
		if($scope.selectedStudent==student){
		    student.statusIcon="fa-minus"
		}
		else{
		    student.statusIcon="fa-plus"
		}
		if(student.missing==false){
		    student.color="black";
		}
		else{
		    student.color="red";
		}

	    })
	}
	$scope.displayStudent=function(student){
	    if(student!=$scope.selectedStudent){
		$scope.selectedStudent=student;
		$scope.studentDisplayPicChange();
		/*
		$scope.selectedStudent.chapters.forEach(function(ch){
		    $scope.showStuff(ch);
		})
		*/
	    }
	}
    }

   var teacherClassEditController = function($scope, $location, latinQuizModel,$routeParams){
       latinQuizModel.getClassEditInfo($routeParams.classId).then(function(message){
	   $scope.class=message.data.classInfo;
	   $scope.class.chapters.forEach(function(chapter){
	       $scope.showStuff(chapter);
	       $scope.adjustPic(chapter);
	   })
	   $scope.createIndices($scope.class.chapters);
       })
       latinQuizModel.getStudentInformation($routeParams.classId).then(function(message){
	   $scope.students=message.data.students;
       })
       
       /*
       $scope.students=[
	   {
	       name:"Alex Luken",
	       _id:626
	   },
	   {
	       name:"Tim Mains",
	       _id:627
	   },
	   {
	       name:"David Toth",
	       _id:628
	   },
	   {
	       name:"Morgan Hites",
	       _id:629
	   }
       ];
	   
       $scope.class ={
           "name":"Latin 210",
           "term":"Spring 2018",
           "signupCode":"AAAAAA",
           "chapters":[
               {
                   "name":"Section 1",
		   "_id":105,
		   "index":1,
                   "homework":[
                       {
                           "name":"Vocab practice",
			   "_id":117,
                           "date":new Date(2017,6,2,9),
			   "editDueDate":true,
                           "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                            },
                            {
                                "name":"Morgan Hites",
                            },
                            {
                                "name":"Tim Mains",
                            },
                            {
                                "name":"Dave Toth",
                            }  
                        ]
                          
                       },
                       {
                        "name":"Verb practice",
			   "_id":118,
                        "date":new Date(2017,6,5,9),
			   "editDueDate":true,
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                            },
                            {
                                "name":"Morgan Hites",
                            },
                            {
                                "name":"Tim Mains",
                            },
                            {
                                "name":"Dave Toth",
                            }  
                        ]
		       }
		       
		   ]
		   },
		   {
		       "name":"Section 2",
		       "_id":106,
		   "index":2,
		       "homework":[
			   {
			       "name":"Vocab practice",
                               "date":new Date(2017,6,2,9),
			       "editDueDate":true,
			       "_id":119,
                               "dateString":(new Date(2017,6,2,9)).toString(),
                               "student":[
				   {
                                       "name":"Alex Luken",
				   },
				   {
                                "name":"Morgan Hites",
				   },
				   {
                                "name":"Tim Mains",
				   },
				   {
                                       "name":"Dave Toth",
				   }  
                               ]
			   },
			   {
                               "name":"Verb practice",
			       "_id":120,
                               "date":new Date(2017,6,5,9),
			       "editDueDate":true,
                               "dateString":(new Date(2017,6,5,9)).toString(),
                               "student":[
				   {
                                "name":"Alex Luken",
				   },
				   {
                                "name":"Morgan Hites",
				   },
                            {
                                "name":"Tim Mains",
                            },
                            {
                                "name":"Dave Toth",
                            }  
                        ]
                       }
                   ]
                   
               },
               {   
		   "name":"Section 3",
		   "_id":107,
		   "index":3,
                   "homework":[
                       {
                        "name":"Vocab practice",
			       "_id":121,
                        "date":new Date(2017,6,2,9),
			   "editDueDate":true,
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                            },
                            {
                                "name":"Morgan Hites",
                            },
                            {
                                "name":"Tim Mains",
                            },
                            {
                                "name":"Dave Toth",
                            }  
                        ]
                       },
                       {
                        "name":"Verb practice",
			   "_id":122,
                        "date":new Date(2017,6,5,9),
			   "editDueDate":true,
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                            },
                            {
                                "name":"Morgan Hites",
                            },
                            {
                                "name":"Tim Mains",
                            },
                            {
                                "name":"Dave Toth",
                            }  
                        ]
                       }
                   ]
	       },
               
               {   
                   "name":"Section 4",
		   "_id":108,
		   "index":4,
                   "homework":[
                       {
                        "name":"Vocab practice",
			   "_id":123,
                        "date":new Date(2017,6,2,9),
			   "editDueDate":true,
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                            },
                            {
                                "name":"Morgan Hites",
                            },
                            {
                                "name":"Tim Mains",
                            },
                            {
                                "name":"Dave Toth",
                            }  
                        ] 
                       },
                       {
                        "name":"Verb practice",
			   "_id":124,
                        "date":new Date(2017,6,5,9),
			   "editDueDate":true,
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
                            },
                            {
                                "name":"Morgan Hites",
                            },
                            {
                                "name":"Tim Mains",
                            },
                            {
                                "name":"Dave Toth",
                            }  
                        ]
                       }
                   ]}
	       
           ]
       }
*/
       $scope.hideResetStudent=true;
       $scope.hideDeleteStudent=true;
       $scope.dueDateChange=true;
       $scope.dueDateToChange=[];

       $scope.trySaveDueDate=function(){
	   $scope.dueDateChange=false;
	   $scope.dueDateToChange=[];
	   console.log($scope.class.chapters);
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
	       classId:$routeParams.classId,
	       "hwsToChange":arrayOfHws
	   }
	   latinQuizModel.setDateOfHw(httpPostItem).then(function(message){
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
       
       $scope.goToHWPage=function(chapter,homework){
	   $location.path("/homeworkManagement/"+chapter._id+"/"+homework._id);
       }
       
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
       
       $scope.adjustPic=function(chapter){
	   if(chapter.hide){
	       chapter.expandIcon="fa-plus";
	    }
	   else{
	       chapter.expandIcon="fa-minus";
	   }
       }


       $scope.finishEdit=function(){       
	   $location.path("/teacherClass/"+$routeParams.classId);
       }

       $scope.homeButton=function(){
	   $location.path("/teacherDashboard");
       }
       $scope.logoutButton=function(){
	   $location.path("/teacherLogin");
       }

       $scope.tryDeleteStudent=function(stud){
	   $scope.dltStudent=stud;
	   $scope.hideDeleteStudent=false;
	   $scope.hideResetStudent=true;
       }
       $scope.tryResetStudentPassword=function(stud){
	   $scope.rstStudent=stud;
	   $scope.hideResetStudent=false;
	   $scope.hideDeleteStudent=true;
       }
       $scope.deleteStudent=function(){
	   console.log($scope.dltStudent);
	   $scope.hideResetStudent=true;
	   $scope.hideDeleteStudent=true;
	   latinQuizModel.deleteStudent($routeParams.classId,$scope.dltStudent._id).then(function(message){
	       $scope.students=message.data.students;
	   });
	   //http request
       }
       $scope.resetStudent=function(){
	   console.log($scope.rstStudent);
	   $scope.hideResetStudent=true;
	   $scope.hideDeleteStudent=true;
	   latinQuizModel.deleteStudent($routeParams.classId,$scope.rstStudent._id).then(function(message){
	       $scope.students=message.data.students;
	   });
	   //http request
       }
       $scope.createIndices=function(chapters){
	   var dummyArray= [];
	   chapters.forEach(function(chapter){
	       chapter.indexChange=chapter.index;
	       dummyArray.push(chapter.indexChange);
	   })
	   chapters.forEach(function(chapter){
	       chapter.possibleIndex=dummyArray;
	   })
       }
       
       $scope.changeOptions=function(chapter){
	   latinQuizModel.changeChapterOrder($routeParams.classId,chapter).then(function(message){
	       $scope.class=message.data.classInfo;
	       $scope.class.chapters.forEach(function(chapter){
		   $scope.showStuff(chapter);
		   $scope.adjustPic(chapter);
	       })
	       $scope.createIndices($scope.class.chapters);
	   })
       }
       /*
       $scope.class.chapters.forEach(function(chapter){
	   $scope.showStuff(chapter);
	   $scope.adjustPic(chapter);
       })
       $scope.createIndices($scope.class.chapters);
       */
   }
    var changePasswordController = function($scope, $location, latinQuizModel,$routeParams){
	$scope.oldPassword="";
	$scope.newPassword="";
	$scope.reenterPassword="";
	$scope.changePassword=function(){
	    latinQuizModel.changePassword($scope.oldPassword,$scope.newPassword,$scope.reenterPassword).then(function(message){
		$scope.displayMessage=message.data.displayMessage;
	    })
	}
	$scope.goBack=function(){
	    $location.path("/studentDashboard");
	}
    }
    //directives
    var multipleChoice = function()
    {
	return {
        scope: {

 question: '=question'    
        },
	    templateUrl:"directives/multipleChoice.html"
	    };
    } 
    var multipleAnswer = function()
    {
	return {
   scope: {
 question: '=question'    
        },
	    templateUrl:"directives/multipleAnswer.html"
	    };
    }
     var trueFalse = function()
    {
	return {
   scope: {
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
    
    var routingConfig = function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "studentLogin.html",
                controller: "studentLoginController"
            }).when("/signup", {
                templateUrl: "studentSignup.html",
                controller: "studentSignupController"
            }).when("/changePassword", {
                templateUrl: "changePass.html",
                controller: "changePasswordController"
            }).when("/teacherLogin", {
                templateUrl: "teacherLogin.html",
                controller: "teacherLoginController"

            }).when("/studentDashboard", {
                templateUrl: "studentDashboard.html",
                controller: "studentDashboardController"
            })
	    .when("/homework/:homeworkid", {
                templateUrl: "quizview.html",
                controller: "homeworkController"
            })
	    .when("/homeworkResults/:homeworkid", {
                templateUrl: "postquiz.html",
                controller: "homeworkResultsController"
            }).when("/teacherDashboard", {
                templateUrl: "teacherDashboard.html",
                controller: "teacherDashboardController"

            }).when("/quiz/:hwId", {
                templateUrl: "quizview.html",
                controller: "quizViewController"

            }).when("/questionView/:hwId", {
                templateUrl: "questionview.html",
                controller: "questionViewController"

            }).when("/createClass", {
                templateUrl: "createclass.html",
                controller: "createClassController"
            }).when("/homeworkManagement/:hwId", {
                templateUrl: "homeworkManagement.html",
                controller: "homeworkManagementController"
            })
            .when("/teacherDashboard", {
                templateUrl: "teacherDashboard.html",
                controller: "teacherDashboardController"
            })
	    .when("/teacherClass/:classId", {
                templateUrl: "teacherClassSelected.html",
                controller: "teacherClassController"
            })
	    .when("/teacherClassEdit/:classId", {
                templateUrl: "teacherClassEdit.html",
                controller: "teacherClassEditController"
            })
	    .when("/teacherStudentOverview/:classId/:studentId", {
                templateUrl: "teacherStudentView.html",
                controller: "teacherStudentViewController"
            })
            .otherwise({
                redirectTo: "/badlink"
            });

    }

    angular.module("latinQuiz")
        .config(['$routeProvider', routingConfig])
        .controller("studentLoginController", studentLoginController)
        .controller("studentSignupController", studentSignupController)
        .controller("teacherLoginController", teacherLoginController)
        .controller("teacherDashboardController", teacherDashboardController)
        .controller("studentDashboardController", studentDashboardController)
        .controller("homeworkController",homeworkController)
        .controller("teacherClassEditController",teacherClassEditController)
        .controller("homeworkManagementController",homeworkManagementController)
        .controller("homeworkResultsController",homeworkResultsController)
        .controller("teacherStudentViewController",teacherStudentViewController)
        .controller("changePasswordController",changePasswordController)
	.service("exampleData", exampleData)
        .controller("questionViewController", questionViewController)
        .controller("createClassController", createClassController)
        .controller("quizViewController",quizViewController)
        .controller("teacherClassController",teacherClassController)
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
        .service("exampleData", exampleData)
        .service("latinQuizModel", latinQuizModel);

})();
