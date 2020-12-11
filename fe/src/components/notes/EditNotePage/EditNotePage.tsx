import React, { useEffect } from "react";
import { useParams } from "react-router";
import { CollapsibleNoteItem } from "../CollapsibleNoteItem/CollapsibleNoteItem";
import { NoteItem } from "../NoteItem/NoteItem";

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

export const EditNotePage: React.FC<EditNotePageProps> = (props) => {
  const params = useParams<EditNotePageParams>();

  useEffect(() => {});

  const note = {
    body: "Title",
    children: [
      {
        body: "Title Child 1",
        children: [
          {
            body: "Child 1 Child 1",
          },
          {
            body: "Child 1 Child 2",
          },
        ],
      },
      {
        body: "Title Child 2",
        children: [
          {
            body: "Child 2 Child 1",
          },
        ],
      },
    ],
  };

  return (
    <div className="edit-note-page">
      <CollapsibleNoteItem note={note} onSave={() => {}} />
    </div>
  );
};
