import './NotesPage.scss';

import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { CollapsibleNotesList } from './CollapsibleNotesList/CollapsibleNotesList';
import { getNotes, GetNotesParams, Note, NoteType } from './NotesApi';

export type NotesPageProps = {
  date: Date;
  type?: NoteType;
  startDate: Date;
  endDate: Date;
  readOnly?: boolean;
  search?: string;
  activeParentId?: string | null | undefined;
  versionNumber: number;
  onChange: () => void;
};

export default function NotesPage({
  date,
  type,
  startDate,
  endDate,
  readOnly,
  search,
  activeParentId,
  versionNumber,
  onChange,
}: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const getNotesParams: GetNotesParams = {};
    if (type !== "task") {
      if (startDate) {
        getNotesParams.since = moment(startDate).toDate();
      }
      if (endDate) {
        getNotesParams.before = moment(endDate).toDate();
      }
    }

    if (type) {
      getNotesParams.type = type;
    }
    getNotesParams.search = search;
    getNotesParams.parent = activeParentId;

    getNotes(getNotesParams).then((notes) => {
      setNotes(notes);
      setLastUpdate(moment().format());
    });
  }, [type, startDate, endDate, search, activeParentId, versionNumber]);

  const renderNotesByDate = () => {
    const dates = [];
    for (
      let date = startDate;
      date < endDate;
      date = moment(date).add(1, "d").toDate()
    ) {
      dates.push(date);
    }
    return (
      <>
        {dates.map((date) => {
          const notesForDate = notes.filter((note) => {
            const isSameDay = note.date && moment(note.date).isSame(date, "d");
            return isSameDay;
          });

          return (
            <CollapsibleNotesList
              key={date.getDate()}
              onChange={onChange}
              date={date}
              notes={notesForDate}
              type={type}
              readOnly={readOnly}
              activeParentId={activeParentId}
            />
          );
        })}
      </>
    );
  };

  function renderBacklog() {
    if (type !== "task") {
      return null;
    }

    const incompleteTasks = notes.filter((note) => {
      return !note.date && note.type === "task";
    });

    return (
      <CollapsibleNotesList
        notes={incompleteTasks}
        type={type}
        readOnly={readOnly}
        activeParentId={activeParentId}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="notes-page" key={lastUpdate}>
      {renderNotesByDate()}
      {renderBacklog()}
    </div>
  );
}
