import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
    Navigates to this page when user indicates stopping the game.
    Displaying stats, restart dataStorage, and redirect user to landing page.
*/

function GameOver() {  
    const [score, setScore] = useState(0); 
    const [highScore, setHighScore] = useState(0);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchScore();
        fetchHighScore();
    }, []);

    const fetchScore = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/game/score");
            if (response.ok) {
                const data = await response.json();
                setScore(data);
            }
        } catch (err) {
            console.error("Fail to fetch score: ", err);
        }
    }

    const fetchHighScore = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/game/highscore");
            if (response.ok) {
                const data = await response.json();
                setHighScore(data);
            }
        } catch (err) {
            console.error("Fail to fetch high score: ", err);
        }
    }

    const endGame = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/game/restart");
            if (response.ok) {
                navigate('/');
            }
        } catch (err) {
            console.error("Fail to restart game: ", err);
        }
    }

  return (
    <div className='flex flex-col w-full h-full'>
        <div className="mx-auto my-auto flex flex-col h-44 w-72 justify-center items-center rounded-xl border-2 border-gray-600 bg-pink-200">

            {score > highScore ? (
                <div> 
                    <p className='text-center text-xl font-semibold mb-3'>You set a new record of <span className="font-bold text-pink-600">{score}</span> {score > 1 ? "words" : "word"} solved!</p>
                    <p className='text-center text-lg font-normal mb-3'>Last highest score: {highScore}</p>
                </div>
            ) : (
                <div>
                    <p className='text-center text-xl font-semibold mb-3'>You solved <span className="font-bold text-pink-600">{score}</span> {score > 1 ? "words" : "word"}</p>
                    <p className='text-center text-lg font-normal mb-3'>Current highest score: {highScore}</p>
                </div>
            )} 
            
            <button className='py-2 px-5 border-2 border-gray-600 rounded-md bg-green-300'
            onClick = {endGame}>good job, me!</button>
        </div>
                
    </div>
  )
}

export default GameOver

