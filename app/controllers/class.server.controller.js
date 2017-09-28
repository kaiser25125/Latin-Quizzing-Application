// Load the module dependencies
var User = require('mongoose').model('User');
var passport = require('passport');
var clss =require("mongoose").model("Class");

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


//see user.server.controller
var validateUser=function(user,res){
    if(typeof(user) =="undefined"){
	res.json({
	    error:true,
	    message:"You are not signed in as an administrator"
	})
	return false;
    }
    if(!user.administrator){
	res.json({
	    error:true,
	    message:"You are not signed in as an administrator"
	})
	return false;
    }
    return true;
}
//see user.server.controller
var updateStudents=function(use,done,callback,homeworkForChange){   
    var acc=0;
    User.find({administrator:false},function(err,studs){
	if(studs.length<=0){
	    if(callback!=undefined){
		callback(use,done);
	    }
	}
	studs.forEach(function(stud){
	    stud.chapters.forEach(function(chap){
		chap.homework.forEach(function(hw){
		    var operator=true;
		    hw.questions.forEach(function(quest){
			if((quest.userAnswer==undefined) && (quest.userAnswers.length==0) &&(!quest.modified)){
			    operator=false;
			}
		    })
		    if(operator==false){
			hw.status=statuses.didNotComplete;
		    }
		    else{
			hw.status=statuses.Complete;
		    }
		    if((hw.dueDate.getTime()>(new Date()).getTime()) && (hw.status==statuses.didNotComplete) && (hw.status!=statuses.Complete)){
			hw.status=statuses.toBeCompleted;
		    }
		})
		chap.status="";
		chap.homework.forEach(function(hw){
		    if(hw.status==statuses.didNotComplete){
			chap.status=statuses.didNotComplete;
		    }
		    else if(chap.status!=statuses.didNotComplete && hw.status==statuses.toBeCompleted){
			chap.status=statuses.toBeCompleted;
		    }
		    if(chap.status!=statuses.didNotComplete && chap.status!=statuses.toBeCompleted){
			chap.status=statuses.Complete;
		    }
		})
	    })
	    stud.save(function(err){
		acc++;
		if(err){
		    return next(err);
		}
		if(acc==studs.length){
		    if(homeworkForChange==undefined){
			if(callback!=undefined){
			    callback(use,done);
			}
		    }
		    else{
			callback(use,done,homeworkForChange);
		    }
		}
	    })
	})
    })
}
/*
  Helper function that gets the number of students who compelted a homework
  users is an array of users
  hwId is the homework to be parsing through
*/
var getNumCompleted=function(users,hwId){
    //accs
    var returnValue=0;
    var total=0;
    //for each user
    users.forEach(function(stud){
	var result;
	//check for the homework
	stud.chapters.forEach(function(ch){
	    var choice=ch.homework.find(function(hw){
		return hw._id.toString()==hwId.toString();
	    })
	    if(choice!=undefined){
		result=choice;
	    }
	})
	//if the user completed it 
	if(result.status==statuses.Complete){
	    returnValue++;
	}
	total=total+1;
    })
    //ret is the number who completed it
    //ttl is the total number of students
    return {
	ret:returnValue,
	    ttl:total
    };
}
/*
  Response code returns an array for every question of a homework
  usr is the usr who is being checked
  hw is the homework for which the usr is being checked
*/
var getResponseCode=function(hw,usr){
    var response;
    //get the homework
    usr.chapters.forEach(function(ch){
	var choice=ch.homework.find(function(homew){
	    var firstId=hw._id.toString();
	    var secondId=homew._id.toString();
	    return firstId==secondId;
	})
	if(choice!=undefined){
	    response=choice;
	}
    })
    var returnObject=[];
    var parseObject=response.questions;
    parseObject.sort(function(a,b){return a.index-b.index});
    response.questions.forEach(function(quest){
	//if the question was modified
	if(quest.modified){
	    returnObject.push("modified");
	}
	//if the user did not complete it
	else if((quest.userAnswer==undefined) && (quest.userAnswers.length==0)){
	    returnObject.push("missing");
	}
	//if the user got a question right
	else if(quest.correct){
	    returnObject.push("correct");
	}
	//if the user got a question wrong
	else{
	    returnObject.push("wrong");
	}
    })
    return returnObject;
}
//gets an array of objects that designates the total number of students who did the homework and the number who flagged questions
var getFlagArray=function(hw,users){
    var flagArray=[];
    hw.questions.forEach(function(quest){
	//initalize objects
	flagArray.push({
	    flagged:0,
	    total:0
	})
    })
    //for each user
    users.forEach(function(stud){
	var response;
	//get their homework
	stud.chapters.forEach(function(ch){
	    var choice=ch.homework.find(function(homew){
		var firstId=hw._id.toString();
		var secondId=homew._id.toString();
		return firstId==secondId;
	    })
	    if(choice!=undefined){
		response=choice;
	    }
	})
	var parseObj=response.questions.sort(function(a,b){return a.index-b.index});
	var acc=0;
	//parse through every question and get values
	parseObj.forEach(function(quest){
	    //if the user flagged it
	    if(quest.flag){
		flagArray[acc].flagged=flagArray[acc].flagged+1;
	    }
	    //if the user should not be counted
	    if((quest.modified==false) && (quest.userAnswer!=undefined || quest.userAnswers!=[])){
		flagArray[acc].total=flagArray[acc].total+1;
	    }
	    acc++;
	})
	
    })
    return flagArray;
}

