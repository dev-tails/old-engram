import './HomePage.scss';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { AgendaViewPage } from '../AgendaViewPage/AgendaViewPage';
import { DateHeader } from '../DateHeader/DateHeader';
import { BulletIcon } from '../notes/BulletIcon/BulletIcon';
import { getNotes, Note } from '../notes/NotesApi';
import NotesPage from '../notes/NotesPage';

type HomePageProps = {
  date: Date;
  startDate: Date;
  endDate: Date;
  dateRangeValue: string;
  search?: string;
  activeParentId?: string | null | undefined;
  onDateChange: (date: Date) => void;
  onDateRangeChange: (dateRange: string) => void;
};

export const HomePage: React.FC<HomePageProps> = ({
  date,
  startDate,
  endDate,
  dateRangeValue,
  search,
  activeParentId,
  onDateChange,
  onDateRangeChange,
}) => {
  const [bottomNavValue, setBottomNavValue] = useState("note");
  const [agendaNotes, setAgendaNotes] = useState<Note[]>([]);
  const [versionNumber, setVersionNumber] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      const dateAsMoment = moment(date);

      const newItems = await getNotes({
        startsAfter: dateAsMoment.startOf("day").toDate(),
        startsBefore: dateAsMoment.endOf("day").toDate(),
        type: "event",
      });

      setAgendaNotes(newItems);
    };
    fetchNotes();
  }, [date, versionNumber]);

  const handleChange = (event: any, newValue: string) => {
    setBottomNavValue(newValue);
  };

  const handleAgendaChanged = () => {
    setVersionNumber(versionNumber + 1);
  };

  if (!date) {
    return null;
  }

  return (
    <div className="home-page">
      <DateHeader
        date={date}
        dateRangeValue={dateRangeValue}
        onDateRangeChange={onDateRangeChange}
        onDateChange={onDateChange}
      />
      <div className={`notes ${bottomNavValue === "note" ? "visible" : ""}`}>
        <NotesPage
          date={date}
          type="note"
          startDate={startDate}
          endDate={endDate}
          search={search}
          activeParentId={activeParentId}
          onChange={handleAgendaChanged}
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
          onChange={handleAgendaChanged}
        />
      </div>
      <div className={`events ${bottomNavValue === "event" ? "visible" : ""}`}>
        <AgendaViewPage
          notes={agendaNotes}
          date={date}
          onSave={handleAgendaChanged}
          onDelete={handleAgendaChanged}
        />
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
