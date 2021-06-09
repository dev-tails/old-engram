import { Dispatch } from "redux";

export async function setDate(dispatch: Dispatch, date: Date) {
  dispatch({ type: "SET_DATE", payload: date });
}
