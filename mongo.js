
const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")
const password = process.env.DB_PASSWORD

const uri = `mongodb+srv://pepsizor:${password}@cluster0.w88nign.mongodb.net/?retryWrites=true&w=majority`

mongoose
  .connect(uri)
  .then((()=> console.log("connected to Mongo")))
  .catch(err => console.error("Error connecting to Mongo: ",err))

const userSchema = new mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true}
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)

module.exports = {mongoose, User}