import { Dispatch } from "redux";
import { getNotes, createNote, Note } from "../../api/NoteApi";

export async function fetchNotes(dispatch: Dispatch) {
  const notes = await getNotes();
  dispatch({ type: 'FETCH_NOTES', payload: notes })
}

export async function addNote(dispatch: Dispatch, note: Note) {
  const createdNote = await createNote(note);
  dispatch({ type: 'ADD_NOTE', payload: createdNote });
}

// export const addNote = (note: Note) => {
//   return {
//     type: "ADD_NOTE",
//     payload: note
//   }
// }

// export const remoteNote = (id: string) => {
//   return {
//     type: "ADD_NOTE",
//     payload: id
//   }
// }