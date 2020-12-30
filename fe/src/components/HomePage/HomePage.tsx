import './HomePage.scss';

import React from 'react';

import { AgendaViewPage } from '../AgendaViewPage/AgendaViewPage';
import NotesPage from '../notes/NotesPage';

type HomePageProps = { date: Date };

export const HomePage: React.FC<HomePageProps> = ({ date }) => {
  return (
    <div className="home-page">
      <div className="events">
        <AgendaViewPage date={date} />
      </div>
      <div className="tasks">
        <NotesPage date={date} type="task" />
      </div>
      <div className="notes">
        <NotesPage date={date} type="note" />
      </div>
    </div>
  );
};
