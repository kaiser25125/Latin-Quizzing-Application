//Set Up
process.env.NODE_ENV = "testing"

process.env.PORT = 8081;

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

var adminCook;

var server = require("../server.js");

var waitForXCallbacks = function(X,callback)
{
    var calls = 0;
    var error=null;
    return function(err)
    {
	if(err) { error=err}

	calls++;
	if( calls >= X)
	    {
		callback(error);
	    }
    }
}

var classNames=function(){
    return["latin 110","latin 120"];
}


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


var customCreateQuiz = function(){
   return{
       	name:"Homework 1",
		dueDate:new Date(2019,5,5,15),
		endingMessage:"Nice job dude",
		questions:[
		   
		    {
			"prompt":"What is the term for a type of grammar that describes place?",
			"type":"mc",
			"index":1,
			"options":[
			    "preposition",
			    "noun",
			    "verb"
			],
			"answer":"preposition"
		    },
             {
		 "prompt":"What is the latin word for why?",
		 "type":"fb",
		 "answer":"que",
		 "options":[],
		 "index":2
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
		"options":[],
                    "prompt":"What did you do this summer?"
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

                    }
            
		]
   } 
}


var clearAllData=function(done)
{
    var mongoose=require("mongoose");
    let User=mongoose.model("User");
    let Clss=mongoose.model("Class");
    User.remove({}).then(function(err){
	Clss.remove({},done);
    })
};

before(function(cb){
    console.log("Starting Server");
    this.baseURL="http://localhost"+process.env.PORT;
    this.server=server;
    clearAllData(cb);
});


describe("I can create an admin user",function()
{
    /*
    var morganCook;
	it("I can add alex luken",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Alex.Luke",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.loggedIn).to.equal(true);
			done();
		    });
	   });
	it("I can add morgan hites",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Morgan",lastName:"Hites",username:"morgan.hites",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			morganCook=res.headers["set-cookie"][0].split(";")[0].split("=")[1];
			expect(res.body.loggedIn).to.equal(true);
			done();
		    });
	   });
	it("I can logout morgan hites",function(done)
	   {
	       chai.request(server).post("/logout")
	       .set("Cookie","connect.sid="+morganCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.loggedIn).to.equal(false);
			done();
		    });
	   });
    */
	it("I can add david toth as an administrator",function(done)
	   {
	       chai.request(server).post("/teacherSignup")
	       .send({firstName:"david",lastName:"toth",username:"david.toth",password:"123456789",signupCode:"a",securityQuestion:"What is your name",securityAnswer:"Dave"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			adminCook=res.headers["set-cookie"][0].split(";")[0].split("=")[1];
			expect(res.body.loggedIn).to.equal(true);
			done();
		    });
	   });


})


describe("I should fail to create an admin",function()
{
    /*
	it("I will fail to recreate alex luken",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Alex.Luke",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res.body.message).to.equal("Username already exists");
			expect(res).to.have.status(200);
			done();
		    });
	   });
    */
	it("I can not add any other administrator",function(done)
	   {
	       chai.request(server).post("/teacherSignup")
	       .send({firstName:"david",lastName:"toth",username:"david.tothe",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.loggedIn).to.equal(false);
			done();
		    });
	   });
    /*
	it("I will fail to create a username with too small of a name",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Al",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("Username needs to be 6 characters or longer");
			done();
		    });
	   });
	it("I will fail to create a username without a username",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("Username is required");
			done();
		    });
	   });
	it("I will fail to create a username without a lastName",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",username:"Timothy.Mains",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("last name is required");
			done();
		    });
	   });
	it("I will fail to create a username without a password",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Timothy.Mains"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("Password is required");
			done();
		    });
	   });
	it("I will fail to create a username with too short of a password",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Timothy.Mains",password:"123"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("Password needs to be 6 characters or longer");
			done();
		    });
	   });


	it("I will fail to create a username with no firstName",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({lastName:"Luken",username:"Timothy.Mains",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("first name is required");
			done();
		    });
	   });
    */

})


var classId="";
describe("I can create a class",function()
{
    it("I can create a class",function(done)
       {
	   chai.request(server).post("/createClass")
	       .send({name:classNames()[0]})
	       .end(function(err,res)
		    {
			classId=res.body._id;
			expect(res).to.have.status(200);
			done();
		})
       })
    it("I can create a second class",function(done)
       {
	   chai.request(server).post("/createClass")
	       .send({name:classNames()[1]})
	       .end(function(err,res)
		    {
			classId=res.body._id;
			expect(res).to.have.status(200);
			done();
		    })
       })

})
describe("I should fail to create a class",function()
{
    it("it should fail to create a class with the same name",function(done)
       {
	   chai.request(server).post("/createClass")
	       .send({name:"latin 110"})
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(true);
			expect(res.body.errorMessage).to.equal("There is already a class of this name");
			done();
		    });
       });
    it("it should fail to create a class with no name",function(done)
       {
	   chai.request(server).post("/createClass")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(true);
			expect("Every class must have a name").to.equal(res.body.errorMessage);
			done();
		    });
       });

})	 


