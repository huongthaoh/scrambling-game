const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
// const mongoose = require('mongoose');

// const wordlistRoute = require('./routes/wordlist.js');
const wordRoute = require('./routes/word.js')
const gameRoute = require('./routes/game.js')
const fs = require('fs');
const dataStorage = require('./dataStorage.js');

const app = express()
dotenv.config();

const port = process.env.PORT || 3000;

// const fp = 'english-words.csv';

const readCSV = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const rows = data.split('\n');
    const nonEmptyRows = rows.filter(row => row.trim() !== '');
    
    //skip the header row
    const values = nonEmptyRows.slice(1).map(row => row.trim());
    dataStorage.setCurWordlist(values);
    console.log("Parsed CSV file");
  } catch (err) {
    console.error('Error reading CSV file:', err);
  }
}

// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("DB connected.");
//     } catch (error) {
//         console.error("Failing to connect to DB: ", error);
//     }
// }

//middlewares
app.use(cors());
app.use(express.json());

// app.use("/api/wordlist", wordlistRoute);
app.use('/api/word', wordRoute);
app.use('/api/game', gameRoute);

app.listen(port, ()=> {
    readCSV("/Users/huongthaoh/Desktop/proj/change-coding-challenge-2023-huongthaoh/english-words.csv");
    // connect();
    console.log(`Listening on port ${port}!`)
})

