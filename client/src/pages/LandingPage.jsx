
import { useEffect } from "react";
import { Link } from "react-router-dom"
import Game from "./Game"

function LandingPage() {

  return (
    <div className="group flex flex-col w-full h-full justify-center items-center font-mono">
      {/* <div className="group hover:animate-scroll"> */}
        
        <p className="relative mb-10 h-12 text-4xl m-0 p-0 overflow-hidden items-center">
          <span className="group-hover:animate-scroll w-full h-full mx-auto my-auto grid">scrambling...</span>
          <span className="group-hover:animate-scroll w-full h-full mx-auto my-auto grid">sc#a&bl!ng...</span>
          <span className="group-hover:animate-scroll w-full h-full mx-auto my-auto grid">scr@m*li_g...</span>
          <span className="group-hover:animate-scroll w-full h-full mx-auto my-auto grid">$cram%lin&...</span>
          <span className="group-hover:animate-scroll w-full h-full mx-auto my-auto grid">s^ra@b^in#...</span>
          <span className="group-hover:animate-scroll w-full h-full mx-auto my-auto grid">sc$am_lin!...</span>
          <span className="group-hover:animate-scroll w-full h-full mx-auto my-auto grid">s!r#mb$ing...</span>
          <span className="group-hover:animate-scroll w-full h-full mx-auto my-auto grid">sc!am*l_ng...</span>
          
          
        </p>

        <Link 
            className="font-semibold border-2 border-gray-600 px-5 py-3 rounded-xl bg-yellow-400"
            to = "/game">
            PLAY
        </Link>
    </div>
  )
}

export default LandingPage