const express= require('express');
const router=express.Router();
const SellerAccount=require('../models/SellerAccount.model')

router.post('/newSeller', async (req,res)=>{
    try{
        const{SellerName,phnumber,email,StoreName}=req.body;
        const check= await SellerAccount.findOne({email:email});
        if(check){
            return res.status(200).json({
                stutas:true,
                StoreName:check.StoreName,
            })
        }
        await SellerAccount.create({
            SellerName,phnumber,email,StoreName
        })
        return res.status(200).json({
            stutas:true,
            StoreName:check.StoreName,
        })
    }
    catch(err){
        return res.status(500).json(err)
    }
})
router.post('/CheckSeller', async (req,res)=>{
    const{email}=req.body;
    try{
        const check= await SellerAccount.findOne({email:email});
        if(check){
           return res.status(200).json({
            stutas:true,
            StoreName:check.StoreName,
           })
        }

        return res.status(200).json({
            stutas:false,
        })
    }
    catch(err){
        return res.status(500).json(err)
    }
})
module.exports=router