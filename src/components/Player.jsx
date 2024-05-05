import { useState, useRef } from "react";
export default function Player() {
    const playerName=useRef()

    const [player,setPlayer]=useState(null)

    function handleClick(){
        
        setPlayer(playerName.current.value)
        playerName.current.value=''  // directly updating the dom, which is something agaisnt the rules
        
    }
   
    return (
      <section id="player">
        <h2>Welcome {player?? "Unknown entity"}</h2>
        <p>
          <input type="text" ref={playerName}/>
          <button onClick={handleClick}>Set Name</button>
          
        </p>
      </section>
    );
  }
  