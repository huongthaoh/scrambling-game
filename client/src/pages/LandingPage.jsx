
import { useEffect } from "react";
import { Link } from "react-router-dom"
import Game from "./Game"

function LandingPage() {
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/wordlist/6508b7f4080f67cc7c52947e")
  //     .then(response => {
  //         return response.json();
  //       })
  //     .then(data => {
  //       console.log(data);
  //     })
  //   .catch (err => {
  //     console.error("Fail to set default wordlist: ", err);
  //   });
  // }, []);
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