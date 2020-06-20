var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var courseSchema = new Schema(
    {
        name: { type: String, required: true },
        owner : { type: String, required: true },
        subject: { type: String, required: true },
        chapters : { type: [Schema.Types.ObjectId], required: true }
    },
    {
         strict: false // tells to mongoose that schema may "grow"
    }
);

module.exports = mongoose.model("course", courseSchema);