import './HomePage.scss';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { useState } from 'react';

import { AgendaViewPage } from '../AgendaViewPage/AgendaViewPage';
import NotesPage from '../notes/NotesPage';

type HomePageProps = { date: Date };

export const HomePage: React.FC<HomePageProps> = ({ date }) => {
  const [bottomNavValue, setBottomNavValue] = useState("note");

  const handleChange = (event: any, newValue: string) => {
    setBottomNavValue(newValue);
  };

  return (
    <div className="home-page">
      <div className={`events ${bottomNavValue === "event" ? "visible" : ""}`}>
        <AgendaViewPage date={date} />
      </div>
      <div className={`tasks ${bottomNavValue === "task" ? "visible" : ""}`}>
        <NotesPage date={date} type="task" />
      </div>
      <div className={`notes ${bottomNavValue === "note" ? "visible" : ""}`}>
        <NotesPage date={date} type="note" />
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
