import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { AgendaView } from '../AgengaView/AgendaView';
import { createOrUpdateNote, getNotes, Note } from '../notes/NotesApi';

type AgendaViewProps = {
  date: Date;
};

export const AgendaViewPage: React.FC<AgendaViewProps> = ({ date }) => {
  const [items, setItems] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      const dateAsMoment = moment(date);

      const newItems = await getNotes({
        since: dateAsMoment.startOf("day").toDate(),
        before: dateAsMoment.endOf("day").toDate(),
      });
      setItems(newItems);
      setLoading(false);
    }

    fetchNotes();
  }, [date]);

  const handleNoteSaved = async (note: Note) => {
    const updatedNote = await createOrUpdateNote(note);
    const itemsCopy = Array.from(items);

    const indexInItemsArray = itemsCopy.findIndex(
      (item) => item._id === updatedNote._id
    );
    if (indexInItemsArray >= 0) {
      itemsCopy[indexInItemsArray] = updatedNote;
    } else {
      itemsCopy.push(updatedNote);
    }
    setItems(itemsCopy);
  };

  return (
    <div className="agenda-view">
      <div className="agenda-view-content">
        {!loading && (
          <AgendaView date={date} items={items} onSave={handleNoteSaved} />
        )}
      </div>
    </div>
  );
};
