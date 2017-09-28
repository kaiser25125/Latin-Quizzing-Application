$(document).ready(function(){
    var addQuestDivH=$(".addQuestionDiv").height();
    var questDiv=$(".questionDiv").height();
    if(addQuestDivH>questDiv){
//	$(".questDiv").height(addQuestDivH);
	$(".questionDiv").height(addQuestDivH)
	console.log();
    }
    else{
	console.log("alex");
	$(".addQuestDiv").attr({"height":questDiv});
    }
    console.log($(".addQuestionDiv").height());
    console.log($(".questionDiv").height());
});

