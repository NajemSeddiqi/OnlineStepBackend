//Mongoose Models
const Course = require("../models/CourseModel");
const Chapter = require("../models/ChapterModel");
const Page = require("../models/PageModel");

//Middlewares that wraps validator.js validator and sanitizer functions.
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");

const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");

//Course Schema (main-schema)
function CourseData(data) {
    this.name = data.name;
    this.owner = data.owner;
    this.subject = data.subject;
    this.chapters = data.chapters;
}


//Returns all chapters
exports.getCourseList = [
    function (req, res) {
        try {
            Course.find({}).then((course) => {
                if (course.length > 0) {
                    return apiResponse.successResponseOnlyJSONObject(res, course);
                } else {
                    return apiResponse.successResponseWithData(res, "Operation success", []);
                }
            });
        } catch (err) {
            //Error (status 500)
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Returns a chapter (depending on :id)
exports.getCourse = [
    function (req, res) {
        try {
            Course.findOne({ _id: req.params.id }).then((course) => {
                if (Course !== null) {
                    //let chapterData = new ChapterData(Chapter);
                    return apiResponse.successResponseOnlyJSONObject(res, course);
                } else {
                    return apiResponse.successResponseWithData(res, "Operation success", {});
                }
            });
        } catch (err) {
            //Error (status 500)
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Creates a course it to DB
exports.addCourse = [
    (req, res) => {
        try {
            const errors = validationResult(req);

            var course = new Course(
                {
                    name: req.body.name,
                    owner: req.body.owner,
                    subject: req.body.subject,
                    chapters: req.body.chapters
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                //Save course
                course.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    let courseData = new Course(course);
                    return apiResponse.successResponseWithData(res, "Course add Successfully.", courseData);
                });
            }
        } catch (err) {
            //Error (status 500)
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Updates a course (:id)
exports.updateCourse = [
    (req, res) => {
        try {
            const errors = validationResult(req);
            var course = new Course(
                {
                    _id: req.params.id,
                    name: req.body.name,
                    owner: req.body.owner,
                    subjects: req.body.subjects,
                    chapters: req.body.chapters
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                } else {
                    Course.findById(req.params.id, function (err, foundCourse) {
                        if (foundCourse === null) {
                            return apiResponse.notFoundResponse(res, "Course not exists with this id");
                        } else {
                            //update course
                            Course.findByIdAndUpdate(req.params.id, course, {}, function (err) {
                                if (err) {
                                    return apiResponse.ErrorResponse(res, err);
                                } else {
                                    let courseData = new CourseData(course);
                                    return apiResponse.successResponseWithData(res, "Course update Success.", courseData);
                                }
                            });
                        }

                    });
                }
            }
        } catch (err) {
            //Error (status 500)
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Deletes a course (:id)
exports.deleteCourse = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Course.findById(req.params.id, function (err, foundCourse) {
                if (foundCourse === null) {
                    return apiResponse.notFoundResponse(res, "Course not exists with this id");
                } else {
                    //delete course
                    Course.findByIdAndRemove(req.params.id, function (err) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        } else {
                            return apiResponse.successResponse(res, "Course delete Success.");
                        }
                    });
                }
            });
        } catch (err) {
            //Error (status 500)
            return apiResponse.ErrorResponse(res, err);
        }
    }
];