var chapter3;
describe("I can add a chapter",function()
{
    it("I should be able to add chapter 1",function(done)
       {
	   chai.request(server).post("/addChapter/"+classId)
	       .send({chapterName:"Chapter 1"})
	       .end(function(err,res)
		    {
			expect(res.body.classInfo.chapters[0].name).to.equal("Chapter 1");
			expect(res.body.classInfo.chapters[0].index).to.equal(1);
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should be able to add chapter 'vocab practice'",function(done)
       {
	   chai.request(server).post("/addChapter/"+classId)
	       .send({chapterName:"vocab practice"})
	       .end(function(err,res)
		    {
			expect(res.body.classInfo.chapters[1].name).to.equal('vocab practice');
			expect(res.body.classInfo.chapters[1].index).to.equal(2);
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should be able to add chapter 'past tense'",function(done)
       {
	   chai.request(server).post("/addChapter/"+classId)
	       .send({chapterName:"past tense"})
	       .end(function(err,res)
		    {
			expect(res.body.classInfo.chapters[2].name).to.equal('past tense');
			expect(res.body.classInfo.chapters[2].index).to.equal(3);
			expect(res).to.have.status(200);
			chapter3=res.body.classInfo.chapters[2];
			done();
		    });
       });
    it("I should be able to add chapter 'future tense'",function(done)
       {
	   chai.request(server).post("/addChapter/"+classId)
	       .send({chapterName:"future tense"})
	       .end(function(err,res)
		    {
			expect(res.body.classInfo.chapters[3].name).to.equal('future tense');
			expect(res.body.classInfo.chapters[3].index).to.equal(4);
			expect(res).to.have.status(200);
			done();
		    });
       });



})	 
    var chapsToCheck;
var chapterOneId;
describe("I should be able to create a student",function()
{
    var morganCook;
    var alexChapters;
    var alexCook;
	it("I can add alex luken",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Alex.Luke",password:"123456789",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.loggedIn).to.equal(true);
			alexCook=res.headers["set-cookie"][0].split(";")[0].split("=")[1];
			//alexChapters=res.body.message.chapters;
			alexChapters=res.body.user.chapters;
			done();
		    });
	   });
	 it("I can logout alex luken",function(done)
	   {
	       chai.request(server).post("/logout")
	       .set("Cookie","connect.sid="+alexCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.loggedIn).to.equal(false);
			done();
		    });
	   });


    it("alex luken should have all of latin 120 chapters",function(done){
	   chai.request(server).get("/classes")
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			chapsToCheck=res.body.classes[1].chapters;
			chapterOneId=res.body.classes[1].chapters[0]._id;
			expect(alexChapters).to.deep.equal(chapsToCheck);
			done();
		    });
    });
    it("I can add morgan hites",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Morgan",lastName:"Hites",username:"morgan.hites",password:"123456789",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			morganCook=res.headers["set-cookie"][0].split(";")[0].split("=")[1];
			expect(res.body.loggedIn).to.equal(true);
			expect(res.body.user.chapters).to.deep.equal(chapsToCheck);
			done();
		    });
	   });
	 it("I can logout morgan hites",function(done)
	   {
	       chai.request(server).post("/logout")
	       .set("Cookie","connect.sid="+morganCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.loggedIn).to.equal(false);
			done();
		    });
	   });

})

describe("I should fail to create a user",function()
{

	it("I will fail to recreate alex luken",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Alex.Luke",password:"123456789",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res.body.message).to.equal("Username already exists");
			expect(res).to.have.status(200);
			done();
		    });
	   });
	it("I will fail to create a username with too small of a name",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Al",password:"123456789",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("Username needs to be 6 characters or longer");
			done();
		    });
	   });
    it("I will fail to create a username without a username",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",password:"123456789",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("Username is required");
			done();
		    });
	   });
    it("I will fail to create a username without a lastName",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",username:"Timothy.Mains",password:"123456789",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("last name is required");
			done();
		    });
	   });
    it("I will fail to create a username without a password",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Timothy.Mains",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("Password is required");
			done();
		    });
	   });
    it("I will fail to create a username with too short of a password",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Timothy.Mains",password:"123",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("Password needs to be 6 characters or longer");
			done();
		    });
	   });


    it("I will fail to create a username with no firstName",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({lastName:"Luken",username:"Timothy.Mains",password:"123456789",signupCode:classId.toString()})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("first name is required");
			done();
		    });
	   });
    it("I will fail to create a user without a sign up code",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Timothy.Mains",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("You must have a signup Code");
			done();
		    });
	   });
    it("I will fail to create a user with an invalid code",function(done)
	   {
	       chai.request(server).post("/signup")
	       .send({firstName:"Alexander",lastName:"Luken",username:"Timothy.Mains",password:"123456789",signupCode:"123"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("You must have a valid signup code");
			done();
		    });
	   });



})


