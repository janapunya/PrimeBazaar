const express=require('express');
const nodemailer = require("nodemailer");
const router=express.Router();

router.post('/otpsend',(req,res)=>{
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const {email}=req.body;
  try{ 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'trendnestshop99@gmail.com',
          pass: 'owvs nipd ngsu xaow'
        }
      });
      
      let mailOptions = {
        from: 'trendnestshop99@gmail.com',
        to: email,
        subject: 'Welcome to PrimeBazaar',
        text: `Thank you for connecting with primeBazaar,
            Your otp is ${otp}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.json({
            valu:true,
            otp
          })
        }
      });
        
  }
  catch(error){

  }
  console.log(email)
})
module.exports=router;