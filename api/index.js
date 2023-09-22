const express = require('express')
const cors = require('cors');
const wordRoute = require('./routes/word.js')
const gameRoute = require('./routes/game.js')
const fs = require('fs');
const csv = require('csv-parser');
const dataStorage = require('./dataStorage.js');

const app = express()
const port = process.env.PORT || 3000;
const filePath = './english-words.csv';

// const readCSV = (filePath) => {
//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     const rows = data.split('\n');
//     const nonEmptyRows = rows.filter(row => row.trim() !== '');
    
//     //skip the header row
//     const values = nonEmptyRows.slice(1).map(row => row.trim());
//     dataStorage.setCurWordlist(values);
//     console.log("Parsed CSV file");
//   } catch (err) {
//     console.error('Error reading CSV file:', err);
//   }
// }
const arr = [];
fs.createReadStream(filePath) 
  .pipe(csv( ["Word"] ))
  .on('data', (row) => {
    // console.log(row);
    let rowValue = row["Word"];
    arr.push(rowValue);
  })
  .on('end', () => {
    dataStorage.setCurWordlist(arr);
    console.log("Parsed CSV File")
  });

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/word', wordRoute);
app.use('/api/game', gameRoute);

app.listen(port, ()=> {
    // readCSV(csvFile);
    console.log(`Listening on port ${port}!`)
})

