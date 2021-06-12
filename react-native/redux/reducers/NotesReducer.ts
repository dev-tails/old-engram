import { Note } from '../../api/NoteApi';
import { AddNoteAction, FetchNotesAction, RemoveNoteAction, UpdateNoteAction } from '../actions/NotesActions';
import { LogoutAction } from '../actions/UserActions';

const INITIAL_STATE: Note[] = [];

const NotesReducer = (
  state = INITIAL_STATE,
  action:
    | AddNoteAction
    | FetchNotesAction
    | UpdateNoteAction
    | RemoveNoteAction
    | LogoutAction
) => {
  const stateCopy = [...state];
  let index = -1;
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.payload];
    case "UPDATE_NOTE":
      index = stateCopy.findIndex((note) => {
        if (note._id) {
          return note._id === action.payload._id;
        }
        return note.localId === action.payload.localId;
      });
      stateCopy[index] = action.payload;
      return stateCopy;
    case "FETCH_NOTES":
      return [...action.payload];
    case "REMOVE_NOTE":
      index = stateCopy.findIndex((note) => {
        return note._id === action.payload;
      });
      stateCopy.splice(index, 1);
      return stateCopy;
    case "LOGOUT":
      return [];
    default:
      return state;
  }
};

export default NotesReducer;
