const express = require('express');
const router = express.Router();
const dataStorage = require('../dataStorage.js');

//randomly retrieve a word from array of curWordlist that has not been used.
//return the scrambled word
router.get("/getWord", async (req, res) => {
    try {
        // console.log(dataStorage.getCurWordlist());
        const arr = dataStorage.getCurWordlist();
        // console.log(arr);
        if (arr.length == 0) {
            res.status(400).json("Empty wordlist.")
            return
        }
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * arr.length);
            // console.log("reach here");
        } while (dataStorage.isUsed(randomIndex) && !dataStorage.outOfWords());

        if(dataStorage.outOfWords()) {
            console.log("Out of new words. Recycling words...");
            dataStorage.recycle();
        }

        dataStorage.addUsedWord(randomIndex);
        let curWord = arr[randomIndex];
        dataStorage.setCurWord(curWord);
        console.log("Current word is: ", curWord);
        let scrambledWord = dataStorage.scrambleWord(curWord);
        console.log("Scrambled word is: ", scrambledWord);
        res.status(200).json(scrambledWord);
    } catch (err) {
        console.error('Error fetching word:', err);
        res.status(500).json(err);
    }
})

router.post("/verify", (req, res) => {
    const {userInput} = req.body;
    try {
        const result = dataStorage.verifyWord(userInput);
        res.status(200).json({result});
    } catch (err) {
        console.error("Error verifying word", err);
        res.status(500).json(err);
    }
})



module.exports = router;
