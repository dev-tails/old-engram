import { Note } from '../../api/NoteApi';
import { LogoutAction } from '../actions/UserActions';

const INITIAL_STATE: Note[] = [];

type RemoveNoteAction = {
  type: "REMOVE_NOTE";
  payload: string;
};

type AddNoteAction = {
  type: "ADD_NOTE";
  payload: Note;
};

type UpdateNoteAction = {
  type: "UPDATE_NOTE";
  payload: Note;
};

type FetchNotesAction = {
  type: "FETCH_NOTES";
  payload: Note[];
};

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
        return note._id === action.payload._id;
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
