import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useMediaQuery } from "react-responsive";

import "../../../../App.css";

import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./GameTable/MissionToken";
import VoteTrack from "./GameTable/VoteTrack";

function GameArea({
  handleTeamSubmit,
  handleVote,
  handleMission,

  username,
  myTeam,
  capacity, 

  teamSelectHappening,
  isMissionLeader,
  disableTeamSubmit,
  setDisableTeamSubmit,
  voteHappening,
  disableVoteBtns,
  setDisableVoteBtns,
  missionHappening,
  isGoingOnMission,
  disableMissionActions,
  setDisableMissionActions,

  seats,
  selectedPlayers,
  setSelectedPlayers,
  goodTeamStyle,
  badTeamStyle,
  
  missionNumber,
  curMissionVoteDisapproves,
  missionResultTrack,

  is4K,
  isReallyShort,
  isThinning,
  isPrettyThin,
  isReallyThin,
  isMostThin,
}) {
  const topRowLength = Math.ceil(seats.length / 2);
  const bottomRowLength = Math.floor(seats.length / 2);

  const missionTeamSize1 = capacity <= 7 ? 2 : 3;
  const missionTeamSize2 = capacity <= 7 ? 3 : 4;
  const missionTeamSize3 = capacity === 5 ? 2 : (capacity === 7) ? 3 : 4;
  const missionTeamSize4 = capacity <= 6 ? 3 : (capacity === 7) ? 4 : 5;
  const missionTeamSize5 = capacity === 5 ? 3 : (capacity <= 7) ? 4 : 5;
  const missionTeamSizes = [missionTeamSize1, missionTeamSize2, missionTeamSize3, missionTeamSize4, missionTeamSize5];

  // alternates:
  const isThinning2 = useMediaQuery({ maxWidth: 560 });
  const isPrettyThin2 = useMediaQuery({ maxWidth: 460 });
  const isReallyThin2 = useMediaQuery({ maxWidth: 390 });
  const isReallyThin3 = useMediaQuery({ maxWidth: 365 });

  const [adjustTopPlayers, setAdjustTopPlayers] = useState(false);
  const [adjustBottomPlayers, setAdjustBottomPlayers] = useState(false);

  const [lowCramTopRow, setLowCramTopRow] = useState(false);
  const [lowCramBottomRow, setLowCramBottomRow] = useState(false);
  const [midCramTopRow, setMidCramTopRow] = useState(false);
  const [midCramBottomRow, setMidCramBottomRow] = useState(false);
  const [maxCramTopRow, setMaxCramTopRow] = useState(false);
  const [maxCramBottomRow, setMaxCramBottomRow] = useState(false);

  useEffect(() => {
    const maxCram = isThinning && seats.length >= 9;
    setMaxCramTopRow(maxCram);
    const midCram = isPrettyThin && seats.length >= 7;
    setMidCramTopRow(midCram);
    const lowCram = isReallyThin && seats.length >= 5;
    setLowCramTopRow(lowCram);

    if (maxCram || midCram || lowCram)
    {
      setAdjustTopPlayers(true);
    } else {
      setAdjustTopPlayers(false);
    }
  }, [ 
      seats,
      isThinning, isThinning2, 
      isPrettyThin, isPrettyThin2, 
      isReallyThin, isReallyThin2, isReallyThin3
    ]);

  useEffect(() => {
    const maxCram = isThinning && seats.length >= 10;
    setMaxCramBottomRow(maxCram);
    const midCram = isPrettyThin && seats.length >= 8;
    setMidCramBottomRow(midCram);
    const lowCram = isReallyThin && seats.length >= 6;
    setLowCramBottomRow(lowCram);

    if (maxCram || midCram || lowCram) 
    {
      setAdjustBottomPlayers(true);
    } else {
      setAdjustBottomPlayers(false);
    }
  }, [
      seats,
      isThinning, isThinning2, 
      isPrettyThin, isPrettyThin2, 
      isReallyThin, isReallyThin2, isReallyThin3
  ]);

  const handleMissionSelection = (seatUsername) => {
    if (!isMissionLeader) return;

    // only leaders can handle this
    var updatedSelection = [...selectedPlayers];
    
    if (updatedSelection.includes(seatUsername)) {
      var index = updatedSelection.indexOf(seatUsername);
      updatedSelection.splice(index, 1);
    } else {
      if (updatedSelection.length < missionTeamSizes[missionNumber - 1]) {
        updatedSelection.push(seatUsername);
      }
    }
    
    // Update state and check if submit button should be disabled
    setSelectedPlayers(updatedSelection);
  };

  const renderPlayerBox = (
    seatUsername, 
    seatIsLeader, 
    seatOnMission, 
    seatTeam, 
  ) => {
    return (
      <PlayerBox
        username={seatUsername}
        isLeader={seatIsLeader}
        onMission={seatOnMission}
        teamStyle={
          (username === seatUsername) && (myTeam === "goodTeam") ? goodTeamStyle
            : seatTeam === "badTeam" ? badTeamStyle 
              : seatTeam === "goodTeam" ? goodTeamStyle 
              : {}
        }
        ownName={username === seatUsername}
        onClick={() => {
          handleMissionSelection(seatUsername);
        }}
        is4K={is4K}
        isThinning={isThinning} 
      />
    )
  }

  return (
    <div className={`fullTable ${capacity >= 9 ? "five" : capacity >= 7 ? "four" : ""}`}>
      <div className={`holdPlayers ${lowCramTopRow ? "lowTopCram" : ""} ${midCramTopRow ? "midTopCram" : ""} ${maxCramTopRow ? "maxTopCram" : ""}`}>
        {
          // this map displays up to 4 players, 3 if there are <= 6 players
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatIsLeader = seat[1];
            const seatOnMission = seat[2];
            const seatTeam = seat[3];
            
            if (i < topRowLength) {
              const up = (i === 1) || (i === 3);
              const wayUp = (i === 2) && (seats.length >= 9);

              return (
                <div 
                  key={seatUsername}
                  className={`playerBox ${adjustTopPlayers ? "adjust" : ""} \
                    ${up ? "up" : ""} ${wayUp ? "wayUp" : ""}`
                  }
                >
                  {renderPlayerBox(
                    seatUsername, 
                    seatIsLeader, 
                    seatOnMission, 
                    seatTeam, 
                  )}
                </div>
              )
            } else {
              return <Fragment key={seatUsername}></Fragment>
            }
          })
        }
      </div>

      <div className="table">
        
        <div className="missionTokenGrid">
          <MissionToken 
            isPassed={missionResultTrack[0] === "pass"} 
            isFailed={missionResultTrack[0] === "fail"}
            current={missionNumber === 1} 
            missionTeamSize={missionTeamSize1}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}
          />
          <MissionToken
            isPassed={missionResultTrack[1] === "pass"} 
            isFailed={missionResultTrack[1] === "fail"}
            current={missionNumber === 2} 
            missionTeamSize={missionTeamSize2}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}
          />
          <MissionToken
            isPassed={missionResultTrack[2] === "pass"} 
            isFailed={missionResultTrack[2] === "fail"}
            current={missionNumber === 3} 
            missionTeamSize={missionTeamSize3}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}
          />
          <MissionToken
            isPassed={missionResultTrack[3] === "pass"} 
            isFailed={missionResultTrack[3] === "fail"}
            current={missionNumber === 4} 
            missionTeamSize={missionTeamSize4}
            twoFails={capacity >= 7}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}
          />
          <MissionToken
            isPassed={missionResultTrack[4] === "pass"} 
            isFailed={missionResultTrack[4] === "fail"}
            current={missionNumber === 5} 
            missionTeamSize={missionTeamSize5}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}            
          />
        </div>
        
        <div className="voteTrackGrid">
          <VoteTrack isFilled={curMissionVoteDisapproves > 0} number={1}/>
          <VoteTrack isFilled={curMissionVoteDisapproves > 1} number={2}/>
          <VoteTrack isFilled={curMissionVoteDisapproves > 2} number={3}/>
          <VoteTrack isFilled={curMissionVoteDisapproves > 3} number={4}/>
          <VoteTrack isFilled={curMissionVoteDisapproves > 4} number={5}/>
        </div>

        <div className="tableBtns">
          {
            isMissionLeader ? (
              <Button
                id="submitBtn" 
                color="secondary"
                disabled={selectedPlayers.length < missionTeamSizes[missionNumber - 1] || disableTeamSubmit} 
                onClick={() => handleTeamSubmit()}
                sx={{ fontWeight: 600 }}
              >
                Submit Team
              </Button>
            ) : voteHappening ? (
              <div>
                <Button 
                  color="green" 
                  id="approveBtn" 
                  disabled={disableVoteBtns} 
                  onClick={() => handleVote(true)}
                  sx={{ fontWeight: 600 }}
                >
                  Approve
                </Button>
                <Button 
                  color="red" 
                  id="disapproveBtn" 
                  disabled={disableVoteBtns} 
                  onClick={() => handleVote(false)}
                  sx={{ fontWeight: 600 }}
                >
                  Disapprove
                </Button>
              </div>
            ) : isGoingOnMission ? (
              <div>
                <Button 
                  color="green" 
                  id="passBtn" 
                  disabled={disableMissionActions} 
                  onClick={() => handleMission(true)}
                  sx={{ fontWeight: 600 }}
                >
                  Pass
                </Button>
                <Button 
                  color="red" 
                  id="failBtn" 
                  disabled={disableMissionActions} 
                  onClick={() => handleMission(false)}
                  sx={{ fontWeight: 600 }}
                >
                  Fail
                </Button>
              </div>
            ) : (
              <div className="tableText">
                Vote Track
              </div>
            )
          }
        </div>
      </div>

      <div 
        style={{direction: 'rtl'}}
        className={`holdPlayers ${lowCramBottomRow ? "lowBottomCram" : ""} ${midCramBottomRow ? "midBottomCram" : ""} ${maxCramBottomRow ? "maxBottomCram" : ""}`}
      >
        {
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatIsLeader = seat[1];
            const seatOnMission = seat[2];
            const seatTeam = seat[3];

            if (i >= topRowLength) {
              var down = false;

              if (bottomRowLength >= 3) {
                down = ((i === (topRowLength + 1)) || (i === (topRowLength + 3)));
              }

              const wayDown = (i === 7) && (seats.length === 10);

              return (
                <div 
                  key={seatUsername}
                  className={`playerBox ${adjustBottomPlayers ? "adjust" : ""} \
                    ${down ? "down" : ""} ${wayDown ? "wayDown" : ""}`
                  }
                >
                  {renderPlayerBox(
                    seatUsername, 
                    seatIsLeader, 
                    seatOnMission, 
                    seatTeam, 
                  )}
                </div>
              )
            } else {
              return <Fragment key={seatUsername}></Fragment>
            }
          })
        }
      </div>
    </div>
  )
}

export default GameArea;