const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    mobile: Number,
})

const User = model('User', UserSchema)
module.exports = User;