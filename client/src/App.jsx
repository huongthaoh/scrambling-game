
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import CreateWordlist from './pages/CreateWordlist';
import Game from './pages/Game';

import LandingPage from './pages/LandingPage';



function App() {
  const location = useLocation();
  let text= "let's play ekreb"; //default
  if (location.pathname === '/wordlist') {
    text = "create a wordlist";
  } else if (location.pathname === "/game") {
    text = "can you unscramble this word?"
  }


  return (
    // <div className = "relative max-w-2xl h-96 bg-red-400">
    <div className = "min-h-screen flex justify-center items-center">
      {/* <CreateWordlist /> */}
      <div className="2xl:w-1/2 md:w-3/5 sm:w-full h-96 flex rounded-2xl flex-col shadow-md shadow-gray-400">
      
      <div className='flex px-5 justify-end items-center bg-pink-400 border-x-2 border-t-2 border-gray-600 rounded-t-2xl h-12 w-full'>
        <h2 className='text-center text-lg font-semibold flex-grow'>{text}</h2>
        <div className='h-5 w-5 mr-1.5 border-2 border-gray-600 bg-yellow-400 rounded-full'></div>
        <Link to = "/" className='h-5 w-5 border-2 border-gray-600 bg-red-600 rounded-full'></Link>
      </div>

      <div className= "h-full border-2 border-gray-600 rounded-b-2xl bg-yellow-50">
      <Routes>
        <Route path = "/" element = {<LandingPage/>}></Route>
        <Route path = "/game" element = {<Game/>}></Route>
      </Routes>
      </div>
      </div>
    </div>
  )
}

export default App