//creates an array of objects that indicated who got each question correct
var getCorrectArray=function(hw,users){
    var correctArray=[];
    hw.questions.forEach(function(quest){
	correctArray.push({
	    correct:0,
	    total:0
	})
    })

    users.forEach(function(stud){
	var response;
	//get the homework
	stud.chapters.forEach(function(ch){
	    var choice=ch.homework.find(function(homew){
		var firstId=hw._id.toString();
		var secondId=homew._id.toString();
		return firstId==secondId;
	    })
	    if(choice!=undefined){
		response=choice;
	    }
	})
	var parseObj=response.questions.sort(function(a,b){return a.index-b.index});
	var acc=0;
	//set the values
	parseObj.forEach(function(quest){
	    if(quest.correct && (!quest.modified)){
		correctArray[acc].correct=correctArray[acc].correct+1;
	    }
	    if((!quest.modified) && (quest.userAnswer!=undefined || quest.userAnswers!=[])){
		correctArray[acc].total=correctArray[acc].total+1;
	    }
	    acc++;
	})
	
    })
    return correctArray;
}

/*
  Gets all of the responses of all of the students for a homework
*/
var getStudentResponses=function(hw,usrs){
    var returnObject={};
    returnObject.name=hw.name;
    returnObject.questions=[];
    hw.questions.forEach(function(quest){
	var item={};
	item.prompt=quest.prompt;
	//get the answers
	if((quest.qType!="ma") && (quest.qType!="la")){
	    item.answer=quest.answer;
	}
	else if(quest.qType=="la"){
	    item.answer="Answer is not applicable";
	}
	else{	    
	    var answers="";
	    var acc=0;
	    //parse through for ma
	    quest.answers.forEach(function(ans){
		if(quest.answers.length!=(acc+1)){
		    answers=answers+ans+",";
		}
		else{
		    answers=answers+ans;
		}
		acc++;
	    })
	    item.answer=answers;
	    //item.answer=quest.answers;
	}
	item.numberCorrect=0;
	item.students=[];
	item.type=quest.qType;
	item.index=quest.index;
	returnObject.questions.push(item);
    })
    //get all of the user answers
    usrs.forEach(function(usr){
	var response;
	usr.chapters.forEach(function(ch){
	    var choice=ch.homework.find(function(homework){
		var firstId=homework._id.toString();
		var secondId=hw._id.toString();
		return firstId==secondId;
	    })
	    if(choice!=undefined){
		response=choice;
	    }
	})
	var acc=0;
	response.questions.forEach(function(quest){
	    var item={};
	    //get the name
	    item.name=usr.firstName+" "+usr.lastName;
	    if(quest.qType!="ma"){
		item.response=quest.userAnswer;
	    }
	    else{
		var answers="";
		var acc2=0;
		//get the user answers
		quest.userAnswers.forEach(function(ans){
		    if(quest.userAnswers.length!=(acc2+1)){
			answers=answers+ans+",";
		    }
		    else{
			answers=answers+ans;
		    }
		    acc2++;
		})
		item.response=answers;
	    }
	    if(quest.modified){
		item.response="***THIS QUESTION HAS BEEN MODIFIED***"
	    }
	    returnObject.questions[acc].students.push(item);
	    if(quest.correct){
		returnObject.questions[acc].numberCorrect++;
	    }
	    acc++;
	})
    })
    return returnObject;
}

