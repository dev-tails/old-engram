import React from "react";

type BulletIconProps = {
  note: { type?: string };
  defaultType?: string;
  color?: string;
};

type IconProps = {
  color: string;
};

const NoteIcon = (props: IconProps) => {
  return (
    <svg height="8" width="8">
      <line
        x1="0"
        y1="4"
        x2="8"
        y2="4"
        style={{
          stroke: props.color,
          strokeWidth: 1,
        }}
      />
    </svg>
  );
};

const TaskIcon = (props: IconProps) => {
  return (
    <svg height="8" width="8">
      <circle
        cx="4"
        cy="4"
        r="3"
        style={{
          stroke: props.color,
          strokeWidth: 1,
          fill: props.color,
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

const EventIcon = (props: IconProps) => {
  const style = {
    stroke: props.color,
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
  let strokeColor = props.color || "#FFFFFF";

  switch (type) {
    case "event":
      icon = <EventIcon color={strokeColor} />;
      break;
    case "task":
      icon = <TaskIcon color={strokeColor} />;
      break;
    case "task_completed":
      icon = <TaskCompletedIcon />;
      break;
    default:
      icon = <NoteIcon color={strokeColor} />;
      break;
  }
  return (
    <span className="bullet-icon" style={{ cursor: "pointer" }}>
      {icon}
    </span>
  );
};
