import './HomePage.scss';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { useState } from 'react';

import NotesPage from '../notes/NotesPage';

type HomePageProps = {
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
};

export const HomePage: React.FC<HomePageProps> = ({
  date,
  startDate,
  endDate,
}) => {
  const [bottomNavValue, setBottomNavValue] = useState("note");

  const handleChange = (event: any, newValue: string) => {
    setBottomNavValue(newValue);
  };

  if (!date) {
    return null;
  }

  return (
    <div className="home-page">
      <div className={`events ${bottomNavValue === "event" ? "visible" : ""}`}>
        <NotesPage
          date={date}
          type="event"
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className={`tasks ${bottomNavValue === "task" ? "visible" : ""}`}>
        <NotesPage
          date={date}
          type="task"
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className={`notes ${bottomNavValue === "note" ? "visible" : ""}`}>
        <NotesPage
          date={date}
          type="note"
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="bottom-navigation">
        <BottomNavigation
          value={bottomNavValue}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction label="Events" value="event" />
          <BottomNavigationAction label="Tasks" value="task" />
          <BottomNavigationAction label="Notes" value="note" />
        </BottomNavigation>
      </div>
    </div>
  );
};
