import Dice from './Dice'
const DiceContainer = () => {

   const dices = [
      "1", "1", "1", "1", "1", "1", "1", "1","1","1",
   ]

   return (
      <div className="dice-container">
         {dices.map((value, index) => {
            return <Dice key={index} value={value}></Dice>
         })}
      </div>
   )
}

export default DiceContainer