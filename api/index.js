const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');

const wordlistRoute = require('./routes/wordlist.js');

const app = express()
dotenv.config()

const port = 3000

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("DB connected.");
    } catch (error) {
        throw(error);
    }
}

//middlewares
app.use("/wordlist", wordlistRoute);

app.listen(port, ()=> {
    connect();
    console.log(`Listening on port ${port}!`)
})

