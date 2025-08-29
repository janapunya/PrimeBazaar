const mongodb= require('mongoose')

const sellerAccountSchema = new mongodb.Schema({
    SellerName:String,
    phnumber:String,
    email:String,
    StoreName:String,
})

const SellerAccountmodule =mongodb.model("SellerAccount",sellerAccountSchema)
module.exports =SellerAccountmodule