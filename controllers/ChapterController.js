//Mongoose Models
const Chapter = require("../models/ChapterModel");

//Middlewares that wraps validator.js validator and sanitizer functions.
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");

const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");

//Chapter Schema (main-schema) 
function ChapterData(data) {
    this.name = data.name;
    this.author = data.author;
    this.subject = data.subject;
    this.pages = data.pages;
    this.level = data.level;
}

//Returns all chapters
exports.getChapterList = [
    function (req, res) {
        try {
            Chapter.find({}).then((chapter) => {
                if (chapter.length > 0) {
                    return apiResponse.successResponseOnlyJSONObject(res, chapter);
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
exports.getChapter = [
    function (req, res) {
        try {
            Chapter.findOne({ _id: req.params.id }).then((chapter) => {
                if (Chapter !== null) {
                    //let chapterData = new ChapterData(Chapter);
                    return apiResponse.successResponseOnlyJSONObject(res, chapter);
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

//Creates a chapter it to DB
exports.addChapter = [
    (req, res) => {
        try {
            const errors = validationResult(req);

            var chapter = new Chapter(
                {
                    name: req.body.name,
                    author: req.body.author,
                    subject: req.body.subject,
                    pages: req.body.pages,
                    level: req.body.level
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                //Save chapter
                chapter.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    let chapterData = new Chapter(chapter);
                    return apiResponse.successResponseWithData(res, "Chapter add Successfully.", chapterData);
                });
            }
        } catch (err) {
            //Error (status 500)
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Updates a chapter (:id)
exports.updateChapter = [
    (req, res) => {
        try {
            const errors = validationResult(req);
            var chapter = new Chapter(
                {
                    _id: req.params.id,
                    name: req.body.name,
                    author: req.body.author,
                    subjects: req.body.subjects,
                    pages: req.body.pages,
                    level: req.body.level
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                } else {
                    Chapter.findById(req.params.id, function (err, foundChapter) {
                        if (foundChapter === null) {
                            return apiResponse.notFoundResponse(res, "Chapter not exists with this id");
                        } else {
                            //update chapter
                            Chapter.findByIdAndUpdate(req.params.id, chapter, {}, function (err) {
                                if (err) {
                                    return apiResponse.ErrorResponse(res, err);
                                } else {
                                    let chapterData = new ChapterData(chapter);
                                    return apiResponse.successResponseWithData(res, "Chapter update Success.", chapterData);
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

//Deletes a chapter (:id)  
exports.deleteChapter = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Chapter.findById(req.params.id, function (err, foundChapter) {
                if (foundChapter === null) {
                    return apiResponse.notFoundResponse(res, "Chapter not exists with this id");
                } else {
                    //delete chapter
                    Chapter.findByIdAndRemove(req.params.id, function (err) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        } else {
                            return apiResponse.successResponse(res, "Chapter delete Success.");
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