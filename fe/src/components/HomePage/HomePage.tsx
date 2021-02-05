import "./HomePage.scss";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React, { useState } from "react";

import { AgendaViewPage } from "../AgendaViewPage/AgendaViewPage";
import { BulletIcon } from "../notes/BulletIcon/BulletIcon";
import NotesPage from "../notes/NotesPage";

type HomePageProps = {
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  dateRangeValue: string;
  search?: string;
  activeParentId?: string | null | undefined;
};

export const HomePage: React.FC<HomePageProps> = ({
  date,
  startDate,
  endDate,
  dateRangeValue,
  search,
  activeParentId,
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
      <div className={`notes ${bottomNavValue === "note" ? "visible" : ""}`}>
        <NotesPage
          date={date}
          type="note"
          startDate={startDate}
          endDate={endDate}
          search={search}
          activeParentId={activeParentId}
        />
      </div>
      <div className={`tasks ${bottomNavValue === "task" ? "visible" : ""}`}>
        <NotesPage
          date={date}
          type="task"
          startDate={startDate}
          endDate={endDate}
          search={search}
          activeParentId={activeParentId}
        />
      </div>
      <div className={`events ${bottomNavValue === "event" ? "visible" : ""}`}>
        <AgendaViewPage date={date} type="event" />
      </div>
      <div className="bottom-navigation">
        <BottomNavigation
          value={bottomNavValue}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction
            label="Notes"
            value="note"
            icon={
              <BulletIcon
                note={{ type: "note" }}
                color={bottomNavValue === "note" ? "#90caf9" : ""}
              />
            }
          />
          <BottomNavigationAction
            label="Tasks"
            value="task"
            icon={
              <BulletIcon
                note={{ type: "task" }}
                color={bottomNavValue === "task" ? "#90caf9" : ""}
              />
            }
          />
          <BottomNavigationAction
            label="Events"
            value="event"
            icon={
              <BulletIcon
                note={{ type: "event" }}
                color={bottomNavValue === "event" ? "#90caf9" : ""}
              />
            }
          />
        </BottomNavigation>
      </div>
    </div>
  );
};
