const express= require('express');
const router=express.Router();
const user= require('../models/user.model');
router.use(express.json());
const jwt = require('jsonwebtoken');


router.get('/UserData',async (req,res)=>{
    const cookie = req.cookies.auth_token;
    try{
        if(!cookie){
            return res.send(false);
        }
        const decoded = jwt.verify(cookie, process.env.VWT_COOKIE_SECRET);
        if(!decoded){
            return res.send(false);
        }
        const check =await user.findOne({ email: decoded.email });
        if(!decoded){
            return res.send(false);
        }
        else{
            return res.send(true);
        }
    }
    catch(error)
    {
        res.send(error);
    }
})


module.exports=router;
