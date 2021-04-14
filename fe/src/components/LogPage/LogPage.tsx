import './LogPage.scss';

import querystring from 'query-string';
import React, { useState } from 'react';
import { useLocation } from 'react-router';

import * as NotesApi from '../notes/NotesApi';
import TextBox from '../textbox/TextBox';

type LogPageProps = {};

export const LogPage: React.FC<LogPageProps> = (props) => {
  const location = useLocation();
  const [notes, setNotes] = useState<NotesApi.Note[]>([]);

  const handleSubmit = async (note: NotesApi.Note) => {
    const createdNote = await NotesApi.createNote(note);
    setNotes([createdNote, ...notes]);
  };

  const { query } = querystring.parseUrl(location.search);
  const { body, text, url, title } = query;

  let initialBody = body as string;
  if (title && url) {
    initialBody = `[${title}](${url})`;
  } else if (text) {
    initialBody = text as string;
  }

  return (
    <div className="log-page">
      <div className="log-page__content">
        <div className="log-page__notes-container">
          <div className="log-page__notes">
            {notes.map((note) => {
              return <p key={note.localId}>{note.body}</p>;
            })}
          </div>
        </div>
        <div className="log-page__footer">
          <TextBox initialBody={initialBody} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
