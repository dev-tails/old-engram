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

  const notes = [
    {
      _id: "1",
      body: "Title",
    },
    {
      _id: "3",
      body: "Title Child 2",
      parent: "1",
      prev: "2",
    },
    {
      _id: "2",
      body: "Title Child 1",
      parent: "1",
      next: "3",
    },
    {
      _id: "4",
      body: "Child 2 - Child 2",
      parent: "3",
      prev: "5",
    },
    {
      _id: "5",
      body: "Child 2 - Child 1",
      parent: "3",
    },
  ];

  const note = notes.find((note) => note._id === params.id);
  if (!note) {
    return null;
  }

  const children = notes.filter((note) => note.parent === params.id);
  const sortedChildren = [];
  let prev = null;
  do {
    let found = false;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (!prev && !child.prev) {
        found = true;
      } else if (prev === child.prev) {
        found = true;
      }

      if (found) {
        prev = child._id;
        sortedChildren.push(child);
        break;
      }
    }

    if (!found) {
      prev = null;
    }
  } while (prev !== null);

  const populatedNote = { ...note, children: sortedChildren };

  return (
    <div className="edit-note-page">
      <CollapsibleNoteItem note={populatedNote} onSave={() => {}} />
    </div>
  );
};
