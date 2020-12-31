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
      if (dateRangeValue !== "Before") {
        getNotesParams.since_id = objectIdFromDate(date);
      }

      if (dateRangeValue !== "After") {
        let unit: DurationInputArg2 = "d";
        let amount = 1;
        switch (dateRangeValue) {
          case "Week":
            amount = 7;
            break;
          case "Fortnight":
            amount = 14;
            break;
          case "Month":
            unit = "M";
            break;
          case "Quarter":
            unit = "Q";
            break;
          case "Year":
            unit = "y";
            break;
          case "Before":
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
