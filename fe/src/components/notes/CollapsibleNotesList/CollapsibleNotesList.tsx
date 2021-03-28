import './CollapsibleNotesList.scss';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { CollapsibleNote, CollapsibleNoteItem } from '../CollapsibleNoteItem/CollapsibleNoteItem';
import { createNote, Note, NoteType, removeNote, updateNote } from '../NotesApi';

type CollapsibleNotesListProps = {
  date?: Date;
  notes: CollapsibleNote[];
  type?: NoteType;
  readOnly?: boolean;
  activeParentId?: string | null | undefined;
};

export const CollapsibleNotesList: React.FC<CollapsibleNotesListProps> = (
  props
) => {
  const history = useHistory();

  const [activeParentId, setActiveParentId] = useState<string>("");
  const [activeNoteId, setActiveNoteId] = useState<string | undefined>("");
  const [notes, setNotes] = useState<Note[]>(props.notes);

  useEffect(() => {
    const activeNote = notes.find((n) => n.localId === activeNoteId);
    if (activeNote) {
      setActiveParentId(activeNote.parent as string);
    }
  }, [activeNoteId, notes]);

  const handleNewNote = async (note: CollapsibleNote) => {
    if (props.readOnly) {
      return;
    }

    const promises: Promise<any>[] = [];
    const notesCopy = Array.from(notes);

    const noteToCreate: Partial<Note> = {
      body: "",
    };

    noteToCreate.parent = activeParentId;

    const newNote = await createNoteWithDefaultType(noteToCreate);

    setActiveNoteId(newNote.localId);
    setNotes([...notesCopy, newNote]);
    await Promise.all(promises);
  };

  const createNoteWithDefaultType = (note: Partial<Note> = {}) => {
    return createNote({
      ...note,
      ...(props.type && { type: props.type }),
      ...(props.activeParentId && { parent: props.activeParentId }),
      ...(props.date && { date: moment(props.date).format("YYYY-MM-DD") }),
    });
  };

  const handleSave = async (note: CollapsibleNote) => {
    if (note.localId) {
      const updatedNote = await updateNote(note);
      const notesCopy = Array.from(notes);
      const indexToUpdate = notesCopy.findIndex(
        (n) => n.localId === note.localId
      );
      notesCopy.splice(indexToUpdate, 1, updatedNote);
      setNotes(notesCopy);
      activateNextEmptyNote(notesCopy);
    } else {
      const newNote = await createNoteWithDefaultType(note);
      const newNotes = [...notes, newNote];
      setNotes(newNotes);
      activateNextEmptyNote(newNotes);
    }
  };

  function activateNextEmptyNote(notes: Note[]) {
    setActiveNoteId("empty");
  }

  const handleNoteActivate = async (note: CollapsibleNote) => {
    setActiveNoteId(note.localId || "empty");
  };

  const handleDelete = async (note: CollapsibleNote) => {
    if (!note.localId) {
      return;
    }

    const notesCopy = Array.from(notes);
    const indexToRemove = notesCopy.findIndex(
      (n) => n.localId === note.localId
    );
    notesCopy.splice(indexToRemove, 1);
    setNotes(notesCopy);

    await removeNote(note.localId);
  };

  const handleBlur = () => {
    setActiveNoteId("");
  };

  const handleDrop = async (droppedNote: Note, noteDroppedOnto: Note) => {
    if (droppedNote.localId === noteDroppedOnto.localId) {
      return;
    }

    const droppedNoteNext = notes.find((n) => n.prev === droppedNote.localId);
    if (droppedNoteNext) {
      await updateNote({
        ...droppedNoteNext,
        prev: droppedNote.prev,
      });
    }

    const noteDroppedOntoPrev = notes.find(
      (n) => n.prev === noteDroppedOnto.localId
    );
    if (noteDroppedOntoPrev) {
      await updateNote({
        ...noteDroppedOntoPrev,
        prev: droppedNote.localId,
      });
    }

    await updateNote({
      ...droppedNote,
      date: props.date?.toISOString(),
      type: props.type,
      prev: noteDroppedOnto.localId,
    });
    history.push(history.location.pathname);
  };

  const title = props.date
    ? Intl.DateTimeFormat(navigator.language, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(props.date)
    : "Backlog";

  return (
    <div className="collapsible-notes-list">
      <h2 className="title">{title}</h2>
      {notes.map((note) => {
        if (!note) {
          return null;
        }
        return (
          <CollapsibleNoteItem
            key={note._id || note.localId}
            note={note}
            defaultType={props.type}
            active={activeNoteId === note.localId}
            onSave={handleSave}
            onNewNote={props.readOnly ? handleNewNote : () => {}}
            onActivate={handleNoteActivate}
            onDelete={handleDelete}
            onBlur={handleBlur}
            onDrop={handleDrop}
          />
        );
      })}
      <CollapsibleNoteItem
        key={notes.length}
        note={{ body: "" }}
        defaultType={props.type}
        active={activeNoteId === "empty"}
        onSave={handleSave}
        onNewNote={props.readOnly ? handleNewNote : () => {}}
        onActivate={handleNoteActivate}
        onDelete={handleDelete}
        onBlur={handleBlur}
        onDrop={handleDrop}
      />
    </div>
  );
};
