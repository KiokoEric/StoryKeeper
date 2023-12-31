const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

// Middleware

app.use(cors({
    origin: ["https://story-keeper.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// MongoDB Connection 

const dbUrl = "mongodb+srv://KiokoEric:Victory2026@cluster0.zx2pvqa.mongodb.net/Stories?retryWrites=true&w=majority";

mongoose.connect(dbUrl,  {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log("Connected to the database!"))


// Import Routes

app.use("/User", require("./Routes/Authentication"))
app.use("/Books", require("./Routes/BookRoute"))

app.listen(4000) 