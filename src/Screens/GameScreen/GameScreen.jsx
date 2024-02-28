import { React } from "react";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";

function GameScreen({ socket, username, seats, numPlayers, gameStarted, gameMasterSpeech }) {
  // const [instructions, setInstructions] = useState("");
  
  return (
    <div className="gameScreen">
      <div className="left">
        <GameTable 
          seats={seats}
          numPlayers={numPlayers} 
          gameStarted={gameStarted}
          username={username} // for testing only
        />
        <InfoTable numPlayers={numPlayers} seats={seats} timer={false}/>
      </div>
      <div className="right">
        <ChatBox socket={socket} username={username} />
        <GameCommands gameMasterSpeech={gameMasterSpeech}/>
      </div>
    </div>
  )
}

export default GameScreen;