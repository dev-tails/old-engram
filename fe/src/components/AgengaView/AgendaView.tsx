import React from "react";
import moment from "moment";
import "./AgendaView.scss";
import { createOrUpdateNote, Note } from "../notes/NotesApi";
import { NoteItem } from "../notes/NoteItem/NoteItem";
import { Header } from "../header/Header";

type AgendaViewProps = {};

export const AgendaView: React.FC<AgendaViewProps> = (props) => {
  const now = moment();

  const items: Note[] = [
    {
      body: "Run 1 mile",
      start: now.hour(9).toDate(),
    },
    {
      body: "Make smoothie",
      start: now.hour(9).toDate(),
    },
  ];

  const itemsByHour: Array<Note[]> = [];
  for (let i = 0; i < 24; i++) {
    itemsByHour.push([]);
  }

  for (const item of items) {
    itemsByHour[moment(item.start).hour()].push(item);
  }

  const handleNoteSaved = async (note: Note) => {
    await createOrUpdateNote(note);
  };

  return (
    <div className="agenda-view noselect">
      <Header title="Agenda" />
      {itemsByHour.map((items, index) => {
        const minSlots = 2;
        const itemsCopy = Array.from(items);
        if (itemsCopy.length < minSlots) {
          for (let i = 0; i < minSlots; i++) {
            let startDate = moment()
              .hour(index)
              .minutes(i * (60 / minSlots))
              .toDate();

            itemsCopy.push({
              body: "",
              start: startDate,
            });
          }
        }

        return (
          <div className="agenda-view-item">
            <div className="agenda-view-item-left">{index}</div>
            <div className="agenda-view-item-content">
              {itemsCopy.map((item) => {
                return (
                  <div className="agenda-view-slot">
                    <NoteItem note={item} onSave={handleNoteSaved} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
