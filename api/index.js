const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose');

const wordlistRoute = require('./routes/wordlist.js');

const app = express()
dotenv.config();

const port = process.env.PORT || 3000;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("DB connected.");
    } catch (error) {
        console.error("Failing to connect to DB: ", error);
    }
}

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/wordlist", wordlistRoute);

app.listen(port, ()=> {
    connect();
    console.log(`Listening on port ${port}!`)
})

