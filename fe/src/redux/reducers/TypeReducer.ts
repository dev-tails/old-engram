import { NoteType } from '../../components/notes/NotesApi';
import { SetNoteTypeFilterAction } from '../actions/TypeActions';

const INITIAL_STATE: NoteType | null = "note";

const TypeReducer = (
  state = INITIAL_STATE,
  action: SetNoteTypeFilterAction
) => {
  switch (action.type) {
    case "SET_NOTE_TYPE_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export default TypeReducer;
