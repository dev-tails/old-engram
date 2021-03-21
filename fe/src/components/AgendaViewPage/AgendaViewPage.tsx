import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { AgendaView } from '../AgendaView/AgendaView';
import { createOrUpdateNote, getNotes, Note, NoteType, removeNote } from '../notes/NotesApi';

type AgendaViewProps = {
  date: Date;
  type: NoteType;
};

export const AgendaViewPage: React.FC<AgendaViewProps> = ({ date, type }) => {
  const [items, setItems] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AgendaViewPage useEffect");
    async function fetchNotes() {
      setLoading(true);
      const dateAsMoment = moment(date);

      const newItems = await getNotes({
        startsAfter: dateAsMoment.startOf("day").toDate(),
        startsBefore: dateAsMoment.endOf("day").toDate(),
        type,
      });
      setItems(newItems);
      setLoading(false);
    }

    fetchNotes();
  }, [date, type]);

  const handleNoteSaved = async (note: Note) => {
    const updatedNote = await createOrUpdateNote(note);
    const itemsCopy = Array.from(items);

    const indexInItemsArray = itemsCopy.findIndex(
      (item) => item.localId === updatedNote.localId
    );
    if (indexInItemsArray >= 0) {
      itemsCopy[indexInItemsArray] = updatedNote;
    } else {
      itemsCopy.push(updatedNote);
    }
    setItems(itemsCopy);
  };

  const handleNoteDeleted = async (note: Note) => {
    const itemsCopy = Array.from(items);

    const indexInItemsArray = itemsCopy.findIndex(
      (item) => item.localId === note.localId
    );

    itemsCopy.splice(indexInItemsArray, 1);
    setItems(itemsCopy);

    await removeNote(note.localId);
  };

  return (
    <div className="agenda-view">
      <div className="agenda-view-content">
        {!loading && (
          <AgendaView
            type={type}
            date={date}
            items={items}
            onSave={handleNoteSaved}
            onDelete={handleNoteDeleted}
          />
        )}
      </div>
    </div>
  );
};
