import React from "react";
import moment from "moment";
import "./AgendaView.scss";
import { Note } from "../notes/NotesApi";
import { NoteItem } from "../notes/NoteItem/NoteItem";

type AgendaViewProps = {
  date: Date;
  items: Note[];
  onSave: (note: Note) => Promise<void>;
};

export const AgendaView: React.FC<AgendaViewProps> = ({
  date,
  items,
  onSave,
}) => {
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

  return (
    <div className="agenda-view">
      {itemsByHour.map((items, index) => {
        let iterationMoment = moment().startOf("day").hour(index).minutes(0);
        let timeString = iterationMoment.format("h A");

        return (
          <div className="agenda-view-item" key={`${date}-${index}`}>
            <div className="agenda-view-item-left">{timeString}</div>
            <div className="agenda-view-item-content">
              {[0, 30].map((minutes) => {
                let startDate = moment(date)
                  .hour(index)
                  .minutes(minutes)
                  .toDate();
                let itemForMinutes = items.find((item) => {
                  return moment(item.start).isSame(startDate, "minute");
                });
                if (!itemForMinutes) {
                  itemForMinutes = {
                    body: "",
                    start: startDate,
                  };
                }

                return (
                  <div
                    className="agenda-view-slot"
                    key={`${date}-${index}-${minutes}`}
                  >
                    <NoteItem note={itemForMinutes} onSave={onSave} />
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
