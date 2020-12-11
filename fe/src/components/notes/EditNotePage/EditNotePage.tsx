import React from "react";
import { useParams } from "react-router";
import {
  CollapsibleNote,
  CollapsibleNoteItem,
} from "../CollapsibleNoteItem/CollapsibleNoteItem";
import { Note } from "../NotesApi";

type EditNotePageProps = {};

type EditNotePageParams = {
  id: string;
};

function getNoteWithChildren(
  notes: Note[],
  noteId: string | undefined
): CollapsibleNote | null {
  const note = notes.find((note) => note._id === noteId);
  if (!note) {
    return null;
  }

  const children = notes.filter((note) => note.parent === noteId);
  const sortedChildren: CollapsibleNote[] = [];
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
        const childNoteWithChildren = getNoteWithChildren(notes, child._id);
        if (childNoteWithChildren) {
          sortedChildren.push(childNoteWithChildren);
        }
        break;
      }
    }

    if (!found) {
      prev = null;
    }
  } while (prev !== null);

  return { ...note, children: sortedChildren };
}

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

  const note = getNoteWithChildren(notes, params.id);
  if (!note) {
    return null;
  }

  return (
    <div className="edit-note-page">
      <CollapsibleNoteItem note={note} onSave={() => {}} />
    </div>
  );
};
