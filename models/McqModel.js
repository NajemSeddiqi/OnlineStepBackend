var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var McqSchema = new Schema(
    {
        question: { type: String, required: true },
        answers: { type: [String], required: true },
        correctAnswer: { type: String, required: true }
    },
    {
        id: false
    },
    {
        strict: false // mongoose-schema may "grow"
    }
);

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
module.exports = mongoose.model('mcq', McqSchema);