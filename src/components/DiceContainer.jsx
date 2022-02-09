import { useState } from 'react'
import Dice from './Dice'
import { nanoid } from 'nanoid'

const DiceContainer = () => {

   const [dices, setDices] = useState(generateDices())

   function generateDices() {
      const dices = []
      for (let index = 0; index < 10; index++) {
         let randomNumber = Math.ceil(Math.random() * 6)
         dices.push({ value: randomNumber, isHeld: false, id: nanoid() })
      }
      return dices
   }

   function rollDices() {
      setDices(generateDices())
   }

   function keepDice(id) {
      setDices(prev => prev.map(el => {
         return (el.id === id) ? { ...el, isHeld: !el.isHeld } : el
      }))
   }

   return (
      <div className="dice-card">
         <div className="dice-container">
            {dices.map((dice, index) => {
               return <Dice key={index} value={dice.value} isHeld={dice.isHeld} id={dice.id} keepDice={() => keepDice(dice.id)}></Dice>
            })}
         </div>
         <div className="dice-button">
            <button className="btn" onClick={rollDices}>
               <h2 className="text-karla">Roll</h2>
            </button>
         </div>
      </div>

   )
}

export default DiceContainer