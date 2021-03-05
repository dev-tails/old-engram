import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NoteItem } from "../NoteItem/NoteItem";
import { createNote, getNote, Note, removeNote, updateNote } from "../NotesApi";
import "./EditNotePage.scss";

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

export const EditNotePage: React.FC<EditNotePageProps> = (props) => {
  const params = useParams<EditNotePageParams>();
  const [notes, setNotes] = useState<Note[] | null>(null);

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

  const notesCopy = [...notes];
  const topLevelNote = notesCopy.shift();

  if (!topLevelNote) {
    return null;
  }

  const childNotes = notesCopy;

  const handleTitleChanged = (e: React.FocusEvent<HTMLDivElement>) => {
    const newText = e.target.innerText;
    if (newText === topLevelNote.body) {
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
          {topLevelNote.body}
        </div>
        {childNotes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              onSave={handleSaveNote}
              onDelete={handleRemoveNote}
            />
          );
        })}
        <NoteItem
          key={notes.length}
          note={{ type: "note", body: "" }}
          onSave={handleNewNote}
          focused={true}
        />
      </div>
    </div>
  );
};
