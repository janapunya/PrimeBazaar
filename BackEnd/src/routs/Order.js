const express= require("express");
const router= express.Router();
const jwt =require("jsonwebtoken");
const Address= require('../models/address.model')
const Order= require('../models/Order.model');
const user =require('../models/user.model')

router.post('/email', async (req,res)=>{
    try{
        const token = await req.cookies.auth_token || "";
        const tokenData=  jwt.verify(token,process.env.VWT_COOKIE_SECRET);
        if(!tokenData){
            return res.status(500).json({
                message:"Unauthorized user"
            })
        };
        console.log(tokenData.emsil)
        return res.json({
            email:tokenData.email,
        })
    }
    catch(err){
        res.json(err)
    }
});

router.post('/PlaceOrder', async (req,res)=>{
    try{
        const token = await req.cookies.auth_token || "";
        const tokenData=  jwt.verify(token,process.env.VWT_COOKIE_SECRET);

        const {productName, AddressId, qty, unitPrice, subtotal, SellerEmail}= req.body;
        const address= await Address.findOne({_id:AddressId});
        const customerName= (await user.findOne({email:tokenData.email})).name;

        if(!address){
            return res.status(500).json({
                message: "Something went wrong"
            })
        }
        const data={
            productName,
            address: `${address.street}, ${address.city}, ${address.state}, ${address.pinCode}`,
            qty,
            unitPrice,
            subtotal,
            SellerEmail,
            customerName
        }
        await new Order(data).save();

        return res.status(200).json({
            message: "Order placed successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            message: err,
        })
    }
})
router.post('/OrderData',async (req,res)=>{
    try{
        const {email}= req.body;

        const data= await Order.find({SellerEmail:email});
        return res.status(200).json(data);

    }
    catch(err){

    }
})

module.exports=router;