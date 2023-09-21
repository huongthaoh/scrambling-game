
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import CreateWordlist from './pages/CreateWordlist';
import Game from './pages/Game';
import GameOver from './pages/GameOver';


import LandingPage from './pages/LandingPage';



function App() {
  const location = useLocation();
  const navigate = useNavigate();

  let text= "let's play ekreb"; //default
  if (location.pathname === "/game") {
    text = "can you unscramble this word?"
  } else if (location.pathname === "/endGame") {
    text = "thank you for playing <3"
  }

  const exitGame = async () => {
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
    
    <div className = "min-h-screen h-screen px-2 py-2 flex justify-center items-center">

      <div className="2xl:w-1/2 md:h-3/5 md:w-3/5 w-full h-4/6 flex rounded-2xl flex-col shadow-md shadow-gray-400">
      
      <div className='flex py-2 px-5 justify-end items-center bg-pink-400 border-x-2 border-t-2 border-gray-600 rounded-t-2xl min-h-12 w-full'>
        <h2 className='text-center md:text-lg font-semibold flex-grow'>{text}</h2>
        <div className='md:h-5 md:w-5 h-4 w-4 ml-3 mr-1.5 border-2 border-gray-600 bg-yellow-400 rounded-full'></div>
        <div className='md:h-5 md:w-5 h-4 w-4 border-2 border-gray-600 bg-red-600 rounded-full hover:cursor-pointer' onClick = {exitGame}></div>
      </div>

      <div className= "h-full w-full border-2 border-gray-600 rounded-b-2xl bg-yellow-50">
      <Routes>
        <Route path = "/" element = {<LandingPage/>}></Route>
        <Route path = "/game" element = {<Game/>}></Route>
        
        <Route path = "/endGame" element = {<GameOver/>}></Route>
      </Routes>
      </div>
      </div>
    </div>
  )
}

export default App
