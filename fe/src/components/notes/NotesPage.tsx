import './NotesPage.scss';

import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { objectIdFromDate } from '../../utils/ObjectId';
import { CollapsibleNotesList } from './CollapsibleNotesList/CollapsibleNotesList';
import { getNotes, GetNotesParams, Note, NoteType } from './NotesApi';

export type NotesPageProps = {
  date?: Date;
  type?: NoteType;
  startDate: Date | null;
  endDate: Date | null;
  readOnly?: boolean;
};

export default function NotesPage({
  date,
  type,
  startDate,
  endDate,
  readOnly,
}: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const getNotesParams: GetNotesParams = {};
    if (startDate) {
      if (type === "event") {
        getNotesParams.since = moment(startDate).toDate();
      } else {
        getNotesParams.since_id = objectIdFromDate(startDate);
      }
    }
    if (endDate) {
      if (type === "event") {
        getNotesParams.before = moment(endDate).toDate();
      } else {
        getNotesParams.max_id = objectIdFromDate(endDate);
      }
    }
    if (type) {
      getNotesParams.type = type;
    }
    if (type === "event") {
      getNotesParams.sort = "start";
    }

    getNotes(getNotesParams).then((notes) => {
      let sortedNotes = notes;

      if (type === "task") {
        sortedNotes.sort((a, b) => { return (a.type || "") > (b.type || "") ? 1 : -1})
      }

      setNotes(notes);
      setLastUpdate(moment().format());
    });
  }, [type, startDate, endDate]);

  return (
    <div className="notes-page">
      <CollapsibleNotesList
        key={lastUpdate}
        notes={notes}
        type={type}
        readOnly={readOnly}
      />
    </div>
  );
}
