/*
Object.prototype.deepEquals = function(x)
{
  var p;
  for(p in this) {
      if(typeof(x[p])=='undefined') {return false;}
  }

  for(p in this) {
      if (this[p]) {
          switch(typeof(this[p])) {
              case 'object':
                  if (!this[p].equals(x[p])) { return false; } break;
              case 'function':
                  if (typeof(x[p])=='undefined' ||
                      (p != 'equals' && this[p].toString() != x[p].toString()))
                      return false;
                  break;
              default:
                  if (this[p] != x[p]) { return false; }
          }
      } else {
          if (x[p])
              return false;
      }
  }

  for(p in x) {
      if(typeof(this[p])=='undefined') {return false;}
  }

  return true;
}
*/

var statuses={
    "toBeCompleted":"toBeCompleted",
    "Complete":"Complete",
    "didNotComplete":"didNotComplete"
};
var postHomeworkData = function(){
    return{
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
    }
}
var quizViewData = function(){
    return{
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
         
    }
}
 var previousClasses = function () {
     return [
         {
             "name": "Latin 110",
             "term": "Fall 2016",
	     "hide":"false"
         },
         {

             "name": "Latin 210",
             "term": "Fall 2016",
	     "hide":"false"
         },
         {
             "name": "Latin 110",
             "term": "Fall 2015",
	     "hide":"true"
         },
         {
             "name": "Latin 210",
             "term": "Fall 2015",
	     "hide":"true"
         }]
 }
 var hwData = function () {

     return {
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

                },
             {
                 "prompt": "Morgan likes pop tarts",
                 "answer": "true",
                 "numberCorrect": "1",

                 "students": [
                     {
                         "name": "Morgan Hites",
                         "response": "true"



                        },
                     {

                         "name": "Alex Luken",
                         "response": "false"
                        },
                     {

                         "name": "Dave Toth",
                         "response": "false"
                        },
                     {

                         "name": "Jane Doe",
                         "response": "false"
                        }




                    ]
                }



				]


     }
 }

 var testData = function () {
     return {
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

     }

 }

 var teacherDashboardData = function () {
     return [
         {
             "name": "Spring 2017",
             "_id": "123456789",
             "student signup code": "abcdef",
	     "oldStatus":0
	},
         {
             "name": "Fall 2017",
             "_id": "123456789",
             "student signup code": "abcdef",
	     "oldStatus":0
	},
         {
             "name": "Fall 2016",
             "_id": "123456789",
             "student signup code": "abcdef",
	     "oldStatus":1
	},
         {
             "name": "spring 2016",
             "_id": "123456789",
             "student signup code": "abcdef",
	     "oldStatus":1
	}
    ];
}


