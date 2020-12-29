import './HomePage.scss';

import React from 'react';

import { AgendaViewPage } from '../AgendaViewPage/AgendaViewPage';
import NotesPage from '../notes/NotesPage';

type HomePageProps = { date: Date };

export const HomePage: React.FC<HomePageProps> = ({ date }) => {
  return (
    <div className="home-page">
      <AgendaViewPage date={date} />
      <NotesPage date={date} />
    </div>
  );
};
