import './HomePage.scss';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { useState } from 'react';

import { AgendaViewPage } from '../AgendaViewPage/AgendaViewPage';
import NotesPage from '../notes/NotesPage';

type HomePageProps = {
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  dateRangeValue: string;
};

export const HomePage: React.FC<HomePageProps> = ({
  date,
  startDate,
  endDate,
  dateRangeValue,
}) => {
  const [bottomNavValue, setBottomNavValue] = useState("note");

  const handleChange = (event: any, newValue: string) => {
    setBottomNavValue(newValue);
  };

  if (!date) {
    return null;
  }

  const PageClass = dateRangeValue === "Agenda" ? AgendaViewPage : NotesPage;

  return (
    <div className="home-page">
      <div className={`events ${bottomNavValue === "event" ? "visible" : ""}`}>
        <PageClass
          date={date}
          type="event"
          startDate={startDate}
          endDate={endDate}
          readOnly={true}
        />
      </div>
      <div className={`tasks ${bottomNavValue === "task" ? "visible" : ""}`}>
        <PageClass
          date={date}
          type="task"
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className={`notes ${bottomNavValue === "note" ? "visible" : ""}`}>
        <PageClass
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
