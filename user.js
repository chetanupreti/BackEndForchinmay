const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    "Name": String,
    "Email": String,
    "Password": String,
    "DateOfBirth": String,
    "PhoneNumber": String,
    "Gender": String,
    
});
module.exports = mongoose.model('userDetails', userSchema,"chetan");