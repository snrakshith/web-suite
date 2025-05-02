// Define a Mongoose Schema:

/* 
*  Create a Mongoose schema that represents the structure of your data.
*  This is similar to DDL in traditional databases.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);
