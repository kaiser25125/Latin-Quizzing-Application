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

var customCreateQuiz = function(){
   return{
       	name:"Homework 1",
		dueDate:new Date(2015,5,5,15),
		endingMessage:"Nice job dude",
		questions:[
		   
		    {
			"prompt":"What is the term for a type of grammar that describes place?",
			"type":"mc",
			"order":1,
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
		 "order":2
	     },
		   
              {   
                  "order":3,
                    "type":"tf",//
                    "prompt":"Morgan likes age of empires",
                    "options":[
                        "True",
                        "False"   
                    ],
                    "answer":"True"
              },
            {
                    "order":4,
                    "type":"la",
		"options":[],
                    "prompt":"What did you do this summer?"
                },
             {
			"order":5,
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

var expectToMatchFields = function(original,wanted,fields)
{

    fields.forEach(function(propertyName)
    {
	expect(original).to.have.property(propertyName);

	if(Array.isArray(original[propertyName]) && Array.isArray(wanted[propertyName]))
	{
	    let w = wanted[propertyName];
	    original[propertyName]
		.forEach(function(x,index)
			 {
			     expect(x).is.deep.equal(w[index]);
			 });
	}
	else
	{
	    expect(original[propertyName]).is.deep.equal(wanted[propertyName]);
	}

    });
}

var clearAllData=function(done)
{
    var mongoose=require("mongoose");
    let User=mongoose.model("User");
    let Clss=mongoose.model("Class");
    User.remove({},done);
    Clss.remove({},done);
};

before(function(cb){
    console.log("Starting Server");
    this.baseURL="http://localhost"+process.env.PORT;
    this.server=server;
    clearAllData(cb);
});


describe("I can create a user",function()
{
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
	it("I can add david toth as an administrator",function(done)
	   {
	       chai.request(server).post("/teacherSignup")
	       .send({firstName:"david",lastName:"toth",username:"david.toth",password:"123456789"})
	       .end(function(err,res)
		    {
			expect(res).to.have.status(200);
			adminCook=res.headers["set-cookie"][0].split(";")[0].split("=")[1];
			expect(res.body.loggedIn).to.equal(true);
			done();
		    });
	   });


})


describe("I should fail to create a user",function()
{
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
			expect(res.body.chapters[0].name).to.equal("Chapter 1");
			expect(res.body.chapters[0].order).to.equal(1);
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
			expect(res.body.chapters[1].name).to.equal('vocab practice');
			expect(res.body.chapters[1].order).to.equal(2);
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
			expect(res.body.chapters[2].name).to.equal('past tense');
			expect(res.body.chapters[2].order).to.equal(3);
			expect(res).to.have.status(200);
			chapter3=res.body.chapters[2];
			done();
		    });
       });
    it("I should be able to add chapter 'future tense'",function(done)
       {
	   chai.request(server).post("/addChapter/"+classId)
	       .send({chapterName:"future tense"})
	       .end(function(err,res)
		    {
			expect(res.body.chapters[3].name).to.equal('future tense');
			expect(res.body.chapters[3].order).to.equal(4);
			expect(res).to.have.status(200);
			done();
		    });
       });



})	 

