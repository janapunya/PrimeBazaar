const mongodb= require('mongoose')

const AddressSchema = new mongodb.Schema({
    id:String,
    email:String,
    type:String,
    street:String,
    city:String,
    state:String,
    pinCode:String,
    country:String
}
,{
    timestamps:true
 }
)

const Addressmodule =mongodb.model("Address",AddressSchema)
module.exports =Addressmodule