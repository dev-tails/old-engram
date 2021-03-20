import "./EditNotePage.scss";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { CollapsibleNote } from "../CollapsibleNoteItem/CollapsibleNoteItem";
import { NoteItem } from "../NoteItem/NoteItem";
import { createNote, getNote, Note, removeNote, updateNote } from "../NotesApi";
import { getNoteWithChildren } from "../NoteUtils";

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

export function indentNote(noteIndex: number, notes: Note[]) {
  const note = notes[noteIndex];
  if (!note) {
    return null;
  }

  let parent = note.parent;

  for (let i = noteIndex - 1; i >= 0; i--) {
    const currentNote = notes[i];
    if (currentNote.parent === parent) {
      parent = currentNote.localId;
      break;
    }
  }

  return {
    ...note,
    parent,
  };
}

export function unindentNote(noteIndex: number, notes: Note[]) {
  const note = notes[noteIndex];
  if (!note) {
    return null;
  }

  let parentId = note.parent; // "1"
  let parent = null;

  for (let i = noteIndex - 1; i >= 0; i--) {
    const currentNote = notes[i];
    if (currentNote.localId === parentId) {
      parent = currentNote;
      break;
    }
  }

  return {
    ...note,
    parent: parent?.parent,
  };
}

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
      setActiveNoteIndex(fetchedNotes.length);
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

  const handleTitleChanged = (e: React.FocusEvent<HTMLDivElement>) => {
    const newText = e.target.innerText;
    if (newText === topLevelNoteWithChildren.body) {
      return;
    }

    updateNote({
      ...topLevelNoteWithChildren,
      body: e.target.innerText,
    });
  };

  const handleNewNote = async (note: Partial<Note>) => {
    const createdNote = await createNote({
      ...note,
      parent: params.id,
    });
    setNotes([...notes, createdNote]);
    setActiveNoteIndex(notes.length + 1);
  };

  const handleSaveNote = async (note: Partial<Note>) => {
    await updateNote({
      ...note,
    });
  };

  const handleSubmitNote = async (note: Partial<Note>) => {
    await handleSaveNote(note);
    setActiveNoteIndex(activeNoteIndex + 1);
  };

  const handleRemoveNote = async (note: Partial<Note>) => {
    await removeNote(note.localId);
    const notesCopy = [...notes];
    const index = notesCopy.findIndex((n) => n.localId === note.localId);
    notesCopy.splice(index, 1);
    setNotes(notesCopy);
  };

  const activeNote =
    activeNoteIndex < notes.length ? notes[activeNoteIndex] : null;

  return (
    <div className="edit-note-page">
      <div className="edit-note-page-content">
        <div
          className="title"
          contentEditable={true}
          onClick={() => {
            setActiveNoteIndex(0);
          }}
          onBlur={(e) => handleTitleChanged(e)}
          suppressContentEditableWarning={true}
        >
          {topLevelNoteWithChildren.body}
        </div>
        {topLevelNoteWithChildren.children?.map((note) => {
          return (
            <NoteItemWithChildren
              activeNoteId={activeNote?.localId}
              key={note.localId}
              note={note}
              onSave={handleSaveNote}
              onSubmit={handleSubmitNote}
              onDelete={handleRemoveNote}
              onSelect={(selectedNote) => {
                const index = notes.findIndex(
                  (n) => n.localId === selectedNote.localId
                );
                setActiveNoteIndex(index);
              }}
            />
          );
        })}
        <NoteItem
          key={notes.length}
          note={{ type: "note", body: "" }}
          onSave={handleNewNote}
          onSubmit={handleNewNote}
          focused={activeNoteIndex === notes.length}
          onSelect={() => {
            setActiveNoteIndex(notes.length);
          }}
        />
      </div>
    </div>
  );
};

type NoteItemWithChildrenProps = {
  activeNoteId?: string;
  note: CollapsibleNote;
  focused?: boolean;
  onSave?: (note: Partial<Note>) => void;
  onDelete?: (note: Partial<Note>) => void;
  onSelect?: (note: Partial<Note>) => void;
  onSubmit?: (note: Partial<Note>) => void;
};

const NoteItemWithChildren: React.FC<NoteItemWithChildrenProps> = ({
  activeNoteId,
  note,
  onSave,
  onDelete,
  onSelect,
  onSubmit,
}) => {
  return (
    <div className="note-item-with-children">
      <NoteItem
        focused={activeNoteId === note.localId}
        note={note}
        onSave={onSave}
        onDelete={onDelete}
        onSelect={onSelect}
        onSubmit={onSubmit}
      />
      {note.children?.map((childNote) => {
        return (
          <div key={childNote.localId} style={{ marginLeft: "12px" }}>
            <NoteItemWithChildren
              activeNoteId={activeNoteId}
              note={childNote}
              onSave={onSave}
              onDelete={onDelete}
              onSelect={onSelect}
              onSubmit={onSubmit}
            />
          </div>
        );
      })}
    </div>
  );
};
