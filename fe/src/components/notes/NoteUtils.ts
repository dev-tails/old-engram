import { CollapsibleNote } from "./CollapsibleNoteItem/CollapsibleNoteItem";
import { Note } from "./NotesApi";

export function getNoteWithChildren(
  notes: Note[],
  noteId: string | undefined | null
): CollapsibleNote | null {
  const note = notes.find((note) => note._id === noteId);
  if (!note) {
    return null;
  }

  const children = notes.filter((note) => note.parent === noteId);
  const sortedChildren: CollapsibleNote[] = [];
  for (const child of children) {
    const childNoteWithChildren = getNoteWithChildren(notes, child._id);
    if (childNoteWithChildren) {
      sortedChildren.push(childNoteWithChildren);
    }
  }

  // let prev = null;
  // do {
  //   let found = false;
  //   for (let i = 0; i < children.length; i++) {
  //     const child = children[i];

  //     if (!prev && !child.prev) {
  //       found = true;
  //     } else if (prev === child.prev) {
  //       found = true;
  //     }

  //     if (found) {
  //       prev = child._id;
  //       const childNoteWithChildren = getNoteWithChildren(notes, child._id);
  //       if (childNoteWithChildren) {
  //         sortedChildren.push(childNoteWithChildren);
  //       }
  //       break;
  //     }
  //   }

  //   if (!found) {
  //     prev = null;
  //   }
  // } while (prev !== null);

  return { ...note, children: sortedChildren };
}
