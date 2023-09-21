import {useEffect, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

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
                console.log(word);
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
                setAnswer(data);
                console.log(answer);
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
                getNewWord();
                // setUserInput("");
                
                setTimeout(() => {
                    setCorrect(null);
                    console.log(times);
                    if (times == timePerRound) {
                        setDisableInputs(true);
                        setEndRound(true);
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

        <div className='flex-grow flex justify-center items-center border-b-2 border-gray-600 bg-yellow-50'>
            

        {round ? (
            <div >
            {!endRound ? (
                <div>
                {displayHint ? (
                    <div className='flex flex-col h-44 w-96 border-b-2 border-x-2 border-gray-600 rounded-xl bg-pink-200'>
                    
                    <div className='w-full h-10 flex justify-between items-center py-1 px-2 bg-yellow-300 rounded-t-xl border-y-2 border-gray-600'>
                        <p className='font-semibold '>a definition of the word</p>
                        <p className = "hover:cursor-pointer" onClick = {closeHint}>{< CloseIcon />}</p>
                    </div>
                    <p className='mx-3 my-2'>{hint}</p>
                    
          
                    {/* <p className='mt-2 text-center text-md font-semibold mb-3'>a definition of the word</p>
                    <p>{hint}</p>
                    <button className='w-20 py-1 m-2 border-2 border-gray-600 rounded-md bg-blue-300' onClick = {closeHint}>resume</button> */}
                    
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
            
            <div className='flex flex-col h-44 w-72 py-2 px-5 justify-center items-center rounded-xl border-2 border-gray-600 bg-orange-200'>
                
                <p className='text-center text-md font-semibold mb-3'>how many words per round would you like to play?</p>
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
        
        <div className='flex items-center justify-center h-20 rounded-b-2xl bg-blue-400'>
            <input 
                className= {`w-4/6 h-10 px-4 border-2 border-gray-600 rounded-tl-lg rounded-bl-lg ${disableInputs ? "bg-blue-200" : "bg-gray-50"}`}
                type="text" 
                value={userInput} 
                onChange = {(e) => setUserInput(e.target.value)}
                disabled = {disableInputs}
                />
            <button 
                className = 'h-10 md:w-14 border-y-2 border-r-2 border-gray-600 rounded-tr-lg rounded-br-lg bg-pink-400' 
                onClick={handleSubmit}
                disabled = {disableInputs}> <SearchIcon/> </button>
            <button 
                className = {`h-10 w-10 ml-5 border-2 border-gray-600 rounded-lg ${disableInputs ? "bg-gray-200" : "bg-yellow-200"}`}
                disabled = {disableInputs} 
                onClick = {fetchHint}>
                <QuestionMarkIcon/> 
            </button>
        </div>

       
    </div>
        
  );
}


export default Game

