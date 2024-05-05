import Player from "./components/Player";
import { useState } from "react";
import TimerChallenge from "./components/TimerChallenge";

function App() {
  
  return (

    <>
      <Player  />
      <div id="challenges">
        <TimerChallenge title={"Easy"} targetTime={1}/>
        <TimerChallenge title={"Medium"} targetTime={2}/>
        <TimerChallenge title={"Expert"} targetTime={3}/>
        <TimerChallenge title={"Pro"} targetTime={4}/>



      </div>
    
    </>
  );
}

export default App;