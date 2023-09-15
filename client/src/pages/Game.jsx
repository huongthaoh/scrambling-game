import {useEffect, useState} from 'react'

function Game() {
    const [wordlist, setWordlist] = useState([]);
    const [gameOver, setGameOver] = useState(false); 
    const [curWord, setCurWord] = useState("");
    const [scrambled, setScrambled] = useState("");
    // const [usedWords, setUsedWords] = useState(new Set());

    let arr = ["wordlist", "jerry", "sharkie", "mika", "duduong"];
    let usedWords = new Set();

    const wordRandom = () => {
        if (usedWords.size == arr.length) {
            setGameOver(true);
            console.log("game over");
            return;
        }
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * arr.length);
        } while (usedWords.has(randomIndex));
        usedWords.add(randomIndex);
        // console.log(usedWords);
        
        setCurWord(arr[randomIndex]);
        return (arr[randomIndex]);
        // console.log(curWord);
        // scramble();
        }
    

    const scramble = () => {
        // wordRandom();
        // console.log(curWord);
        let str = curWord;
        let strarray = str.split('');           
        var i,j,k
        for (i = 0; i < strarray.length; i++) {
            j = Math.floor(Math.random() * i)
            k = strarray[i]
            strarray[i] = strarray[j]
            strarray[j] = k
        }
        let scrambledWord = strarray.join('');
        setScrambled(scrambledWord);  
        // console.log(scrambledWord);
        return scrambledWord;
    }

    const round = () => {
        console.log(wordRandom());
        console.log(curWord);
        console.log(scramble());
        console.log(scrambled);


    }

    /*
    * Game loop: prompts user to pick a wordlist (user-made or default)
    * Each round, user can either get auto generated word or from an API. In the case of auto generated, this will be randomly picked from the specified wordlist.
    * Scramble word. User guess until time runs out or they give up.
    * 
    * Game ends (user loses/run out of words), return statistics.
    */
  return (
    <div>
        {/* <button onClick = {wordRandom}><h1>CHOOSE WORD</h1></button> */}
        <button onClick = {round}><h1>SCRAMBLE</h1></button>
        {/* <p>{curWord} {scrambled}</p>  */}

        {gameOver && <p>Game Over</p>}
    </div>
  );
}


export default Game