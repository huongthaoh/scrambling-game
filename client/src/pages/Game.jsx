import {useEffect, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Game() {
    // const [fetched, setFetched] = useState(false);
    const [word, setWord] = useState("");
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(null);
    const [endGame, setEndGame] = useState(false);
    const [times, setTimes] = useState(1);
    const [score, setScore] = useState(0);
    const [displayResult, setDisplayResult] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchWordlist();
    }, []);
    
    const fetchWordlist = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/word/getWord/");
            if (response.ok) {
                const data = await response.json();
                setWord(data);
                // setFetched(true);
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
                    setTimes(times + 1);
  
                if (times === 5) {
                    setEndGame(true);
                   
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
        setEndGame(false);
        fetchWordlist();
    }

    const newGame = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/game/restart");
            if (response.ok) {
                navigate('/');
            }
        } catch (err) {
            console.error("Fail to restart game: ", err);
        }
    }


    const displayScore = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/game/score");
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setScore(data);
                setDisplayResult(true);
            }
        } catch (err) {
            console.error("Fail to fetch score: ", err);
        }
    }

    


  return (
       
    <div className="flex flex-col w-full h-full">
        <div className='flex-grow flex justify-center items-center border-b-2 border-gray-600 bg-yellow-50'>
        {!endGame ? (
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
                {displayResult ? (
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-center text-xl font-semibold mb-3'>{score > 1 ? `You solved ${score} words`
                            : `You solved ${score} word`}
                        </p>
                        <button className='py-2 px-5 border-2 border-gray-600 rounded-md bg-green-300'
                        onClick = {newGame}>new game</button>
                    </div>
                ) : (
                    <div>
                        <p className='text-center text-xl font-semibold mb-3'>you win!</p>
                        <div className='flex justify-center items-center'>
                            <button className='w-20 py-1 m-2 border-2 border-gray-600 rounded-md bg-green-400' onClick = {continueGame}>continue</button>
                            <button className='w-20 py-1 m-2 border-2 border-gray-600 rounded-md bg-gray-200' onClick = {displayScore}>stop</button>
                        </div>        
                    </div>
                )}
                
            </div>
        )}
        </div>  
                         

        <div className='flex items-center justify-center h-20 rounded-b-2xl bg-blue-300'>
                <input 
                    className= {`w-4/6 h-10 px-4 border-2 border-gray-600 rounded-tl-lg rounded-bl-lg ${endGame ? "bg-blue-200" : "bg-gray-50"}`}
                    type="text" 
                    value={userInput} 
                    onChange = {(e) => setUserInput(e.target.value)}
                    disabled = {endGame}
                    />
                <button className = 'h-10 w-14 border-y-2 border-r-2 border-gray-600 rounded-tr-lg rounded-br-lg bg-pink-400' onClick={handleSubmit}> <SearchIcon/> </button>
        </div>
    </div>
        
  );
}


export default Game

