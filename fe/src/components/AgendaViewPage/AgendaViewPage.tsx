import React from 'react';

import { AgendaView } from '../AgendaView/AgendaView';
import { createOrUpdateNote, Note, removeNote } from '../notes/NotesApi';

type AgendaViewProps = {
  notes: Note[];
  date: Date;
  onSave: () => void;
  onDelete: () => void;
};

export const AgendaViewPage: React.FC<AgendaViewProps> = ({
  notes,
  date,
  onSave,
  onDelete,
}) => {
  const handleNoteSaved = async (note: Note) => {
    await createOrUpdateNote(note);
    onSave();
  };

  const handleNoteDeleted = async (note: Note) => {
    await removeNote(note.localId);
    onDelete();
  };

  return (
    <div className="agenda-view">
      <div className="agenda-view-content">
        <AgendaView
          type={"event"}
          date={date}
          items={notes}
          onSave={handleNoteSaved}
          onDelete={handleNoteDeleted}
        />
      </div>
    </div>
  );
};