var studentDashboardData=function(){
    return{
	nextHomework:{
	    "name":"fourth vocab",
	    "_id":"4hw",
	    "endingMessage":"good for you",
	    "status":statuses.toBeCompleted,
	    "dueDate":new Date(2020,1,1),
	    "dateString":"2/1/20 12:00 AM",
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
	},
	chapters:[
	    {
		"name":"section 1",
		"order":"1",
		"_id":"ch1",
		//"completeIcon":"fa-check-circle",
		"status":statuses.Complete,
		"homework":[
		    {
			"name":"first vocab",
			"_id":"1hw",
			"endingMessage":"Congratulations you finished it",
			"status":statuses.Complete,
			"dueDate":new Date(2017,6,1),
			"dateString":"7/1/17 12:00 AM",//(new Date(2017,6,1)).toString(),
			"hide":true,
			"questions":[
			    {
				"type":"mc",
				"prompt":"What is the latin word for you",
				"correct":"tu",
				"options":[
				    "tu",
				    "eres",
				    "what"
				]
			    },
			    {
				"type":"fb",
				"prompt":"What is the term for a type of grammar that describes place",
				"correct":"preposition",
				"options":[
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
			"dateString":"7/2/17 12:00 AM",//(new Date(2017,6,2)),
			"questions":[
			    {
				"type":"la",
				"prompt":"What are you confused about",
				"correct":"",
				"options":[
				]
			    },
			    {
				"type":"ma",
				"prompt":"What are terms for grammar",
				"correct":["preposition","noun","verb"],
				"options":[
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
		"homework":[
		    {
			"name":"third vocab",
			"_id":"3hw",
			"endingMessage":"Nice job",
			"status":statuses.didNotComplete,
			"dueDate":new Date(2017,6,5),
			"dateString":"7/5/17 12:00 AM",//(new Date(2017,6,5)).toString(),
			"questions":[
			    {
				"type":"tf",
				"prompt":"Alex is amazing at latin",
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
			"name":"fourth vocab",
			"_id":"4hw",
			"endingMessage":"good for you",
			"status":statuses.toBeCompleted,
			"dueDate":new Date(2020,1,1),
			"dateString":"2/1/20 12:00 AM",//(new Date(2020,1,1)).toString(),
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
	    },
	    {
		"name":"section 3",
		"order":"1",
		"_id":"ch3",
		//"completeIcon":"fa-check-circle",
		"status":statuses.toBeCompleted,
		"homework":[
		    {
			"name":"fifth vocab",
			"_id":"5hw",
			"endingMessage":"Nc job",
			"status":statuses.toBeCompleted,
			"dueDate":new Date(2020,1,1),
			"dateString":"2/1/20 12:00 AM",//(new Date(2020,1,1)).toString(),
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
			"dueDate":new Date(2020,1,1),
			"dateString":"2/1/20 12:00 AM",//(new Date(2020,1,1)).toString(),
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
    }
}	

var teacherClassData=function(){
    
       return{
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
			   "_id":879,
                           "date":new Date(2017,6,2,9),
                           "dateString":(new Date(2017,6,2,9)).toString(),
                           "student":[
                               {
                                   "name":"Alex Luken",
				   "nameForOrderBy":"Luken,Alex",
				   "_id":500,
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
				   "nameForOrderBy":"Hites,Morgan",
				   "_id":501,
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
				   "nameForOrderBy":"Mains,Tim",
				   "_id":502,
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
				   "nameForOrderBy":"Toth,Dave",
				   "_id":503,
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
			   "_id":885,
                        "date":new Date(2017,6,5,9),
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
				"nameForOrderBy":"Luken,Alex",
				"_id":500,
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
				"nameForOrderBy":"Hites,Morgan",
				"_id":501,
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
				"nameForOrderBy":"Mains,Tim",
				"_id":502,
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
				"nameForOrderBy":"Toth,Dave",
				"_id":503,
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
			   "_id":895,
                        "total":4,
                        "date":new Date(2017,6,2,9),
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
				"nameForOrderBy":"Luken,Alex",
				"_id":500,
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
				"nameForOrderBy":"Hites,Morgan",
				"_id":501,
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
				"nameForOrderBy":"Mains,Tim",
				"_id":502,
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
				"nameForOrderBy":"Toth,Dave",
				"_id":503,
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
			   "_id":865,
                        "date":new Date(2017,6,5,9),
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
				"nameForOrderBy":"Luken,Alex",
				"_id":500,
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
				"nameForOrderBy":"Hites,Morgan",
				"_id":501,
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
				"nameForOrderBy":"Mains,Tim",
				"_id":502,
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
				"nameForOrderBy":"Toth,Dave",
				"_id":503,
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
			   "_id":803,
                        "date":new Date(2017,6,2,9),
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
				"nameForOrderBy":"Luken,Alex",
				"_id":500,
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
				"nameForOrderBy":"Hites,Morgan",
				"_id":501,
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
				"nameForOrderBy":"Mains,Tim",
				"_id":502,
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
				"nameForOrderBy":"Toth,Dave",
				"_id":503,
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
			   "_id":802,
                        "date":new Date(2017,6,5,9),
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
				"_id":500,
				"nameForOrderBy":"Luken,Alex",
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
				"nameForOrderBy":"Hites,Morgan",
				"_id":501,
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
				"nameForOrderBy":"Mains,Tim",
				"_id":502,
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
				"nameForOrderBy":"Toth,Dave",
				"_id":503,
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
			   "_id":815,
                        "date":new Date(2017,6,2,9),
                        "dateString":(new Date(2017,6,2,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
				"nameForOrderBy":"Luken,Alex",
				"_id":500,
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
				"nameForOrderBy":"Hites,Morgan",
				"_id":501,
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
				"nameForOrderBy":"Mains,Tim",
				"_id":502,
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
				"nameForOrderBy":"Hites,Morgan",
				"_id":503,
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
			   "_id":859,
                        "dateString":(new Date(2017,6,5,9)).toString(),
                        "student":[
                            {
                                "name":"Alex Luken",
				"nameForOrderBy":"Luken,Alex",
				"_id":500,
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
				"nameForOrderBy":"Hites,Morgan",
				"_id":501,
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
				"nameForOrderBy":"Mains,Tim",
				"_id":502,
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
				"nameForOrderBy":"Toth,Dave",
				"_id":503,
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
}

var teacherClassEditInfo=function(){
    return{
	studentInfo:[
	   {
	       name:"Alex Luken",
	       "nameForOrderBy":"Luken,Alex",
	       _id:626
	   },
	   {
	       name:"Tim Mains",
	       "nameForOrderBy":"Mains,Tim",
	       _id:627
	   },
	   {
	       name:"David Toth",
	       "nameForOrderBy":"Toth,David",
	       _id:628
	   },
	   {
	       name:"Morgan Hites",
	       "nameForOrderBy":"Hites,Morgan",
	       _id:629
	   }
       ],
	classInfo:{
           "name":"Latin 210",
           "term":"Spring 2018",
           "signupCode":"AAAAAA",
           "chapters":[
               {
                   "name":"Section 1",
		   "_id":105,
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
    }
}
var studentOverviewData=function(){
    return[
	{
	    "name":"Alex Luken",
	    "nameForOrderBy":"Luken,Alex",
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
		"nameForOrderBy":"Hites,Morgan",
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
    ]    
}

var defaultCreateQuiz =function(){
    return {
        
		name:"",
		dueDate:"",
		endingMessage:"",
		questions:[
		]
    }
}
var customCreateQuiz = function(){
   return{
       name:"Homework 1",
       dueDate:new Date(2017, 10, 25, 9, 0, 0, 0),
       endingMessage:"Nice job dude",
       questions:[
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
	       "prompt":"What is the latin word for why?",
	       "type":"fb",
	       "answer":"que",
	       index:2
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
	       
           }
       ]
   } 
}
var postCustomCreateQuiz = function(){
   return{
       	name:"Homework 1",
		dueDate: "11/25/17 9:00 AM",
		endingMessage:"Nice job dude",
		questions:[
		   
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
			"prompt":"What is the latin word for why?",
			"type":"fb",
			"answer":"que",
			index:2
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

                    }
            
		]
   } 
}
var blankCopy = function(){
    return {
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
        
    }
}
describe("Testing latin Quiz loaded",function()
{
    var latinQuiz;
    beforeEach(function()
	       {
		   latinQuiz=angular.module("latinQuiz");
		   jasmine.addMatchers(
		       {
			   toEqualData: function(util,customeEqualityTesters)
			   {
			       return{
				   compare:function(actual,expected)
				   {
				       return { pass:angular.equals(actual,expected) };
				   }
			       };
			   }
		       });
	       });

    it("should be registered",function()
       {
	   expect(latinQuiz).toBeDefined();	   
       });
    describe("Latin Quiz model",function()
	     {
		 var latinQuizModel;
		 beforeEach(function()
			    {  
				module("latinQuiz");
				inject(function(_latinQuizModel_)
				       {
					   latinQuizModel=_latinQuizModel_;
				       })
			    })    
		 
		 it("should exist",function()
		    {
			expect(latinQuizModel).toBeDefined();
		    });
        it("should convert dates to strings",function()
		    {
            var date = new Date(2017, 11, 12, 2, 5, 0, 0);
            var myString = latinQuizModel.dateToString(date);
			expect(myString).toEqualData("12/12/17 2:05 AM");
            
		    });
        it("should convert strings to dates",function()
		    {
            var myString = "12/12/17 2:05 AM";
            var myDate = latinQuizModel.stringToDate(myString)
			expect(myDate).toEqualData(new Date(2017, 11, 12, 2, 5, 0, 0));
		    });
	     })

    describe("Student Login Controller",function()
	     {
		 var latinQuizModel;
		 var httpBack;
		 var _scope;
		 beforeEach(function()
			    {  
				module("latinQuiz");
				inject(function(_latinQuizModel_,$httpBackend,$rootScope)
				       {
					   httpBack=$httpBackend;
					   latinQuizModel=_latinQuizModel_;
					   _scope=$rootScope.$new();
				       })
			    })
		 it("should exist",inject(function($controller){
		     var studentLoginController =$controller("studentLoginController",
							{$scope:_scope},latinQuizModel);

		     expect(studentLoginController).toBeDefined();
		 }))
		 it("should set signup path properly",inject(function($controller,$location){
		     var studentLoginController =$controller("studentLoginController",
							{$scope:_scope},latinQuizModel);
		     spyOn($location,"path");
		     _scope.signupButton();
		     expect($location.path)
		     .toHaveBeenCalledWith("signup");
		 }))
		 it("should set change password path properly",inject(function($controller,$location){
		     var studentLoginController =$controller("studentLoginController",
							{$scope:_scope},latinQuizModel);
		     spyOn($location,"path");
		     _scope.changePasswordButton();
		     expect($location.path)
		     .toHaveBeenCalledWith("changePassword");
		 }))
		 it("should try to login correctly",inject(function($controller,$location){
		     var studentLoginController =$controller("studentLoginController",
							{$scope:_scope},latinQuizModel);
		     _scope.username="alexluken@centre.edu";
		     _scope.passwordVal="1234";		     		     
		     spyOn($location,"path");		     
		     _scope.loginButton();
		     var thePath="studentDashboard";
		     httpBack.expectPOST("/studentLogin",
					 {
					     username:_scope.username,
					     password:_scope.passwordVal
					 }).respond({"loggedIn":true,"redirect":thePath});

		     httpBack.flush();
		     expect($location.path)
		     .toHaveBeenCalledWith("studentDashboard");
		 }))
		 it("should fail to login correctly",inject(function($controller,$location){
		     var studentLoginController =$controller("studentLoginController",
							{$scope:_scope},latinQuizModel);
		     _scope.username="alexluken@centre.edu";
		     _scope.passwordVal="1234";		     		     
		     spyOn($location,"path");		     
		     _scope.loginButton();
		     var thePath="studentDashboard";
		     httpBack.expectPOST("/studentLogin",
					 {
					     username:_scope.username,
					     password:_scope.passwordVal
					 }).respond({"loggedIn":false});

		     httpBack.flush();
		     expect(_scope.messageShow)
		     .toEqualData(false);
		 }))
	     })
    
    describe("Student Sign up Controller",function()
	     {
		 var latinQuizModel;
		 var httpBack;
		 var _scope;
		 beforeEach(function()
			    {  
				module("latinQuiz");
				inject(function(_latinQuizModel_,$httpBackend,$rootScope)
				       {
					   httpBack=$httpBackend;
					   latinQuizModel=_latinQuizModel_;
					   _scope=$rootScope.$new();
				       })
			    })
		 it("should exist",inject(function($controller){
		     var studentSignupController =$controller("studentSignupController",
							{$scope:_scope},latinQuizModel);

		     expect(studentSignupController).toBeDefined();
		 }))
		 it("should try to signup correctly",inject(function($controller,$location){
		     var studentSignupController =$controller("studentSignupController",
							{$scope:_scope},latinQuizModel);
		     _scope.username="alexluken@centre.edu";
		     _scope.firstName="alex";
		     _scope.lastName="luken";
		     _scope.passwordVal="1234";		     		     
		     _scope.repasswordVal="1234";		     		     
		     _scope.signupCode="abc";
		     spyOn($location,"path");		     
		     _scope.signupButton();
		     console.log(_scope);
		     var thePath="studentDashboard";
		     httpBack.expectPOST("/signup",
					 {
					     username:_scope.username,
					     password:_scope.passwordVal,
					     signupCode:_scope.signupCode,
					     firstName:_scope.firstName,
					     lastName:_scope.lastName
					 }).respond({"loggedIn":true,"redirect":thePath});

		     httpBack.flush();
		     expect($location.path)
		     .toHaveBeenCalledWith("studentDashboard");
		 }))
		 it("should display error",inject(function($controller,$location){
		     var studentSignupController =$controller("studentSignupController",
							{$scope:_scope},latinQuizModel);
		     _scope.username="alexluken@centre.edu";
		     _scope.firstName="alex";
		     _scope.lastName="luken";
		     _scope.passwordVal="1234";		     		     
		     _scope.repasswordVal="123";		     		     
		     _scope.firstName="alex";
		     _scope.signupCode="abc";
		     spyOn($location,"path");		     
		     _scope.signupButton();
		     var thePath="studentDashboard";
		     expect(_scope.error)
		     .toEqualData("Passwords do not match");
		 }))

		 it("should cancel correctly",inject(function($controller,$location){
		     var studentSignupController =$controller("studentSignupController",
							{$scope:_scope},latinQuizModel);
		     spyOn($location,"path");
		     _scope.cancelButton();
		     expect($location.path)
		     .toHaveBeenCalledWith("/");
		 }))


		 
	     })

     /*

    describe("Student Dashboard Controller",function()
	     {
		 var latinQuizModel;
		 var httpBack;
		 var _scope;
		 beforeEach(function()
			    {  
				module("latinQuiz");
				inject(function(_latinQuizModel_,$httpBackend,$rootScope)
				       {
					   httpBack=$httpBackend;
					   latinQuizModel=_latinQuizModel_;
					   _scope=$rootScope.$new();
				       })
			    })
		 it("should exist",inject(function($controller){
		     var studentDashboardController =$controller("studentDashboardController",
							{$scope:_scope},latinQuizModel);

		     expect(studentDashboardController).toBeDefined();
		 }))
		 it("should logout correctly",inject(function($controller,$location){
		     var studentLoginController =$controller("studentLoginController",
							{$scope:_scope},latinQuizModel);
		     spyOn($location,"path");
		     _scope.logoutButton();
		     httpBack.expectPOST("/logout").respond({"loggedIn":false);

		     expect($location.path)
		     .toHaveBeenCalledWith("/");
		 }))

		 it("should set data model correctly",inject(function($controller,$location){
		     var studentDashboardController =$controller("studentDashboardController",
							{$scope:_scope},latinQuizModel);
		     _scope.username="alexluken@centre.edu";
		     _scope.firstName="alex";
		     _scope.lastName="luken";
		     _scope.passwordVal="1234";		     		     
		     _scope.repasswordVal="1234";		     		     
		     _scope.firstName="alex";
		     _scope.signupCode="abc";
		     spyOn($location,"path");		     
		     _scope.signupButton();
		     var thePath="studentDashboard";
		     httpBack.expectPOST("/signup",
					 {
					     username:_scope.username,
					     password:_scope.passwordVal,
					     repassword:_scope.repasswordVal,
					     signupCode:_scope.signupCode,
					     firstName:_scope.firstName,
					     lastName:_scope.lastName
					 }).respond({"loggedIn":true,"redirect":thePath});

		     httpBack.flush();
		     expect($location.path)
		     .toHaveBeenCalledWith("studentDashboard");
		 }))
	     })
    */
     /*
    describe("teacher dashboard Controller",function()
	     {
		 var latinQuizModel;
		 var httpBack;
		 var _scope;
		 beforeEach(function()
			    {  
				module("latinQuiz");
				inject(function(_latinQuizModel_,$httpBackend,$rootScope)
				       {
					   httpBack=$httpBackend;
					   latinQuizModel=_latinQuizModel_;
					   _scope=$rootScope.$new();
				       })
			    })
		 it("should exist",inject(function($controller){
		     var studentLoginController =$controller("studentLoginController",
							{$scope:_scope},latinQuizModel);

		     expect(studentLoginController).toBeDefined();
		 }))
	     })
    */
     describe("Teacher Login Controller", function () {
         var latinQuizModel;
         var httpBack;
         var _scope;
         beforeEach(function () {
             module("latinQuiz");
             inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                 latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
             })
         })
         it("should exist", inject(function ($controller) {
             var teacherLoginController = $controller("teacherLoginController", {
                 $scope: _scope
             }, latinQuizModel);

             expect(teacherLoginController).toBeDefined();
         }))
         it("should try to login correctly", inject(function ($controller, $location) {
             var teacherLoginController = $controller("teacherLoginController", {
                 $scope: _scope
             }, latinQuizModel);
             _scope.username = "alexluken@centre.edu";
             _scope.passwordVal = "1234";
             spyOn($location, "path");
             _scope.loginButton();
             var thePath = "teacherDashboard";
             httpBack.expectPOST("/teacherLogin", {
                 username: _scope.username,
                 password: _scope.passwordVal
             }).respond({
                 "loggedIn": true,
                 "redirect": thePath
             });

             httpBack.flush();
             expect($location.path)
                 .toHaveBeenCalledWith("teacherDashboard");
         }))
         it("should fail to login correctly", inject(function ($controller, $location) {
             var teacherLoginController = $controller("teacherLoginController", {
                 $scope: _scope
             }, latinQuizModel);
             _scope.username = "alexluken@centre.edu";
             _scope.passwordVal = "1234";
             spyOn($location, "path");
             _scope.loginButton();
             var thePath = "teacherDashboard";
             httpBack.expectPOST("/teacherLogin", {
                 username: _scope.username,
                 password: _scope.passwordVal
             }).respond({
                 "loggedIn": false
             });

             httpBack.flush();
             expect(_scope.messageShow)
                 .toEqualData(false);
         }))
	 it("should set recover password path correctly", inject(function ($controller, $location) {
             var teacherLoginController = $controller("teacherLoginController", {
                 $scope: _scope
             }, latinQuizModel);
     	     spyOn($location,"path");
     	     _scope.recoverPasswordButton();
     	     expect($location.path)
     		 .toHaveBeenCalledWith("recoverPassword");
	     
         }))
	 it("should set change password path correctly", inject(function ($controller, $location) {
             var teacherLoginController = $controller("teacherLoginController", {
                 $scope: _scope
             }, latinQuizModel);
     	     spyOn($location,"path");
     	     _scope.changePasswordButton();
     	     expect($location.path)
     		 .toHaveBeenCalledWith("teacherChangePassword");
	     
         }))

     })

    describe("Teacher Dashboard Controller",function()
     	     {
     		 var latinQuizModel;
     		 var httpBack;
     		 var _scope;
     		 beforeEach(function()
     			    {  
     				module("latinQuiz");
     				inject(function(_latinQuizModel_,$httpBackend,$rootScope)
     				       {
     					   httpBack=$httpBackend;
     					   latinQuizModel=_latinQuizModel_;
     					   _scope=$rootScope.$new();
     				       })
     			    })
     		 it("should exist",inject(function($controller){
     		     var teacherDashboardController =$controller("teacherDashboardController",
     							{$scope:_scope},latinQuizModel);

     		     expect(teacherDashboardController).toBeDefined();
     		 }))

     		 it("should go to create new class page correctly",inject(function($controller,$location){
     		     var teacherDashboardController =$controller("teacherDashboardController",
     							{$scope:_scope},latinQuizModel);
     		     spyOn($location,"path");
     		     _scope.createClass();
     		     expect($location.path)
     		     .toHaveBeenCalledWith("createClass");
     		 }))
		 /*
     		 it("should logout",inject(function($controller,$location){
     		     var teacherDashboardController =$controller("teacherDashboardController",
     							{$scope:_scope},latinQuizModel);
     		     spyOn($location,"path");
     		     _scope.logout();
     		     httpBack.expectPOST("/teacherLogout").respond({"redirect":"/teacherLogin"});

     		     expect($location.path)
     		     .toHaveBeenCalledWith("teacherLogin");
     		 }))
		 */
     		 it("should display old classes correctly",inject(function($controller){
     		     var teacherDashboardController =$controller("teacherDashboardController",
     							{$scope:_scope},latinQuizModel);
     		     _scope.toggleOld();
     		     expect(_scope.hideOldClasses).toEqualData(1);
     		     _scope.toggleOld();
     		     expect(_scope.hideOldClasses).toEqualData(2);
     		 }))
		 it("should set object data",inject(function($controller){
     		     var teacherDashboardController =$controller("teacherDashboardController",
     							{$scope:_scope},latinQuizModel);
		     httpBack.expectGET("/classes").respond({"classes":teacherDashboardData()});
		     httpBack.flush();
		     var info=teacherDashboardData();
		     _scope.addEditName(info);
		     expect(_scope.classes).toEqualData(info);
		 }))
		 
     		 it("should send delete for an object correctly",inject(function($controller){
     		     var teacherDashboardController =$controller("teacherDashboardController",
     							{$scope:_scope},latinQuizModel);
		     var clss=teacherDashboardData()[0];

     		     httpBack.expectGET("/classes").respond({"classes":teacherDashboardData()});
     		     _scope.tryDeleteClass(clss);
		     expect(_scope.deleteClassHide).toEqualData(false);
		     expect(_scope.classToDelete).toEqualData(clss);
		     _scope.cancelDeleteClass();
		     expect(_scope.deleteClassHide).toEqualData(true);
		     expect(_scope.classToDelete).toEqualData("");
     		     _scope.tryDeleteClass(clss);
		     _scope.deleteClass();
		     var info=teacherDashboardData();
		     info[0]=clss;
     		     httpBack.expectPOST("/deleteClass/"+clss._id).respond({"classes":info});
		     expect(_scope.deleteClassHide).toEqualData(true);
		     expect(_scope.classToDelete).toEqualData("");
		     httpBack.flush();
     		 }))

     		 it("should send hide for an object correctly",inject(function($controller){
     		     var teacherDashboardController =$controller("teacherDashboardController",
     							{$scope:_scope},latinQuizModel);

     		     httpBack.expectGET("/classes").respond({"classes":teacherDashboardData()});
     		     httpBack.flush();
     		     _scope.hideClass(teacherDashboardData()[0]);
     		     httpBack.expectPOST("/hideClass/"+teacherDashboardData()[0]._id).respond({"classes":teacherDashboardData()});
     		     httpBack.flush();
     		 }))

     		 it("should send rename for an object correctly",inject(function($controller){
     		     var teacherDashboardController =$controller("teacherDashboardController",
     							{$scope:_scope},latinQuizModel);
     		     httpBack.expectGET("/classes").respond({"classes":teacherDashboardData()});
     		     httpBack.flush();
		     var cls=_scope.classes[0];
     		     _scope.renameClass(cls);
		     expect(cls.editName).toEqualData(false);
		     expect(cls.editWord).toEqualData("Save Name");
     		     _scope.renameClass(cls);
		     expect(cls.editName).toEqualData(true);
		     expect(cls.editWord).toEqualData("Edit Name");
		     httpBack.expectPOST("/renameClass/"+cls._id,{"newName":cls.name}).respond({"classes":teacherDashboardData()});
     		     httpBack.flush();
		     var dat=teacherDashboardData();
		     _scope.addEditName(dat);
		     expect(dat).toEqualData(_scope.classes);
		     /*
     		     var data=teacherDashboardData();
     		     data[0].name="changed name";
     		     httpBack.expectPOST("/renameClass/class1",{
     					     username:_scope.username,
     					     password:_scope.passwordVal
     					 }).respond(data);
     		     httpBack.flush()
     		     _scope.classes.toEqualData(data);
		     */

     		 }))
     	     })

     describe("Question view Controller", function () {
         var latinQuizModel;
         var httpBack;
         var _scope;
         beforeEach(function () {
             module("latinQuiz");
             inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                 latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
             })
         })
         it("should exist", inject(function ($controller) {
             var _routeParams = {
                 hwId: 5
             }
             var questionViewController = $controller("questionViewController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);

             expect(questionViewController).toBeDefined();
         }))
         it("should go home properly", inject(function ($controller, $location) {
             var _routeParams = {
                 hwId: 5,
		 classId:7
             }
             var questionViewController = $controller("questionViewController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
             spyOn($location, "path");
             _scope.home();
             expect($location.path)
                 .toHaveBeenCalledWith("teacherDashboard");

         }))
         it("set scope properly", inject(function ($controller) {
             var _routeParams = {
                 hwId: 5,
		 classId:7
             }
             var questionViewController = $controller("questionViewController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
             httpBack.expectGET("/hwResults/" +_routeParams.classId+"/"+ _routeParams.hwId).respond({
                 homework: hwData()
             });
             httpBack.flush();
             expect(_scope.hw).toEqualData(hwData());



         }))
     })
     describe("createClassController", function () {
         var latinQuizModel;
         var httpBack;
         var _scope;
         beforeEach(function () {
             module("latinQuiz");
             inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                 latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
             })
         })
         it("should exist", inject(function ($controller) {

             var createClassController = $controller("createClassController", {
                 $scope: _scope,
             }, latinQuizModel);

             expect(createClassController).toBeDefined();
         }))
         it("Cancel correctly", inject(function ($controller, $location) {

             var createClassController = $controller("createClassController", {
                 $scope: _scope,
             }, latinQuizModel);
             spyOn($location, "path");
             _scope.cancel();
             expect($location.path)
                 .toHaveBeenCalledWith("teacherDashboard");

         }))
	 /*
         it("fail to add class", inject(function ($controller, $location) {

             var createClassController = $controller("createClassController", {
                 $scope: _scope,
             }, latinQuizModel);
             spyOn($location, "path");
             _scope.selectedClass = "";
             _scope.name = "";
             _scope.save();
             expect(_scope.errorPresent)
                 .toEqualData(false);

         }))
	 */
         it("add class correctly", inject(function ($controller, $location) {

             var createClassController = $controller("createClassController", {
                 $scope: _scope,
             }, latinQuizModel);

             _scope.selectedClass = "ratin 110";
             _scope.name = "aatin 110";
             _scope.save();
             httpBack.expectGET("/previousClasses").respond({
                 previousClasses: previousClasses(),
             
             });
             httpBack.expectPOST("/createClass", {
                 name: _scope.name,
                 structure: _scope.selectedClass
             }).respond({
                 error: false
             });
             httpBack.flush();

         }))
         it("set scope properly", inject(function ($controller, $location) {

             var createClassController = $controller("createClassController", {
                 $scope: _scope,
             }, latinQuizModel);

             //_scope.save();
             httpBack.expectGET("/previousClasses").respond({
                 classes: previousClasses()
             });

             httpBack.flush();
             expect(_scope.previousClasses)
                 .toEqualData(previousClasses());

         }))

     })
    describe("quizViewController", function () {
        var latinQuizModel;
        var httpBack;
        var _scope;
        beforeEach(function () {
            module("latinQuiz");
            inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                httpBack = $httpBackend;
                latinQuizModel = _latinQuizModel_;
                _scope = $rootScope.$new();
            })
        })
        it("should exist", inject(function ($controller) {
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
            }, latinQuizModel);
	    
             expect(quizViewController).toBeDefined();
        }))
        it("should set scope properly", inject(function ($controller) {
	    
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
                $routeParams: {
                    hwId:"5"
                }
            }, latinQuizModel);
            httpBack.expectGET("/quiz/5").respond({
                hw: quizViewData()
		
		
            });
            httpBack.flush();
            expect(_scope.hw).toEqualData(quizViewData());
        }))
        it("should submit homeworks properly", inject(function ($controller,$location) {
	    
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
                $routeParams: {
                    hwId:"5"
                }
            }, latinQuizModel);
            httpBack.expectGET("/quiz/5").respond({
                hw: quizViewData()
		
		
            });
            httpBack.flush();
            spyOn($location,'path')
            _scope.hw.questions[0].response = "a";
                     _scope.hw.questions[1].response = "a";
                     _scope.hw.questions[2].response = "a";
                     _scope.hw.questions[3].response = "a";
                     _scope.hw.questions[4].response = ["a"];
            _scope.submit();
            httpBack.expectPOST("/newStudentHomework/",{HW:_scope.hw}).respond(true);
            httpBack.flush();
            expect($location.path).toHaveBeenCalledWith("/homeworkResults/"+_scope.hw._id)

            //expect(_scope.hw).toEqualData(quizViewData());
        }))
          it("should fail to submit homeworks properly", inject(function ($controller,$location) {
	    
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
                $routeParams: {
                    hwId:"5"
                }
            }, latinQuizModel);
            httpBack.expectGET("/quiz/5").respond({
                hw: quizViewData()
		
		
            });
            httpBack.flush();
    
            _scope.submit();
 
            expect(_scope.error).toEqualData(true);

            //expect(_scope.hw).toEqualData(quizViewData());
        }))
           it("should set response for true false and multiple choice properly", inject(function ($controller) {
	    
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
                $routeParams: {
                    hwId:"5"
                }
            }, latinQuizModel);
            httpBack.expectGET("/quiz/5").respond({
                hw: quizViewData()
            });
            httpBack.flush();
            expect(_scope.hw).toEqualData(quizViewData());
            _scope.setResponse("Pop Tarts",4);
            expect(_scope.hw.questions[3].response).toEqualData("Pop Tarts")
        }))
         it("should set response for multiple answers properly", inject(function ($controller) {
	    
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
                $routeParams: {
                    hwId:"5"
                }
            }, latinQuizModel);
            httpBack.expectGET("/quiz/5").respond({
                hw: quizViewData()
            });
            httpBack.flush();
            expect(_scope.hw).toEqualData(quizViewData());
            _scope.setResponseMa("Turkey",5);
            expect(_scope.hw.questions[4].response.includes("Turkey")).toEqualData(true);
        }))
        it("should remove responses for multiple answers properly", inject(function ($controller) {
	    
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
                $routeParams: {
                    hwId:"5"
                }
            }, latinQuizModel);
            httpBack.expectGET("/quiz/5").respond({
                hw: quizViewData()
            });
            httpBack.flush();
            expect(_scope.hw).toEqualData(quizViewData());
            _scope.setResponseMa("Turkey",5);
            _scope.setResponseMa("Turkey",5);
  expect(_scope.hw.questions[4].response.includes("Turkey")).toEqualData(false);
        }))
        it("should flag questions properly", inject(function ($controller) {
	    
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
                $routeParams: {
                    hwId:"5"
                }
            }, latinQuizModel);
            httpBack.expectGET("/quiz/5").respond({
                hw: quizViewData()
            });
            httpBack.flush();
           
            _scope.flagQuestion(0);
  expect(_scope.hw.questions[0].flag).toEqualData(true);
        }))
         it("should unflag questions properly", inject(function ($controller) {
	    
            var quizViewController = $controller("quizViewController", {
                $scope: _scope,
                $routeParams: {
                    hwId:"5"
                }
            }, latinQuizModel);
            httpBack.expectGET("/quiz/5").respond({
                hw: quizViewData()
            });
            httpBack.flush();
           
            _scope.flagQuestion(0);
                         _scope.flagQuestion(0);

  expect(_scope.hw.questions[0].flag).toEqualData(false);
        }))
    })
    
    
    describe("Student Dashboard controller", function () {
	//console.log(studentDashboardData());
        var latinQuizModel;
        var httpBack;
        var _scope;
        beforeEach(function () {
            module("latinQuiz");
            inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                httpBack = $httpBackend;
                latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
            })
        })
        it("should exist", inject(function ($controller) {
	    
            var studentDashboardController = $controller("studentDashboardController", {
                $scope: _scope,
            }, latinQuizModel);
	    
            expect(studentDashboardController).toBeDefined();
        }))
        it("should set values properly", inject(function ($controller) {
	    
            var studentDashboardController = $controller("studentDashboardController", {
                 $scope: _scope,
            }, latinQuizModel);
	    
	    httpBack.expectGET("/studentDashboardInformation").respond(studentDashboardData());
	    httpBack.flush();
	    expect(studentDashboardData().nextHomework).toEqualData(_scope.nextHW);
	    var x=[];
	    studentDashboardData().chapters.forEach(function(element){
		element.hide=true;
		_scope.adjustPic(element);	 
		element.homework.forEach(function(hw){
		   // hw.dateString=hw.dueDate.toString();
		    /*
		    if(hw.status==statuses.toBeCompleted){
			hw.symbol="fa-ellipsis-h";
		    }
		    if(hw.status==statuses.Complete){
			hw.symbol="fa-check";
		    }
		    if(hw.status==statuses.didNotComplete){
			hw.symbol="fa-times";
		    }
		    */
		})
		x.push(element);
	    })
	    expect(x).toEqualData(_scope.chapters);
        }))
        it("should let you take a hw", inject(function ($controller,$location) {
	    
            var studentDashboardController = $controller("studentDashboardController", {
                $scope: _scope,
            }, latinQuizModel);
            spyOn($location, "path");
	    
            _scope.goToHomework({
		_id:"hw6",
		status:statuses.toBeCompleted
	    });
            expect($location.path)
                 .toHaveBeenCalledWith("/homework/hw6");
	}))
        it("should let you see the results of a homework", inject(function ($controller,$location) {
	    
            var studentDashboardController = $controller("studentDashboardController", {
                $scope: _scope,
            }, latinQuizModel);
            spyOn($location, "path");
	    
            _scope.goToHomework({
		_id:"hw6",
		status:statuses.Completed
	    });
            expect($location.path)
                 .toHaveBeenCalledWith("/homeworkResults/hw6");
	}))
        it("should hide and unhide correctly", inject(function ($controller,$location) {
	    
            var studentDashboardController = $controller("studentDashboardController", {
                $scope: _scope,
            }, latinQuizModel);
	    console.log(studentDashboardData());
	    var data=studentDashboardData().chapters[0];
	    data.hide=true;
	    _scope.showStuff(data);
	    expect(false).toEqualData(data.hide);
	    _scope.showStuff(data);
	    expect(true).toEqualData(data.hide);
	}))


    })
    /*
      describe("MY template work", function()

	     {
		 var compile, _scope, directiveElem;
		 beforeEach(function() {
		     module('client/directives/fillInTheBlank.html');
		     
		     inject(function($compile, $rootScope){
			 compile = $compile;
			 _scope = $rootScope.$new();
		     });
		     
		     directiveElem = getCompiledElement();
	     });
		 
		 var getCompiledElement=function(){
		     var element = angular.element('<fill-in-the-blank question="hw.questions[1]"></fill-in-the-blank>');  
		     _scope.hw = quizViewData();
		     var compiledElement = compile(element)(_scope);
		     _scope.$digest();
		     return compiledElement;
		 }    
		 
		 it('should have elements', function () {
		     console.log(directiveElem);
		     var monster = directiveElem;
		     //    console.log("Pokemon",monster.html());
		     console.log(monster);
		 });
		 
		 
	     });
    */
    /*
    describe("homework view Controller", function () {
         var latinQuizModel;
         var httpBack;
         var _scope;
         beforeEach(function () {
             module("latinQuiz");
             inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                 latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
             })
         })
         it("should exist", inject(function ($controller) {
             var _routeParams = {
                 hwId: 5
             }
             var questionViewController = $controller("questionViewController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);

             expect(questionViewController).toBeDefined();
         }))
         it("should go home properly", inject(function ($controller, $location) {
             var _routeParams = {
                 hwId: 5
             }
             var questionViewController = $controller("questionViewController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
             spyOn($location, "path");
             _scope.home();
             expect($location.path)
                 .toHaveBeenCalledWith("teacherDashboard");

         }))
         it("set scope properly", inject(function ($controller) {
             var _routeParams = {
                 hwId: 7
             }
             var questionViewController = $controller("questionViewController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
             httpBack.expectGET("/hwResults/" + _routeParams.hwId).respond({
                 homework: hwData()
             });
             httpBack.flush();
             expect(_scope.hw).toEqualData(hwData());



         }))
     })
    */
describe("post homework view Controller", function () {
         var latinQuizModel;
         var httpBack;
         var _scope;
         beforeEach(function () {
             module("latinQuiz");
             inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                 latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
             })
         })
         it("should exist", inject(function ($controller) {
             var _routeParams = {
                 homeworkid: 5
             }
             var homeworkResultsController = $controller("homeworkResultsController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);

             expect(homeworkResultsController).toBeDefined();
         }))
            it("should go home properly", inject(function ($controller, $location) {
             var _routeParams = {
                 homeworkid: 5
             }
             var homeworkResultsController = $controller("homeworkResultsController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
             spyOn($location, "path");
             _scope.home();
             expect($location.path)
                 .toHaveBeenCalledWith("studentDashboard");

         }))
          it("set scope properly", inject(function ($controller) {
             var _routeParams = {
                 homeworkid: 7
             }
             var homeworkResultsController = $controller("homeworkResultsController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
             httpBack.expectGET("/homeworkResults/" + _routeParams.homeworkid).respond({
                 results: postHomeworkData()
             });
             httpBack.flush();
             expect(_scope.results).toEqualData(postHomeworkData());



         }))
     
     })

    describe("teacher class Controller", function () {
         var latinQuizModel;
         var httpBack;
         var _scope;

         beforeEach(function () {
             module("latinQuiz");
             inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                 latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
             })
         })
         it("should exist", inject(function ($controller) {
             var _routeParams = {
                 classId: 5
             }
             var teacherClassController = $controller("teacherClassController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);

             expect(teacherClassController).toBeDefined();
         }))
	it("should set objects correctly",inject(function($controller,$location){
             var _routeParams = {
                 classId: 5
             }
             var teacherClassController = $controller("teacherClassController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
	    httpBack.expectGET("/classData/5").respond({"classData":teacherClassData()});
	    var dat=teacherClassData();
	    dat.chapters.forEach(function(chapter){
		_scope.showStuff(chapter);
		_scope.adjustPic(chapter);
		chapter.homework.forEach(function(hw){
		    hw.dateString=latinQuizModel.dateToString(new Date(hw.date));
		})
	    })
	    httpBack.flush();
	    expect(dat).toEqualData(_scope.class);
	}))
	it("should do show stuff correctly",inject(function($controller,$location){
             var _routeParams = {
                 classId: 5
             }
             var teacherClassController = $controller("teacherClassController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
	    httpBack.expectGET("/classData/5").respond({"classData":teacherClassData()});
	    var dat=teacherClassData();
	    dat.chapters.forEach(function(chapter){
		_scope.showStuff(chapter);
		_scope.adjustPic(chapter);
		chapter.homework.forEach(function(hw){
		    hw.dateString=latinQuizModel.dateToString(new Date(hw.date));
		})

	    })
	    httpBack.flush();
	    console.log(_scope.class.chapters[0]);
	    _scope.showStuff(_scope.class.chapters[0]);

	    //_scope.showStuff(dat.chapters[0])
	    expect(_scope.class.chapters[0].hide).toEqualData(false);
	    _scope.class.chapters[0].homework.forEach(function(hw){
		expect(hw.hide).toEqualData(false);
	    })
	}))
	it("should do adjust pic correctly",inject(function($controller,$location){
             var _routeParams = {
                 classId: 5
             }
             var teacherClassController = $controller("teacherClassController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
	    httpBack.expectGET("/classData/5").respond({"classData":teacherClassData()});
	    var dat=teacherClassData();
	    dat.chapters.forEach(function(chapter){
		_scope.showStuff(chapter);
		_scope.adjustPic(chapter);
		chapter.homework.forEach(function(hw){
		    hw.dateString=latinQuizModel.dateToString(new Date(hw.date));
		})

	    })
	    httpBack.flush();
	    console.log(_scope.class);
	    _scope.adjustPic(_scope.class.chapters[0]);
	    expect(_scope.class.chapters[0].expandIcon).toEqualData("fa-plus");
	}))
	it("should do adjust pic correctly",inject(function($controller,$location){
            var _routeParams = {
                classId: 5
            }
             var teacherClassController = $controller("teacherClassController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
	    httpBack.expectGET("/classData/5").respond({"classData":teacherClassData()});
	    var dat=teacherClassData();
	    dat.chapters.forEach(function(chapter){
		_scope.showStuff(chapter);
		_scope.adjustPic(chapter);
		chapter.homework.forEach(function(hw){
		    hw.dateString=latinQuizModel.dateToString(new Date(hw.date));
		})

	    })
	    httpBack.flush();
	    
	    expect(dat).toEqualData(_scope.class);
	}))
	it("should go to question overview correctly",inject(function($controller,$location){
            var _routeParams = {
                classId: 5
            }
             var teacherClassController = $controller("teacherClassController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
	    httpBack.expectGET("/classData/5").respond({"classData":teacherClassData()});
	    httpBack.flush();
	    spyOn($location,"path");
	    var displayedHw={
		_id:5,
		questions:[{
		    index:5,
		    _id:5
		}]
	    };
	    _scope.displayedHw=displayedHw
	    _scope.goToQuestionOverview(5);
	    expect($location.path)
		.toHaveBeenCalledWith("/questionOverview/"+_routeParams.classId+"/"+5+"/"+5);

	}))
	it("should go to student overview correctly",inject(function($controller,$location){
            var _routeParams = {
                classId: 5
            }
             var teacherClassController = $controller("teacherClassController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
	    httpBack.expectGET("/classData/5").respond({"classData":teacherClassData()});
	    httpBack.flush();
	    spyOn($location,"path");
	    _scope.goToStudentOverview(5);
	    expect($location.path)
		.toHaveBeenCalledWith("/teacherStudentOverview/"+_routeParams.classId+"/"+5);

	}))

	it("should do show chapter correctly",inject(function($controller,$location){
            var _routeParams = {
                classId: 5
            }
             var teacherClassController = $controller("teacherClassController", {
                 $scope: _scope,
                 $routeParams: _routeParams
             }, latinQuizModel);
	    httpBack.expectGET("/classData/5").respond({"classData":teacherClassData()});
	    httpBack.flush();
	    _scope.showChapter(_scope.class.chapters[0].homework[0]);
	    expect(_scope.class.chapters[0].homework[0].student[0].responsePic).toEqualData([
		{
		    "pic":"",
		    "text":"QM"
		},
		{
		    "pic":"fa-check",
		    "text":""
		},
		{
		    "pic":"fa-check",
		    "text":""
		},
		{
		    "pic":"fa-check",
		    "text":""
		}
	    ]);
	    expect(_scope.class.chapters[0].homework[0].student[1].responsePic).toEqualData([
		{
		    "pic":"fa-minus",
		    "text":""
		},
		{
		    "pic":"fa-minus",
		    "text":""
		},
		{
		    "pic":"fa-minus",
		    "text":""
		},
		{
		    "pic":"fa-minus",
		    "text":""
		}
	    ]);
	    expect(_scope.class.chapters[0].homework[0].student[2].responsePic).toEqualData([
		{
		    "pic":"",
		    "text":"QM"
		},
		{
		    "pic":"fa-check",
		    "text":""
		},
		{
		    "pic":"fa-times",
		    "text":""
		},
		{
		    "pic":"fa-times",
		    "text":""
		}
	    ]);
	    expect(_scope.class.chapters[0].homework[0].student[3].responsePic).toEqualData([
		{
		    "pic":"fa-times",
		    "text":""
		},
		{
		    "pic":"fa-check",
		    "text":""
		},
		{
		    "pic":"fa-times",
		    "text":""
		},
		{
		    "pic":"fa-check",
		    "text":""
		}
	    ]);


	}))
	it("should set edit class path properly",inject(function($controller,$location){
	    var _routeParams = {
                classId: 5
            }
            var teacherClassController = $controller("teacherClassController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    
	    spyOn($location,"path");
	    _scope.editClass();
	    expect($location.path)
		.toHaveBeenCalledWith("/teacherClassEdit/"+_routeParams.classId);
	}))


    })

    describe("teacher class edit Controller", function () {
        var latinQuizModel;
        var httpBack;
        var _scope;
	
        beforeEach(function () {
             module("latinQuiz");
            inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
            })
        })
        it("should exist", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    console.log(teacherClassEditInfo());
            expect(teacherClassEditController).toBeDefined();
        }))

        it("should set objects correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    console.log(teacherClassEditInfo().classInfo);
	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    var dat=teacherClassEditInfo().classInfo;
	    dat.chapters.forEach(function(chapter){
		_scope.showStuff(chapter);
		_scope.adjustPic(chapter);
	    })
	    _scope.createIndices(dat.chapters);
	    expect(dat).toEqualData(_scope.class);
	    expect(teacherClassEditInfo().studentInfo).toEqualData(_scope.students);
        }))
        it("should try to delete a student correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    console.log(teacherClassEditInfo().classInfo);
	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    _scope.tryDeleteStudent(_scope.students[0]);
	    expect(_scope.dltStudent).toEqualData(_scope.students[0]);
	    expect(_scope.hideDeleteStudent).toEqualData(false);
	    expect(_scope.hideResetStudent).toEqualData(true);
	    _scope.deleteStudent();
	    expect(_scope.hideDeleteStudent).toEqualData(true);
	    expect(_scope.hideResetStudent).toEqualData(true);
	    httpBack.expectPOST("/deleteStudent/"+_routeParams.classId+"/"+_scope.students[0]._id).respond({"error":false});
	    httpBack.flush();
	    expect(_scope.errorMessageShow).toEqualData(false);
	}))
        it("should try to delete a chapter correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    _scope.tryDeleteChapter(_scope.class.chapters[0]);
	    expect(_scope.dltChapter).toEqualData(_scope.class.chapters[0]);
	    _scope.deleteChapter();
	    httpBack.expectPOST("/deleteChapter/"+_routeParams.classId+"/"+_scope.class.chapters[0]._id).respond({"classInfo":teacherClassEditInfo().classInfo});
	    httpBack.flush();
	    expect(_scope.dltHide).toEqualData(true);
	    expect(_scope.dltChapter).toEqualData("");
	    console.log(_scope.class);
	    console.log(teacherClassEditInfo.classInfo);
	    var k=teacherClassEditInfo().classInfo;
	    console.log(k);
	    k.chapters.forEach(function(ch){
		_scope.showStuff(ch);
		_scope.adjustPic(ch);
	    })
	    _scope.createIndices(k.chapters);
	    expect(k).toEqualData(_scope.class);
	}))

        it("should try to delete a homework correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    _scope.tryDeleteHomework(_scope.class.chapters[0],_scope.class.chapters[0].homework[0]);
	    expect(_scope.deleteHw).toEqualData(_scope.class.chapters[0].homework[0]);
	    _scope.deleteHomework();
	    httpBack.expectPOST("/deleteHomework/"+_routeParams.classId+"/"+_scope.class.chapters[0]._id+"/"+_scope.class.chapters[0].homework[0]._id).respond({"classInfo":teacherClassEditInfo().classInfo});
	    httpBack.flush();
	    expect(_scope.dltHide2).toEqualData(true);
	    expect(_scope.deleteHw).toEqualData("");
	    var k=teacherClassEditInfo().classInfo;
	    k.chapters.forEach(function(ch){
		_scope.showStuff(ch);
		_scope.adjustPic(ch);
	    })
	    _scope.createIndices(k.chapters);
	    expect(k).toEqualData(_scope.class);
	}))


        it("should try to reset a student correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    console.log(teacherClassEditInfo().classInfo);
	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    _scope.tryResetStudentPassword(_scope.students[0]);
	    expect(_scope.rstStudent).toEqualData(_scope.students[0]);
	    expect(_scope.hideDeleteStudent).toEqualData(true);
	    expect(_scope.hideResetStudent).toEqualData(false);
	    _scope.resetStudent();
	    expect(_scope.hideDeleteStudent).toEqualData(true);
	    expect(_scope.hideResetStudent).toEqualData(true);
	    httpBack.expectPOST("/resetStudent/"+_scope.students[0]._id).respond({error:false});
	    //expect(teacherClassEditInfo().studentInfo).toEqualData(_scope.students);
	}))
	xit("should try to set the date of a homework correctly correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);

	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    _scope.class.chapters[0].homework[0].editableDueDate= latinQuizModel.dateToString(new Date(2020,6,6,9));
	    _scope.class.chapters[0].homework[1].editableDueDate=latinQuizModel.dateToString(new Date(2020,6,6,9));
	    _scope.trySaveDueDate();
	    expect(_scope.dueDateChange).toEqualData(false);
	    expect(_scope.dueDateToChange).toEqualData([_scope.class.chapters[0].homework[0],_scope.class.chapters[0].homework[1]]);
	    _scope.confirmDateChanges();
	    var arrayOfHws=[];
	    _scope.dueDateToChange.forEach(function(hw){
             var convertedDate = latinQuizModel.stringToDate(hw.editableDueDate);
	       var item={
		   "chapterId":hw.chapter_id,
		   "hwId":hw._id,
		   "newDate":convertedDate
	       };
	       arrayOfHws.push(item);
	   })

	    httpBack.expectPOST("/setDate/5",{
		"hwsToChange":arrayOfHws
	    }).respond({"classInfo":teacherClassEditInfo().classInfo});
	    httpBack.flush();
	    var dat=teacherClassEditInfo().classInfo;
	    dat.chapters.forEach(function(chapter){
		_scope.showStuff(chapter);
		_scope.adjustPic(chapter);
	    })
	    _scope.createIndices(dat.chapters);
	    expect(_scope.class).toEqualData(dat);
	    expect(_scope.dueDateToChange).toEqualData([]);
	    expect(_scope.dueDateChange).toEqualData(false);
	}))
	it("should try to set homework path properly", inject(function ($controller,$location) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);

	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    spyOn($location,"path");
	    _scope.goToHWPage({_id:5},{_id:7});
	    expect($location.path)
		.toHaveBeenCalledWith("/homeworkManagement/"+_routeParams.classId+"/5/7");
	}))
	xit("should show hw properly", inject(function ($controller,$location) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);

	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    _scope.showStuff(_scope.class.chapters[0]);
	    expect(_scope.class.chapters[0].hide).toEqualData(false);
	    _scope.class.chapters[0].homework.forEach(function(hw){
		expect(hw.hide).toEqualData(false);
		expect(hw.editableDueDate).toEqualData(latinQuizModel.dateToString(hw.date));
	    })
	}))
        it("should change chapter order correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    console.log(teacherClassEditInfo().classInfo);
	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    _scope.class.chapters[0].indexChange=3;
	    _scope.changeOptions(_scope.class.chapters[0]);
	    httpBack.expectPOST("/changeChapterOrder/5",{
		"chapterChanger":_scope.class.chapters[0]
	    }).respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.flush();
	    var dat=teacherClassEditInfo().classInfo;
	    dat.chapters.forEach(function(chapter){
		_scope.showStuff(chapter);
		_scope.adjustPic(chapter);
	    })
	    _scope.createIndices(dat.chapters);
	    expect(_scope.class).toEqualData(dat);
	}))
        it("should change homework order correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5
            }
            var teacherClassEditController = $controller("teacherClassEditController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    console.log(teacherClassEditInfo().classInfo);
	    httpBack.expectGET("/classEditData/5").respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.expectGET("/classStudentData/5").respond({"students":teacherClassEditInfo().studentInfo});
	    httpBack.flush();
	    _scope.class.chapters[0].homework[1].indexChange=1;
	    _scope.changeHw(_scope.class.chapters[0],_scope.class.chapters[0].homework[1]);
	    httpBack.expectPOST("/changeHomeworkOrder/5/"+_scope.class.chapters[0]._id,{
		"homeworkChanger":_scope.class.chapters[0].homework[1]
	    }).respond({"classInfo":teacherClassEditInfo().classInfo});	    	    
	    httpBack.flush();
	    var dat=teacherClassEditInfo().classInfo;
	    dat.chapters.forEach(function(chapter){
		_scope.showStuff(chapter);
		_scope.adjustPic(chapter);
	    })
	    _scope.createIndices(dat.chapters);
	    expect(_scope.class).toEqualData(dat);
	}))
    })
    describe("teacher student overview Controller", function () {
        var latinQuizModel;
        var httpBack;
        var _scope;
	
        beforeEach(function () {
             module("latinQuiz");
            inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
            })
        })
        it("should exist", inject(function ($controller) {
            var _routeParams = {
                classId: 5,
		studentId:7
            }
            var teacherStudentViewController = $controller("teacherStudentViewController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
            expect(teacherStudentViewController).toBeDefined();
        }))
        xit("should load the objects correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5,
		studentId:7
            }
            var teacherStudentViewController = $controller("teacherStudentViewController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    httpBack.expectGET("/studentOverview/"+_routeParams.classId).respond({"studentInfo":studentOverviewData()});
	    httpBack.flush();

	    var dat=studentOverviewData();
	    
	    dat.forEach(function(stud){
		stud.chapters.forEach(function(chap){
		    _scope.showStuff(chap);
		})
	    })
	    dat.forEach(function(stud){
		if(_scope.selectedStudent==stud){
		    stud.statusIcon="fa-minus";
		}
		else{
		    stud.statusIcon="fa-plus";
		}
		if(stud.missing==false){
		    stud.color="black";
		}
		else{
		    stud.color="red";
		}
	    })
	    console.log(dat);
	    console.log(_scope.students);
	    expect(dat).toEqualData(_scope.students);
        }))
        xit("should load the objects correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5,
		studentId:0022
            }
            var teacherStudentViewController = $controller("teacherStudentViewController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    httpBack.expectGET("/studentOverview/"+_routeParams.classId).respond({"studentInfo":studentOverviewData()});
	    httpBack.flush();
	    var dat=studentOverviewData();

	    dat.forEach(function(stud){
		stud.chapters.forEach(function(chap){
		    _scope.showStuff(chap);
		})
		var selectedStudent=dat[0];
		if(selectedStudent==stud){
		    stud.statusIcon="fa-minus";
		}
		else{
		    stud.statusIcon="fa-plus";
		}
		if(stud.missing==false){
		    stud.color="black";
		}
		else{
		    stud.color="red";
		}
	    })
	    expect(_scope.selectedStudent).toEqualData(dat[0]);
	}))
        it("should do display student correctly", inject(function ($controller) {
            var _routeParams = {
                classId: 5,
		studentId:0022
            }
            var teacherStudentViewController = $controller("teacherStudentViewController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    httpBack.expectGET("/studentOverview/"+_routeParams.classId).respond({"studentInfo":studentOverviewData()});
	    httpBack.flush();
	    _scope.displayStudent(_scope.students[1]);
	    expect(_scope.selectedStudent).toEqualData(_scope.students[1]);
	    expect(_scope.students[1].statusIcon).toEqualData("fa-minus");
	    expect(_scope.students[0].statusIcon).toEqualData("fa-plus");
	}))
        it("should do home button correctly", inject(function ($controller,$location) {
            var _routeParams = {
                classId: 5,
		studentId:0022
            }
            var teacherStudentViewController = $controller("teacherStudentViewController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    httpBack.expectGET("/studentOverview/"+_routeParams.classId).respond({"studentInfo":studentOverviewData()});
	    spyOn($location,"path");
	    _scope.homeButton();
	    expect($location.path)
		.toHaveBeenCalledWith("/teacherDashboard");

	}))
        it("should do logout button correctly", inject(function ($controller,$location) {
            var _routeParams = {
                classId: 5,
		studentId:0022
            }
            var teacherStudentViewController = $controller("teacherStudentViewController", {
                $scope: _scope,
                $routeParams: _routeParams
            }, latinQuizModel);
	    httpBack.expectGET("/studentOverview/"+_routeParams.classId).respond({"studentInfo":studentOverviewData()});
	    spyOn($location,"path");
	    _scope.logoutButton();
            httpBack.expectPOST("/logout").respond({"loggedIn":false});
            httpBack.flush();
	    expect($location.path)
		.toHaveBeenCalledWith("/teacherLogin");

	}))

    })
    describe("change password Controller", function () {
        var latinQuizModel;
        var httpBack;
        var _scope;
	
        beforeEach(function () {
             module("latinQuiz");
            inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
            })
        })
        it("should exist", inject(function ($controller) {
            var changePasswordController = $controller("changePasswordController", {
                $scope: _scope
            }, latinQuizModel);
            expect(changePasswordController).toBeDefined();
        }))
	it("should handle the http message properly", inject(function ($controller) {
	    var changePasswordController = $controller("changePasswordController", {
                $scope: _scope
            }, latinQuizModel);
	    _scope.oldPassword="alex";
	    _scope.newPassword="luken";
	    _scope.reenterPassword="luken";
	    _scope.changePassword();
	    httpBack.expectPOST("/changePassword",{
		"oldPassword":_scope.oldPassword,
		"newPassword":_scope.newPassword,
		"reenterPassword":_scope.reenterPassword
		}).respond({
		    "displayMessage":"Password was changed correctly",
		    "displayType":"warningMessage"
			   });
	    httpBack.flush();
	    expect(_scope.displayMessage).toEqualData("Password was changed correctly");
	    expect(_scope.messageClass).toEqualData("warningMessage");
	    expect(_scope.hideMessage).toEqualData(false);
	}))
	it("should handle the http message properly", inject(function ($controller,$location) {
	    var changePasswordController = $controller("changePasswordController", {
                $scope: _scope
            }, latinQuizModel);
	    spyOn($location,"path");
	    _scope.goBack();
	    expect($location.path)
		.toHaveBeenCalledWith("/studentDashboard");
	}))
    })
    describe("teacher change password Controller", function () {
        var latinQuizModel;
        var httpBack;
        var _scope;
	
        beforeEach(function () {
             module("latinQuiz");
            inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
            })
        })
        it("should exist", inject(function ($controller) {
            var teacherChangePasswordController = $controller("teacherChangePasswordController", {
                $scope: _scope
            }, latinQuizModel);
            expect(teacherChangePasswordController).toBeDefined();
        }))
        it("should go back properly", inject(function ($controller,$location) {
            var teacherChangePasswordController = $controller("teacherChangePasswordController", {
                $scope: _scope
            }, latinQuizModel);
	    spyOn($location,"path");
	    _scope.goBack();
	    expect($location.path)
		.toHaveBeenCalledWith("/teacherLogin");
        }))
        it("should try to change password properly", inject(function ($controller,$location) {
            var teacherChangePasswordController = $controller("teacherChangePasswordController", {
                $scope: _scope
            }, latinQuizModel);
	    _scope.oldPassword="1234";
	    _scope.newPassword="12345";
	    _scope.reenterPassword="12345";
	    _scope.changePassword();
	    httpBack.expectPOST("/changeTeacherPassword",{
		"oldPassword":"1234",
		"newPassword":"12345",
		"reenterPassword":"12345",
		}).respond({
		    "displayMessage":"password change did not work",
		    "displayType":"warningMessage",
		});
	    httpBack.flush();
	    expect(_scope.displayMessage).toEqualData("password change did not work");
	    expect(_scope.messageClass).toEqualData("warningMessage");
	    expect(_scope.hideMessage).toEqualData(false);
        }))


    })
    describe("teacher recover password Controller", function () {
        var latinQuizModel;
        var httpBack;
        var _scope;
	
        beforeEach(function () {
             module("latinQuiz");
            inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
            })
        })
        it("should exist", inject(function ($controller) {
            var teacherRecoverPasswordController = $controller("teacherRecoverPasswordController", {
                $scope: _scope
            }, latinQuizModel);
            expect(teacherRecoverPasswordController).toBeDefined();
        }))
	it("should set objects correctly", inject(function ($controller) {
            var teacherRecoverPasswordController = $controller("teacherRecoverPasswordController", {
                $scope: _scope
            }, latinQuizModel);
	    expect(_scope.recoveryAnswer).toEqualData("");
	    expect(_scope.newPassword).toEqualData("");
	    expect(_scope.reenterPassword).toEqualData("");
	    httpBack.expectGET("/recoveryQuestion").respond({"question":"what is your favorite color"});
	    httpBack.flush();
	    expect(_scope.recoverQuestion).toEqualData("what is your favorite color");
        }))
	it("should send recover password correctly", inject(function ($controller) {
            var teacherRecoverPasswordController = $controller("teacherRecoverPasswordController", {
                $scope: _scope
            }, latinQuizModel);
	    httpBack.expectGET("/recoveryQuestion").respond({"question":"what is your favorite color"});

	    httpBack.flush();
	    _scope.recoveryAnswer="red";
	    _scope.newPassword="123456";
	    _scope.reenterPassword="123456";
	    _scope.recoverPassword()
	    httpBack.expectPOST("/recoverTeacherPassword",{
		"recoverAnswer":"red",
		"newPassword":"123456",
		"reenterPassword":"123456"		
	    }).respond({"displayMessage":"nice job",
			"displayType":"confirmMessage"
		       });
	    httpBack.flush();
	    expect(_scope.displayMessage).toEqualData("nice job");
	    expect(_scope.messageClass).toEqualData("confirmMessage");
	    expect(_scope.hideMessage).toEqualData(false);
        }))
        it("should go back properly", inject(function ($controller,$location) {
            var teacherRecoverPasswordController = $controller("teacherRecoverPasswordController", {
                $scope: _scope
            }, latinQuizModel);
	    spyOn($location,"path");
	    _scope.goBack();
	    expect($location.path)
		.toHaveBeenCalledWith("/teacherLogin");
        }))


    })

    describe("teacher Sign up Controller",function()
	     {
		 var latinQuizModel;
		 var httpBack;
		 var _scope;
		 beforeEach(function()
			    {  
				module("latinQuiz");
				inject(function(_latinQuizModel_,$httpBackend,$rootScope)
				       {
					   httpBack=$httpBackend;
					   latinQuizModel=_latinQuizModel_;
					   _scope=$rootScope.$new();
				       })
			    })
		 it("should exist",inject(function($controller){
		     var teacherSignupController =$controller("teacherSignupController",
							{$scope:_scope},latinQuizModel);

		     expect(teacherSignupController).toBeDefined();
		 }))
		 it("should create an account correctly",inject(function($controller,$location){
		     var teacherSignupController =$controller("teacherSignupController",
							{$scope:_scope},latinQuizModel);

		     _scope.username="alexluken@centre.edu";
		     _scope.firstName="alex";
		     _scope.lastName="luken";
		     _scope.passwordVal="1234";		     		     
		     _scope.repasswordVal="1234";		     		     
		     _scope.securityAnswer="what is your favority color";
		     _scope.securityQuestion="red";
		     spyOn($location,"path");		     
		     _scope.createAccountButton();
		     var thePath="teacherDashboard";
		     httpBack.expectPOST("/teacherSignup",
					 {
					     "username":_scope.username,
					     "firstName":_scope.firstName,
					     "lastName":_scope.lastName,
					     "password":_scope.passwordVal,
					     "repassword":_scope.repasswordVal,
					     "securityAnswer":_scope.securityAnswer,
					     "securityQuestion":_scope.securityQuestion
					 }).respond({"loggedIn":true,"redirect":thePath});

		     httpBack.flush();
		     expect($location.path)
		     .toHaveBeenCalledWith("teacherDashboard");
		 }))
		 it("should fail to create account correctly",inject(function($controller,$location){
		     var teacherSignupController =$controller("teacherSignupController",
							{$scope:_scope},latinQuizModel);

		     _scope.username="alexluken@centre.edu";
		     _scope.firstName="alex";
		     _scope.lastName="luken";
		     _scope.passwordVal="1234";		     		     
		     _scope.repasswordVal="1234";		     		     		   
		     _scope.securityAnswer="what is your favority color";
		     _scope.securityQuestion="red";
  		     spyOn($location,"path");		     
		     _scope.createAccountButton();
		     var thePath="teacherDashboard";
		     httpBack.expectPOST("/teacherSignup",
					 {
					     username:_scope.username,
					     firstName:_scope.firstName,
					     lastName:_scope.lastName,
					     password:_scope.passwordVal,
					     repassword:_scope.repasswordVal,
					     securityAnswer:_scope.securityAnswer,
					     securityQuestion:_scope.securityQuestion
					 }).respond({"loggedIn":false,"error":"passwords do not match"});

		     httpBack.flush();
		     expect(_scope.error).toEqualData("passwords do not match");
		     expect(_scope.hideMessage).toEqualData(false);
		 }))
		 it("should not create an account when there is no question",inject(function($controller,$location){
		     var teacherSignupController =$controller("teacherSignupController",
							{$scope:_scope},latinQuizModel);

		     _scope.username="alexluken@centre.edu";
		     _scope.firstName="alex";
		     _scope.lastName="luken";
		     _scope.passwordVal="1234";		     		     
		     _scope.repasswordVal="1234";		     		     
		     _scope.securityAnswer="red";
		     _scope.securityQuestion="";
		     spyOn($location,"path");		     
		     _scope.createAccountButton();
		     var thePath="teacherDashboard";
		     expect(_scope.error).toEqualData("There must be a security question");
		     expect(_scope.hideMessage).toEqualData(false);
		 }))
		 it("should not create an account when there is no question answer",inject(function($controller,$location){
		     var teacherSignupController =$controller("teacherSignupController",
							{$scope:_scope},latinQuizModel);

		     _scope.username="alexluken@centre.edu";
		     _scope.firstName="alex";
		     _scope.lastName="luken";
		     _scope.passwordVal="1234";		     		     
		     _scope.repasswordVal="1234";		     		     
		     _scope.securityAnswer="";
		     _scope.securityQuestion="what is my favorite color";
		     spyOn($location,"path");		     
		     _scope.createAccountButton();
		     var thePath="teacherDashboard";
		     expect(_scope.error).toEqualData("There must be a security answer");
		     expect(_scope.hideMessage).toEqualData(false);
		 }))
		 it("should not create an account when passwords do not match",inject(function($controller,$location){
		     var teacherSignupController =$controller("teacherSignupController",
							{$scope:_scope},latinQuizModel);

		     _scope.username="alexluken@centre.edu";
		     _scope.firstName="alex";
		     _scope.lastName="luken";
		     _scope.passwordVal="1234";		     		     
		     _scope.repasswordVal="";		     		     
		     _scope.securityAnswer="red";
		     _scope.securityQuestion="what is my favorite color";
		     spyOn($location,"path");		     
		     _scope.createAccountButton();
		     var thePath="teacherDashboard";
		     expect(_scope.error).toEqualData("Passwords must be equal to each other");
		     expect(_scope.hideMessage).toEqualData(false);
		 }))


	     })
    
    
    describe("homework Management Controller",function()
	     {
		 var latinQuizModel;
		 var httpBack;
		 var _scope;
		 beforeEach(function()
			    {  
				module("latinQuiz");
				inject(function(_latinQuizModel_,$httpBackend,$rootScope)
				       {
					   httpBack=$httpBackend;
					   latinQuizModel=_latinQuizModel_;
					   _scope=$rootScope.$new();
				       })
			    
            })
		 it("should exist",inject(function($controller){
		     var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope},latinQuizModel);

		     expect(homeworkManagementController).toBeDefined();
		 }))
        
	       it("should cancel properly", inject(function($controller,$location){
		   var homeworkManagementController =$controller("homeworkManagementController",
								 {$scope:_scope},latinQuizModel);
		   spyOn($location,"path");
		   _scope.cancel();
		   expect($location.path).toHaveBeenCalledWith("teacherClassEdit/undefined");
		   
               }))
		 it("should go home properly",inject(function($controller,$location){
                     
                     var homeworkManagementController =$controller("homeworkManagementController",
								   {$scope:_scope},latinQuizModel);
                     spyOn($location,"path");
		     _scope.homeButton();
		     expect($location.path).toHaveBeenCalledWith("teacherDashboard");
                     
		 }))
		 it("should set scope properly for default quiz creation",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                     var homeworkManagementController =$controller("homeworkManagementController",
								   {$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                     
		     
                     expect(_scope.hw).toEqualData(defaultCreateQuiz());
                     
            }))
          it("should set scope properly for custom quiz creation",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({
                    generatedHomework:customCreateQuiz()
                })

                httpBack.flush();
                expect(_scope.hw).toEqualData(postCustomCreateQuiz());
                
            }))
           it("should have its range function work properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
                
               
                _scope.optionNumber=2;
               _scope.range(1,2,1);
               expect(_scope.questionArray).toEqualData([{
        option:"",
        chosen:{
        selected:false
        }},{
        option:"",
        chosen:{
        selected:false
        }}]);
                
            }))
            it("should have its range function splice properly properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
                
               
                _scope.optionNumber=3;
               _scope.range(1,3,1);
                _scope.questionArray[2]= {
        option:"adasdasda",
        chosen:{
        selected:false
        }};
                       _scope.questionArray[0]= {
        option:"b",
        chosen:{
        selected:false
        }};
        _scope.optionNumber=2;
        _scope.range(1,2,1);    
                
                
                
                expect(_scope.questionArray).toEqualData([{
        option:"b",
        chosen:{
        selected:false
        }},{
        option:"",
        chosen:{
        selected:false
        }}]);
                
            }))
        
         it("should have reset values for multiple choice questions",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
                
               
                _scope.optionNumber=3;
               _scope.range(1,3,1);
             _scope.questionArray[0].chosen.selected = true;
             _scope.questionArray[1].chosen.selected = true;
             _scope.resetValues(1);
                expect(_scope.questionArray[0].chosen.selected).toEqualData(false);
                expect(_scope.questionArray[2].chosen.selected).toEqualData(false);
                expect(_scope.questionArray[1].chosen.selected).toEqualData(true);

                
            }))
        it("should fail to create questions with no prompt",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
              
                _scope.questionType="trueFalse";
                _scope.questionName="";
                _scope.tfAnswer="True";
                
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData(undefined);
                
                
            }))
        it("should create fill in the blank questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
             
                _scope.questionType="fillInBlank"
                _scope.questionName="test"
                _scope.fbAnswer="a";
                _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData({    
                   "answer":"a",
                   index:1,
                   prompt:"test",
                   type:"fb"  
               });
                
                
            }))
               it("should fail to create fill in the blank questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
               
                _scope.questionType="fillInBlank"
                _scope.questionName=""
                _scope.fbAnswer="a";
                _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData(undefined);
                
                
            }))
        it("should create multiple choice questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                
                _scope.questionType="multipleChoice";
                _scope.questionName="test";
             _scope.questionArray=  [{
        option:"aaa",
        chosen:{
        selected:false
        }},{
        option:"bbb",
        chosen:{
        selected:true
        }}]
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData({    
                   "answer":"bbb",
                   index:1,
                   prompt:"test",
                   type:"mc",
                   options:[
                       "aaa",
                       "bbb"
                   ]
               });
                
                
            }))
        it("should fail to create multiple choice questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
               
                _scope.questionType="multipleChoice";
                _scope.questionName="test";
             _scope.questionArray=  [{
        option:"",
        chosen:{
        selected:false
        }},{
        option:"bbb",
        chosen:{
        selected:true
        }}]
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData(undefined);
                
                
            }))
    it("should to create multiple answer questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                
                _scope.questionType="multipleAnswer";
                _scope.questionName="test";
             _scope.questionArray=  [{
        option:"aaa",
        chosen:{
        selected:false
        }},{
        option:"bbb",
        chosen:{
        selected:true
        }},
         {
        option:"ccc",
        chosen:{
        selected:true
        }}]
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData({    
                   "answer":["bbb","ccc"],
                   index:1,
                   prompt:"test",
                   type:"ma",
                   options:[
                       "aaa",
                       "bbb",
                       "ccc"
                   ]
               });
                
                
            }))
        it("should fail to create multiple answer questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
            
                _scope.questionType="multipleAnswer";
                _scope.questionName="test";
             _scope.questionArray=  [{
        option:"",
        chosen:{
        selected:false
        }},{
        option:"bbb",
        chosen:{
        selected:false
        }},
         {
        option:"ccc",
        chosen:{
        selected:false
        }}]
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData(undefined);
                
                 
            }))
        it("should to create true false questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
             
                _scope.questionType="trueFalse";
                _scope.questionName="test";
                _scope.tfAnswer="True";
                
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData({    
                   "answer":"True",
                   index:1,
                   prompt:"test",
                   type:"tf",
                   options:[
                       "True",
                       "False"
                   ]
               });
                
                
            }))
            it("should fail to create true false questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
          ;
                _scope.questionType="trueFalse";
                _scope.questionName="test";
                _scope.tfAnswer="";
                
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData(undefined);
                
                
            }))
             it("should create long answer questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
            
                _scope.questionType="longAnswer";
                _scope.questionName="test";
                
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData(
                   {index:1,
                   prompt:"test",
                   type:"la"});
                
                
            }))
        it("should fail to create long answer questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
              
                _scope.questionType="longAnswer";
                _scope.questionName="";
                
        _scope.createQuestion();
               expect(_scope.hw.questions[0]).toEqualData(
                   undefined);
                
                
            }))
