import "./AgendaView.scss";

import moment from "moment";
import React, { useEffect, useRef } from "react";

import { CollapsibleNoteItem } from "../notes/CollapsibleNoteItem/CollapsibleNoteItem";
import { Note, NoteType } from "../notes/NotesApi";

type AgendaViewProps = {
  type: NoteType;
  date: Date;
  items: Note[];
  onSave: (note: Note) => Promise<void>;
  onDelete: (note: Note) => Promise<void>;
};

export const AgendaView: React.FC<AgendaViewProps> = ({
  type,
  date,
  items,
  onSave,
  onDelete,
}) => {
  const activeHourRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeHourRef.current) {
      activeHourRef.current.scrollIntoView();
    }
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

  return (
    <div className="agenda-view">
      {itemsByHour.map((items, index) => {
        let isActiveHour = index === 7;
        let isCurrentHour = false;
        if (moment(date).isSame(moment(), "day")) {
          isCurrentHour = index === moment().hour();
          isActiveHour = isCurrentHour;
        }

        let iterationMoment = moment().startOf("day").hour(index).minutes(0);
        let timeString = iterationMoment.format("HH:mm");

        return (
          <div
            className={`agenda-view-item ${isCurrentHour ? "current" : ""}`}
            key={`${date}-${index}`}
            ref={isActiveHour ? activeHourRef : null}
          >
            <div className="agenda-view-item-left">{timeString}</div>
            <div className="agenda-view-item-content">
              {[0, 15, 30, 45].map((minutes) => {
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
                    <CollapsibleNoteItem
                      activeId=""
                      defaultType={type}
                      note={itemForMinutes}
                      onSave={onSave}
                      onActivate={() => {}}
                      onDelete={onDelete}
                    />
                    {/* <NoteItem note={itemForMinutes} onSave={onSave} /> */}
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
