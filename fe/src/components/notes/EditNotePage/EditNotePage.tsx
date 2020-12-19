import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../../header/Header";
import { CollapsibleNotesList } from "../CollapsibleNotesList/CollapsibleNotesList";
import { getNote, Note } from "../NotesApi";
import moment from "moment";
import "./EditNotePage.scss";

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

export const EditNotePage: React.FC<EditNotePageProps> = (props) => {
  const params = useParams<EditNotePageParams>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    async function fetchNote() {
      const fetchedNotes = await getNote({ id: params.id });
      setNotes(fetchedNotes);
      setLastUpdate(moment().format());
    }
    fetchNote();
  }, [params.id]);

  return (
    <div className="edit-note-page">
      <Header title={"engram"} />
      <div className="edit-note-page-content">
        <CollapsibleNotesList key={lastUpdate} notes={notes} />
      </div>
    </div>
  );
};
