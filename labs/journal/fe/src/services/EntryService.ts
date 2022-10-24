import { fetchEntryForDate, getLocalDateString, postEntry } from "../apis/EntryApi";
import { getDate } from "./DateService";

export async function getEntryForDate(date: Date) {
    return fetchEntryForDate(date);
}

export async function saveEntry(body: string) {
    return postEntry({
        date: getLocalDateString(getDate()),
        body
    });
}