import {useEffect, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Game() {
    const [fetched, setFetched] = useState(false);
    const [word, setWord] = useState("");
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(false);
    
    const fetchWordlist = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/word/getWord/");
            if (response.ok) {
                const data = await response.json();
                setWord(data);
                setFetched(true);
            } else {
                console.error('Response not OK:', response.statusText);
            }
        } catch (err) {
            console.error("Fail to fetch word: ", err);
        }
    }

    const fetchApi = () => {
        setFetched(true);
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
                    setCorrect(true)
                    // console.log("smart");
                } else {
                    // console.log("dumb dumb");
                }
            } else {
                console.error('Response not OK:', response.statusText);
            }
        } catch (err) {
            console.error("Fail to verify word: ", err);
        }
        

    }

  return (
    <div className='h-full'>
        {fetched ? (
            <div className="flex flex-col w-full h-full">
                <div className='flex-grow flex justify-center items-center border-b-2 border-gray-600 bg-yellow-50'>
                    <p className='text-6xl text-center tracking-widest'>{word}</p>
                </div>

                <div className='flex items-center justify-center h-20 rounded-b-2xl bg-blue-300'>
                        <input className='w-4/5 h-10 px-4 border-2 border-gray-600 rounded-tl-lg rounded-bl-lg' type="text" value={userInput} onChange = {(e) => setUserInput(e.target.value)}/>
                        <button className = 'h-10 w-14 border-y-2 border-r-2 border-gray-600 rounded-tr-lg rounded-br-lg bg-pink-400' onClick={handleSubmit}> <SearchIcon/> </button>
                   
                </div>
            </div>
        ) : (
            //fetch a scrambled word in wordlist or via api
            <div className="flex justify-around items-center">
                <div>
                    <button onClick = {fetchWordlist}>from wordlist</button>
                </div>
                <div>
                    <button onClick = {fetchApi}>from api</button>
                </div>
            </div>
        )}
        

    </div>
  );
}


export default Game