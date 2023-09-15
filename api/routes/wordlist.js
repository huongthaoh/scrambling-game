const express = require('express');
const Wordlist = require('../models/Wordlist.js');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const upload = multer({ dest: './uploads/'});
const dataStorage = require('../dataStorage.js');

//CREATE
router.post("/", upload.single('csvFile'), async (req, res) => {
    try {
        const { name, desc } = req.body;
        if (!req.file) {
            res.status(400).json({error: "No CSV file uploaded"});
        }
        const arr = [];
        const filePath = req.file.path;
        fs.createReadStream(filePath)
            .pipe(csv( ["Word"] ))
            .on('data', (row) => {
                let rowValue = row["Word"];
                arr.push(rowValue);

            })
            .on('end', async () => {
                const newWordlist = new Wordlist({
                    name: name,
                    desc: desc,
                    words: arr,
                });
                const savedWordlist = await newWordlist.save();

                console.log(arr);
                fs.unlinkSync(filePath);
                res.status(200).json(savedWordlist);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL -- return the array of specified wordlist and set it as current wordlist
router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const wordlist = await Wordlist.findById(id);
        if (!wordlist) {
            return res.status(404).json({message: "Wordlist not found."});
        }
        const wordsArr = wordlist.words;
        // console.log(wordsArr);
        // curWordsArr = wordsArr;
        dataStorage.setCurWordlist(wordsArr);
        // console.log(dataStorage.getCurWordlist);
        res.json(wordsArr);
    } catch (err) {
        console.error('Error fetching wordlist:', err);
        res.status(500).json(err);
    }
    
})








//GET ALL?



module.exports = router;