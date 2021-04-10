import './LogPage.scss';

import React, { useState } from 'react';

import * as NotesApi from '../notes/NotesApi';
import TextBox from '../textbox/TextBox';

type LogPageProps = {};

export const LogPage: React.FC<LogPageProps> = (props) => {
  const [notes, setNotes] = useState<NotesApi.Note[]>([]);

  const handleSubmit = async (note: NotesApi.Note) => {
    await NotesApi.createNote(note);
    setNotes([note, ...notes]);
  };

  return (
    <div className="log-page">
      <div className="log-page__content">
        <div className="log-page__notes-container">
          <div className="log-page__notes">
            {notes.map((note) => {
              return <p>{note.body}</p>;
            })}
          </div>
        </div>
        <div className="log-page__footer">
          <TextBox onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
