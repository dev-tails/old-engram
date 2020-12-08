import React from "react";

type NoteIconProps = {};

export const NoteIcon: React.FC<NoteIconProps> = (props) => {
  return (
    <span className="note-icon">
      <svg height="16" width="16">
        <line
          x1="4"
          y1="8"
          x2="12"
          y2="8"
          style={{
            stroke: "#000000",
            strokeWidth: 1,
          }}
        />
      </svg>
    </span>
  );
};
