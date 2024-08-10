const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    name: String,
    location: String,
});

const School = mongoose.model("School", schoolSchema);

module.exports = { School };
