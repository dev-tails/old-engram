import moment from 'moment';
import { Dispatch } from 'redux';

import { fetchNotes } from './NotesActions';

export async function setDate(dispatch: Dispatch, date: Date) {
  dispatch({ type: "SET_DATE", payload: date });
  fetchNotes(dispatch, { date: moment(date).format("YYYY-MM-DD") });
}
