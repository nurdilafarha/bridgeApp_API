const router = require("express").Router();
const User = require("../models/User");

//Register
router.post("/register", async (req,res)=>{
    try {
        //Menambah user baru
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });

        //Menyimpan user
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    };
});


//Login
router.post("/login", async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");

        const validPassword = await User.findOne({ password: req.body.password});
        !validPassword && res.status(400).json("wrong password");

        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    };
});

module.exports = router;