//polyfill for object keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
/*
  Changes the name of a class
  req.params.classId needs to be set
  and req.body.newName muste be set
*/
exports.changeName=function(req,res,next){
    if(!(validateUser(req.user,res))){
	return;
    }
    clss.findOneAndUpdate({_id:req.params.classId},{$set:{name:req.body.newName}},function(err,doc){
	if(err)
	{
	    return next(err);
	}
	else{
	    clss.find({},function(err,clsses){
		if(err){
		    return next(err);
		}
		else{
		    //send classes for debugging
		    res.json({
			classes:clsses,
			error:false
		    });
		}
	    })
	}
    })
}
/*
  Controller for creating a class
  req.body.structure is an identifer for what class to get
  req.body.name must be set
*/
exports.createClass=function(req,res,next){
    //import a class
    if(req.body.structure!='' && req.body.structure!=undefined && req.body.structure!="Make class from scratch"){
	clss.findOne({_id:req.body.structure},function(err,cl){
	    //find it
	    if(err){
		return next(err);
	    }
	    if(cl==undefined){
		res.json({
		    error:true,
		    message:"No class was found"
		})
		return;
	}
	    var cls=new clss();
	    //set the name and chapters
	    cls.name=req.body.name;
	    cls.chapters=cl.chapters;
	    //save it
	    cls.save(function(err)
		     {
			 if(err)
			 {
			     var message="";                 
			     if(err.name=="ValidationError"){
				 message=err.errors.name.message;
			     }
			     else{
				 message="There is already a class of this name";
			     }
			     res.json({
				 messageError:true,
				 errorMessage:message
			     })
			 }
			 else
			 {
			     res.json(cls);
			 }
		     });
	})
    }
    else{
	var cls=new clss();
	//set the name
	cls.name=req.body.name;
	cls.save(function(err)
	      {
		  if(err)
		  {
		      var message="";                 
		      if(err.name=="ValidationError"){
			  message=err.errors.name.message;
		      }
		      else{
			  message="There is already a class of this name";
		      }
		      res.json({
			  messageError:true,
			  errorMessage:message
		      })
		  }
		  else
		  {
		      res.json(cls);
		  }
	      });
    }
}
/*
  gets a class object
  req.params.classId must be set
*/
exports.getClass=function(req,res,next){
    //validate the user
    if(!(validateUser(req.user,res))){
	return;
    }
    //find it
    clss.findOne({_id:req.params.classId},function(err,cls){
	if(err){
	    return next(err);
	}
	if(cls==undefined){
	    res.json({
		error:true,
		message:"No class was found"
	    })
	    return;
	}
	//return it
	else{
	    res.json({classInfo:cls});
	    return;
	}
    })
}
/*
  Get all of the class names
  req.user must be signed in
*/
exports.getClassNames=function(req,res,next){
    //validate the user
    if(!(validateUser(req.user,res))){
	return;
    }
    clss.find({},function(err,clsses)
	      {
		  if(err)
		  {
		      return next(err);
		  }
		  else
		  {
		      //return all of the classes
		      res.json(
			  {
			      classes:clsses,
			      error:false
			  });
		  }
	      
	      });
}
/*
  Adds a chapter to a class
  req.params.classId must be set
*/
exports.addChapter=function(req,res,next){
    clss.findOne({_id:req.params.classId},function(err,cls)
			 {
			     if(err)
				 {
				     return next(err);
				 }
			     else
				 {
				     if(cls==undefined){
					 res.json({
					     error:true,
					     message:"Class was not found"
					 })
				     }
				     cls.chapters.push({name:req.body.chapterName,index:cls.chapters.length+1});
				     cls.save(function(err){
					 if(err){
					     return(next(err));
					 }
					 else{
					     //add the chapter to all of the students
					     User.find({administrator:false,signupCode:cls._id},function(err,students){
						 if(err){
						     return next(err);
						 }
						 else{
						     var acc=0;
						     if(students.length==0){
							 res.json({classInfo:cls});
							 return;
						     }
						     students.forEach(function(st){
							 st.chapters.push(cls.chapters[cls.chapters.length-1]);
							 st.save(function(err){
							     if(err){
								 return next(err);
							     }
							     else{
								 acc=acc+1;
								 if(acc==students.length){
								     res.json({classInfo:cls});
								 }
							     }
							 });
						     })
						 }
					     })
					 }
				     });
			 }
			 });
}
/*
  Changes the order of all of the chapters of a class
*/
exports.changeOrderOfChapters=function(req,res,next){
    var item;
    clss.findOne({_id:req.params.classId},function(err,clss)
	      {
		  if(err){
		      return next(err);
		  }
		  else{
		      if(clss==undefined){
			  res.json({
			      error:true,
			      message:"Class was not found"
			  })
		      }

		      if(!req.body.chapterChanger){
			  res.json({error:true});
			  return;
		      }
		      var item=clss.chapters.find(function(ch){
			  return ch._id==req.body.chapterChanger._id;
		      })
		      if(typeof item == "undefined"){
			  res.json({error:true});
			  return;
		      }
		      var start=req.body.chapterChanger.indexChange;
		      var end=req.body.chapterChanger.index;
		      if(start==end){
			  res.json({error:true});
			  return;
		      }
		      //start changing it
		      if(end>start){
			  clss.chapters.forEach(function(ch){
			      if(end>ch.index && ch.index>=start){
				  ch.index=ch.index+1;
			      }
			  })
		      }
		      else{
			  clss.chapters.forEach(function(ch){
			      if(start>=ch.index && ch.index>end){
				  ch.index=ch.index-1;
			      }
			  })
		      }
		      item.index=start;
		      //save changes
		      clss.save(function(err)
				{
				    if(err){
					return next(err);
				    }
				    else{
					res.json({classInfo:clss});
					if(clss.students.length==0){
					    return;
					}
					//changes the order for users
					User.find({administrator:false,signupCode:req.params.classId},function(err,studs){
					    if(err){
						return next(err);
					    }
					    else{
						studs.forEach(function(stud){
						    var acc=0;
						    stud.chapters.forEach(function(ch){
							ch.index=clss.chapters[acc].index;
							acc=acc+1;
						    })
						    stud.save(function(err){
							if(err){
							    return next(err);
							}
						    });
						})
					    }
					})
				    }
				})
		  }
	      })
}
/*
  Adds a homework to a chapter
  req.params.classId must be set
  req.params.chapterId must be set
  req.body.newHw must be set
*/
exports.addHomeworkToChapter=function(req,res,next){
    if(!(validateUser(req.user,res))){
	return;
    }
    //find a class
    clss.findOne({_id:req.params.classId},function(err,cls)
		 {

		      if(cls==undefined){
			  res.json({
			      error:true,
			      message:"Class was not found"
			  })
		      }
		     //create the homework
		     var reqHw=req.body.newHw;		  
		     var chapterToChange=cls.chapters.find(function(ch){
			 return ch._id==req.params.chapterId;
		     })
		     var hwChange=chapterToChange.homework.find(function(hw){
			 return hw._id==reqHw._id;
		     })

		     //update homework
		     if(!(hwChange == undefined)){
			 try{
			 var ids=[];
			 hwChange.questions.forEach(function(quest){
			     ids.push(quest._id.toString());
			 })
			 var reqIds=[];
			 reqHw.questions.forEach(function(quest){
			     if(quest._id!=undefined){
				 reqIds.push(quest._id.toString());
			     }
			 })
			     //delete questions
			 ids.forEach(function(i,ind){
			     if(!(reqIds.includes(i))){
				 var x=hwChange.questions.find(function(quest){
				     var id1=quest._id.toString();
				     var id2=i.toString();
				     return id1==id2;
				 })
				 console.log("x");
				 console.log(x);
				 console.log("x");
				 hwChange.questions.splice(hwChange.questions.indexOf(x),1);
			     }
			 })
			 hwChange.name=reqHw.name;
			 hwChange.endingMessage=reqHw.endingMessage;
			 hwChange.dueDate=reqHw.dueDate;
			 reqHw.questions.forEach(function(quest){
			     var quesToChange;
			     //find each question and then change it
			     if(quest._id!=undefined){
				 quesToChange=hwChange.questions.find(function(ques){
				     var id1=ques._id.toString();				
				     var id2=quest._id.toString();
				     return id1==id2;
				 })
			     }
			     //modify question
			     if(quesToChange!=undefined){
				 quesToChange.qType=quest.type;
				 quesToChange.prompt=quest.prompt;
				 quesToChange.options=quest.options;
				 quesToChange.index=quest.index;
				 if(quesToChange.qType!="ma"){
				     quesToChange.answer=quest.answer;
				 }
				 else{
				     quesToChange.answers=quest.answer;
				 }
			     }
			     else{
				 //add question
				 var newQues={};
				 newQues.qType=quest.type;
				 newQues.prompt=quest.prompt;
				 newQues.options=quest.options;
				 newQues.index=quest.index;
				 if(Array.isArray(quest.answer)){
				     newQues.answers=quest.answer;
				 }
				 else{
				     newQues.answer=quest.answer;
				 }
				 hwChange.questions.push(newQues);
			     }
			 })
			 cls.save(function(err){
			     if(err){
				 return next(err);
			     }
			     res.json({
				 chapter:chapterToChange,
				 messageError:false
			     });
			     if(cls.students.length>0){
				 var callback=function(req,done,homeworkForChange){
				     //update students
				     User.find({administrator:false,signupCode:cls._id},function(err,users){
					 var acc=0;
					 users.forEach(function(usr){
					     var reqHw=homeworkForChange;
					     
					     var chapterToChange=usr.chapters.find(function(ch){
						 return ch._id.toString()==req.params.chapterId.toString();
					     })
					     
					     var hwChange=chapterToChange.homework.find(function(hw){
						 return hw._id.toString()==reqHw._id.toString();
					     })
					     var ids=[];
					     hwChange.questions.forEach(function(quest){
						 ids.push(quest._id.toString());
					     })
					     var reqIds=[];
					     reqHw.questions.forEach(function(quest){
						 if(quest._id!=undefined){
						     reqIds.push(quest._id.toString());
						 }
					     })
					     //delete questions
					     ids.forEach(function(i,ind){
						 if(!(reqIds.includes(i))){
						     var x=hwChange.questions.find(function(quest){
							 var id1=quest._id.toString();
							 var id2=i.toString();
							 return id1==id2;
						     })
						     hwChange.questions.splice(hwChange.questions.indexOf(x),1);
						 }
					     })
					     hwChange.name=reqHw.name;
					     hwChange.endingMessage=reqHw.endingMessage;
					     hwChange.dueDate=reqHw.dueDate;
					     reqHw.questions.forEach(function(quest){
						 var quesToChange;
						 if(quest._id!=undefined){
						     quesToChange=hwChange.questions.find(function(ques){
							 var id1=ques._id.toString();				
							 var id2=quest._id.toString();
							 return id1==id2;
						     })
						 }
						 var userAnswered=false;
						 //update questions
						 if(quesToChange!=undefined){
						     if((quesToChange.userAnswer!=undefined) || (quesToChange.userAnswers.length!=0)){
							 userAnswered=true;
						     }
						     //update based on whether the user already took the quiz
						     if(quesToChange.qType!=quest.qType && userAnswered){
							 quesToChange.modified=true;
							 quesToChange.flag=false;
							 quesToChange.userAnswer=undefined;
							 quesToChange.userAnswers=[];
						     }
						     quesToChange.qType=quest.qType;
						     quesToChange.prompt=quest.prompt;
						     //update based on whether the user already took the quiz
						     if(quesToChange.options!=undefined && quest.options!=undefined){
							 if((JSON.stringify(quesToChange.options)!=JSON.stringify(quest.options)) && userAnswered){
							     quesToChange.modified=true;
							     quesToChange.flag=false;
							 console.log("2");
							     quesToChange.userAnswer=undefined;
							     quesToChange.userAnswers=[];
							 }
						     }
						     quesToChange.options=quest.options;
						     quesToChange.index=quest.index;
						     //update based on whether the user already took the quiz
						     if(quesToChange.qType!="ma"){
							 if(quesToChange.answer!=quest.answer && userAnswered){
							     quesToChange.modified=true;
							     quesToChange.flag=false;
							     quesToChange.userAnswer=undefined;
							     quesToChange.userAnswers=[];
							 }
							 quesToChange.answer=quest.answer;
						     }
						     else{
						     //update based on whether the user already took the quiz
							 if((JSON.stringify(quesToChange.answers)!=JSON.stringify(quest.answers)) && userAnswered){
							     quesToChange.modified=true;
							     quesToChange.flag=false;
							     quesToChange.userAnswer=undefined;
							     quesToChange.userAnswers=[];
							 }
							 quesToChange.answers=quest.answers;
						     }
						 }
						 else{
						     //or add the question from the class
						     var q=quest;
						     if(hwChange.status==statuses.Complete){
							 hwChange.questions.push(q);
							 hwChange.questions[hwChange.questions.length-1].modified=true;
						     }
						     else{
							 hwChange.questions.push(q);
						     }
						 }
					     })
					     //save the user
					     usr.save(function(err){
						 if(err){
						     return done(err);
						 }
						 acc++;
						 if(acc==users.length){
						     //update grades
						     updateHws(done)
						 }
					     })
					 })
				     })
				 }
				 var parse1=cls.chapters.find(function(ch){
				     return ch._id==req.params.chapterId;
				 })
				 var parse2=parse1.homework.find(function(hw){
				     return hw._id==reqHw._id;
				 })
				 //update student status
				 updateStudents(req,next,callback,parse2);
			     }
			 
			 })
			 }
			 catch(err){
			     return done(err);
			 }
			
		     }
		     //create homework
		     else{
			 hwChange={
			     name:reqHw.name,
			     endingMessage:reqHw.endingMessage,
			     dueDate:reqHw.dueDate,
			     questions:[]
			 }
			 //parse item to convert front end message
			 reqHw.questions.forEach(function(question){
			     question.qType=question.type;
			     if(Array.isArray(question.answer)){
				 question.answers=question.answer;
				 delete question["answer"];
			     }
			     delete question["type"];
			 })
			 hwChange.questions=reqHw.questions;
			 hwChange.index=chapterToChange.homework.length+1;
			 chapterToChange.homework.push(hwChange);
			 //save the class
			 cls.save(function(err){
			     //send error
			     if(err){				 
				 var message=err.errors;	
				 var mess;
				 Object.keys(message).forEach(function(key){
				     mess=message[key].message;
				 })
				 res.json({messageError:true,
					   errorMessage:mess});
				 return next(err);
			     }
			     else{
				 res.json({
				     chapter:chapterToChange,
				     messageError:false
				 });
				 if(cls.students.length==0){
				     return;
				 }
				 //adds the homework
				 User.find({signupCode:cls._id},function(err,users){
				     if(err){
					 return next(err);
				     }
				     //look through the chapters
				     users.forEach(function(usr){
					 var chap=usr.chapters.find(function(ch){
					     return ch._id==req.params.chapterId;
					 })
					 chap.homework.push(chapterToChange.homework[chapterToChange.homework.length-1])
					 //chap.homework.push(hwChange);
					 usr.save(function(err){
					     if(err){
						 return next(err);
					     }
					 })
				     })
				 })
			     }
			 })
		     }
		 })
}
/*
  Sets whether or not the class should be hidden
  req.params.classId should be set
*/
exports.toggleHide=function(req,res,next){
    //valide user
    if(!(validateUser(req.user,res))){
	return;
    }
    else{
	//find the class
	clss.findOne({_id:req.params.classId},function(err,cls){
	    if(err)
	    {
		return next(err);
	    }
	    else{
		if(cls==undefined){
		    res.json({
			error:true,
			message:"There was an error"
		    })
		}
		//show the class
		if(cls.oldStatus==1){
		    cls.oldStatus=0;
		}
		//hide the class
		else{
		    cls.oldStatus=1;
		}
		//save it
		cls.save(function(err){
		    if(err){
			return next(err);
		    }
		    clss.find({},function(err,clsses){
			if(err)
			{
			    return next(err);
			}
			else{
			    res.json({
				classes:clsses,
				error:false
			});
			}
		    })
		})
	    }
	})
    }
}

