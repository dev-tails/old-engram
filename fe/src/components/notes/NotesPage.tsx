import './NotesPage.scss';

import moment, { DurationInputArg2 } from 'moment';
import React, { useEffect, useState } from 'react';

import { objectIdFromDate } from '../../utils/ObjectId';
import { CollapsibleNotesList } from './CollapsibleNotesList/CollapsibleNotesList';
import { getNotes, GetNotesParams, Note, NoteType } from './NotesApi';

export type NotesPageProps = {
  date?: Date;
  type?: NoteType;
  dateRangeValue: string;
};

export default function NotesPage({
  date,
  type,
  dateRangeValue,
}: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const getNotesParams: GetNotesParams = {};
    if (date) {
      if (dateRangeValue !== "B") {
        getNotesParams.since_id = objectIdFromDate(date);
      }

      if (dateRangeValue !== "A") {
        let unit: DurationInputArg2 = "d";
        let amount = 1;
        switch (dateRangeValue) {
          case "W":
            amount = 7;
            break;
          case "F":
            amount = 14;
            break;
          case "M":
            unit = "M";
            break;
          case "Q":
            unit = "Q";
            break;
          case "Y":
            unit = "y";
            break;
          case "B":
            amount = 0;
            break;
          default:
            break;
        }

        getNotesParams.max_id = objectIdFromDate(
          moment(date).add(amount, unit).toDate()
        );
      }
    }
    if (type) {
      getNotesParams.type = type;
    }

    getNotes(getNotesParams).then((notes) => {
      setNotes(notes);
      setLastUpdate(moment().format());
    });
  }, [date, type, dateRangeValue]);

  return (
    <div className="notes-page">
      <CollapsibleNotesList key={lastUpdate} notes={notes} type={type} />
    </div>
  );
}
