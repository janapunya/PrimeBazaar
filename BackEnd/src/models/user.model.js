const mongodb= require('mongoose')

const userSchema = new mongodb.Schema({
    name:String,
    phnumber:String,
    email:String,
})

const usermodule =mongodb.model("user",userSchema)
module.exports =usermodule