/*
  Deletes a class
  req.params.classId must be set
 */
exports.deleteClass=function(req,res,next){
    //valide user
    if(!(validateUser(req.user,res))){
	return;
    }
    else{
	clss.findOne({_id:req.params.classId},function(err,cls){
	    if(err)
	    {
		return next(err);
	    }
	    else{
		//delete the class
		cls.remove(function(err){
		    if(err){
			return next(err);
		    }
		    else{
			clss.find({},function(err,clsses){
			    if(err){
				return next(err);
			    }
			    else{
				res.json({
				    classes:clsses,
				    error:false
				});
				//delete all of the students
				User.remove({administrator:false,signupCode:cls._id},function(err){
				    if(err){
					return next(err);
				    }
				})
			    }
			})
		    }
	    })
	    }
	})
    }
}
/*
  Deletes a chapter from a class
  req.params.classId must be set
  req.params.chapterId must be set
*/
exports.deleteChapter=function(req,res,next){
    //valide user
    if(!(validateUser(req.user,res))){
	return;
    }
    else{
	clss.findOne({_id:req.params.classId},function(err,cl){
	    if(err)
	    {
		return next(err);
	    }
	    else{
		var chToDel;
		//find the chapter
		cl.chapters.forEach(function(ch){
		    if(ch._id==req.params.chapterId){
			chToDel=ch;
		    }
		})
		if(typeof chToDel=="undefined"){
		    res.json({
			error:true
		    })
		    return;
		}
		var store=cl.chapters.indexOf(chToDel);
		var i=chToDel.index;
		//delete the chapter
		cl.chapters.splice(store,1);
		//update indices
		cl.chapters.forEach(function(ch){
		    if(ch.index>i){
			ch.index=ch.index-1;
		    }
		})
		//save class
		cl.save(function(err){
		    if(err){
			return next(err);
		    }
		    else{
			//send new class
			res.json({classInfo:cl});
			if(cl.students.length==0){
			    return;
			}

			//update all of the students who have this signup code
			User.find({signupCode:req.params.classId},function(err,studs){
			    if(err){
				return next(err);
			    }
			    else{
				//for each student
				studs.forEach(function(stud){				    
				    //find the chapter to delete
				    stud.chapters.forEach(function(ch){
					if(ch._id==req.params.chapterId){
					    chToDel=ch;
					}
				    })
				    //store the index of it
				    store=stud.chapters.indexOf(chToDel);
				    //store its index variable
				    i=chToDel.index;
				    //kill chapter
				    stud.chapters.splice(store,1);
				    //update indexes
				    stud.chapters.forEach(function(ch){
					if(ch.index>i){
					    ch.index=ch.index-1;
					}
				    })
				    //save the student
				    stud.save(function(Err){
					if(err){
					    return next(Err);
					}
				    })
				})
			    }
			})
		    }
		})
	    }
	})
    }
}

