const mongoose =require("mongoose");

const ProductSchima = new mongoose.Schema({
    productName:String,
    address:String,
    qty:String,
    unitPrice:String,
    subtotal:String,
    SellerEmail:String,
    customerName:String,
},{
    timestamps:true
});

const product =mongoose.model('Order',ProductSchima);
module.exports=product;