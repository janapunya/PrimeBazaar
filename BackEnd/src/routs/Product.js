const express = require('express')
const router = express.Router();
const Productmodel = require('../models/product.model')
const multer = require('multer');
const  imageUpload = require('../controllers/imagekit_io');
const { v4: uuidv4 } = require('uuid');

const upload =multer({storage:multer.memoryStorage()})


router.post('/addProduct',upload.single('image'), async (req, res) => {
    const { email, productName, searchKeyword, price, discount, productDetails,productType } = req.body;
    const image =req.file
    try {
        const imageURL = await imageUpload(image.buffer.toString('base64'),uuidv4());

        const namesArray = searchKeyword.split(",").map(name => name.trim());
        const newProduct = new Productmodel({
            email,
            productName,
            searchKeyword:namesArray,
            price,
            discount,
            productDetails,
            productType,
            ProductImgUrl: imageURL
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully"});

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error" });
    }
})


router.post('/findProduct', async (req, res) => {
    try {
        const { email } = req.body;
        const data = await Productmodel.find({ email });

        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.post('/AllProduct', async (req, res) => {
    try {
        const {data}=req.body;
        if("All"== data){
            const response = await Productmodel.find();
            return res.status(200).json(response);
        }
        else{
            const response = await Productmodel.find({productType:data});
            return res.status(200).json(response);
        }

        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.post('/ProductDetails', async (req,res)=>{
    try{
        const {id}= req.body;
        const response = await Productmodel.findOne({_id:id});
        if(!response){
            return res.json({
                mess:"product not found"
            })
        }
        else{
            return res.json(response);
        }
    }
    catch(err){
        return res.json(err);
    }
})

module.exports = router