describe("I can modify orders of a chapter",function()
{
    var dummy={
	_id:123
    };
    var storage1;
    it("I should be able to make 'past tense' the first chapter",function(done)
       {
	   chapter3.indexChange=1;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       .send({chapterChanger:chapter3})
	       .end(function(err,res)
		    {
			storage1=res.body.classInfo.chapters;
			res.body.classInfo.chapters.forEach(function(ch){
			    if(ch._id==chapter3._id){
				chapter3=ch;
				expect(ch.index).to.equal(1);
			    }
			    if(ch.name=="vocab practice"){
				expect(ch.index).to.equal(3);
			    }
			})
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("Alex Luken should have the order changed",function(done){
    chai.request(server).get("/classStudentData/"+classId)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res.body.students[0].chapters).to.deep.equal(storage1);
			done();
		    })
    })

    it("I should be able to make 'past tense' the third chapter and the third chapter should become the second,fourth should be fourth",function(done)
       {
	   chapter3.indexChange=3;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       .send({chapterChanger:chapter3})
	       .end(function(err,res)
		    {
			res.body.classInfo.chapters.forEach(function(ch){
			    if(ch._id==chapter3._id){
				chapter3=ch;
				expect(ch.index).to.equal(3);
			    }
			    if(ch.name=="vocab practice"){
				expect(ch.index).to.equal(2);
			    }
			    if(ch.name=="future tense"){
				expect(ch.index).to.equal(4);
			    }
			})
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should be able to make 'past tense' the second chapter",function(done)
       {
	   chapter3.indexChange=2;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       .send({chapterChanger:chapter3})
	       .end(function(err,res)
		    {
			res.body.classInfo.chapters.forEach(function(ch){
			    if(ch._id==chapter3._id){
				chapter3=ch;
				expect(ch.index).to.equal(2);
			    }
			    if(ch.name=="vocab practice"){
				expect(ch.index).to.equal(3);
			    }
			    if(ch.name=="future tense"){
				expect(ch.index).to.equal(4);
			    }
			})
			expect(res).to.have.status(200);
			done();
		    });
       });



    it("I should cause an error when sending no chapter",function(done)
       {
	   chapter3.indexChange=0;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       //.send({chapterChanger:chapter3})
	       .send({})
	       .end(function(err,res)
		    {

			/*
			expect(res.body.chapters[0].name).to.equal("Chapter 1");
			expect(res.body.chapters[0].order).to.equal(0);
			*/
			expect(res.body.error).to.equal(true);
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should cause an error when sending a non-existent chapter",function(done)
       {
	   chapter3.indexChange=0;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       //.send({chapterChanger:chapter3})
	       .send({chapterChanger:dummy})
	       .end(function(err,res)
		    {

			/*
			expect(res.body.chapters[0].name).to.equal("Chapter 1");
			expect(res.body.chapters[0].order).to.equal(0);
			*/
			expect(res.body.error).to.equal(true);
			expect(res).to.have.status(200);
			done();
		    });
       });


})


describe("I can add homeworks to chapters",function()
{

    it("I should be able to add a homework to a chapter of a class",function(done)
       {
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:customCreateQuiz()})
	       .set("Cookie","connect.sid="+adminCook+";")
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(false);
			var i=0;
			expect(res.body.chapter.homework[0].name).to.equal(customCreateQuiz().name);
			expect(res.body.chapter.homework[0].dueDate.time).to.deep.equal(customCreateQuiz().dueDate.time);
			expect(res.body.chapter.homework[0].endingMessage).to.equal(customCreateQuiz().endingMessage);
			res.body.chapter.homework[0].questions.forEach(function(quest){
			    expect(quest.prompt).to.equal(customCreateQuiz().questions[i].prompt);
			    expect(quest.qType).to.equal(customCreateQuiz().questions[i].type);
			    expect(quest.index).to.equal(customCreateQuiz().questions[i].index);
			    expect(quest.options).to.deep.equal(customCreateQuiz().questions[i].options);
			    if(quest.qType=="ma"){
				expect(quest.answers).to.deep.equal(customCreateQuiz().questions[i].answer);
			    }
			    else{
				expect(quest.answer).to.deep.equal(customCreateQuiz().questions[i].answer);
			    }
			    i++;
			});
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should be able to add another homework to the same chapter",function(done)
       {
	   var hw=customCreateQuiz();
	   hw.name="homework 2"
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:hw})
	       .set("Cookie","connect.sid="+adminCook+";")
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(false);
			var i=0;
			expect(res.body.chapter.homework[1].name).to.equal(hw.name);
			expect(res.body.chapter.homework[1].dueDate.time).to.deep.equal(customCreateQuiz().dueDate.time);
			expect(res.body.chapter.homework[1].endingMessage).to.equal(customCreateQuiz().endingMessage);
			res.body.chapter.homework[1].questions.forEach(function(quest){
			    expect(quest.prompt).to.equal(customCreateQuiz().questions[i].prompt);
			    expect(quest.qType).to.equal(customCreateQuiz().questions[i].type);
			    expect(quest.index).to.equal(customCreateQuiz().questions[i].index);
			    expect(quest.options).to.deep.equal(customCreateQuiz().questions[i].options);
			    if(quest.qType=="ma"){
				expect(quest.answers).to.deep.equal(customCreateQuiz().questions[i].answer);
			    }
			    else{
				expect(quest.answer).to.deep.equal(customCreateQuiz().questions[i].answer);
			    }
			    i++;
			});
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should fail to add a homework without a name",function(done)
       {
	   var hw=customCreateQuiz();
	   delete hw["name"];
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:hw})
	       .set("Cookie","connect.sid="+adminCook+";")
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(true);
			expect(res.body.errorMessage).to.equal("Every Homework must have a name");
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should fail to add a homework without an ending message",function(done)
       {
	   var hw=customCreateQuiz();
	   delete hw["endingMessage"];
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:hw})
	       .set("Cookie","connect.sid="+adminCook+";")
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(true);
			expect(res.body.errorMessage).to.equal("Every Homework must have an endingMessage");
			expect(res).to.have.status(200);
			done();
		    });
       });

    it("I should fail to add a chapter without a due date",function(done)
       {
	   var hw=customCreateQuiz();
	   delete hw["dueDate"];
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:hw})
	       .set("Cookie","connect.sid="+adminCook+";")
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(true);
			expect(res.body.errorMessage).to.equal("Every Homework must have a Due Date");
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should fail to add a homework where a question is missing a type",function(done)
       {
	   var hw=customCreateQuiz();
	   delete hw.questions[0].type;
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:hw})
	       .set("Cookie","connect.sid="+adminCook+";")
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(true);
			expect(res.body.errorMessage).to.equal("Every question must have a type");
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should fail to add a homework where a question is missing a prompt",function(done)
       {
	   var hw=customCreateQuiz();
	   delete hw.questions[0].prompt;
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:hw})
	       .set("Cookie","connect.sid="+adminCook+";")
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(true);
			expect(res.body.errorMessage).to.equal("Every question must have a prompt");
			expect(res).to.have.status(200);
			done();
		    });
       });

})
var class1;
describe("I should be able to get classes",function()
{
    it("I should be able to get all of the class names",function(done)
       {
	   chai.request(server).get("/classes")
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			class1=res.body.classes[0];
			expect(res.body.error).to.equal(false);
			done();
		    });
       });
    it("it should fail to get the classes when there is no cookie",function(done)
       {
	   chai.request(server).get("/classes")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(true);
			expect(res.body.message).to.equal("You are not signed in as an administrator");
			done();
		    });
       });

})