/*
  Get all of the students for deleting and resetting the password of students
  req.params.classId must be set
*/
exports.getStudentEditInfo=function(req,res,next){
    if(!(validateUser(req.user,res))){
	return;
    }
    else{
	try{
	    clss.findOne({_id:req.params.classId},function(err,cls){
		if(err){
		    return next(err);
		}
		if(cls==undefined){
		    res.json({
			error:true,
			message:"This class does not exist anymore"
		    })
		}
		else{	
		    //get the user from the class
		    User.find({signupCode:cls._id,administrator:false},function(err,students){
			if(err){
			    return next(err);
			}
			res.json({
			    students:students,
			    error:false
			})
		    })
		}
	    })
	}
	catch(err){
	    return next(err);
	}
    }
}
/*
  Changes the order of the homeworks
  req.params.classId must be set
  req.params.chapterId must be set
  req.body.homeworkChanger must be set
*/
exports.changeOrderOfHomeworks=function(req,res,next){
    var item;
    clss.findOne({_id:req.params.classId},function(err,clss)
	      {

		  if(err){
		      return next(err);
		  }
		  if(clss==undefined){
		    res.json({
			error:true,
			message:"This class does not exist anymore"
		    })
		  }
		      if(!req.body.homeworkChanger){
			  res.json({error:true});
			  return;
		      }
		  //find the chapter
		      var ch=clss.chapters.find(function(ch){
			  return ch._id==req.params.chapterId;
		      })
		  //find the homework
		      var item=ch.homework.find(function(hw){
			  return hw._id==req.body.homeworkChanger._id
		      })
		      if(typeof item == "undefined"){
			  res.json({error:true});
			  return;
		      }
		      var start=req.body.homeworkChanger.indexChange;
		      var end=req.body.homeworkChanger.index;
		  //change the indices
		      if(end>start){
			  ch.homework.forEach(function(hw){
			      if(end>hw.index && hw.index>=start){
				  hw.index=hw.index+1;
			      }
			  })
		      }
		      else{
			  ch.homework.forEach(function(hw){
			      if(start>=hw.index && hw.index>end){
				  hw.index=hw.index-1;
			      }
			  })
		      }
		      item.index=start;
		  //save it
		      clss.save(function(err)
				{
				    if(err){
					return next(err);
				    }
				    else{
					res.json({classInfo:clss});
					if(clss.students.length==0){
					    return;
					}
					//update the users
					User.find({administrator:false,signupCode:req.params.classId},function(err,studs){
					    if(err){
						return next(err);
					    }
					    else{
						studs.forEach(function(stud){
						    var acc=0;
						    //find the chapter				    
						    var chapt=stud.chapters.find(function(c){
							return c._id==req.params.chapterId;
						    })
						    var chaptOfCls=clss.chapters.find(function(c){
							return c._id==req.params.chapterId;
						    })
						    //update indices
						    chapt.homework.forEach(function(h){
							h.index=chaptOfCls.homework[acc].index;
							acc=acc+1;
						    })
						    stud.save(function(err){
							if(err){
							    return next(err);
							}
						    });
						})
					    }
					})
				    }
				})
		  
	      })
}
/*
  This is a function to change multiple due dates
  req.body.hwDataToChange must be set
  req.params.classId must be set
*/
exports.changeDueDates=function(req,res,next){
   if(!(validateUser(req.user,res))){
	return;
    }
    clss.findOne({_id:req.params.classId},function(err,clses){
	if(err){
	    return next(err);
	}
	else{
	    var stop=false;
	    console.log(req.body.hwDataToChange);
	    try{
		clses.chapters.forEach(function(ch){
		    //update due date
		    req.body.hwDataToChange.forEach(function(hwItem){
			if(ch._id==hwItem.chapterId){
			    var hwToChange=ch.homework.find(function(hw){
				return hw._id==hwItem.hwId
			    })
			    if(hwToChange!=undefined){
				hwToChange.dueDate=hwItem.newDate;
			    }
			}
		    })

		})
	    }
	    catch(err){
		res.json({
		    error:true,
		    message:err.message
		})
		stop=true;
	    }
	    if(stop){
		return;
	    }
	    clses.save(function(err){
		if(err){
		    return next(err);
		}
		else{
		    if(clses.students.length==0){
			User.find({signupCode:req.params.classId},function(err,users){
			    users.forEach(function(usr){
				//update user due dates
				usr.chapters.forEach(function(ch){
				    req.body.hwsToChange.forEach(function(hwItem){
					if(ch._id==hwItem.chapterId){
					    var hwToChange=ch.homework.find(function(hw){
						return hw._id==hwItem.hwId
					    })
					    hwToChange.dueDate=hwItem.newDate;
					}
				    })
				})
				user.save(function(err){
				    if(err){
					return next(err);
				    }
				})
			    })
			})
		    }
		    res.json({
			classInfo:clses,
			error:false
		    })
		    
		}
	    })
	}
    })
}

