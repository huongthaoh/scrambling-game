import { Link } from "react-router-dom"
import Game from "./Game"


function LandingPage() {
  return (
    <div className="flex w-full h-full justify-around items-center">
        <div className="w-48 h-48 bg-pink-100">

        </div>

        <Link 
            className="w-48 h-48 bg-pink-100"
            to = "/game">
            PLAY
        </Link>
    </div>
  )
}

export default LandingPage