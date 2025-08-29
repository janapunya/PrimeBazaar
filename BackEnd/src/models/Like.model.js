const mongoose= require('mongoose')

const LikeSchema = new mongoose.Schema({
    Productid:String,
    Useremail:String,
    status:Boolean
}
,{
    timestamps:true
 }
)

const Like =mongoose.model("Like",LikeSchema)
module.exports =Like;