/*
  Deletes a homework from a chapter
  req.params.classId must be set
  req.params.homeworkId must be set
*/
exports.deleteHw=function(req,res,next){
    if(!(validateUser(req.user,res))){
	return;
    }
    else{
	clss.findOne({_id:req.params.classId},function(err,cls){
	    if(err){
		return next(err);
	    }
	    else{
		//find the chapter
		var selectedCh=cls.chapters.find(function(ch){
		    return req.params.chapterId==ch._id;
		})

		if(selectedCh==undefined){
		    res.json({
			error:true,
			message:"Chapter does not exist"
		    })
		    return;
		}
		//find the homework
		var selectedHw=selectedCh.homework.find(function(hw){
		    return req.params.homeworkId==hw._id;
		})
		if(selectedHw==undefined){
		    res.json({
			error:true,
			message:"Homework does not exist"
		    })
		    return;
		}
		var store=selectedCh.homework.indexOf(selectedHw);
		var i=selectedHw.index;
		//remove the homework
		selectedCh.homework.splice(store,1);
		selectedCh.homework.forEach(function(hw){
		    if(hw.index>i){
			hw.index=hw.index-1;
		    }
		})
		cls.save(function(err){
		    if(err){
			return next(err);
		    }
		    else{
			res.json({
			    error:false,
			    classInfo:cls
			})
			if(cls.students.length!=0){
			    //update the students
			    User.find({administrator:false,signupCode:cls._id},function(err,studs){
				if(err){
				    return next(err);
				}
				studs.forEach(function(stud){
				    var selectedCh=stud.chapters.find(function(ch){
					return req.params.chapterId==ch._id;
				    })
				    var selectedHw=selectedCh.homework.find(function(hw){
					return req.params.homeworkId==hw._id;
				    })
				    var store=selectedCh.homework.indexOf(selectedHw);
				    var i=selectedHw.index;
				    //remove the homework
				    selectedCh.homework.splice(store,1);
				    selectedCh.homework.forEach(function(hw){
					if(hw.index>i){
					    hw.index=hw.index-1;
					}
				    })
				    stud.save(function(err){
					if(err){
					    return next(err);
					}
				    })
				})
			    })
			}
		    }
		})
	    }
	})
    }
}
/*
  Gets the data for a class 
  req.params.classId must be set
 */
