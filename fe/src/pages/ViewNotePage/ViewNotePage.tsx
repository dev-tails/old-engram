import './ViewNotePage.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Markdown } from '../../components/Markdown/Markdown';
import { getRemoteNote, Note } from '../../components/notes/NotesApi';

type ViewNotePageProps = {};
type ViewNotePageParams = { id: string };

export const ViewNotePage: React.FC<ViewNotePageProps> = (props) => {
  const params = useParams<ViewNotePageParams>();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    async function fetchNote() {
      const remoteNotes = await getRemoteNote(params.id);
      setNote(remoteNotes[0]);
    }
    fetchNote();
  }, [params.id]);

  function getBodyForMarkdown(body?: string) {
    return body?.replaceAll("\n\n", `\n&nbsp;\n`) || "";
  }

  return (
    <div className="view-note-page">
      <div className="container">
        <Markdown body={getBodyForMarkdown(note?.body)} />
      </div>
    </div>
  );
};
