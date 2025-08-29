const mongodb =require('mongoose');
const productSchema = new mongodb.Schema({
    email:String,
    productName:String,
    ProductImgUrl:String,
    price:String,
    discount:String,
    productDetails:String,
    productType:String,
    searchKeyword: { type: [String] },
})

module.exports = mongodb.model('Product', productSchema);