import { React } from "react";
import { useMediaQuery } from 'react-responsive';

import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox.jsx";
import GameArea from "./Components/GameArea/GameArea.jsx";
import InfoBox from "./Components/InfoBox/InfoBox.jsx";
import GameMenuBar from "./Components/GameMenuBar/GameMenuBar.jsx";
import RebellionLogo from "../../assets/RebellionLogo.jsx";
import ShowChatButton from "../GameScreen/Components/ShowChatButton.jsx";
import YouDisconnectedModal from "../StartScreen/Modals/YouDisconnectedModal.jsx";
import EndModal from "./Modals/EndModal.jsx";
import InstructionsModal from "../StartScreen/Modals/InstructionsModal.jsx";

function GameScreen({ 
  startGame,
  endGame,
  handleTeamSubmit,
  handleVote,
  handleMissionIn,
  sendMessage,

  username,
  isAdmin,
  roomCode,
  roomAdminName,

  capacity,
  onChangedCapacity,
  selectionSecs,
  onChangedSelectionSecs,
  privateRoom,
  onChangedPrivateRoom,
  numGames,
  missionTeamSizes,

  gameStarted,
  teamSelectHappening,
  isMissionLeader,
  leaderUsername,
  disableTeamSubmit,

  voteHappening,
  disableVoteBtns,

  missionHappening,
  isGoingOnMission,
  disableMissionPass,
  disableMissionFail,

  msg,
  setMsg,
  msgList,
  newMsg,
  setNewMsg,
  showHiddenChat,
  setShowHiddenChat,

  seats,
  selectedPlayers,
  setSelectedPlayers,
  goodTeamStyle,
  badTeamStyle,

  missionNumber,
  curMissionVoteDisapproves,
  missionResultTrack,
  missionHistory,
  
  mins,
  secs,

  youDisconnectedModalOpen,
  youDisconnectedMsg,

  endModalOpen,
  handleEndModalClose,
  revealedPlayers,
  endMsg,

  instructionsOpen,
  handleInstructionsOpen,
  handleInstructionsClose
}) {
  const isLandscape = useMediaQuery({ orientation: 'landscape' });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  const is4Kwidth = useMediaQuery({ minWidth: 1880 });
  const is4Kheight = useMediaQuery({ minHeight: 1000 });
  const is4K = is4Kheight && is4Kwidth;

  const isGettingThin = useMediaQuery({ maxWidth: 1050 });
  const isThin = useMediaQuery({ maxWidth: 950 });
  const isThinning = useMediaQuery({ maxWidth: 650 }); // cap >= 9
  const isPrettyThin = useMediaQuery({ maxWidth: 525 }); // cap >= 7
  const isReallyThin = useMediaQuery({ maxWidth: 425 }); // cap <= 6
  const isMostThin = useMediaQuery({ maxWidth: 325 });

  const isTall = useMediaQuery({ minHeight: 700 }); // i)
  const isShort = useMediaQuery({ maxHeight: 700 }); // ii)
  const isReallyShort = useMediaQuery({ maxHeight: 450 });

  // Passing props:
  const gameAreaProps = {
    handleTeamSubmit: handleTeamSubmit,
    handleVote: handleVote,
    handleMissionIn: handleMissionIn,

    username: username,
    capacity: capacity, 
    missionTeamSizes: missionTeamSizes,

    teamSelectHappening: teamSelectHappening,
    isMissionLeader: isMissionLeader,
    disableTeamSubmit: disableTeamSubmit,
    voteHappening: voteHappening,
    disableVoteBtns: disableVoteBtns,
    missionHappening: missionHappening,
    isGoingOnMission: isGoingOnMission,
    disableMissionPass: disableMissionPass,
    disableMissionFail: disableMissionFail,

    seats: seats,
    selectedPlayers: selectedPlayers,
    setSelectedPlayers: setSelectedPlayers,
    goodTeamStyle: goodTeamStyle,
    badTeamStyle: badTeamStyle,
    
    missionNumber: missionNumber,
    curMissionVoteDisapproves: curMissionVoteDisapproves,
    missionResultTrack: missionResultTrack,
    missionHistory: missionHistory,

    is4K: is4K,
    isReallyShort: isReallyShort,
    isThinning: isThinning,
    isPrettyThin: isPrettyThin,
    isReallyThin: isReallyThin,
    isMostThin: isMostThin,
  };

  const infoBoxProps = {
    roomCode: roomCode,
    capacity: capacity, 
    roomAdminName: roomAdminName,
    numGames: numGames,
    leaderUsername: leaderUsername,
    selectedPlayers: selectedPlayers,
    gameStarted: gameStarted,
    mins: mins,
    secs: secs,
    voteHappening: voteHappening,
    missionHappening: missionHappening,
    seats: seats, 
  };
  
  const gameMenuBarProps = {
    startGame: startGame,
    endGame: endGame,
    isAdmin: isAdmin,
    curNumPlayers: seats.length,
    capacity: capacity,
    onChangedCapacity: onChangedCapacity,
    selectionSecs: selectionSecs,
    onChangedSelectionSecs: onChangedSelectionSecs,
    privateRoom: privateRoom,
    onChangedPrivateRoom: onChangedPrivateRoom,
    gameStarted: gameStarted,
    handleInstructionsOpen: handleInstructionsOpen,
  };

  const chatBoxProps = {
    username: username,
    msg: msg,
    setMsg: setMsg,
    msgList: msgList,
    showHiddenChat: showHiddenChat,
    setShowHiddenChat: setShowHiddenChat,
    haveCloseOnWindow: (isLandscape && isShort) || isGettingThin || (isThin && isTall) || isPortrait,
    sendMessage: sendMessage,
  };
  
  const showChatBtnProps = {
    showHiddenChat: showHiddenChat, 
    setShowHiddenChat: setShowHiddenChat,
    newMsg: newMsg, 
    setNewMsg: setNewMsg,
  };

  return (
    <>
      <YouDisconnectedModal
        open={youDisconnectedModalOpen}
        youDisconnectedMsg={youDisconnectedMsg}
      />
      <EndModal 
        open={endModalOpen}
        handleEndModalClose={handleEndModalClose}
        revealedPlayers={revealedPlayers}
        endMsg={endMsg}
      />
      <InstructionsModal 
        open={instructionsOpen} 
        handleInstructionsClose={handleInstructionsClose}
        goodTeamStyle={goodTeamStyle}
        badTeamStyle={badTeamStyle}
      />
      {
        (isThin && isTall) || isPortrait ? (
          <div className="gameScreen">
            {
              showHiddenChat ? (
                <ChatBox {...chatBoxProps} />
              ) : <></>
            }
            <div className="titleLogo slowPulse">
              <RebellionLogo />
            </div>
            <GameMenuBar {...gameMenuBarProps} />

            <InfoBox {...infoBoxProps} />
            <GameArea {...gameAreaProps} />
            <ShowChatButton {...showChatBtnProps} />
          </div>
        ) : (isLandscape && isShort) || isGettingThin ? (
          <div className="gameScreen">
            {
              showHiddenChat ? (
                <ChatBox {...chatBoxProps} />
              ) : <></>
            }

            <div className="colLeft">
              <div className="titleLogo slowPulse">
                <RebellionLogo />
              </div>
              <GameMenuBar {...gameMenuBarProps} />
              <InfoBox {...infoBoxProps} />
            </div>
            <div className="colRight">
              <GameArea {...gameAreaProps} />
              <ShowChatButton {...showChatBtnProps} />
            </div>
          </div>
        ) : (
          <div className="gameScreen">
            <div className="colLeft">
              <div className="titleLogo slowPulse">
                <RebellionLogo />
              </div>
              <GameMenuBar {...gameMenuBarProps} />
              <GameArea {...gameAreaProps} />
            </div>
            <div className="colRight">
              <ChatBox {...chatBoxProps} />
              <InfoBox {...infoBoxProps} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default GameScreen;