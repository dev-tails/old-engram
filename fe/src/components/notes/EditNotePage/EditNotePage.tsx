import './EditNotePage.scss';

import { IconButton } from '@material-ui/core';
import { MoreVert, Save, Sync } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router';

import * as NotesApi from '../NotesApi';

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

export const EditNotePage: React.FC<EditNotePageProps> = (props) => {
  const params = useParams<EditNotePageParams>();

  const [note, setNote] = useState<NotesApi.Note | undefined>();
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let autoSaveTimerId: NodeJS.Timeout | null = null;
    if (dirty) {
      const autoSaveIntervalMs = 5000;
      autoSaveTimerId = setTimeout(async () => {
        setSaving(true);
        setDirty(false);
    
        const body = bodyRef.current?.innerText;
        const content = contentRef.current?.innerText;
    
        await NotesApi.updateNote({
          localId: params.id,
          body,
          content
        });
    
        setSaving(false);
      }, autoSaveIntervalMs);
    }

    return () => {
      if (autoSaveTimerId) {
        clearInterval(autoSaveTimerId);
      }
    };
  }, [dirty, params.id]);

  useEffect(() => {
    NotesApi.getNote({ id: params.id }).then((note) => {
      setNote(note);
    });
  }, [params.id]);

  return (
    <div className="edit-note-page">
      <div className="edit-note-page-content">
        <div className="title">
        <div
          ref={bodyRef}
          className="title__text"
          suppressContentEditableWarning
          contentEditable={true}
          onInput={(e) => setDirty(true)}
        >
          {note?.body}
        </div>
        <div className="title__icons">
          <IconButton size="small" className={`save-icon ${saving ? "save-icon--saving" : ""}`}>
            {!saving && dirty && <Save/> }
            {saving && <Sync/> }
          </IconButton>
          <IconButton size="small">
            <MoreVert/>
          </IconButton>
        </div>
        </div>
        <div
          ref={contentRef}
          className="body"
          suppressContentEditableWarning
          contentEditable={true}
          onInput={(e) => setDirty(true)}
        >
          {note?.content}
        </div>
      </div>
    </div>
  );
};