describe("I should be able to change classes",function()
{
    it("I should be able to rename a class",function(done)
       {
	   chai.request(server).post("/renameClass/"+class1._id)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({newName:"ltn 110"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.classes[0].name).to.equal("ltn 110");
			expect(res.body.error).to.equal(false);
			done();
		    });
       });
    it("I should fail to rename the class when I'm not signed in as administrator",function(done)
       {
	   chai.request(server).post("/renameClass/"+class1._id)
	       .send({newName:"ltn 120"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(true);
			done();
		    });
       });
    it("I should be able to set a class to be hidden",function(done)
       {
	   chai.request(server).post("/hideClass/"+class1._id)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.classes[0].oldStatus).to.equal(1);
			done();
		    });
       });
    it("I should be able to set a class to be not hidden",function(done)
       {
	   chai.request(server).post("/hideClass/"+class1._id)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.classes[0].oldStatus).to.equal(0);
			done();
		    });
       });

    it("I should fail to hide a class when not signed in",function(done)
       {
	   chai.request(server).post("/hideClass/"+class1._id)
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(true);
			done();
		    });
       });

    it("I should be able to delete a class",function(done)
       {
	   chai.request(server).post("/deleteClass/"+class1._id)
	       .send({})
	       .set("Cookie","connect.sid="+adminCook+";")
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(false);
			expect(res.body.classes.length).to.equal(1);
			expect(res.body.classes[0]._id).to.not.equal(class1._id);
			done();
		    });
       });




})

describe("Recovery Password Page",function()
{
 it("I should be able change my password properly",function(done)
       {
		chai.request(server).post("/recoverTeacherPassword")
	       .send({recoverAnswer:"Dave",newPassword:"abc1234"})

	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.displayMessage).to.equal("Password was changed");
			expect(res.body.displayType).to.equal("confirmMessage");
			done();
		    });
	});
 it("I should not be able to change my password if the security answer is wrong",function(done)
       {
		chai.request(server).post("/recoverTeacherPassword")
	       .send({recoverAnswer:"Alex",newPassword:"abc1234"})

	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.displayMessage).to.equal("The answer was incorrect");
			expect(res.body.displayType).to.equal("warningMessage");
			done();
		    });
	});
