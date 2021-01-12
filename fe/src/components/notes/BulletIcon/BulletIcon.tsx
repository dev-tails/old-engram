import React from 'react';

import { Note } from '../NotesApi';

type BulletIconProps = {
  note: Note;
  defaultType?: string;
};

const NoteIcon = () => {
  return (
    <svg height="8" width="8">
      <line
        x1="0"
        y1="4"
        x2="8"
        y2="4"
        style={{
          stroke: "#000000",
          strokeWidth: 1,
        }}
      />
    </svg>
  );
};

const TaskIcon = () => {
  return (
    <svg height="8" width="8">
      <circle
        cx="4"
        cy="4"
        r="1"
        style={{
          stroke: "#000000",
          strokeWidth: 1,
        }}
      />
    </svg>
  );
};

const TaskCompletedIcon = () => {
  const style = {
    stroke: "#ddd",
    strokeWidth: 1,
  };
  return (
    <svg height="8" width="8">
      <circle cx="4" cy="4" r="1" style={style} />
      <line x1="0" y1="0" x2="8" y2="8" style={style} />
      <line x1="8" y1="0" x2="0" y2="8" style={style} />
    </svg>
  );
};

const EventIcon = () => {
  const style = {
    stroke: "#000000",
    fillOpacity: 0,
  };
  return (
    <svg height="8" width="8">
      <circle cx="4" cy="4" r="3" style={style} />
    </svg>
  );
};

export const BulletIcon: React.FC<BulletIconProps> = (props) => {
  let icon = null;
  let type = props.note.type || props.defaultType;

  switch (type) {
    case "event":
      icon = <EventIcon />;
      break;
    case "task":
      icon = <TaskIcon />;
      break;
    case "task_completed":
      icon = <TaskCompletedIcon />;
      break;
    default:
      icon = <NoteIcon />;
      break;
  }
  return (
    <span className="bullet-icon" style={{ cursor: "pointer" }}>
      {icon}
    </span>
  );
};
