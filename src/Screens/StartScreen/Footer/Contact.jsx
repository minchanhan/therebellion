import React from "react";
import { Modal } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

function Contact({open, handleContactClose}) {
  const contactLinks = {
    display: "flex", 
    alignItems: "center", 
    gap: "0.5rem",
    color: "black",
  };

  return (
    <Modal
      open={open}
      onClose={handleContactClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalBox">
        <div className="modalHeader">
          Contact Info
          <CloseIcon 
            className="closeModal" 
            onClick={handleContactClose} 
          />
        </div>

        <div className="modalContent" style={{gap: "0.25rem"}}>
          <p>Please feel free to contact me!</p>

          <div style={contactLinks}>
            <LinkedInIcon />
            <a style={{color: "white"}} href="https://www.linkedin.com/in/minchan-han/">linkedin.com/in/minchan-han/</a>
          </div>

          <div style={contactLinks}>
            <EmailIcon />
            <a style={{color: "white"}} href="mailto:mchanprojects@gmail.com">mchanprojects@gmail.com</a>
          </div>

          <p>Feel free to check out my GitHub repos as well</p>
          <div style={contactLinks}>
            <GitHubIcon />
            <a style={{color: "white"}} href="https://github.com/minchanhan/therebellion">github.com/minchanhan/therebellion</a>
          </div>
          <div style={contactLinks}>
            <GitHubIcon />
            <a style={{color: "white"}} href="https://github.com/minchanhan/therebellionserver">github.com/minchanhan/therebellionserver</a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Contact;