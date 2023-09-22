
import { Link } from "react-router-dom"

function LandingPage() {

  return (
    <div className="group flex flex-col w-full h-full justify-center items-center font-mono">
        
        <p className="relative mb-10 h-12 md:text-5xl text-2xl m-0 p-0 overflow-hidden items-center">

          <span className="group-hover:animate-scroll text-blue-500 w-full h-full mx-auto my-auto flex justify-center items-center">scrambling</span>
          <span className="group-hover:animate-scroll text-blue-400 w-full h-full mx-auto my-auto grid">gmisnlacbr</span>
          <span className="group-hover:animate-scroll text-blue-300  w-full h-full mx-auto my-auto grid">lgmsinacrb</span>
          <span className="group-hover:animate-scroll text-blue-200  w-full h-full mx-auto my-auto grid">smnalcigbr</span>
          <span className="group-hover:animate-scroll text-blue-100  w-full h-full mx-auto my-auto grid">sgmnlibacr</span>
          <span className="group-hover:animate-scroll text-blue-200  w-full h-full mx-auto my-auto grid">rnacgbsilm</span>
          <span className="group-hover:animate-scroll text-blue-300  w-full h-full mx-auto my-auto grid">mnasciglrb</span>
          <span className="group-hover:animate-scroll text-blue-400 w-full h-full mx-auto my-auto grid">cmnrlisgab</span>
          
          
        </p>

        <Link 
            className="font-semibold border-2 border-gray-600 px-10 py-2 bg-yellow-300"
            to = "/game">
            PLAY
        </Link>
    </div>
  )
}

export default LandingPage