import { Note } from '../../components/notes/NotesApi';
import { SetNoteAction } from '../actions/NoteActions';

const INITIAL_STATE: Partial<Note> | null = null;

const NoteReducer = (state = INITIAL_STATE, action: SetNoteAction) => {
  switch (action.type) {
    case "SET_NOTE":
      return action.payload;
    default:
      return state;
  }
};

export default NoteReducer;
