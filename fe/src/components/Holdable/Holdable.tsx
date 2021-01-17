import React from "react";

type Event =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>;

type HoldableProps = {
  onClick?: () => void;
  onLongPress: (event: Event) => void;
};

export const Holdable: React.FC<HoldableProps> = ({
  onClick,
  onLongPress,
  children,
}) => {
  let timerId: NodeJS.Timeout | null = null;

  const handleLongPressTriggered = (event: Event) => {
    timerId = null;
    onLongPress(event);
  };

  const handleButtonPress = (event: Event) => {
    event.persist();
    timerId = setTimeout(handleLongPressTriggered.bind(this, event), 300);
  };

  const handleButtonRelease = () => {
    if (timerId) {
      clearTimeout(timerId);
      if (onClick) {
        onClick();
      }
      timerId = null;
    }
  };

  return (
    <div
      className="holdable"
      onTouchStart={handleButtonPress}
      onTouchEnd={handleButtonRelease}
      onMouseDown={handleButtonPress}
      onMouseUp={handleButtonRelease}
      onMouseLeave={handleButtonRelease}
    >
      {children}
    </div>
  );
};
