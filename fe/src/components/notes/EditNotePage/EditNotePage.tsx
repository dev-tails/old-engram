import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../../header/Header";
import {
  CollapsibleNote,
  CollapsibleNoteItem,
} from "../CollapsibleNoteItem/CollapsibleNoteItem";
import { createNote, getNote, Note, updateNote } from "../NotesApi";
import "./EditNotePage.scss";

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
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeParentId, setActiveParentId] = useState<string>(params.id);
  const [activeNoteId, setActiveNoteId] = useState(params.id);

  useEffect(() => {
    async function fetchNote() {
      const fetchedNotes = await getNote({ id: params.id });
      setNotes(fetchedNotes);
    }
    fetchNote();
  }, [params.id]);

  const note = getNoteWithChildren(notes, params.id);
  if (!note) {
    return null;
  }

  const handleUnindent = async (unindentedNote: Note) => {
    if (!unindentedNote.parent || unindentedNote.parent === params.id) {
      return;
    }

    const promises: Promise<any>[] = [];
    const notesCopy = Array.from(notes);

    const unindentedNoteCopy = notesCopy.find(
      (n) => n._id === unindentedNote._id
    );
    if (!unindentedNoteCopy) {
      return;
    }

    const oldParent = unindentedNoteCopy.parent;
    const oldPrev = unindentedNoteCopy.prev;
    const newNextNote = notesCopy.find((note) => note.prev === oldParent);
    const oldNextNote = notesCopy.find(
      (note) => note.prev === unindentedNoteCopy._id
    );
    const parentNote = notesCopy.find(
      (note) => note._id === unindentedNoteCopy.parent
    );

    // Find the old next note and update prev to point to new prev note
    if (oldNextNote) {
      oldNextNote.prev = oldPrev;
      promises.push(updateNote(oldNextNote));
    }

    // Update unindented note prev and parent
    unindentedNoteCopy.prev = unindentedNoteCopy.parent;
    unindentedNoteCopy.parent = parentNote?.parent;

    promises.push(updateNote(unindentedNoteCopy));

    // Find new next note and update prev to point to unindented note
    if (newNextNote) {
      newNextNote.prev = unindentedNote._id;
      promises.push(updateNote(newNextNote));
    }

    setNotes(notesCopy);
    await Promise.all(promises);
  };

  const handleIndent = async (indentedNote: CollapsibleNote) => {
    // Can't indent if there is no prev note
    if (!indentedNote.prev) {
      return;
    }

    const promises: Promise<any>[] = [];
    const notesCopy = Array.from(notes);

    const indentedNoteCopy = notesCopy.find((n) => n._id === indentedNote._id);
    if (!indentedNoteCopy) {
      return;
    }

    // Update note's prev to last element in parent's children (if exists, else null)
    const newParentId = indentedNoteCopy.prev;

    const newParentWithChildren = getNoteWithChildren(notesCopy, newParentId);
    const oldNextNote = notesCopy.find(
      (note) => note.prev === indentedNoteCopy._id
    );

    if (
      newParentWithChildren &&
      newParentWithChildren.children &&
      newParentWithChildren.children.length > 0
    ) {
      const lastChild =
        newParentWithChildren.children[
          newParentWithChildren.children.length - 1
        ];
      indentedNoteCopy.prev = lastChild._id;
    } else {
      indentedNoteCopy.prev = "";
    }

    // Update note's parent to old prev
    indentedNoteCopy.parent = newParentId;
    promises.push(updateNote(indentedNoteCopy));

    // Update old next (if exists) to point to old prev
    if (oldNextNote) {
      oldNextNote.prev = newParentId;
      promises.push(updateNote(oldNextNote));
    }

    setNotes(notesCopy);
    await Promise.all(promises);
  };

  const handleNewNote = async (note: CollapsibleNote) => {
    const isRoot = note._id === params.id;
    const noteToCreate: Partial<Note> = {
      body: "",
    };

    if (isRoot) {
      noteToCreate.parent = params.id;
    } else {
      noteToCreate.parent = activeParentId;
      noteToCreate.prev = note._id;
    }

    const newNote = await createNote(noteToCreate);
    setActiveNoteId(newNote._id);
    setNotes([...notes, newNote]);
  };

  const handleSave = async (note: CollapsibleNote) => {
    await updateNote(note);
  };

  const handleNoteActivate = async (note: CollapsibleNote) => {
    if (note._id) {
      setActiveNoteId(note._id);
    }
  };

  return (
    <div className="edit-note-page">
      <Header title={"engram"} />
      <div className="edit-note-page-content">
        <CollapsibleNoteItem
          note={note}
          activeId={activeNoteId}
          onSave={handleSave}
          onIndent={handleIndent}
          onUnindent={handleUnindent}
          onNewNote={handleNewNote}
          onActivate={handleNoteActivate}
        />
      </div>
    </div>
  );
};