it("reset everything after making a question",inject(function($controller){
                var _routeParams ={
                    hwId:-1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
              
                _scope.questionType="longAnswer";
                _scope.questionName="test";
                _scope.tfAnswer="a";
                _scope.fbAnswer="a";
                _scope.optionNumber=1;
        _scope.createQuestion();
    
        expect(_scope.questionArray).toEqualData([]);
        expect(_scope.questionName).toEqualData("");
        expect(_scope.tfAnswer).toEqualData("");
        expect(_scope.fbAnswer).toEqualData("");
        expect(_scope.questionType).toEqualData("");
        expect(_scope.optionNumber).toEqualData("");
                
                
            }))
        it("should bulk add long answer questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
               _scope.html="<question type= “long answer”><prompt>What did you do this summer?</prompt></question>";
            _scope.bulkAdd();
            expect(_scope.hw.questions[5].type).toEqualData("la");
                
            }))
        it("should bulk add multiple choice questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                                                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
               _scope.html="<question type= “multiple choice”> <prompt> What is my favorite color </prompt> <options> <option>Red</option> <option>Blue</option> <option>Green</option> <option>Pink</option> </options> <answer>Green</answer> </question> ";
            _scope.bulkAdd();
            expect(_scope.hw.questions[5].type).toEqualData("mc");
             expect(_scope.hw.questions[5].answer).toEqualData("Green");
                
            }))
        it("should bulk add multiple answer questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);

                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                                                                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
               _scope.html="<question type= “multiple answer”> <prompt> What is my favorite color </prompt> <options> <option>NEON</option> <option>APPLE</option> <option>Green</option> <option>Pink</option> </options> <answers> <answer>APPLE</answer> <answer>b</answer> <answer>c</answer> </answers> </question>";
            _scope.bulkAdd();
            expect(_scope.hw.questions[5].type).toEqualData("ma");
             expect(_scope.hw.questions[5].answer).toEqualData(["APPLE","b","c"]);
                
            }))
        it("should bulk add true false questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                                                                                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
               _scope.html="<question type= “true false”><prompt>Is Centre College in Kentucky? </prompt><answer>true </answer></question>";
            _scope.bulkAdd();
            expect(_scope.hw.questions[5].type).toEqualData("tf");
             expect(_scope.hw.questions[5].answer).toEqualData("True");
                
            }))
        it("should bulk add fill in the blank questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                                                                                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
               _scope.html="<question type= “fill in the blank”> <prompt> What is my name? </prompt> <answer> bob </answer> </question> <question type= “true false”><prompt>Is Centre College in Kentucky? </prompt><answer>true </answer></question><question type= “multiple choice”> <prompt> What is my favorite color </prompt> <options> <option>Red</option> <option>Blue</option> <option>Green</option> <option>Pink</option> </options> <answer>Green</answer> </question> ";
            _scope.bulkAdd();
            expect(_scope.hw.questions[5].type).toEqualData("fb");
             expect(_scope.hw.questions[5].answer).toEqualData("bob");
                expect(_scope.hw.questions[6].type).toEqualData("tf");
             expect(_scope.hw.questions[6].answer).toEqualData("True");
                expect(_scope.hw.questions[7].type).toEqualData("mc");
             expect(_scope.hw.questions[7].answer).toEqualData("Green");
                
            }))
        it("should bulk add multiple questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                                                                                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
               _scope.html="<question type= “fill in the blank”> <prompt> What is my name? </prompt> <answer> bob </answer> </question> ";
            _scope.bulkAdd();
            expect(_scope.hw.questions[5].type).toEqualData("fb");
             expect(_scope.hw.questions[5].answer).toEqualData("bob");
                
            }))
        it("reset variables properly after bulk add",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                                                                                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
               _scope.html="<question type= “fill in the blank”> <prompt> What is my name? </prompt> <answer> bob </answer> </question> ";
            _scope.bulkAdd();
         
             expect(_scope.html).toEqualData("");
                
            }))
         it("delete questions properly",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);

                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({                                                                                                
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
            _scope.spliceHere(2);
         
             expect(_scope.hw.questions.length).toEqualData(4);
             expect(_scope.hw.questions[3].index).toEqualData(4);
             expect(_scope.hw.questions[2].type).toEqualData("la");
                
            }))
        it("alter answer if a user enters a text into input box",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({           
                    generatedHomework:customCreateQuiz()
                })
            
                httpBack.flush();
                _scope.hw.questions[0].options[0]="lol";
                _scope.alterAnswer(_scope.hw.questions[0],0);
                expect(_scope.hw.questions[0].answer).toEqualData("lol")
                
                
            }))
         it("alter options if a user enters a text into input box",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({           
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
                _scope.hw.questions[0].options[1]="lol";
                _scope.alterAnswer(_scope.hw.questions[0],1);
                expect(_scope.hw.questions[0].answer).toEqualData("preposition")

                
                
            }))
          it("alter multiple choice answer if a user clicks on radio button other than answer",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({           
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
                _scope.radioAlterAnswer(_scope.hw.questions[0],1);
                expect(_scope.hw.questions[0].answer).toEqualData("noun")

                
                
            }))
             it("alter multipleAnswer answers if a user clicks on checkbox other than answer",inject(function($controller){
                var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({           
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
                _scope.radioAlterAnswer(_scope.hw.questions[4],0);
            expect(_scope.hw.questions[4].answer.includes("Turkey")).toEqualData(true);

                
                
            }))
          it("alter multipleAnswer answers if a user clicks on checkbox containing an answer, thus removing it",inject(function($controller){
                 var _routeParams ={
                    hwId:1,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({           
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
              
               // _scope.checkAlterAnswer(_scope.hw.questions[4],4);     
              
              //expect(_scope.hw.questions[4].answer.includes("Banannas")).toEqualData(false);

                
                
            }))
                 it("properly post a new homework",inject(function($controller){
                var _routeParams ={
                    hwId:2,
                    classId:3,
                    chapterId:5
                    
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
                httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({           
                    generatedHomework:customCreateQuiz()
                })
                httpBack.flush();
                     console.log(_scope.hw.dueDate);
                _scope.save();
                httpBack.expectPOST("/newHomework/3/5",{"newHw":_scope.hw}).respond(true);
                                    httpBack.flush();


                
                
            }))
        it("switches indexes properly",inject(function($controller){
                var _routeParams ={
                    hwId:2,
                    classId:3
                    
                }
                 var homeworkManagementController =$controller("homeworkManagementController",
							{$scope:_scope,$routeParams:_routeParams},latinQuizModel);
                
	    httpBack.expectGET("/createHW/"+_routeParams.classId+"/"+_routeParams.hwId).respond({           
                generatedHomework:customCreateQuiz()
            })
            httpBack.flush();
            _scope.indexChanged(_scope.hw.questions[4],1);
                expect(_scope.hw.questions[0].type).toEqualData("fb");
                expect(_scope.hw.questions[4].type).toEqualData("mc");

                


                
                
            }))
	     })
      describe("blankcopy Controller", function () {
        var latinQuizModel;
        var httpBack;
        var _scope;
	
        beforeEach(function () {
             module("latinQuiz");
            inject(function (_latinQuizModel_, $httpBackend, $rootScope) {
                 httpBack = $httpBackend;
                latinQuizModel = _latinQuizModel_;
                 _scope = $rootScope.$new();
            })
        })
        it("should exist", inject(function ($controller) {
            var blankCopyController = $controller("blankCopyController", {
                $scope: _scope
            }, latinQuizModel);
            expect(blankCopyController).toBeDefined();
        }))
           it("set scope properly", inject(function ($controller) {
               var _routeParams = {
                   hwId:5
               }
            var blankCopyController = $controller("blankCopyController", {
                $scope: _scope,
                 $routeParams: _routeParams
            }, latinQuizModel);
        httpBack.expectGET("/blankCopy/5").respond({blankCopy:blankCopy()})
                            httpBack.flush();
            expect(_scope.hw).toEqualData(blankCopy());
        }))
              it("logout correctly", inject(function ($controller,$location) {
               var _routeParams = {
                   hwId:5
               }
            var blankCopyController = $controller("blankCopyController", {
                $scope: _scope,
                 $routeParams: _routeParams
            }, latinQuizModel);
        httpBack.expectGET("/blankCopy/5").respond({blankCopy:blankCopy()})
                            httpBack.flush();
          spyOn($location,"path");
		     _scope.logout();
                  httpBack.expectPOST("/logout").respond({"loggedIn":false});
                                                          httpBack.flush();
		     expect($location.path)
		     .toHaveBeenCalledWith("/");
        }))
               it("go back correctly", inject(function ($controller,$location) {
               var _routeParams = {
                   hwId:5
               }
            var blankCopyController = $controller("blankCopyController", {
                $scope: _scope,
                 $routeParams: _routeParams
            }, latinQuizModel);
        httpBack.expectGET("/blankCopy/5").respond({blankCopy:blankCopy()})
                            httpBack.flush();
          spyOn($location,"path");
		     _scope.back();
		     expect($location.path)
		     .toHaveBeenCalledWith("/homeworkResults/"+_scope.hw._id);
        }))
               it("go home correctly", inject(function ($controller,$location) {
               var _routeParams = {
                   hwId:5
               }
            var blankCopyController = $controller("blankCopyController", {
                $scope: _scope,
                 $routeParams: _routeParams
            }, latinQuizModel);
        httpBack.expectGET("/blankCopy/5").respond({blankCopy:blankCopy()})
                            httpBack.flush();
          spyOn($location,"path");
		     _scope.home();
		     expect($location.path)
		     .toHaveBeenCalledWith("studentDashboard");
        }))
      })
	
})   
console.log(teacherClassData());
