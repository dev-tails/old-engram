import "./EditNotePage.scss";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  CollapsibleNote,
  CollapsibleNoteItem,
} from "../CollapsibleNoteItem/CollapsibleNoteItem";
import { NoteItem } from "../NoteItem/NoteItem";
import {
  createNote,
  getNote,
  indentNote,
  Note,
  removeNote,
  unindentNote,
  updatePartialNote,
} from "../NotesApi";
import { getNoteWithChildren } from "../NoteUtils";

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

export const EditNotePage: React.FC<EditNotePageProps> = (props) => {
  const params = useParams<EditNotePageParams>();
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleIndent = async () => {
    const indentedNote = indentNote(activeNoteIndex, notes);
    if (indentedNote) {
      const notesCopy = [...notes];
      notesCopy.splice(activeNoteIndex, 1, indentedNote);
      await handleSaveNote(indentedNote);
      setNotes(notesCopy);
    }
  };

  const handleUnindent = async () => {
    const unindentedNote = unindentNote(activeNoteIndex, notes);
    if (unindentedNote) {
      const notesCopy = [...notes];
      notesCopy.splice(activeNoteIndex, 1, unindentedNote);
      await handleSaveNote(unindentedNote);
      setNotes(notesCopy);
    }
  };

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (event.key === "Tab") {
        event.preventDefault();
        event.stopPropagation();

        if (event.shiftKey) {
          handleUnindent();
        } else {
          handleIndent();
        }
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (activeNoteIndex < notes.length) {
          setActiveNoteIndex(activeNoteIndex + 1);
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (activeNoteIndex > 0) {
          setActiveNoteIndex(activeNoteIndex - 1);
        }
      }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  useEffect(() => {
    async function fetchNote() {
      const fetchedNotes = await getNote({ id: params.id });
      setNotes(fetchedNotes);
    }
    fetchNote();
  }, [params.id]);

  if (!notes) {
    return null;
  }

  const topLevelNoteWithChildren = getNoteWithChildren(notes, params.id);

  if (!topLevelNoteWithChildren) {
    return null;
  }

  const handleNewNote = async (note: Partial<Note>) => {
    const createdNote = await createNote({
      body: "",
      parent: params.id,
    });

    const notesCopy = [...notes];
    const newNoteIndex = activeNoteIndex + 1;
    notesCopy.splice(newNoteIndex, 0, createdNote);

    setNotes(notesCopy);
    setActiveNoteIndex(newNoteIndex);
  };

  const handleSaveNote = async (note: Partial<Note>) => {
    await updatePartialNote({
      ...note,
    });
  };

  const handleRemoveNote = async (note: Partial<Note>) => {
    await removeNote(note.localId);
    const notesCopy = [...notes];
    const index = notesCopy.findIndex((n) => n.localId === note.localId);
    notesCopy.splice(index, 1);
    setNotes(notesCopy);
    setActiveNoteIndex(activeNoteIndex - 1);
  };

  const activeNote =
    activeNoteIndex < notes.length ? notes[activeNoteIndex] : null;

  return (
    <div className="edit-note-page">
      <div className="edit-note-page-content">
        <CollapsibleNoteItem
          note={topLevelNoteWithChildren}
          defaultType="note"
          activeId={activeNote?.localId}
          onSave={handleSaveNote}
          onNewNote={handleNewNote}
          onActivate={(selectedNote) => {
            const index = notes.findIndex(
              (n) => n.localId === selectedNote.localId
            );
            setActiveNoteIndex(index);
          }}
          onDelete={handleRemoveNote}
          onBlur={() => {}}
          onDrop={() => {}}
        />
      </div>
    </div>
  );
};
