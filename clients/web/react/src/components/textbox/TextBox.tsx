import './TextBox.scss';

import { IconButton, List, ListItem, ListItemText, SvgIcon, TextField } from '@material-ui/core';
import { ArrowUpward, AttachFile } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';

import { isPluginEnabled, PluginName } from '../../Plugins';
import * as GoogleUtils from '../../utils/GoogleUtils';
import { isMobileUserAgent } from '../../utils/UserAgentUtils';
import { ReactComponent as EventIcon } from '../icons/EventIcon.svg';
import { ReactComponent as NoteIcon } from '../icons/NoteIcon.svg';
import { ReactComponent as TaskCompletedIcon } from '../icons/TaskCompletedIcon.svg';
import { ReactComponent as TaskIcon } from '../icons/TaskIcon.svg';
import * as NotesApi from '../notes/NotesApi';

type TextBoxProps = {
  initialBody: string;
  initialType: NotesApi.NoteType;
  focused: boolean;
  onSubmit: (note: Partial<NotesApi.Note>) => void;
};

export default function TextBox(props: TextBoxProps) {
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<NotesApi.NoteType>(props.initialType);
  const [note, setNote] = useState(props.initialBody);

  useEffect(() => {
    if (props.focused) {
      refocusInput();
    }
  }, [props.focused]);

  useEffect(() => {
    if (props.initialBody) {
      setNote(props.initialBody);
    }
  }, [props.initialBody]);

  useEffect(() => {
    if (props.initialType) {
      setType(props.initialType);
    }
  }, [props.initialType]);

  const handleNoteChanged: React.TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] = (
    event
  ) => {
    let newNote = event?.target?.value;
    setNote(newNote);
  };

  const handleKeyDown: React.DOMAttributes<HTMLDivElement>["onKeyDown"] = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey && !isMobileUserAgent()) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.onSubmit({
      body: note,
      type,
    });

    setNote("");

    refocusInput();
  };

  const refocusInput = () => {
    console.log("refocus input")
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  function getNoteIcon(note: NotesApi.Note) {
    const type = note.type || "note";

    const iconByType = {
      note: NoteIcon,
      task: TaskIcon,
      task_completed: TaskCompletedIcon,
      event: EventIcon,
    };

    return <SvgIcon component={(iconByType as any)[type]}></SvgIcon>;
  }

  const types: NotesApi.NoteType[] = [
    "note",
    "task",
    "task_completed",
    "event",
  ];
  function handleToggleType() {
    const currentTypeIndex = types.indexOf(type);
    let nextTypeIndex = (currentTypeIndex + 1) % types.length;
    setType(types[nextTypeIndex]);
  }

  function handleAttachFileClicked() {
    hiddenFileInput.current?.click();
  }

  async function handleFileChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const folderId = localStorage.getItem("google-folder-id");

    if (!files || !folderId) {
      return;
    }

    const file = files[0];
    const res = await GoogleUtils.uploadFile({
      file: file,
      folderId: folderId,
    });

    props.onSubmit({
      body: `[${file.name}](${res.result.embedLink})`,
    });
  }

  return (
    <div className="textbox">
      <List disablePadding={true}>
        <ListItem>
          <IconButton edge="start" onClick={handleToggleType}>
            {getNoteIcon({ type })}
          </IconButton>

          {isPluginEnabled(PluginName.PLUGIN_GOOGLE) ? (
            <>
              <IconButton onClick={handleAttachFileClicked}>
                <AttachFile />
              </IconButton>
              <input
                ref={hiddenFileInput}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChanged}
              />
            </>
          ) : null}

          <ListItemText>
            <TextField
              inputRef={textFieldRef}
              autoFocus
              multiline
              rowsMax={8}
              value={note}
              onKeyDown={handleKeyDown}
              onChange={handleNoteChanged}
              fullWidth
              focused={true}
            />
          </ListItemText>

          <IconButton edge="end" onClick={handleSubmit}>
            <ArrowUpward />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
}
