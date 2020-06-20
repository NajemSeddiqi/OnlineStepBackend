var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ChapterSchema = new Schema(
    {
        name: { type: String, required: true },
        author: { type: String, required: true },
        subject: { type: String, required: true },
        pages: { type: [Schema.Types.ObjectId], required: true },
        level: { type: String, required: true }
    },
    {
         strict: false // tells to mongoose that schema may "grow"
    }
);

module.exports = mongoose.model("chapter", ChapterSchema);