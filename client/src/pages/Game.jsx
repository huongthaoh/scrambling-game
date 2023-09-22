import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import SearchIcon from "./Icons/search.png"
import QuestionIcon from "./Icons/interrogation.png"
import CloseIcon from "./Icons/cross.png"

function Game() {

    const [word, setWord] = useState("");
    const [answer, setAnswer] = useState("");
    const [hint, setHint] = useState("");

    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(null);

    const [score, setScore] = useState(0);

    const [displayHint, setDisplayHint] = useState(false);
    const [endRound, setEndRound] = useState(false);
    const [disableInputs, setDisableInputs] = useState(true);

    const [round, setRound] = useState(false);
    const [timePerRound, setTimePerRound] = useState(5);
    const [times, setTimes] = useState(0);

    

    const navigate = useNavigate();

    const beginGame = (e) => {
        e.preventDefault();
        setRound(true);
        setDisableInputs(false);
        getNewWord();
    }

    const getNewWord = async () => {
        await fetchWord();
        await fetchAnswer();
        setHint("");
        setUserInput("");
    }
    
    const fetchWord = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/word/getWord/");
            if (response.ok) {
                const data = await response.json();
                setWord(data);
                
            } else {
                console.error('Response not OK:', response.statusText);
            }
        } catch (err) {
            console.error("Fail to fetch word from wordlist: ", err);
        }
    }

    const fetchAnswer = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/word/getAnswer/");
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAnswer(data);
                
            } else {
                console.error('Response not OK:', response.statusText);
            }
        } catch (err) {
            console.error("Fail to fetch word from wordlist: ", err);
        }
    }

    const fetchHint = async () => {
        if (hint === "") {
            try {
                const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + answer;
                const response = await fetch(url);
                const data = await response.json();
                const def = data[0].meanings[0].definitions[0].definition;
                console.log(def);
                setHint(def);
                
            } catch (err) {
                console.error("Fail to fetch definition from API: ", err);
            }
        }
        setDisplayHint(true);
        setDisableInputs(true);
    }

    const closeHint = () => {
        setDisplayHint(false);
        setDisableInputs(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInput.trim().toLowerCase() === answer.trim().toLowerCase()) {
            setCorrect(true);
            setTimes(times + 1);
            setScore(score + 1);
        } else {
            setCorrect(false);
        }
        
    }

    useEffect(() => {
        if (correct === true) {
            setTimeout(() => {
                // getNewWord();
                setTimeout(() => {
                    setCorrect(null);
                    console.log(times);
                    if (times == timePerRound) {
                        setDisableInputs(true);
                        setEndRound(true);
                    } else {
                        getNewWord();
                    }
                }, 100); 
            }, 500);
            
        } else if (correct === false) {
            setTimeout(() => {
                setCorrect(null);
            }, 500)
        }
    }, [correct])

    const continueGame = () => {
        setTimes(0);
        setDisableInputs(false);
        setEndRound(false);
        getNewWord();
    }
    
    const endGame = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/game/sendScore/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({ score }),
            });
            if (response.ok) {
                navigate('/endGame');
            }
        } catch (err) {

        }
    }

  return (
       
    <div className="flex flex-col w-full h-full">

        <div className='w-full flex-grow flex justify-center items-center border-b-2 border-gray-600 bg-yellow-50'>
            

        {round ? (
            <div className='w-full flex justify-center items-center'>
            {!endRound ? (
                <div>
                {displayHint ? (
                    <div className='md:h-44 md:w-96 mx-5 h-4/6 border-b-2 border-x-2 border-gray-600 rounded-xl bg-pink-200'>
                    
                    <div className='w-full h-10 flex justify-between items-center px-3  bg-yellow-300 rounded-t-xl border-y-2 border-gray-600'>
                        <p className='font-semibold '>a definition of the word</p>
                        <p className = "hover:cursor-pointer" onClick = {closeHint}>
                            <img src={CloseIcon} alt="close hint" className='h-3 w-3'/>
                        </p>
                    </div>
                    <p className='mx-3 my-2'>{hint}</p>
                    
          
                   
                    
                    </div>
                ) : (
                    <p className={`md:text-6xl text-4xl text-center tracking-widest ${
                        correct === false 
                        ? 'text-red-500 animate-shake' 
                        : correct === true
                        ? 'text-green-600 animate-slide'
                        : ''}`}>
                        {word}
                    </p>
                )}
                </div>
           
                
               
            ) : (
                <div className='flex flex-col h-44 w-72 justify-center items-center rounded-xl border-2 border-gray-600 bg-pink-200'>
                    <p className='text-center text-xl font-semibold mb-3'>you have completed this round!</p>
                    <div className='flex justify-center items-center'>
                        <button className='w-20 py-1 m-2 border-2 border-gray-600 rounded-md bg-green-400' onClick = {continueGame}>continue</button>
                        <button className='w-20 py-1 m-2 border-2 border-gray-600 rounded-md bg-gray-200' onClick = {endGame}>stop</button>
                    </div>    
                    
                </div>
            )}
            </div>
        ) : (
            
            <div className='flex flex-col h-44 md:w-72 w-64 py-2 px-5 justify-center items-center rounded-xl border-2 border-gray-600 bg-orange-200'>
                
                <p className='text-center md:text-md font-semibold mb-3'>set words per round</p>
                <form className = "flex flex-col items-center" onSubmit = {beginGame} >
                    <input 
                        className='py-1 px-2 border-2 border-gray-600 rounded-lg bg-blue-50'
                        type="number" 
                        min = "1"
                        value = {timePerRound}
                        onChange = {(e) => setTimePerRound(e.target.value)}
                    />
                    <button type = "submit" className='w-20 py-1 m-2 border-2 border-gray-600 rounded-md bg-green-400' >start</button>
                </form>
                
            </div>
        )}
         

        </div>  
        
        <div className='flex items-center justify-center h-20 rounded-b-2xl px-5 bg-blue-400'>
            <input 
                className= {`w-4/6 h-10 px-4 border-2 border-gray-600 rounded-tl-lg rounded-bl-lg ${disableInputs ? "bg-blue-200" : "bg-gray-50"}`}
                type="text" 
                value={userInput} 
                onChange = {(e) => setUserInput(e.target.value)}
                disabled = {disableInputs}
                />
            <button 
                className = 'flex justify-center items-center h-10 md:w-14 w-12 px-2 border-y-2 border-r-2 border-gray-600 rounded-tr-lg rounded-br-lg bg-pink-400' 
                onClick={handleSubmit}
                disabled = {disableInputs}>
                <img src = {SearchIcon} className = "h-5 w-5"></img>
            </button>
            <button 
                className = {`flex justify-center items-center h-10 w-10 md:ml-5 ml-3 border-2 border-gray-600 rounded-lg ${disableInputs ? "bg-gray-200" : "bg-yellow-200"}`}
                disabled = {disableInputs} 
                onClick = {fetchHint}>
                <img src= {QuestionIcon} alt="question icon" className='h-5 w-5' />
            </button>
        </div>

       
    </div>
        
  );
}


export default Game

