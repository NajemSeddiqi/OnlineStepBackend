//Mongoose Models
const Course = require("../models/CourseModel");
const Chapter = require("../models/ChapterModel");


//Middlewares that wraps validator.js validator and sanitizer functions.
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");

const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");


//Returns all pages for a chapter (:id)
exports.getCourseChapterList = [
    function (req, res) {
        try {
            //Finds the chapter using (:id) 
            Course.findOne({ _id: req.params.id }).then((course) => {
                //Finds all pages using the array of page (chapter.pages)
                Chapter.find({ _id: { $in: course.chapters } }).then((chapters) => {
                    
                    if (chapters !== null) {
                        return apiResponse.successResponseOnlyJSONObject(res, chapters);
                    } else {
                        return apiResponse.successResponseWithData(res, "Operation success", {});
                    }
                });              
             
            });
        } catch (err) {
            //Error (status 500)
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
