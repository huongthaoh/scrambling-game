const express = require('express');
const router = express.Router();

router.get("/", (req,res) => {
    res.send("Test wordlist endpoint");
})

module.exports = router;