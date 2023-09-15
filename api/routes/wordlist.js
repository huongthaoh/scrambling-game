const express = require('express');
const Wordlist = require('../models/Wordlist.js');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

//set up Multer to process file uploads
// const upload = multer({
//     // storage: multer.memoryStorage(),
//     dest: './uploads/',
//     fileFilter: (req, file, cb) => {
//       if (path.extname(file.originalname) !== '.csv') {
//         return cb(new Error('Must be a csv file.'));
//       }
//       cb(null, true);
//     },
//   });

const upload = multer({ dest: './uploads/'});

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
                // console.log(row["Word"]);
                let rowValue = row["Word"];
                arr.push(rowValue);

            })
            .on('end', async () => {
                // res.status(200).json(arr);
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

//EDIT

//GET ALL?

module.exports = router;