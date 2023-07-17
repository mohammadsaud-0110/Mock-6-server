const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    username: String,
    email: String,
})

const UserModel =new mongoose.model('user',userSchema)

module.exports={
    UserModel
}