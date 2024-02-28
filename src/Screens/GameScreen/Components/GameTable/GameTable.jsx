import React from "react";
import "../../../../App.css";

import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./MissionToken";
import VoteTrack from "./VoteTrack";

function GameTable({ seats, numPlayers, gameStarted, username }) {
  const topRowLength = numPlayers >= 7 ? 4 : 3;
  const bottomRowLength = numPlayers >= 8 ? 4 : (numPlayers >= 6) ? 3 : 2;
  const badTeamStyle = {
    filter: 'invert(21%) sepia(76%) saturate(5785%) hue-rotate(338deg) brightness(57%) contrast(119%)'
  };

  // for dynamic player rows
  var playerRow = (rowLength) => ({
    display: 'grid',
    height: '100%',
    gridTemplateColumns: `repeat(${rowLength}, 1fr)`,
    gridTemplateRows: '1fr',
  });

  var tableRow = (ninth, tenth) => ({
    display: 'grid',
    height: '100%',
    gridTemplateColumns: tenth ? '1fr 5fr 1fr' : ninth ? '1fr 6fr' : '1fr',
    gridTemplateRows: '1fr',
  });

  return (
    <div className="fullTable">
      <div style={playerRow(topRowLength)} className="holdPlayers">
        {
          // this map displays up to 4 players, 3 if there are <= 6 players
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatTeam = seat[1];
            
            if (i < topRowLength) {
              if (username === seatUsername) {
                // color the username
              }
              if (gameStarted) {
                return <PlayerBox 
                          key={i}
                          teamStyle={seatTeam === "badTeam" ? badTeamStyle : {}} 
                          username={seatUsername}
                        />
              } else {
                return <PlayerBox key={i} username={seatUsername || "waiting.."}/>
              }
            } else {
              return <></>
            }
          })
        }
      </div>

      <div style={tableRow(seats.length >= 9, seats.length >= 10)}>
        {
          seats.length >= 9 && !gameStarted ?
          <div className="holdPlayers">
            <PlayerBox username={seats[8][0] || "waiting.."} />
          </div>
          : seats.length >= 9 && gameStarted ?
            <div className="holdPlayers">
              <PlayerBox 
                username={seats[8][0] || "waiting.."} 
                teamStyle={seats[8][1] === "badTeam" ? badTeamStyle : {}} 
              />
            </div>
            : null
        }

        <div className="table">
          <div className="missionTokenGrid">
            <MissionToken current/>
            <MissionToken />
            <MissionToken />
            <MissionToken />
            <MissionToken />
          </div>
          
          <div className="voteTrackGrid">
            <VoteTrack isFilled/>
            <VoteTrack />
            <VoteTrack />
            <VoteTrack />
            <VoteTrack />
          </div>
        </div>

        { 
          seats.length >= 10 && !gameStarted ?
          <div className="holdPlayers">
            <PlayerBox username={seats[9][0] || "waiting.."} />
          </div>
          : seats.length >= 10 && gameStarted ?
            <div className="holdPlayers">
              <PlayerBox 
                username={seats[9][0] || "waiting.."} 
                teamStyle={seats[9][1] === "badTeam" ? badTeamStyle : {}} 
              />
            </div>
            : null
        }
      </div>

      <div style={playerRow(bottomRowLength)} className="holdPlayers">
        {
          // this map displays up to 4 players, 2 if there are 5 players, 3 if <= 7, 4 if >= 8
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatTeam = seat[1];

            if (i >= topRowLength && i < bottomRowLength + topRowLength) {
              if (username === seatUsername) {
                // color the username
              }
              if (gameStarted) {
                return <PlayerBox 
                          key={i}
                          teamStyle={seatTeam === "badTeam" ? badTeamStyle : {}} 
                          username={seatUsername}
                        />
              } else {
                return <PlayerBox key={i} username={seatUsername || "waiting.."}/>
              }
            } else {
              return <></>
            }
          })
        }
      </div>
    </div>
  )
}

export default GameTable;