exports.getClassData=function(req,res,done){
    if(!(validateUser(req.user,res))){
	return;
    }
    var callback=function(req,done){
	clss.findOne({_id:req.params.classId},function(err,cls){
	    if(err){
		return next(err);
	    }
	    if(cls==undefined){
		res.json({
		    error:true
		})
		return done();
	    }
	    User.find({administrator:false,signupCode:cls._id},function(err,users){
		if(err){
		    return done(err);
		}
		    var returnObject={};
		    returnObject.name=cls.name;
		    returnObject.signupCode=cls._id;
		    returnObject.chapters=[
			{
			}];
		    var acc=0;
		//for every chapter
		    cls.chapters.forEach(function(ch){
			returnObject.chapters[acc]={};
		//set index and name
			returnObject.chapters[acc].name=ch.name;
			returnObject.chapters[acc].index=ch.index;
			returnObject.chapters[acc].homework=[];
			var acc2=0;
		//for every homework
			ch.homework.forEach(function(hw){
			    returnObject.chapters[acc].homework[acc2]={};
			    //set name
			    returnObject.chapters[acc].homework[acc2].name=hw.name;
			    //set id
			    returnObject.chapters[acc].homework[acc2]._id=hw._id;
			    //set due date
			    returnObject.chapters[acc].homework[acc2].date=hw.dueDate;
			    //set who completed it
			    returnObject.chapters[acc].homework[acc2].completed=getNumCompleted(users,hw._id).ret;
			    //set who completed it
			    returnObject.chapters[acc].homework[acc2].total=getNumCompleted(users,hw._id).ttl;
			    //set index 
			    returnObject.chapters[acc].homework[acc2].index=hw.index;
			    returnObject.chapters[acc].homework[acc2].student=[];
			    var acc3=0;
		//for every student
			    users.forEach(function(usr){
				returnObject.chapters[acc].homework[acc2].student[acc3]={};
				//set name
				returnObject.chapters[acc].homework[acc2].student[acc3].name=usr.firstName+" "+usr.lastName;
				returnObject.chapters[acc].homework[acc2].student[acc3].nameForOrderBy=usr.fullName;
				//set id
				returnObject.chapters[acc].homework[acc2].student[acc3]._id=usr._id;
				//set time they took
				returnObject.chapters[acc].homework[acc2].student[acc3].time=usr.chapters[acc].homework[acc2].timeToComplete;
				//set how they responded
				returnObject.chapters[acc].homework[acc2].student[acc3].response=getResponseCode(hw,usr);
				acc3++;
			    })
				//set how they flagged
			    returnObject.chapters[acc].homework[acc2].flag=getFlagArray(hw,users);
				//set what they got correct
			    returnObject.chapters[acc].homework[acc2].correctFraction=getCorrectArray(hw,users);
			    acc2++;
			})
		    acc++;
		    })
		    res.json({
			classData:returnObject
		    });
	    })
	})
    }
    updateStudents(req,done,callback);
}
/*
  gets the student's overall data 
  req.params.classId must be set
*/
exports.studentClassData=function(req,res,done){
    if(!(validateUser(req.user,res))){
	return;
    }
    //get all of the students
    User.find({signupCode:req.params.classId},function(err,usrs){
	var callback=function(usrs,done){
	    var returnObject=[];
	    var acc=0;
	    usrs.forEach(function(usr){
		returnObject[acc]={};
		returnObject[acc].firstName=usr.firstName;
		returnObject[acc].lastName=usr.lastName;
		returnObject[acc].total=0;
		returnObject[acc].completed=0;
		returnObject[acc]._id=usr._id;
		usr.total=0;
		usr.completed=0;
		//parse through the chapters
		usr.chapters.forEach(function(chap){
		    chap.homework.forEach(function(hw){
			if(hw.status==statuses.Complete){
			    returnObject[acc].completed=returnObject[acc].completed+1;
			    usr.completed=usr.completed+1;
			}
			if(hw.status==statuses.didNotComplete){
			    returnObject[acc].color="red";
			}
			returnObject[acc].total=returnObject[acc].total+1;
		    })
		})
		//if the user finished all of the homeworks
		if(!(returnObject[acc].color=="red")){
		    returnObject[acc].color="black";
		}
		returnObject[acc].chapters=usr.chapters;
		acc++;
	    })
	    //send it
	    res.json({
		studentInfo:returnObject
	    })
	}
	updateStudents(usrs,done,callback);
    })
    
}
/*
  gets the homework's questions 
  req.params.hwId must be set
  req.params.classId must be set
*/

