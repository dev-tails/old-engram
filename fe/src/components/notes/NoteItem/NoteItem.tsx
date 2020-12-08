import { TextareaAutosize } from "@material-ui/core";
import React from "react";
import { NoteIcon } from "./NoteIcon";
import "./NoteItem.scss";

type NoteItemProps = {};

export const NoteItem: React.FC<NoteItemProps> = (props) => {
  return (
    <div className="note-item">
      <NoteIcon />
      <TextareaAutosize />
    </div>
  );
};
