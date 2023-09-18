var curWordlist = [];
var usedWords = new Set();
var curWord = "";
var curScrambled = "";

function setCurWord(word) {
    curWord = word;
}

function getCurWord() {
    return curWord;
}

function verifyWord(scrWord) {
    return (scrWord.trim().toLowerCase() == curWord.trim().toLowerCase());
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

module.exports = { setCurWord, getCurWord, verifyWord, scrambleWord, setCurWordlist, getCurWordlist, addUsedWord, isUsed,outOfWords, recycle };