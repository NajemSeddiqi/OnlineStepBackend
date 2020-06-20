var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClozeSchema = new Schema(
    {
        sentence: { type: String, required: true },
        missingWords: { type: [String], required: true }
    },
    {
        id: false
    },
    {
        strict: false // mongoose-schema may "grow"
    }
);

module.exports = mongoose.model("cloze", ClozeSchema);
