const Dice = ({ value, isHeld, id, keepDice }) => {

   const style ={
      backgroundColor: isHeld ? "#59E391" : "#FFFFFF"
   }

   return (
      <div className="dice" onClick={keepDice} style={style}>
         <h2>{value}</h2>
      </div>
   )
}

export default Dice