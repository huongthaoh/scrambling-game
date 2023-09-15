
const mongoose = require("mongoose");

const wordlistSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    words:{
        type: [String],
        required: true,
    },
    desc:{
        type: String,
    }
});

const Wordlist = mongoose.model("Wordlist", wordlistSchema);
module.exports = Wordlist;

