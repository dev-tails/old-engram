import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CollapsibleNote } from "../CollapsibleNoteItem/CollapsibleNoteItem";
import { NoteItem } from "../NoteItem/NoteItem";
import { createNote, getNote, Note, removeNote, updateNote } from "../NotesApi";
import { getNoteWithChildren } from "../NoteUtils";
import "./EditNotePage.scss";

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
      parent = currentNote._id;
      break;
    }
  }

  return {
    ...note,
    parent,
  };
}

export const EditNotePage: React.FC<EditNotePageProps> = (props) => {
  const params = useParams<EditNotePageParams>();
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleIndent = () => {
    const indentedNote = indentNote(activeNoteIndex, notes);
    if (indentedNote) {
      const notesCopy = [...notes];
      notesCopy.splice(activeNoteIndex, 1, indentedNote);
      setNotes(notesCopy);
    }
  };

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (event.key === "Tab") {
        event.preventDefault();
        event.stopPropagation();

        if (event.shiftKey) {
        } else {
          handleIndent();
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
      _id: params.id,
      body: e.target.innerText,
    });
  };

  const handleNewNote = async (note: Partial<Note>) => {
    const createdNote = await createNote({
      ...note,
      parent: params.id,
    });
    setNotes([...notes, createdNote]);
  };

  const handleSaveNote = async (note: Partial<Note>) => {
    await updateNote({
      ...note,
    });
  };

  const handleRemoveNote = async (note: Partial<Note>) => {
    await removeNote(note._id);
    const notesCopy = [...notes];
    const index = notesCopy.findIndex((n) => n._id === note._id);
    notesCopy.splice(index, 1);
    setNotes(notesCopy);
  };

  return (
    <div className="edit-note-page">
      <div className="edit-note-page-content">
        <div
          className="title"
          contentEditable={true}
          onBlur={(e) => handleTitleChanged(e)}
          suppressContentEditableWarning={true}
        >
          {topLevelNoteWithChildren.body}
        </div>
        {topLevelNoteWithChildren.children?.map((note) => {
          return (
            <NoteItemWithChildren
              activeNoteIndex={activeNoteIndex}
              key={note._id}
              note={note}
              onSave={handleSaveNote}
              onDelete={handleRemoveNote}
              onSelect={(selectedNote) => {
                const index = notes.findIndex(
                  (n) => n._id === selectedNote._id
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
          focused={activeNoteIndex === notes.length}
        />
      </div>
    </div>
  );
};

type NoteItemWithChildrenProps = {
  activeNoteIndex: number;
  note: CollapsibleNote;
  focused?: boolean;
  onSave?: (note: Partial<Note>) => void;
  onDelete?: (note: Partial<Note>) => void;
  onSelect?: (note: Partial<Note>) => void;
};

const NoteItemWithChildren: React.FC<NoteItemWithChildrenProps> = ({
  note,
  onSave,
  onDelete,
  onSelect,
  activeNoteIndex,
}) => {
  return (
    <div className="note-item-with-children">
      <NoteItem
        note={note}
        onSave={onSave}
        onDelete={onDelete}
        onSelect={onSelect}
        focused={note.index === activeNoteIndex}
      />
      {note.children?.map((childNote) => {
        return (
          <div key={childNote._id} style={{ marginLeft: "12px" }}>
            <NoteItemWithChildren
              activeNoteIndex={activeNoteIndex}
              note={childNote}
              onSave={onSave}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          </div>
        );
      })}
    </div>
  );
};
