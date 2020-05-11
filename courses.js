const mongoose = require("mongoose");

const coursesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: String,
    name: String,
    desc: String,
    scu: Number,
});

modules.export = mongoose.model("Courses", coursesSchema);