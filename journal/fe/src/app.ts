import { Header } from "./views/Header";
import { JournalEntry } from "./views/JournalEntry";

const root = document.getElementById("root");

root.append(Header());

root.append(JournalEntry());
