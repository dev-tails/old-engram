import React from "react";

type BulletIconProps = {};

export const BulletIcon: React.FC<BulletIconProps> = (props) => {
  return (
    <span className="bullet-icon">
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
    </span>
  );
};
