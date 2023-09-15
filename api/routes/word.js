const express = require('express');
const router = express.Router();
const dataStorage = require('../dataStorage.js');

let arr = dataStorage.getCurWordlist();
// let curWord = "";

//randomly retrieve a word from array of curWordlist that has not been used.
//return the scrambled words
router.get("/getWord", async (req, res) => {
    try {
        // console.log(dataStorage.getCurWordlist());
        arr = dataStorage.getCurWordlist();
        console.log(arr);
        if (arr.length == 0) {
            res.status(400).json("Empty wordlist.")
            return
        }
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * arr.length);
            console.log("reach here");
        } while (dataStorage.isUsed(randomIndex) && !dataStorage.outOfWords());

        // randomIndex = Math.floor(Math.random() * arr.length);
        if(dataStorage.outOfWords()) {
            console.log("Out of new words. Recycling words...");
            dataStorage.recycle();
            console.log(dataStorage.outOfWords());
        }

        dataStorage.addUsedWord(randomIndex);
        curWord = arr[randomIndex];
        console.log(curWord);
        res.status(200).json(curWord);
    } catch (err) {
        console.error('Error fetching word:', err);
        res.status(500).json(err);
    }
})


//RETRIEVE

module.exports = router;
