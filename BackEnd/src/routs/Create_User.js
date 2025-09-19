const express= require('express');
const router=express.Router();
const user= require('../models/user.model');
router.use(express.json());
const jwt = require('jsonwebtoken');
router.post("/newUser", async (req,res)=>{
    const{name,phnumber,email}=req.body;
    try{
        const newUser= await user.create({
            name,
            phnumber,
            email,
        })
        const token =jwt.sign(email,process.env.VWT_COOKIE_SECRET);
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 86400000, // 1 day
          });
        res.status(201).json({
            message:"New user connected",
            submituser:true
        })
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message:"Error creating user",
            error: err.message
        })
    }
})


router.post("/checkUser", async (req,res)=>{
    const {email}= req.body || "";
    try{
        const responce= await user.findOne({email:email});
        if(!responce){
            res.send(false);
        }
        else{
            const token =jwt.sign({ email },process.env.VWT_COOKIE_SECRET,{ expiresIn: "1d" });
            res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 86400000, 
          });
            res.send(true);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error checking user",
            error: err.message
        })
    }
})


module.exports=router;