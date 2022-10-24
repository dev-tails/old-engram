export type Entry = {
  date: string;
  body: string;
};

export function getLocalDateString(date: Date) {
  const tzoffset = date.getTimezoneOffset() * 60000;
  return new Date(date.valueOf() - tzoffset).toISOString().slice(0, 10);
}

export async function fetchEntryForDate(date: Date): Promise<Entry> {
  const res = await fetch(`/api/entries/${getLocalDateString(date)}`);
  const jsonData = await res.json();
  return jsonData.data;
}

export async function postEntry(entry: Entry): Promise<boolean> {
  const res = await fetch(`/api/entries/${entry.date}`, {
    method: "POST",
    body: JSON.stringify(entry),
    headers: {
        "Content-Type": "application/json"
    }
  });
  return res.ok;
}