it("I should not be able to change my password if I don't enter in a password",function(done)
       {
		chai.request(server).post("/recoverTeacherPassword")
	       .send({recoverAnswer:"Dave"})

	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.displayMessage).to.equal("Password is required");
			expect(res.body.displayType).to.equal("warningMessage");
			done();
		    });
	});
it("I should not be able to change my password if I don't enter in a password",function(done)
       {
		chai.request(server).post("/recoverTeacherPassword")
	       .send({recoverAnswer:"Dave",newPassword:"abc"})

	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.displayMessage).to.equal("Password needs to be 6 characters or longer");
			expect(res.body.displayType).to.equal("warningMessage");
			done();
		    });
	});

})
describe("Change Password Page",function()
{
    
    it("I should be able to change my password properly",function(done)
       {
		chai.request(server).post("/changeTeacherPassword")
	       .send({oldPassword:"abc1234",newPassword:"abc12345"})

	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.displayMessage).to.equal("Password was changed");
			expect(res.body.displayType).to.equal("confirmMessage");
			done();
		    });
	});
    it("I should not be able to change my password if I enter the wrong old password",function(done)
       {
		chai.request(server).post("/changeTeacherPassword")
	       .send({oldPassword:"abc1234",newPassword:"abc12345"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.displayMessage).to.equal("Enter in correct old password");
			expect(res.body.displayType).to.equal("warningMessage");
			done();
		    });
	});
     it("I should not be able to change my password if I don't enter my old password",function(done)
       {
		chai.request(server).post("/changeTeacherPassword")
	       .send({oldPassword:"abc12345",newPassword:""})

	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.displayMessage).to.equal("Password is required");
			expect(res.body.displayType).to.equal("warningMessage");
			done();
		    });
	});
})

