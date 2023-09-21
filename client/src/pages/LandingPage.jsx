
import { useEffect } from "react";
import { Link } from "react-router-dom"
import Game from "./Game"

function LandingPage() {

  

  return (
    <div className="flex w-full h-full justify-around items-center">
        
        <p >
          <span>scrambling</span>
          <span>s#ra@bl!n*</span>
          <span>scrambling</span>
          <span>scrambling</span>
          <span>scrambling</span>
        </p>

        <Link 
            className="w-48 h-48 bg-pink-100"
            to = "/game">
            PLAY
        </Link>
    </div>
  )
}

export default LandingPage