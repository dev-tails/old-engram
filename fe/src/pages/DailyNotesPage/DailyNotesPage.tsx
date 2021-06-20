import './DailyNotesPage.scss';

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BottomTypeNavigator } from '../../components/BottomTypeNavigator/BottomTypeNavigator';
import { DailyHeader } from '../../components/DailyHeader/DailyHeader';
import { NoteList } from '../../components/NoteList/NoteList';
import { NoteTextInput } from '../../components/NoteTextInput/NoteTextInput';
import { fetchNotesForDate } from '../../redux/actions/NotesActions';

type DailyNotesPageProps = {};

export const DailyNotesPage: React.FC<DailyNotesPageProps> = () => {
  const { date } = useSelector((state: any) => {
    return {
      date: state.date,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchNotesForDate(dispatch, date);
  }, [date, dispatch]);

  return (
    <div className="daily-notes-page">
      <DailyHeader />
      <NoteList />
      <div className="daily-footer">
        <NoteTextInput />
        <BottomTypeNavigator />
      </div>
    </div>
  );
};
