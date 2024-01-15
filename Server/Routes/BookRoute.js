const express = require('express');
const Books = require('../Models/Books');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const BookRouter = express.Router();

BookRouter.use(cookieParser())

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, "Surrender", (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
        });
    } else {
        return res.status(401).send("Authorisation token is missing!");
    }
}

BookRouter.get("/", (req,res) => {
    res.json("Welcome to Story Keeper.")
})

BookRouter.post("/AddBook", verifyToken, async (req, res) => {
    const NewBook = new Books (req.body)
    try {
        const SavedBook = await NewBook.save() 
        res.send(SavedBook)
    } catch (error) {
        console.error(error)
    }
})

BookRouter.get("/AllBooks", async (req, res) => {
    try{
        const AllBooks = await Books.find()
        res.json(AllBooks)
    }
    catch(err) {
        res.send(err) 
    }
})

BookRouter.get('/:userId/Books', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Book = await Books.find({ userOwner: userId });
        res.json(Book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books.' });
    }
});

// UPDATE

BookRouter.put("/:id", async (req, res) => {
    try{
        const Book = await Books.findByIdAndUpdate(req.params.id, req.body)
        res.json(Book)
    }
    catch(err) {
        res.send(err) 
    }
})

// DELETE

BookRouter.delete("/:id", async (req, res) => {
    try{
        const Book = await Books.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

BookRouter.get('/:id', async (req, res) => {
    try {
    const Book = await Books.findById(req.params.id);
    if (!Book) {
        return res.status(404).json({ message: 'Book is not found' });
    }
    res.json(Book);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = BookRouter