import React, { useEffect, useState } from "react";
import "./DayAgendaCollection.scss";
import {
  Note,
  getNotes,
  removeNote,
  updateNote,
  createNote,
  GetNotesParams,
} from "../notes/NotesApi";
import { Header } from "../header/Header";
import { ListWidget, ListWidgetProps } from "../widgets/ListWidget/ListWidget";
import moment from "moment";
import { objectIdFromDate } from "../../utils/ObjectId";

type DayAgendaCollectionProps = {};

export const DayAgendaCollection: React.FC<DayAgendaCollectionProps> = (
  props
) => {
  const [date, setDate] = useState<Date>(moment().startOf("day").toDate());
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const title = date.toLocaleDateString();

  useEffect(() => {
    const getNotesParams: GetNotesParams = {};
    getNotesParams.since_id = objectIdFromDate(date);
    getNotesParams.max_id = objectIdFromDate(
      moment(date).endOf("day").toDate()
    );

    getNotes(getNotesParams).then((notes) => {
      setAllNotes(notes);
    });
  }, [date]);

  const handleSubmit = async (note: Partial<Note>) => {
    const newNote = await createNote(note);
    setAllNotes([newNote, ...allNotes]);
  };

  const handleItemChanged: ListWidgetProps["onItemChanged"] = (item, index) => {
    if (item._id) {
      updateNote(item);
    } else {
      return handleSubmit(item);
    }

    const notesCopy = Array.from(allNotes);
    const oldNote = allNotes[index];
    let newNote: Note = {
      ...oldNote,
      ...item,
    };
    let itemsToReinsert = [newNote];
    if (item.archived) {
      itemsToReinsert = [];
    }

    notesCopy.splice(index, 1, ...itemsToReinsert);
    setAllNotes(notesCopy);
  };

  const handleItemDeleted = (itemId?: string) => {
    removeNote(itemId);
    const notesCopy = Array.from(allNotes);
    const index = notesCopy.findIndex((item) => item._id === itemId);
    notesCopy.splice(index, 1);
    setAllNotes(notesCopy);
  };

  const handleArrowClicked = (direction: string) => {
    if (direction === "left") {
      setDate(moment(date).subtract(1, "d").toDate());
    } else {
      setDate(moment(date).add(1, "d").toDate());
    }
  };

  const events = allNotes.filter((note) => note.type === "event");
  const notes = allNotes.filter((note) => !note.type || note.type === "note");
  const tasks = allNotes.filter((note) => note.type === "task");

  return (
    <div className="agenda-page">
      <Header title={title} showArrows onArrowClicked={handleArrowClicked} />
      <div className="agenda-content">
        <div className="columns">
          <div className="column events">
            <ListWidget
              items={events}
              onItemChanged={handleItemChanged}
              onItemDeleted={handleItemDeleted}
            />
          </div>
          <div className="column tasks">
            <ListWidget
              items={tasks}
              onItemChanged={handleItemChanged}
              onItemDeleted={handleItemDeleted}
            />
          </div>
          <div className="column notes">
            <ListWidget
              items={notes}
              onItemChanged={handleItemChanged}
              onItemDeleted={handleItemDeleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