describe("I can modify orders of a chapter",function()
{
    var dummy={
	_id:123
    };
    it("I should be able to make 'past tense' the first chapter",function(done)
       {
	   chapter3.orderChanger=1;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       .send({chapterChanger:chapter3})
	       .end(function(err,res)
		    {
			res.body.chapters.forEach(function(ch){
			    if(ch._id==chapter3._id){
				chapter3=ch;
				expect(ch.order).to.equal(1);
			    }
			    if(ch.name=="vocab practice"){
				expect(ch.order).to.equal(3);
			    }
			})
			expect(res).to.have.status(200);
			done();
		    });
       });

    it("I should be able to make 'past tense' the third chapter and the third chapter should become the second,fourth should be fourth",function(done)
       {
	   chapter3.orderChanger=3;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       .send({chapterChanger:chapter3})
	       .end(function(err,res)
		    {
			res.body.chapters.forEach(function(ch){
			    if(ch._id==chapter3._id){
				chapter3=ch;
				expect(ch.order).to.equal(3);
			    }
			    if(ch.name=="vocab practice"){
				expect(ch.order).to.equal(2);
			    }
			    if(ch.name=="future tense"){
				expect(ch.order).to.equal(4);
			    }
			})
			expect(res).to.have.status(200);
			done();
		    });
       });
    it("I should be able to make 'past tense' the second chapter",function(done)
       {
	   chapter3.orderChanger=2;
	   chai.request(server).post("/changeChapterOrder/"+classId)
	       .send({chapterChanger:chapter3})
	       .end(function(err,res)
		    {
			res.body.chapters.forEach(function(ch){
			    if(ch._id==chapter3._id){
				chapter3=ch;
				expect(ch.order).to.equal(2);
			    }
			    if(ch.name=="vocab practice"){
				expect(ch.order).to.equal(3);
			    }
			    if(ch.name=="future tense"){
				expect(ch.order).to.equal(4);
			    }
			})
			expect(res).to.have.status(200);
			done();
		    });
       });



    it("I should cause an error when sending no chapter",function(done)
       {
	   chapter3.orderChanger=0;
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
	   chapter3.orderChanger=0;
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
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(false);
			var index=0;
			expect(res.body.chapter.homework[0].name).to.equal(customCreateQuiz().name);
			expect(res.body.chapter.homework[0].dueDate.time).to.deep.equal(customCreateQuiz().dueDate.time);
			expect(res.body.chapter.homework[0].endingMessage).to.equal(customCreateQuiz().endingMessage);
			res.body.chapter.homework[0].questions.forEach(function(quest){
			    expect(quest.prompt).to.equal(customCreateQuiz().questions[index].prompt);
			    expect(quest.qType).to.equal(customCreateQuiz().questions[index].type);
			    expect(quest.order).to.equal(customCreateQuiz().questions[index].order);
			    expect(quest.options).to.deep.equal(customCreateQuiz().questions[index].options);
			    if(quest.qType=="ma"){
				expect(quest.answers).to.deep.equal(customCreateQuiz().questions[index].answer);
			    }
			    else{
				expect(quest.answer).to.deep.equal(customCreateQuiz().questions[index].answer);
			    }
			    index++;
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
	       .end(function(err,res)
		    {
			expect(res.body.messageError).to.equal(false);
			var index=0;
			expect(res.body.chapter.homework[1].name).to.equal(hw.name);
			expect(res.body.chapter.homework[1].dueDate.time).to.deep.equal(customCreateQuiz().dueDate.time);
			expect(res.body.chapter.homework[1].endingMessage).to.equal(customCreateQuiz().endingMessage);
			res.body.chapter.homework[1].questions.forEach(function(quest){
			    expect(quest.prompt).to.equal(customCreateQuiz().questions[index].prompt);
			    expect(quest.qType).to.equal(customCreateQuiz().questions[index].type);
			    expect(quest.order).to.equal(customCreateQuiz().questions[index].order);
			    expect(quest.options).to.deep.equal(customCreateQuiz().questions[index].options);
			    if(quest.qType=="ma"){
				expect(quest.answers).to.deep.equal(customCreateQuiz().questions[index].answer);
			    }
			    else{
				expect(quest.answer).to.deep.equal(customCreateQuiz().questions[index].answer);
			    }
			    index++;
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
	   console.log("hw");
	   console.log(hw);
	   console.log("hw");
	   delete hw.questions[0].type;
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:hw})
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
	   console.log("hw");
	   console.log(hw);
	   console.log("hw");
	   delete hw.questions[0].prompt;
	   chai.request(server).post("/newHomework/"+classId+"/"+chapter3._id)
	       .send({newHw:hw})
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