exports.questionData=function(req,res,done){
    if(!(validateUser(req.user,res))){
	return;
    }
    clss.findOne({_id:req.params.classId},function(err,cls){
	if(err){
	    return done(err);
	}
	User.find({signupCode:req.params.classId},function(err,usrs){
	    if(err){
		return done(err);
	    }
	    var homew;
	    //grad the homework
	    cls.chapters.forEach(function(chap){
		var choice=chap.homework.find(function(hw){
		    var firstId=hw._id.toString();
		    var secondId=req.params.hwId.toString();
		    return firstId==secondId;
		})
		if(choice!=undefined){
		    homew=choice;
		}
	    })
	    //grab all of the user responses
	    var returnObject=getStudentResponses(homew,usrs);
	    console.log("aaaaa");
	    returnObject.questions.sort(function(a,b){
		return a.index-b.index;
	    })
	    console.log("aaaaa");
	    //send it
	    res.json({
		homework:returnObject
	    })
	})
    })
}
/*
  gets the homework to edit it
  req.params.hwId must be set
  req.params.classId must be set
*/
exports.getHwToEdit=function(req,res,done){
    if(!(validateUser(req.user,res))){
	return;
    }
    clss.findOne({_id:req.params.classId},function(err,cls){
	if(err){
	    return done(err);
	}
	var response;
	//find it
	cls.chapters.forEach(function(chap){
	    var choice=chap.homework.find(function(hw){
		var firstId=hw._id.toString();
		var secondId=req.params.hwId.toString();
		return firstId==secondId;
	    })
	    if(choice!=undefined){
		response=choice;
	    }
	})
	console.log("rep");
	console.log(response);
	console.log("rep");
	//send it
	res.json({
	    error:false,
	    generatedHomework:response
	})
    })
}
