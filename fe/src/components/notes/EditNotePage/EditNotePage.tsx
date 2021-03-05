import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getNote, Note, updateNote } from "../NotesApi";
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

  const topLevelNote = notes[0];

  const handleTitleChanged = (e: React.FocusEvent<HTMLDivElement>) => {
    updateNote({
      _id: params.id,
      body: e.target.innerText,
    });
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
      </div>
    </div>
  );
};
