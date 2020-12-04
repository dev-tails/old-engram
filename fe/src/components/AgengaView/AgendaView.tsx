import React from "react";
import moment from "moment";
import "./AgendaView.scss";
import { Note } from "../notes/NotesApi";
import Icon from "../Icon/Icon.svg";

type AgendaViewProps = {};

export const AgendaView: React.FC<AgendaViewProps> = (props) => {
  const now = moment();

  const items = [
    {
      body: "Run 1 mile",
      start: now.hour(9),
      color: "#FF000",
    },
    {
      body: "Make smoothie",
      start: now.hour(9),
      color: "#FF000",
    },
  ];

  const itemsByHour: Array<Note[]> = [];
  for (let i = 0; i < 24; i++) {
    itemsByHour.push([]);
  }

  for (const item of items) {
    itemsByHour[item.start.hour()].push(item);
  }

  return (
    <div className="agenda-view noselect">
      {itemsByHour.map((items, index) => {
        const minSlots = 2;
        const itemsCopy = Array.from(items);
        if (itemsCopy.length < minSlots) {
          for (let i = 0; i < minSlots; i++) {
            itemsCopy.push({
              body: "",
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
                    <div className="icon">
                      {/* <svg height="16" width="16">
                        <line
                          x1="4"
                          y1="8"
                          x2="12"
                          y2="8"
                          style={{
                            stroke: "#000000",
                            strokeWidth: 1,
                          }}
                        />
                      </svg> */}
                    </div>
                    <div>{item.body}</div>
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
