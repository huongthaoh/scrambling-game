var curWordlist = [];
var usedWords = new Set();
var curWord = "";
var curScrambled = "";
var score = 0;
var highScore = 0;

function restart() {
    curWord = "";
    curScrambled = "";
    usedWords.clear();
    score = 0;
}

function setCurWord(word) {
    curWord = word;
}

function getCurWord() {
    return curWord;
}

function verifyWord(scrWord) {
    if (scrWord.trim().toLowerCase() == curWord.trim().toLowerCase()) {
        ++score;
        return true;
    };
    return false;
}

function getScore() {
    return score;
}

function getHighscore() {
    const cur = highScore;
    if (score > cur) highScore = score;
    return cur;
}

function scrambleWord(str) {
    let strarray = str.split('');           
    var i,j,k
    for (i = 0; i < strarray.length; i++) {
        j = Math.floor(Math.random() * i)
        k = strarray[i]
        strarray[i] = strarray[j]
        strarray[j] = k
    }
    let scrambledWord = strarray.join('');
    curScrambled = scrambledWord;
    return scrambledWord;
}

function setCurWordlist(wl) {
    curWordlist = wl;
}

function getCurWordlist() {
    return curWordlist;
}

function addUsedWord(index) {
    usedWords.add(index);
}

function isUsed(index) {
    return usedWords.has(index);
}

function outOfWords() {
    return usedWords.size == curWordlist.length;
}

function recycle() {
    usedWords.clear();
}

module.exports = { restart, setCurWord, getCurWord, verifyWord, getScore, getHighscore, scrambleWord, setCurWordlist, getCurWordlist, addUsedWord, isUsed,outOfWords, recycle };