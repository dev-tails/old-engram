import { Note } from '../../components/notes/NotesApi';
import { SetNoteAction, SetNoteBodyAction, SetNoteTypeAction } from '../actions/NoteActions';

const INITIAL_STATE: Partial<Note> = { body: "" };

const NoteReducer = (
  state = INITIAL_STATE,
  action: SetNoteAction | SetNoteBodyAction | SetNoteTypeAction
) => {
  switch (action.type) {
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
