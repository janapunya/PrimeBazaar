const express = require('express')
const router = express.Router()
const Productmodel = require('../models/product.model')

router.post('/searchProduct', async (req, res) => {
    const { searchQuery } = req.body
    try {
        const products = await Productmodel.find({
            searchKeyword: { $regex: searchQuery, $options: "i" }
          });
        res.status(200).json(products)
    } catch (error) {
        console.error("Error searching product:", error)
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router