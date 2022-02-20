import { Div } from "../components/Div";
import { TextArea } from "../components/TextArea";
import { getDate } from "../services/DateService";
import { getEntryForDate, saveEntry } from "../services/EntryService";
import { setStyle } from "../utils/DomUtils";

export function JournalEntry() {
  const el = Div();

  setStyle(el, {
    height: "calc(100vh - 50px)",
    width: "100%",
    maxWidth: "960px",
    resize: "horizontal",
    margin: "0 auto",
  });

  const textarea = TextArea();

  setStyle(textarea, {
    resize: "none",
    height: "100%",
  });

  el.append(textarea);

  async function init() {
    const entry = await getEntryForDate(getDate());

    if (entry) {
      textarea.value = entry.body;
    }

    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    let lastSavedBody = entry.body;

    setInterval(async () => {
      console.log("interval")
      const currentBody = textarea.value;
      if (currentBody !== lastSavedBody) {
        await saveEntry(currentBody);
        lastSavedBody = currentBody;
      }
    }, 5000);
  }

  init();

  return el;
}
