import './CollapsibleNotesList.scss';

import React, { useEffect, useState } from 'react';

import { FloatingActionButton } from '../../FloatingActionButton/FloatingActionButton';
import { CollapsibleNote, CollapsibleNoteItem } from '../CollapsibleNoteItem/CollapsibleNoteItem';
import { createNote, Note, NoteType, removeNote, updateNote } from '../NotesApi';
import * as NoteUtils from '../NoteUtils';

type CollapsibleNotesListProps = {
  notes: CollapsibleNote[];
  type?: NoteType;
  readOnly?: boolean;
};

export const CollapsibleNotesList: React.FC<CollapsibleNotesListProps> = (
  props
) => {
  const [activeParentId, setActiveParentId] = useState<string>("");
  const [activeNoteId, setActiveNoteId] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>(props.notes);

  useEffect(() => {
    const activeNote = notes.find((n) => n._id === activeNoteId);
    if (activeNote) {
      setActiveParentId(activeNote.parent as string);
    }
  }, [activeNoteId, notes]);

  const handleUnindent = async (unindentedNote: Note) => {
    if (!unindentedNote.parent) {
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

    unindentedNoteCopy.body = unindentedNote.body;

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

    setActiveParentId(unindentedNoteCopy.parent as string);
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

    indentedNoteCopy.body = indentedNote.body;

    // Update note's prev to last element in parent's children (if exists, else null)
    const newParentId = indentedNoteCopy.prev;

    const newParentWithChildren = NoteUtils.getNoteWithChildren(
      notesCopy,
      newParentId
    );
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

    setActiveParentId(indentedNoteCopy.parent as string);
    setNotes(notesCopy);
    await Promise.all(promises);
  };

  const handleNewNote = async (note: CollapsibleNote) => {
    if (props.readOnly) {
      return;
    }

    const promises: Promise<any>[] = [];
    const notesCopy = Array.from(notes);

    const noteToCreate: Partial<Note> = {
      body: "",
    };

    noteToCreate.parent = activeParentId;
    noteToCreate.prev = note._id;

    const newNote = await createNoteWithDefaultType(noteToCreate);

    const nextNote = notesCopy.find(
      (n) => n.parent === activeParentId && n.prev === note._id
    );
    if (nextNote) {
      nextNote.prev = newNote._id;
      promises.push(updateNote(nextNote));
    }

    setActiveNoteId(newNote._id);
    setNotes([...notesCopy, newNote]);
    await Promise.all(promises);
  };

  const createNoteWithDefaultType = (note: Partial<Note>) => {
    return createNote({
      ...note,
      ...(props.type && { type: props.type }),
    });
  };

  const handleSave = async (note: CollapsibleNote) => {
    if (note._id) {
      const updatedNote = await updateNote(note);
      const notesCopy = Array.from(notes);
      const indexToUpdate = notesCopy.findIndex((n) => n._id === note._id);
      notesCopy.splice(indexToUpdate, 1, updatedNote);
      setNotes(notesCopy);
      setActiveNoteId("");
    } else {
      const newNote = await createNoteWithDefaultType(note);
      const newEmptyNote = await createNoteWithDefaultType({
        body: "",
        prev: newNote._id,
      });
      setNotes([newNote, newEmptyNote]);
      setActiveNoteId(newEmptyNote._id);
    }
  };

  const handleNoteActivate = async (note: CollapsibleNote) => {
    if (note._id) {
      setActiveNoteId(note._id);
    }
  };

  const handleDelete = async (note: CollapsibleNote) => {
    if (!note._id) {
      return;
    }

    const notesCopy = Array.from(notes);
    const indexToRemove = notesCopy.findIndex((n) => n._id === note._id);
    notesCopy.splice(indexToRemove, 1);
    setNotes(notesCopy);

    await removeNote(note._id);
  };

  const handleQuickAddSubmit = async (note: Note) => {
    const newNote = await createNoteWithDefaultType(note);
    setNotes([...notes, newNote]);
  };

  const topLevelNotesWithChildren = notes
    .filter((note) => {
      return !note.parent;
    })
    .map((note) => {
      return NoteUtils.getNoteWithChildren(notes, note._id);
    });

  return (
    <div
      className="collapsible-notes-list"
      onBlur={setActiveNoteId.bind(this, "")}
    >
      {topLevelNotesWithChildren.map((note) => {
        if (!note) {
          return null;
        }
        return (
          <CollapsibleNoteItem
            key={note._id}
            note={note}
            defaultType={props.type}
            activeId={activeNoteId}
            onSave={handleSave}
            onIndent={handleIndent}
            onUnindent={handleUnindent}
            onNewNote={props.readOnly ? handleNewNote : () => {}}
            onActivate={handleNoteActivate}
            onDelete={handleDelete}
          />
        );
      })}
      {!props.readOnly && (
        <FloatingActionButton onSubmit={handleQuickAddSubmit} />
      )}
    </div>
  );
};
