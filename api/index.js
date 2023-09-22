const express = require('express')
const cors = require('cors');
const wordRoute = require('./routes/word.js')
const gameRoute = require('./routes/game.js')
const fs = require('fs');
const dataStorage = require('./dataStorage.js');

const app = express()

const port = process.env.PORT || 3000;

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

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/word', wordRoute);
app.use('/api/game', gameRoute);

app.listen(port, ()=> {
    readCSV("/Users/huongthaoh/Desktop/proj/change-coding-challenge-2023-huongthaoh/english-words.csv");
    console.log(`Listening on port ${port}!`)
})

