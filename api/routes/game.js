const express = require('express');
const router = express.Router();
const dataStorage = require('../dataStorage.js');

router.get("/score", (req, res) => {
    try {
        const score = dataStorage.getScore();
        res.status(200).json(score);
    } catch (err) {
        console.error("Error retrieving score", err);
        res.status(500).json(err);
    }
})

router.get("/highscore", (req, res) => {
    try {
        const score = dataStorage.getHighscore();
        res.status(200).json(score);
    } catch (err) {
        console.error("Error retrieving the high score", err);
        res.status(500).json(err);
    }
})

router.get("/restart", (req, res) => {
    try {
        dataStorage.restart();
        res.status(200).json();
    } catch (err) {
        console.error("Error restarting the game", err);
        res.status(500).json(err);
    }
})

module.exports = router;