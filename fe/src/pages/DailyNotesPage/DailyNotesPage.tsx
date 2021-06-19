import './DailyNotesPage.scss';

import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NoteTextInput } from '../../components/NoteTextInput/NoteTextInput';
import { addNote, fetchNotes } from '../../redux/actions/NotesActions';

type DailyNotesPageProps = {};

export const DailyNotesPage: React.FC<DailyNotesPageProps> = ({}) => {
  const { date, note, notes } = useSelector((state: any) => {
    return {
      date: state.date,
      notes: state.notes,
      note: state.note,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchNotes(dispatch, {
      since: moment(date).startOf("d").toDate(),
      before: moment(date).endOf("d").toDate(),
    });
  }, [date]);

  function handleSubmitNote() {
    addNote(dispatch, note);
  }

  return (
    <div className="daily-notes-page">
      <div className="notes-list">
        {notes.map((note: any) => {
          return <div className="note">{note.body}</div>;
        })}
        <NoteTextInput />
      </div>
    </div>
  );
};