describe("teacher edit page",function()
{
    it("I should be able to get all of the students properly",function(done)
       {
	   chai.request(server).get("/classStudentData/"+classId)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			var names=[];
			res.body.students.forEach(function(st){
			    names.push(st.username);
			})
			expect(names).to.contain("Alex.Luke");
			expect(names).to.contain("morgan.hites");
			/*
			  expect(res.body.displayMessage).to.equal("Password was changed");
			  expect(res.body.displayType).to.equal("confirmMessage");
			*/
			done();
		    });
       });
    
    it("I should fail to get all of the students properly if I am not signed in",function(done)
       {
	   chai.request(server).get("/classStudentData/"+classId)
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(true);
			expect(res.body.message).to.equal("You are not signed in as an administrator");
			done();
		    });
       });
    it("I should be able to delete a chapter",function(done)
       {
	   var chs;
	   chai.request(server).post("/deleteChapter/"+classId+"/"+chapter3._id)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			res.body.classInfo.chapters.forEach(function(ch){
			    expect(ch._id).to.not.equal(chapter3._id);
			})
			chs=res.body.classInfo.chapters;
			chai.request(server).get("/classStudentData/"+classId)
			    .set("Cookie","connect.sid="+adminCook+";")
			    .send({})
			    .end(function(err,res)
				 {
				     res.body.students.forEach(function(stud){
					 expect(stud.chapters).to.deep.equal(chs);
				     });
				     
				     done();
				 });
		    });
       });
    var cId;
    it("I can delete a chapter even when there are no students",function(done)
       {
	   chai.request(server).post("/createClass")
	       .send({name:"latin 500"})
	       .end(function(err,res)
		    {
			cId=res.body._id;
			expect(res).to.have.status(200);
			chai.request(server).post("/addChapter/"+cId)
			    .send({chapterName:"Chapter 1"})
			    .end(function(err,res)
				 {
				     expect(res.body.classInfo.chapters[0].name).to.equal("Chapter 1");
				     expect(res.body.classInfo.chapters[0].index).to.equal(1);
				     expect(res).to.have.status(200);
				     var i=res.body.classInfo.chapters[0]._id;
				     chai.request(server).post("/deleteChapter/"+cId+"/"+i)
					 .set("Cookie","connect.sid="+adminCook+";")
					 .send({})
					 .end(function(err,res)
					      {
						  expect(res).to.have.status(200);
						  expect(res.body.classInfo.chapters.length).to.equal(0);
						  done();
					      });

				 });
		    })



       })
    it("it will not creash when recieving bad info",function(done)
       {
	   chai.request(server).post("/deleteChapter/"+cId+"/"+5)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(true);
			done();
		    });
       })

    

})
describe("Teacher class edit controller",function()
{
    var studentForResetPass;
    it("need to get students",function(done)
       {
	   chai.request(server).get("/classStudentData/"+classId)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			var names=[];
			res.body.students.forEach(function(st){
			    names.push(st.username);
			})
			expect(names).to.contain("Alex.Luke");
			expect(names).to.contain("morgan.hites");
			studentForResetPass=res.body.students.find(function(st){
			    return st.username=="morgan.hites";
			})
			/*
			  expect(res.body.displayMessage).to.equal("Password was changed");
			  expect(res.body.displayType).to.equal("confirmMessage");
			*/
			done();
		    });
       });

    it("I should be able to change a students password",function(done)
       {
		chai.request(server).post("/resetStudent/"+studentForResetPass._id)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			chai.request(server).post("/studentLogin")
			.send({username:studentForResetPass.username,password:"latin1234"})
			.end(function(err,res){
			    expect(res.body.loggedIn).to.equal(true);
			    done();
			})
		    });
       });
    it("I should be able to change a students password",function(done)
       {
		chai.request(server).post("/resetStudent/"+studentForResetPass._id)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			chai.request(server).post("/studentLogin")
			.send({username:studentForResetPass.username,password:"latin1234"})
			.end(function(err,res){
			    expect(res.body.loggedIn).to.equal(true);
			    done();
			})
		    });
	});
    it("I should fail to reset the password of a student when I am not signed in as admin",function(done)
       {
		chai.request(server).post("/resetStudent/"+studentForResetPass._id)
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.message).to.equal("You are not signed in as an administrator");
			done()
		    });
	});
    it("I should delete a student",function(done)
       {
		chai.request(server).post("/deleteStudent/"+studentForResetPass.signupCode+"/"+studentForResetPass._id)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(false);
			expect(res.body.message).to.equal("The student was deleted");
			done()
		    });
	});
    it("I should be able to change the due date of a homework",function(done)
       {
	   chai.request(server).get("/classes")
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			var bd=res.body;
			var classId=res.body.classes[0]._id;
			var dt=new Date(1,10,1);
			chai.request(server).post("/newHomework/"+classId+"/"+res.body.classes[0].chapters[0]._id)
			    .send({newHw:customCreateQuiz()})
			    .set("Cookie","connect.sid="+adminCook+";")
			    .end(function(err,res){
				var hwDataToChange=[
				    {
					chapterId:bd.classes[0].chapters[0]._id,
					hwId:res.body.chapter.homework[0]._id,
					newDate:dt
				    }
				];

				chai.request(server).post("/setDate/"+classId)
				    .set("Cookie","connect.sid="+adminCook+";")
				    .send({hwDataToChange})
				    .end(function(err,res){
					expect(res.body.classInfo.chapters[0].homework[0].dueDate.year).to.equal(dt.year);
					expect(res.body.classInfo.chapters[0].homework[0].dueDate.month).to.equal(dt.month);
					expect(res.body.classInfo.chapters[0].homework[0].dueDate.day).to.equal(dt.day);
					done();
				    })
				})
			
		    });
       });
    it("it should fail to set the date when there is no cookies",function(done)
       {
	   chai.request(server).post("/setDate/"+classId)
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(true);
			expect(res.body.message).to.equal("You are not signed in as an administrator");
			done();
		    });
       });
    it("it should fail gracefully to try to set the due date",function(done)
       {
	   chai.request(server).post("/setDate/"+classId)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			expect(res.body.error).to.equal(true);
			done();
		    });
       });
    var chsStored;
    it("I should be able to delete a homework",function(done)
       {
	   chai.request(server).get("/classes")
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			var bd=res.body;
			var classId=res.body.classes[0]._id;
			var chapterId=res.body.classes[0].chapters[0]._id;
			var homeworkId=res.body.classes[0].chapters[0].homework[0]._id;
			chai.request(server).post("/newHomework/"+classId+"/"+chapterId)
			    .send({newHw:customCreateQuiz()})
			    .set("Cookie","connect.sid="+adminCook+";")
			    .end(function(err,res){

				chai.request(server).post("/newHomework/"+classId+"/"+chapterId)
				    .send({newHw:customCreateQuiz()})
				    .set("Cookie","connect.sid="+adminCook+";")
				    .end(function(err,res){
			
					chai.request(server).post("/deleteHomework/"+classId+"/"+chapterId+"/"+homeworkId)
					    .send({})
					    .set("Cookie","connect.sid="+adminCook+";")
					    .end(function(err,res){
						res.body.classInfo.chapters[0].homework.forEach(function(hw){
						    expect(hw._id).to.not.equal(homeworkId);
						})
						chsStored=res.body.classInfo.chapters;
						done();
					    })
				    })
			    })
		    })
       });		
    it("I should be able to get student information",function(done)
       {
	   chai.request(server).get("/classStudentData/"+classId)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res){
		   res.body.students.forEach(function(stud){
		       stud.chapters.forEach(function(ch){
			   ch.homework.forEach(function(hw){
			       hw.questions.forEach(function(quest){
				   delete quest.userAnswers;
				   delete quest.modified;
			       })
			   })
		       })
		       expect(stud.chapters).to.deep.equal(chsStored);
		   })
		   done();
	       })
       })



    /*
    it("I should be able to make 'past tense' the first chapter",function(done)
    {
	   chapter3.indexChange=1;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       .send({chapterChanger:chapter3})
	       .end(function(err,res)
		    {
			storage1=res.body.classInfo.chapters;
			res.body.classInfo.chapters.forEach(function(ch){
			    if(ch._id==chapter3._id){
				chapter3=ch;
				expect(ch.index).to.equal(1);
			    }
			    if(ch.name=="vocab practice"){
				expect(ch.index).to.equal(3);
			    }
			})
			expect(res).to.have.status(200);
			done();
		    });
       });

       */

})

