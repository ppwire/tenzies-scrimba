import { useEffect, useState } from 'react'
import Dice from './Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const DiceContainer = () => {
   const { width, height } = useWindowSize()
   const [dices, setDices] = useState(generateDices())
   const [bestScore, setBestScore] = useState(localStorage.getItem('bestScore') || null)
   const [rollCount, setRollCount] = useState(0)
   const [tenzies, setTenzies] = useState(false)

   useEffect(() => {
      const allHeld = dices.every(dice => dice.isHeld)
      const first = dices[0].value
      const allSame = dices.every(dice => dice.value === first)
      if (allSame && allHeld) {
         setTenzies(true)
         if (bestScore) {
            if (rollCount < bestScore) {
               setBestScore(rollCount)
               localStorage.setItem('bestScore', rollCount)
            }
         } else {
            setBestScore(rollCount)
            localStorage.setItem('bestScore', rollCount)
         }
      }
   }, [dices])

   function generateDices() {
      const dices = []
      for (let index = 0; index < 10; index++) {
         let randomNumber = Math.ceil(Math.random() * 6)
         dices.push({ value: randomNumber, isHeld: false, id: nanoid() })
      }
      return dices
   }

   function rollDices() {
      setRollCount(prev => prev + 1)
      const newDices = generateDices()
      setDices(prev => prev.map((el, index) => {
         return (el.isHeld === true) ? el : newDices[index]
      }))
   }

   function playAgain() {
      setRollCount(0)
      setTenzies(false)
      setDices(generateDices())
      setBestScore(localStorage.getItem('bestScore'))
   }

   function keepDice(id) {
      setDices(prev => prev.map(el => {
         return (el.id === id) ? { ...el, isHeld: !el.isHeld } : el
      }))
   }

   return (
      <div className="dice-card">
         {tenzies ? <div>
            <div className="dice-messages">
               <h1>You win !!!</h1>
               <h2>You rolled {rollCount} times</h2>
               {bestScore && <h2>You high score is {bestScore}</h2>}
            </div>
            <Confetti width={width} height={height}>
            </Confetti>
         </div>
            :
            <div className="dice-container">
               {dices.map((dice, index) => {
                  return <Dice key={index} value={dice.value} isHeld={dice.isHeld} id={dice.id} keepDice={() => keepDice(dice.id)}></Dice>
               })}
            </div>
         }
         <div className="dice-button">
            {tenzies ? <button className="btn" onClick={playAgain}>
               <h2 className="text-karla">Play again!</h2>
            </button> :
               <button className="btn" onClick={rollDices}>
                  <h2 className="text-karla">Roll</h2>
               </button>
            }
         </div>
      </div>

   )
}

export default DiceContainer