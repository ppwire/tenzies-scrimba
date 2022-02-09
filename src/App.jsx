import './App.css'
import DiceContainer from './components/DiceContainer'

function App() {

  return (
    <div className="app">
      <h1 className="app-title text-karla">Tenzies</h1>
      <h3 className="app-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
      <DiceContainer></DiceContainer>
      <button className="btn">
        <h2 className="text-karla">Roll</h2>
      </button>
    </div>
  )
}

export default App
