import './EditNotePage.scss';

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { getNote, Note } from '../NotesApi';

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

export const EditNotePage: React.FC<EditNotePageProps> = (props) => {
  const params = useParams<EditNotePageParams>();
  const [note, setNote] = useState<Note | undefined>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNote({ id: params.id }).then((note) => {
      setNote(note);
      setTitle(note?.body || "");
      setContent(note?.content || "");
    });
  }, [params.id]);

  return (
    <div className="edit-note-page">
      <div className="edit-note-page-content">
        <div className="title" suppressContentEditableWarning contentEditable={true} onInput={e => setTitle(e.currentTarget.textContent || "")}
>{note?.body}</div>
        <div className="body" suppressContentEditableWarning contentEditable={true} onInput={e => setContent(e.currentTarget.textContent || "")}>{note?.content}</div>
      </div>
    </div>
  );
};
