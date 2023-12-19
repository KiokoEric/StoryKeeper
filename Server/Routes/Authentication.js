const express = require('express');
const UserRouter = express.Router();
const cookieParser = require("cookie-parser");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

UserRouter.use(cookieParser())

UserRouter.post("/Registration", async (req, res) => {

    // Checking if the user is already in the database

    const EmailExist = await User.findOne({Email: req.body.Email})
    if(EmailExist) return res.status(400).send("Email already exists!")

    // Hash Password

    const salt = bcrypt.genSaltSync(10);
    var Hashedpassword = await bcrypt.hash(req.body.Password, salt); 

    const NewUser = new User ({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: Hashedpassword
    })
    try {
        const SavedUser = await NewUser.save() 
        res.send(SavedUser)
    } catch (error) {
        console.error(error)
    }
})

UserRouter.post("/Login", async (req, res) => {

    // Checking if the email is in the database

    const NewUser = await User.findOne({Email: req.body.Email})
    if(!NewUser) return res.status(400).send("Email is not valid!"); 

    // correctPassword

    const validPassword = await bcrypt.compare(req.body.Password, NewUser.Password)
    if(!validPassword) return res.status(400).send("Password is not valid!");
    // Create and assign a token

    if (NewUser) {
        const Token = jwt.sign({_id: NewUser._id}, "Surrender");
        res.json({Token, UserID: NewUser._id});
    }  
})

UserRouter.get('/:id', async (req, res) => {
    try {
    const UserDetails = await User.findById(req.params.id);
    if (!UserDetails) {
        return res.status(404).json({ message: 'User was not found' });
    }
    res.json(UserDetails);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

UserRouter.put("/:id", async (req, res) => {
    try{
        const UpdateUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.json(UpdateUser)
    }
    catch(err) {
        res.send(err)
    }
})

// DELETE

UserRouter.delete("/:id", async (req, res) => {
    try {
        const userId = req.user.id;

        // Delete the user from the database
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User profile deleted successfully' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

UserRouter.get("/Logout", (req, res) => {
    res.clearCookie("Token"); 
})

module.exports = UserRouter; 