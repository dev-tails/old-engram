import { combineReducers } from 'redux';

import DateReducer from './DateReducer';
import NoteReducer from './NoteReducer';
import NotesReducer from './NotesReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  user: UserReducer,
  note: NoteReducer,
  notes: NotesReducer,
  date: DateReducer,
});
