import React, { useEffect, useState } from "react";
import moment from "moment";
import "./AgendaView.scss";
import { createOrUpdateNote, getNotes, Note } from "../notes/NotesApi";
import { NoteItem } from "../notes/NoteItem/NoteItem";
import { Header } from "../header/Header";

type AgendaViewProps = {};

export const AgendaView: React.FC<AgendaViewProps> = (props) => {
  const [items, setItems] = useState<Note[] | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      const now = moment();

      const newItems = await getNotes({
        since: now.startOf("day").toDate(),
        before: now.endOf("day").toDate(),
      });
      setItems(newItems);
    }

    fetchNotes();
  }, []);

  const itemsByHour: Array<Note[]> = [];
  for (let i = 0; i < 24; i++) {
    itemsByHour.push([]);
  }

  if (items) {
    for (const item of items) {
      if (item.start) {
        itemsByHour[moment(item.start).hour()].push(item);
      }
    }
  }

  const handleNoteSaved = async (note: Note) => {
    await createOrUpdateNote(note);
  };

  return (
    <div className="agenda-view">
      <Header title="Agenda" />
      <div className="agenda-view-content">
        {items &&
          itemsByHour.map((items, index) => {
            let iterationMoment = moment()
              .startOf("day")
              .hour(index)
              .minutes(0);
            let timeString = iterationMoment.format("h A");

            return (
              <div className="agenda-view-item" key={index}>
                <div className="agenda-view-item-left">{timeString}</div>
                <div className="agenda-view-item-content">
                  {[0, 30].map((minutes) => {
                    let startDate = moment()
                      .hour(index)
                      .minutes(minutes)
                      .toDate();
                    let itemForMinutes = items.find((item) => {
                      return moment(item.start).isSame(startDate, "minute");
                    });
                    console.log(itemForMinutes);
                    if (!itemForMinutes) {
                      itemForMinutes = {
                        body: "",
                        start: startDate,
                      };
                    }

                    return (
                      <div className="agenda-view-slot" key={minutes}>
                        <NoteItem
                          note={itemForMinutes}
                          onSave={handleNoteSaved}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
