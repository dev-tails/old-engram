import React, { useEffect, useState } from "react";
import "./NotesPage.scss";
import { Note, getNotes, GetNotesParams } from "./NotesApi";
import { Header } from "../header/Header";
import moment from "moment";
import { objectIdFromDate } from "../../utils/ObjectId";
import { CollapsibleNotesList } from "./CollapsibleNotesList/CollapsibleNotesList";

export type NotesPageProps = {
  daily?: boolean;
};

export default function NotesPage(props: NotesPageProps) {
  const [date, setDate] = useState<Date>(moment().startOf("day").toDate());
  const [notes, setNotes] = useState<Note[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  let title = "Archive";
  if (props.daily) {
    title = date.toLocaleDateString();
  }

  useEffect(() => {
    const getNotesParams: GetNotesParams = {};
    if (props.daily) {
      getNotesParams.since_id = objectIdFromDate(date);
      getNotesParams.max_id = objectIdFromDate(
        moment(date).endOf("day").toDate()
      );
    }

    getNotes(getNotesParams).then((notes) => {
      setNotes(notes);
      setLastUpdate(moment().format());
    });
  }, [date, props.daily]);

  const handleArrowClicked = (direction: string) => {
    if (direction === "left") {
      setDate(moment(date).subtract(1, "d").toDate());
    } else {
      setDate(moment(date).add(1, "d").toDate());
    }
  };

  return (
    <div className="notes-page">
      <Header
        title={title}
        showArrows={props.daily}
        onArrowClicked={handleArrowClicked}
      />
      <CollapsibleNotesList key={lastUpdate} notes={notes} />
    </div>
  );
}
