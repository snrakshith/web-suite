const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: String,
    schoolId: String,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };
