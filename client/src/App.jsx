
import { Routes } from 'react-router-dom'
import './App.css'
import CreateWordlist from './pages/CreateWordlist'
import NewGame from './pages/NewGame'


function App() {

  let curWordsArr = [];

  return (
    <div className="">
      <h1>hello</h1>
      <CreateWordlist></CreateWordlist>
      <NewGame/>
      {/* <Game></Game> */}
      {/* <Routes>
        
      </Routes> */}
    </div>
  )
}

export default App
