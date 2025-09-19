const express= require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const user= require('../models/user.model');
const address =require('../models/address.model')
router.post('/About_user', async (req,res)=>{
    const {cookie}= req.cookies.auth_token;
    try{
        if(!cookie){
            return res.json({
                message:'cookic not found'
            })
        }
        const check= jwt.verify(cookie,process.env.VWT_COOKIE_SECRET);
        const userData =await user.findOne({email:check});
        if(!userData){
            return res.json({
                message:'user Not found'
            })
        }
        res.status(200).json(userData);
    }
    catch(err){
    res.status(500).json({ error: "Failed to fetch user data" });
    }
})

router.post('/Update_data',async (req,res)=>{
    const { Name,email,Number} =req.body;
    try{
        const userdata= await user.findOne({email:email});
        if(userdata.name != Name && userdata.phnumber != Number){
            const update = await user.findOneAndUpdate(
                { email: email },
                { $set: { name: Name, phnumber: Number } },
                { new: true }
            )
            return res.status(200).json({
                message:"Name and email are updated"
            })
        }
        else if(userdata.name != Name){
            const update = await user.findOneAndUpdate(
                { email: email },
                { $set: { name: Name} },
                { new: true }
            )
        }
        else{
            const update = await user.findOneAndUpdate(
                { email: email },
                { $set: { phnumber: Number } },
                { new: true }
            )
        }
    }
    catch{

    }
})

router.post('/logout', (req,res)=>{
    try {
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        
        res.status(200).json({
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error during logout',
            error: error.message
        });
    }
})

router.post('/delete_account', async (req, res) => {
    const { email } = req.body;
    
    try {
        // Verify the user exists
        const userData = await user.findOne({ email: email });
        if (!userData) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Delete the user account
        await user.findOneAndDelete({ email: email });
        await address.deleteMany({email: email});
        
        // Clear the auth_token cookie
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        
        res.status(200).json({
            message: 'Account deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting account',
            error: error.message
        });
    }
})

module.exports=router;
