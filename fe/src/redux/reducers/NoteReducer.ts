import { Note } from '../../components/notes/NotesApi';
import { SetNoteAction, SetNoteBodyAction, SetNoteTypeAction } from '../actions/NoteActions';
import { AddNoteAction } from '../actions/NotesActions';

const INITIAL_STATE: Partial<Note> = { body: "" };

const NoteReducer = (
  state = INITIAL_STATE,
  action: AddNoteAction | SetNoteAction | SetNoteBodyAction | SetNoteTypeAction
) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        body: "",
      };
    case "SET_NOTE":
      return action.payload;
    case "SET_NOTE_BODY":
      return {
        ...state,
        body: action.payload,
      };
    case "SET_NOTE_TYPE":
      return {
        ...state,
        type: action.payload,
      };
    default:
      return state;
  }
};

export default NoteReducer;
