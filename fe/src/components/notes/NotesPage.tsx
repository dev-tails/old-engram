import './NotesPage.scss';

import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { objectIdFromDate } from '../../utils/ObjectId';
import { CollapsibleNotesList } from './CollapsibleNotesList/CollapsibleNotesList';
import { getNotes, GetNotesParams, Note } from './NotesApi';

export type NotesPageProps = {
  date?: Date;
};

export default function NotesPage({ date }: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  console.log(date);

  useEffect(() => {
    const getNotesParams: GetNotesParams = {};
    if (date) {
      getNotesParams.since_id = objectIdFromDate(date);
      getNotesParams.max_id = objectIdFromDate(
        moment(date).endOf("day").toDate()
      );
    }

    getNotes(getNotesParams).then((notes) => {
      setNotes(notes);
      setLastUpdate(moment().format());
    });
  }, [date]);

  return (
    <div className="notes-page">
      <CollapsibleNotesList key={lastUpdate} notes={notes} />
    </div>
  );
}
