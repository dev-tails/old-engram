import './BottomNavigation.scss';

import { BottomNavigation as MaterialBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import React from 'react';

import { BulletIcon } from '../notes/BulletIcon/BulletIcon';

type BottomNavigationProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="bottom-navigation">
      <MaterialBottomNavigation
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        showLabels
      >
        <BottomNavigationAction
          label="Notes"
          value="note"
          icon={
            <BulletIcon
              note={{ type: "note" }}
              color={value === "note" ? "#90caf9" : ""}
            />
          }
        />
        <BottomNavigationAction
          label="Tasks"
          value="task"
          icon={
            <BulletIcon
              note={{ type: "task" }}
              color={value === "task" ? "#90caf9" : ""}
            />
          }
        />
        <BottomNavigationAction
          label="Events"
          value="event"
          icon={
            <BulletIcon
              note={{ type: "event" }}
              color={value === "event" ? "#90caf9" : ""}
            />
          }
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon style={{fontSize: 18}} />}
        />
      </MaterialBottomNavigation>
    </div>
  );
};
