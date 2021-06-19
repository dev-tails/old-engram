import './DailyNotesPage.scss';

import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NoteList } from '../../components/NoteList/NoteList';
import { NoteTextInput } from '../../components/NoteTextInput/NoteTextInput';
import { fetchNotes } from '../../redux/actions/NotesActions';

type DailyNotesPageProps = {};

export const DailyNotesPage: React.FC<DailyNotesPageProps> = () => {
  const { date } = useSelector((state: any) => {
    return {
      date: state.date,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchNotes(dispatch, {
      since: moment(date).startOf("d").toDate(),
      before: moment(date).endOf("d").toDate(),
    });
  }, [date, dispatch]);

  return (
    <div className="daily-notes-page">
      <NoteList />
      <NoteTextInput />
    </div>
  );
};
