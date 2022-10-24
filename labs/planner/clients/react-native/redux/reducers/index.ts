import { combineReducers } from "redux";
import NotesReducer from "./NotesReducer";
import DateReducer from "./DateReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
    user: UserReducer,
    notes: NotesReducer,
    date: DateReducer
})