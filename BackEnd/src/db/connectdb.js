const mongodb= require('mongoose')


function connectdb(){
        mongodb.connect("mongodb+srv://punyabrata900:fV1LFHAYJtRHpXji@primebazaar.z6zrwik.mongodb.net/primebazaar").then(()=>{
            console.log("Connected to MongoDB");
        })
    }

module.exports = connectdb;