var homework1;
var alexCook;
describe("Student dashboard information",function()
{
    var alexChapters;
    it("getting students",function(done)
       {
	   chai.request(server).get("/classStudentData/"+classId)
	       .set("Cookie","connect.sid="+adminCook+";")
	       .send({})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			var alex=res.body.students.find(function(st){
			    return st.username="Alex.Luke";
			})
			alexChapters=alex.chapters;
			/*
			  expect(res.body.displayMessage).to.equal("Password was changed");
			  expect(res.body.displayType).to.equal("confirmMessage");
			*/
			done();
		    });
       });


    it("I should be able to sign in as alex luken",function(done){
	chai.request(server).post("/studentLogin")
	    .send({username:"Alex.Luke",password:"123456789"})
	    .end(function(err,res){
		alexCook=res.headers["set-cookie"][0].split(";")[0].split("=")[1];		   
		expect(res.body.loggedIn).to.equal(true);
		done();
	    })
    })

    it("I should be able to get alex luken dashboard information",function(done)
       {
	   chai.request(server).get("/studentDashboardInformation")
	       .set("Cookie","connect.sid="+alexCook+";")
	       .send({})
	       .end(function(err,res){
		   homework1=res.body.chapters[0].homework[0];
		   res.body.chapters.forEach(function(ch){
		       delete ch.status;
		       ch.homework.forEach(function(hw){
			   delete hw.status;
		       })
		   })
		   expect(res.body.chapters).to.deep.equal(sanatizeStudentAnswers(alexChapters));
		   done();
	       })
       })
    it("I should be able to get alex luken quiz information",function(done)
       {
	   chai.request(server).get("/quiz/"+homework1._id)
	       .set("Cookie","connect.sid="+alexCook+";")
	       .send({})
	       .end(function(err,res){
		   var re=res.body.hw;
		   delete re.status;
		   delete re.startDate;
		   expect(re).to.deep.equal(alexChapters[0].homework[0]);
		   done();
	       })
       })

    it("I should be able to change the password of alex luken",function(done)
       {
	   chai.request(server).post("/changePassword")
	       .set("Cookie","connect.sid="+alexCook+";")
	       .send({
		   oldPassword:"123456789",
		   newPassword:"12345678",
		   reenterPassword:"12345678"
	       })
	       .end(function(err,res){
		   expect(res).to.have.status(200);
		   expect(res.body.error).to.equal(false);
		   chai.request(server).post("/logout")
		       .set("Cookie","connect.sid="+alexCook+";")
		       .send({})
		       .end(function(err,res)
			    {
				chai.request(server).post("/studentLogin")
				    .send({username:"Alex.Luke",password:"12345678"})
				    .end(function(err,res){
					expect(res.body.loggedIn).to.equal(true);
					alexCook=res.headers["set-cookie"][0].split(";")[0].split("=")[1];
					done();
				    })
			    })
	       })
       })
})
describe("Student dashboard information",function()
{

  it("I should be able to take a quiz",function(done)
       {
	   chai.request(server).get("/quiz/"+homework1._id)
	       .set("Cookie","connect.sid="+alexCook+";")
	       .send({})
	       .end(function(err,res){
		   var newHw=res.body.hw;
		   newHw.questions.forEach(function(quest){
		       quest.flag=false;
		       if(quest.qType!="ma"){
			   quest.response="asdlkfj";
		       }
		       else{
			   quest.response=["red","blue"];
		       }
		   })
		   chai.request(server).post("/newStudentHomework/")
		       .set("Cookie","connect.sid="+alexCook+";")
		       .send({HW:newHw})
		       .end(function(err,res){
			   res.body.homework.questions.forEach(function(que){
			       if(que.qType=="ma"){
				   expect(que.userAnswers).to.deep.equal(["red","blue"]);
			       }
			       else{
				   expect(que.userAnswer).to.equal("asdlkfj");
			       }
			   })
			   done();
		       })
	       })
       })
    var storHw;
  it("I should be able to see the results of a quiz",function(done)
       {
	   chai.request(server).get("/homeworkResults/"+homework1._id)
	       .set("Cookie","connect.sid="+alexCook+";")
	       .send({})
	       .end(function(err,res){
		   console.log("js");
		   console.log(res.body);
		   storHw=res.body.results;
		   console.log("js");
		   console.log("body");
		   res.body.results.questions.forEach(function(quest){
		       if(quest.qType=="la"){
			   expect(quest.correct).to.equal(true);
		       }
		       else{
			   expect(quest.correct).to.equal(false);
		       }
		   })
		   console.log("body");
		   expect(res.body.results.status).to.equal("Complete");
		   done();
	       })
       })

})

