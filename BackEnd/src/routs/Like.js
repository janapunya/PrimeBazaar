const express = require('express');
const router = express.Router();
const Like = require('../models/Like.model');
const user = require('../models/user.model');
const jwt =require("jsonwebtoken");
const { findOneAndDelete } = require('../models/address.model');
const Product = require('../models/product.model');

router.post('/CreateLike', async (req,res)=>{
    try{
        const {id}=req.body;
        const {token} = await req.cookies.auth_token || "";
        const tokenData=  jwt.verify(token,process.env.VWT_COOKIE_SECRET)
        if(!tokenData){
            return res.status(500).json({
                message:"Unauthorized user"
            })
        };
        await new Like({
            Productid:id,
            Useremail:tokenData,
            status:true
        }).save();
        res.status(200).json({
            message:"done"
        })

    }
    catch(err){
        res.json(err);
    }
})

router.post('/DeleteLike', async (req,res)=>{
    try{
        const {id}=req.body;
        const {token} = await req.cookies.auth_token || "";
        const tokenData=  jwt.verify(token,process.env.VWT_COOKIE_SECRET)
        if(!tokenData){
            return res.status(500).json({
                message:"Unauthorized user"
            })
        };
        const data = await Like.findOneAndDelete({Productid:id,Useremail:tokenData});
        res.status(200).json({
            message:"done"
        })

    }
    catch(err){
        res.json(err);
    }
})

router.post('/Likedata', async (req,res)=>{
    try{
        const {token} = await req.cookies.auth_token || "";
        const tokenData=  jwt.verify(token,process.env.VWT_COOKIE_SECRET)
        if(!tokenData){
            return res.status(500).json({
                message:"Unauthorized user"
            })
        };

        const data= await Like.find({Useremail:tokenData});
        return res.status(200).json(data);

    }
    catch(err){
        res.json(err);
    }
})

router.post('/LikedataAll', async (req,res)=>{
    try{
        const FullData=[];
        const {token} = await req.cookies.auth_token || "";
        const tokenData=  jwt.verify(token,process.env.VWT_COOKIE_SECRET)
        if(!tokenData){
            return res.status(500).json({
                message:"Unauthorized user"
            })
        };

        const data= await Like.find({Useremail:tokenData});
        for (const d of data) {
            const product = await Product.findById(d.Productid);
            if (product) {
                FullData.push(product);
            }
        }
        return res.status(200).json(FullData);

    }
    catch(err){
        res.json(err);
    }
})

module.exports = router