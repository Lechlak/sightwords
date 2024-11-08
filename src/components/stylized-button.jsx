"use client";
import React from "react";

function StylizedButton({ children, onClick }) {
  return (
    <button
      className="bg-[#F5663B] text-[#EAEADF] font-montserrat font-semibold tracking-tighter rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-[#DD5C35]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function StylizedButtonStory() {
  return (
    <div className="p-4">
      <StylizedButton onClick={() => console.log("Button clicked")}>
        Click Me
      </StylizedButton>
    </div>
  );
}

export default StylizedButton;