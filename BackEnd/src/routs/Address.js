const express = require('express');
const router = express.Router();
const user= require('../models/user.model');
const address =require('../models/address.model')
router.post('/address_check', async (req, res) => {
    const { email } = req.body;
    try {
        const user_data = await user.findOne({email:email});
        if(!user_data){
            return res.status(400).json({
                message:"user not found"
            })
        }
        const user_address = await address.find({email:email});
        res.status(200).json(user_address)


    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
})

router.post('/update_address',async (req,res)=>{
    const {id,email,type,street,city,state,pinCode,country}=req.body;
    try{
        const data =await address.create({
            id,email,type,street,city,state,pinCode,country
        })
        res.status(200).json({ message: "Address created successfully", data });
    }
    catch(err){
        res.status(500).json({ message: "Error creating address", error: err.message })
    }
})

router.post('/delete', async (req,res)=>{
    const{id}=req.body;
    console.log(id)
    try{
        const del=await address.findOneAndDelete({id});
        res.status(200).json({ message: "Address deleted successfully" })
    }   
    catch(error){
        res.status(500).json({ message: "Error deleting address", error: error.message });
    }
})

module.exports = router;