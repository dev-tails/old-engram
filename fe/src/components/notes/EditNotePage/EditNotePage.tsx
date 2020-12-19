import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../../header/Header";
import { CollapsibleNotesList } from "../CollapsibleNotesList/CollapsibleNotesList";
import { getNote, Note } from "../NotesApi";
import * as NoteUtils from "../NoteUtils";
import "./EditNotePage.scss";

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

export const EditNotePage: React.FC<EditNotePageProps> = (props) => {
  const params = useParams<EditNotePageParams>();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNote() {
      const fetchedNotes = await getNote({ id: params.id });
      setNotes(fetchedNotes);
    }
    fetchNote();
  }, [params.id]);

  const note = NoteUtils.getNoteWithChildren(notes, params.id);
  if (!note) {
    return null;
  }

  return (
    <div className="edit-note-page">
      <Header title={"engram"} />
      <div className="edit-note-page-content">
        <CollapsibleNotesList notes={[note]} />
      </div>
    </div>
  );
};
