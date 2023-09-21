import {useEffect, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Game() {

    const [word, setWord] = useState("");
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(null);
    const [endRound, setEndRound] = useState(false);
    const [round, setRound] = useState(false);
    const [timePerRound, setTimePerRound] = useState(0);
    const [times, setTimes] = useState(0);

    const navigate = useNavigate();

    const beginGame = () => {
        setRound(true);
        console.log(timePerRound);
        fetchWordlist();
    }
    
    const fetchWordlist = async () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/word/verify/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({ userInput }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.result === true) {
                    setCorrect(true);
                    setTimes(times + 1);
                } else {
                    setCorrect(false);
                }
            } else {
                console.error('Response not OK:', response.statusText);
            }
        } catch (err) {
            console.error("Fail to verify word: ", err);
        }
    }

    useEffect(() => {
        if (correct === true) {
            const timer = setTimeout(() => {
                fetchWordlist();
                setUserInput("");
                
                setTimeout(() => {
                    setCorrect(null);
                    console.log(times);
                    if (times == timePerRound) {
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
        setEndRound(false);
        fetchWordlist();
    }
    
    const endGame = () => {
        navigate('/endGame');
    }

  return (
       
    <div className="flex flex-col w-full h-full">

        <div className='flex-grow flex justify-center items-center border-b-2 border-gray-600 bg-yellow-50'>

        {round ? (
            <div>
            {!endRound ? (
                <p className={`text-6xl text-center tracking-widest ${
                    correct === false 
                    ? 'text-red-500 animate-shake' 
                    : correct === true
                    ? 'text-green-600 animate-slide'
                    : ''}`}>
                    {word}
                </p>
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
                <input 
                    className='py-1 px-2 border-2 border-gray-600 rounded-lg bg-blue-50'
                    type="number" 
                    value={timePerRound} 
                    onChange = {(e) => setTimePerRound(e.target.value)}
                />
                <button className='w-20 py-1 m-2 border-2 border-gray-600 rounded-md bg-green-400' onClick = {beginGame}>start</button>
                
            </div>
        )}

        </div>  

        
                         

        <div className='flex items-center justify-center h-20 rounded-b-2xl bg-blue-300'>
            <input 
                className= {`w-4/6 h-10 px-4 border-2 border-gray-600 rounded-tl-lg rounded-bl-lg ${endRound ? "bg-blue-200" : "bg-gray-50"}`}
                type="text" 
                value={userInput} 
                onChange = {(e) => setUserInput(e.target.value)}
                disabled = {endRound}
                />
            <button className = 'h-10 w-14 border-y-2 border-r-2 border-gray-600 rounded-tr-lg rounded-br-lg bg-pink-400' onClick={handleSubmit}> <SearchIcon/> </button>
        </div>
    </div>
        
  );
}


export default Game

