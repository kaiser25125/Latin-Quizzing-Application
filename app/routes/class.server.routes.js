// Load the module dependencies
var clss = require('../../app/controllers/class.server.controller'),
	passport = require('passport');

module.exports = function(app) {
    /*
    app.route("/studentDashboardInformation")
       .get(latin.printStudent);
    */

    //route for creating a class
    app.route("/createClass")
       .post(clss.createClass);

    //route for adding a chapter to a particular class
    app.route("/addChapter/:classId")
       .post(clss.addChapter);

    //changes the chapter order of a class
    app.route("/changeChapterOrder/:classId")
       .post(clss.changeOrderOfChapters);
    
    //adds a homework or edits a homework of a class of a chapter
    app.route("/newHomework/:classId/:chapterId")
       .post(clss.addHomeworkToChapter);
    
    //gets all of the names of the classes
    app.route("/classes")
       .get(clss.getClassNames);

    //renames a certain class
    app.route("/renameClass/:classId")
       .post(clss.changeName);
 
    //gets all of the created classes
    app.route("/previousClasses")
       .get(clss.getClassNames);
    
    //sets the class to be hidden by default
    app.route("/hideClass/:classId")
       .post(clss.toggleHide);

    //deletes a class
    app.route("/deleteClass/:classId")
       .post(clss.deleteClass);

    //gets data for deleting and resetting password of students
    app.route("/classStudentData/:classId")
       .get(clss.getStudentEditInfo);
    
    //gets info for editing a class
    app.route("/classEditData/:classId")
       .get(clss.getClass);

    //route that deletes a chapter from a class
    app.route("/deleteChapter/:classId/:chapterId")
       .post(clss.deleteChapter);
    
    //changes the order of a homework inside of a chapter
    app.route("/changeHomeworkOrder/:classId/:chapterId")
       .post(clss.changeOrderOfHomeworks);

    //sets the date of multiple classes
    app.route("/setDate/:classId")
       .post(clss.changeDueDates);

    //deletes a particular homework
    app.route("/deleteHomework/:classId/:chapterId/:homeworkId")
       .post(clss.deleteHw);

    //gets the data for the teacher class page
    app.route("/classData/:classId")
       .get(clss.getClassData);

    //gets the data for the student overview page
    app.route("/studentOverview/:classId")
       .get(clss.studentClassData);
    
    //gets the data for results of a homework
    app.route("/hwResults/:classId/:hwId")
       .get(clss.questionData);

    //bad name of route
    //gets the info of a previously created homework
    app.route("/createHW/:classId/:hwId")
       .get(clss.getHwToEdit);

};
