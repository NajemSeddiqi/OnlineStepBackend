var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PageSchema = new Schema(
    {
        type: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        content: {},
    },
    {
        strict: false // mongoose-schema may "grow"
    }
);

module.exports = mongoose.model("pages", PageSchema);