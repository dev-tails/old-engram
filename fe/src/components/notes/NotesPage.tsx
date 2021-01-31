import './NotesPage.scss';

import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { CollapsibleNotesList } from './CollapsibleNotesList/CollapsibleNotesList';
import { getNotes, GetNotesParams, Note, NoteType } from './NotesApi';

export type NotesPageProps = {
  date?: Date;
  type?: NoteType;
  startDate: Date | null;
  endDate: Date | null;
  readOnly?: boolean;
  search?: string;
  activeParentId?: string | null | undefined;
};

export default function NotesPage({
  date,
  type,
  startDate,
  endDate,
  readOnly,
  search,
  activeParentId,
}: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const getNotesParams: GetNotesParams = {};
    if (startDate) {
      getNotesParams.since = moment(startDate).toDate();
    }
    if (endDate) {
      getNotesParams.before = moment(endDate).toDate();
    }
    if (type) {
      getNotesParams.type = type;
    }
    if (type === "event") {
      getNotesParams.sort = "start";
    }
    getNotesParams.search = search;
    getNotesParams.parent = activeParentId;

    getNotes(getNotesParams).then((notes) => {
      let sortedNotes = notes;

      if (type === "task") {
        sortedNotes.sort((a, b) => {
          if (a.type !== b.type) {
            if (b.type === "task_completed") {
              return -1;
            }
          }

          if (!a._id || !b._id) {
            return 0;
          }

          return a._id > b._id ? 1 : -1;
        });
      }

      setNotes(notes);
      setLastUpdate(moment().format());
    });
  }, [type, startDate, endDate, search, activeParentId]);

  return (
    <div className="notes-page">
      <CollapsibleNotesList
        key={lastUpdate}
        date={date}
        notes={notes}
        type={type}
        readOnly={readOnly}
        activeParentId={activeParentId}
      />
    </div>
  );
}
