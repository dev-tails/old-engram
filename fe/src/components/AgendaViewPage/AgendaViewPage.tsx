import React, { useEffect, useState } from "react";
import moment from "moment";
import { createOrUpdateNote, getNotes, Note } from "../notes/NotesApi";
import { Header } from "../header/Header";
import { AgendaView } from "../AgengaView/AgendaView";

type AgendaViewProps = {};

export const AgendaViewPage: React.FC<AgendaViewProps> = (props) => {
  const [date, setDate] = useState<Date>(moment().startOf("day").toDate());
  const [items, setItems] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      const dateAsMoment = moment(date);

      const newItems = await getNotes({
        since: dateAsMoment.startOf("day").toDate(),
        before: dateAsMoment.endOf("day").toDate(),
      });
      setItems(newItems);
      setLoading(false);
    }

    fetchNotes();
  }, [date]);

  const handleNoteSaved = async (note: Note) => {
    await createOrUpdateNote(note);
  };

  const handleArrowClicked = (direction: string) => {
    if (direction === "left") {
      setDate(moment(date).subtract(1, "d").toDate());
    } else {
      setDate(moment(date).add(1, "d").toDate());
    }
  };

  const title = date.toLocaleDateString();

  return (
    <div className="agenda-view">
      <Header
        title={title}
        showArrows={true}
        onArrowClicked={handleArrowClicked}
      />
      <div className="agenda-view-content">
        {!loading && (
          <AgendaView date={date} items={items} onSave={handleNoteSaved} />
        )}
      </div>
    </div>
  );
};
