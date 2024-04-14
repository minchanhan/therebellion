import React from "react";
import { Modal } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';


function GameSettingsModal({
  isAdmin,
  curNumPlayers,
  capacity,
  onChangedCapacity,
  selectionTimeSecs,
  onChangedSelectionTimeSecs,
  privateRoom,
  onChangedPrivateRoom,
  openSettings,
  setOpenSettings
}) {
  const capacityMenuItems = [5,6,7,8,9,10];
  const selectionTimeItems = [3,5,7,10,15,30];

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  return (
    <Modal
      open={openSettings}
      onClose={handleSettingsClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalBox" style={{width: "80%", maxWidth: "25rem"}}>
        <div className="modalHeader" style={{fontSize: "x-large"}}>
          Game Settings
        </div>
        
        <div className="settingsModalContent">
          <div className="settingsSelectContainer">
            <p>Number of Players</p>
            <select
              className="selectBox"
              value={capacity}
              onChange={(event) => {
                onChangedCapacity(parseInt(event.target.value));
              }}
              disabled={!isAdmin}
              style={{
                cursor: !isAdmin ? "not-allowed" : ""
              }}
            >
              {
                capacityMenuItems.map(function(val, i) {
                  return <option key={i} value={val} disabled={val < curNumPlayers}>{val} players</option>
                })
              }
            </select>
          </div>

          <div className="settingsSelectContainer">
            <p>Team Select Time</p>
            <select
              className="selectBox"
              value={selectionTimeSecs/60}
              onChange={(event) => {
                onChangedSelectionTimeSecs(parseInt(event.target.value)*60);
              }}
              disabled={!isAdmin}
              style={{
                cursor: !isAdmin ? "not-allowed" : ""
              }}
            >
              {
                selectionTimeItems.map(function(val, i) {
                  return <option key={i} value={val}>{val} mins</option>
                })
              }
            </select>
          </div>
      
          <div 
            className="privRoomSettingsContainer" 
            style={{backgroundColor: !isAdmin ? "var(--disabled-priv-bg)" : ""}}
          >
            <label 
              className="privRoom" 
              style={{
                color: !isAdmin ? "var(--disabled-priv-text)" : "",
                cursor: !isAdmin ? "not-allowed" : ""
              }}
            >
              Private Room
              <input
                type="checkbox" 
                checked={privateRoom} 
                onChange={(event) => {
                  onChangedPrivateRoom();
                }}
                disabled={!isAdmin}
              />
              <span 
                className="checkbox" 
                style={{
                  backgroundColor: !isAdmin ? "var(--disabled-priv-text)" : "",
                  cursor: !isAdmin ? "not-allowed" : ""
                }}
              >
                {
                  privateRoom ? <CheckIcon fontSize="x-small" /> : <></>
                }
              </span>
            </label>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default GameSettingsModal;

