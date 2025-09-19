const express=require('express');
const router=express.Router();
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;



router.use(express.json());

const user = [];




router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser((userObj, done) => {
    done(null, userObj);
});

passport.deserializeUser((userObj, done) => {
    done(null, userObj);
});

passport.use(new GoogleStrategy({
    
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:"https://primebazaarbackend.onrender.com/google_oauth/responce",
}, (accessToken, refreshToken, profile, done) => {
    const userObj = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        imgUrl:profile.photos[0].value
    };

    user[0] = userObj;

    return done(null, userObj);
}));


router.get("/google_check",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/responce",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect(`https://prime-bazaar-one.vercel.app/Sign_Up`);
    }
)

router.get("/user", (req, res) => {
        res.json(req.user);
        user.length = 0;
});

module.exports=router;