describe("Teacher class controller",function()
{
    it("I should be able to get data",function(done){
	chai.request(server).get("/classData/"+classId)
	    .set("Cookie","connect.sid="+adminCook+";")
	    .send({})
	    .end(function(err,res){
		expect(res.body.classData.signupCode).to.equal(classId);
		expect(res.body.classData.name).to.equal(classNames()[1]);
		var names=[];
		res.body.classData.chapters.forEach(function(ch){
		    names.push(ch.name);
		    ch.homework.forEach(function(hw){
			expect(hw.name).to.equal("Homework 1");
			expect(hw.student[0].name).to.equal("Alexander Luken");
			expect(hw.flag.length).to.equal(customCreateQuiz().questions.length);
			expect(hw.correctFraction.length).to.equal(customCreateQuiz().questions.length);
		    })
		})
		expect(names).to.contain("Chapter 1");
		expect(names).to.contain("vocab practice");
		expect(names).to.contain("future tense");
		done();
	    })
    })
})
describe("Teacher student overview controller",function()
{

  it("I should be able to get data",function(done){
	chai.request(server).get("/studentOverview/"+classId)
	    .set("Cookie","connect.sid="+adminCook+";")
	    .send({})
	    .end(function(err,res){
		console.log("five");
		console.log(res.body);
		console.log("four");
		console.log(res.body.studentInfo[0].chapters[0].homework[0]._id);
		console.log("five");
		paraseId=res.body.studentInfo[0].chapters[0].homework[0]._id;
		expect(res.body.studentInfo[0].total).to.not.be.undefined;
		expect(res.body.studentInfo[0].completed).to.not.be.undefined;
		expect(res.body.studentInfo[0].chapters.length).to.equal(3);
		done();
	    })
  })
})
describe("Teacher question overview controller",function()
{
    var parseId;
    it("I should be able to get data for questions",function(done){
	chai.request(server).get("/studentOverview/"+classId)
	    .set("Cookie","connect.sid="+adminCook+";")
	    .send({})
	    .end(function(err,res){
		parseId=res.body.studentInfo[0].chapters[0].homework[0]._id;
		chai.request(server).get("/hwResults/"+classId+"/"+parseId)
		    .set("Cookie","connect.sid="+adminCook+";")
		    .send({})
		    .end(function(err,res){
			console.log("resss");
			console.log(res.body);
			console.log(res.body.homework.questions);
			
			res.body.homework.questions.forEach(function(ques,indx){
			    expect(ques.prompt).to.equal(customCreateQuiz().questions[indx].prompt);
			    expect(ques.type).to.equal(customCreateQuiz().questions[indx].type);
			    if(ques.type!="la"){
				if(ques.type=="ma"){
				    expect(ques.answer.split(",")).to.deep.equal(customCreateQuiz().questions[indx].answer);
				}
				else{
				    expect(ques.answer).to.equal(customCreateQuiz().questions[indx].answer);
				}
			    }
			    //expect(ques.answer).to.equal(customCreateQuiz().questions[indx].answer);
			})
			console.log("resss");
			done();
		    })
		
	    })
    })
})


describe("Editing homework features",function()
{
    it("I should be able to get data for questions",function(done){
	chai.request(server).get("/createHW/"+classId+"/"+homework1._id)
	    .set("Cookie","connect.sid="+adminCook+";")
	    .send({})
	    .end(function(err,res){
		expect(res.body.generatedHomework.name).to.equal("Homework 1");
		expect(res.body.generatedHomework.endingMessage).to.equal("Nice job dude");
		console.log(res.body.generatedHomework.questions);
		res.body.generatedHomework.questions.forEach(function(quest,ind){
		    expect(quest.prompt).to.equal(customCreateQuiz().questions[ind].prompt);
		})
		done();
	    })
    })
    it("I should be able to edit a question",function(done){
	chai.request(server).get("/createHW/"+classId+"/"+homework1._id)
	    .set("Cookie","connect.sid="+adminCook+";")
	    .send({})
	    .end(function(err,res){
		var homework=res.body.generatedHomework;
		homework.questions.splice(0,1);
		console.log("haws");
		console.log(chapterOneId);
		console.log(homework);
		homework.questions.forEach(function(quest){
		    quest.type=quest.qType;
		})
		console.log("haws");
		chai.request(server).post("/newHomework/"+classId+"/"+chapterOneId)
		    .set("Cookie","connect.sid="+adminCook+";")
		    .send({newHw:homework})
		    .end(function(err,res){
			console.log("res.body");
			console.log(res.body.chapter.homework);
			expect(res.body.chapter.homework[0].questions.length).to.equal(4);
			res.body.chapter.homework[0].questions.forEach(function(quest){
			    expect(quest.prompt).to.not.equal(customCreateQuiz().questions[0].prompt);
			    expect(quest.options).to.not.equal(customCreateQuiz().questions[0].options);
			})
			console.log("res.body");
			done();
		    })		
	    })
    })

})
