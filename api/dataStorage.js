var curWordlist = [];
var usedWords = new Set();

function setCurWordlist(wl) {
    curWordlist = wl;
}

// function setCurWordlist(wl) {
//     return new Promise((resolve, reject) => {
//         curWordlist = wl;
//         resolve();
//     });
// }

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

module.exports = { setCurWordlist, getCurWordlist, addUsedWord, isUsed,outOfWords, recycle };