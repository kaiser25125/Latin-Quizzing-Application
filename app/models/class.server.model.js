var mongoose=require("mongoose");
var Schema=mongoose.Schema;

//ALL ORDER VARIABLES START AT 1
//defining the schema for a class
var classSchema=new Schema({
    //name of the class
    name:{
	type:String,
	required:"Every class must have a name",
	unique:true,
	trim:true
    },
    //status of whether a class should be displayed
    //0 means show
    //1 means hide
    oldStatus:{
	type:Number,
	default:0
    },
    //code users use to sign up for this class
    courseCode:{
	type:String,
	unique:true
    },
    //date class was created
    creationDate:{
	type:Date,
	default:Date.now
    },
    //array of students
    //have to update on create student and delete student
    students:[
	{
	    type:Schema.ObjectId,
	    ref:"User"
	}
    ],
    //stores all of the chapters
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
	    //depricated
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
		    //index of homework for ordering
		    index:{
			type:Number
		    },
		    //depricated
		    status:{
			type:String
		    },
		    //date that a homework is due and needs to be completed by
		    dueDate:{
			type:Date,
			required:"Every Homework must have a Due Date"
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
			    //whether the user flagged the answer
			    flag:{
				type:Boolean,
				default:false
			    },
			    //answer(s) for ma
			    answers:[
				{
				    type:String
				}
			    ]
			}
		    ]
		}
	    ]
	}
    ]
});


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
classSchema.set('toJSON', {
	getters: true,
	virtuals: true
});


classSchema.pre("save",function(next){
    this.courseCode=this._id;
    next();
}); 


// Create the 'Class' model out of the 'UserSchema'
mongoose.model('Class', classSchema);
   


