//Mongoose Models
const Page = require("../models/PageModel");
const Cloze = require("../models/ClozeModel");
const Mcq = require("../models/McqModel");

//Middlewares that wraps validator.js validator and sanitizer functions.
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");

const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");

//PageSchema (main-schema) 
function PageData(data) {
    this.type = data.type;
    this.title = data.title;
    this.author = data.author;
    this.content = data.content;
    //sub-schema depending on type
}

//Creates and returns different SubSchema depending on subType(req.body.type)
function SubSchema(subType, data) {

    switch (subType) {
        case "mcq":
            return new Mcq(
                {
                    question: data.question,
                    answers: data.answers,
                    correctAnswer: data.correctAnswer
                });
        case "cloze":
            return new Cloze(
                {
                    sentence: data.sentence,
                    missingWords: data.missingWords
                });
        default:
            return null;
    }
}

//Returns all pages
exports.getPageList = [
    function(req, res) {
        try {
            Page.find({}).then((page) => {
                if (page.length > 0) {
                    return apiResponse.successResponseOnlyJSONObject(res, page);
                } else {
                    return apiResponse.successResponseOnlyJSONObject(res, page);
                }
            });
        } catch (err) {
            //Error (status 500)
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Returns a page (depending on :id)
exports.getPage = [
    function (req, res) {
        try {
            Page.findOne({ _id: req.params.id }).then((page) => {
                if (Page !== null) {
                    //let pageData = new PageData(Page);
                    return apiResponse.successResponseOnlyJSONObject(res, page);
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

//Creates a page (with schema & sub-schema) and adds it to DB
exports.addPage = [
    body("type", "Type must not be empty.").isLength({ min: 1 }).trim(),
    body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
    body("author", "Author must not be empty").isLength({ min: 1 }).trim(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var subSchema = SubSchema(req.body.type, req.body.content);

            //Main schema
            var page = new Page(
                {
                    type: req.body.type,
                    title: req.body.title,
                    author: req.body.author,
                    content: subSchema
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                //Save page
                page.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    return apiResponse.successResponseWithData(res, "Page add Successfully.", page);
                });
            }
        } catch (err) {
            //Error (status 500) 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Updates a page (:id)
exports.updatePage = [
    (req, res) => {
        try {
            const errors = validationResult(req);
            var subSchema = SubSchema(req.body.type, req.body.content);

            var page = new Page(
                {
                    _id: req.params.id,
                    type: req.body.type,
                    title: req.body.title,
                    author: req.body.author,
                    content: subSchema
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                } else {
                    Page.findById(req.params.id, function (err, foundPage) {
                        if (foundPage === null) {
                            return apiResponse.notFoundResponse(res, "Page not exists with this id");
                        }  else {
                                //update page.
                                Page.findByIdAndUpdate(req.params.id, page, {}, function (err) {
                                    if (err) {
                                        return apiResponse.ErrorResponse(res, err);
                                    } else {
                                        let pageData = new PageData(page);
                                        return apiResponse.successResponseWithData(res, "Page update Success.", pageData);
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

//Deletes a page (:id)  
exports.deletePage = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Page.findById(req.params.id, function (err, foundPage) {
                if (foundPage === null) {
                    return apiResponse.notFoundResponse(res, "Page not exists with this id");
                } else  {
                        //delete page.
                        Page.findByIdAndRemove(req.params.id, function (err) {
                            if (err) {
                                return apiResponse.ErrorResponse(res, err);
                            } else {
                                return apiResponse.successResponse(res, "Page delete Success.");
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