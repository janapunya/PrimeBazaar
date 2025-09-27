const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectdb= require('./src/db/connectdb')

const cors = require('cors');
const cookie = require('cookie-parser');
const session = require("express-session");
const otp=require('./src/routs/otp')
const google_oauth=require('./src/routs/google_oauth')
const userData=require('./src/routs/Create_User');
const check_User= require('./src/routs/check_user')
const User_Data =require('./src/routs/User_data')
const address=require('./src/routs/Address')
const SellerAccount= require('./src/routs/SellerAccount')
const Product = require('./src/routs/Product')
const Likeproduct =require('./src/routs/Like')
const Order =require('./src/routs/Order')
const searchProduct = require('./src/routs/searchProduct')

// https://prime-bazaar-one.vercel.app

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://prime-bazaar-one.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  }));


app.use(session({
    secret: "punya",       
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
        sameSite: "none"
      }
}));

app.use('/otp',otp)
app.use('/google_oauth',google_oauth)
app.use('/userData',userData)
app.use("/check_user",check_User)
app.use('/data',User_Data)
app.use('/address',address)
app.use('/seller',SellerAccount)
app.use('/product',Product)
app.use('/like',Likeproduct)
app.use('/order',Order)
app.use('/search',searchProduct)

connectdb();
app.listen(3000);
