import './FloatingActionButton.scss';

import { Fab } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';

import { Note } from '../notes/NotesApi';

type FloatingActionButtonProps = {
  onSubmit(note: Partial<Note>): void;
};

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    onSubmit({ body });
    setBody("");
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange: TextFieldProps["onChange"] = (event) => {
    setBody(event.currentTarget.value);
  };

  return (
    <div className="floating-action-button">
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="note"
            fullWidth
            multiline
            value={body}
            onChange={handleTextFieldChange}
          />
        </DialogContent>
      </Dialog>
      <Fab onClick={setOpen.bind(this, true)}>
        <AddIcon />
      </Fab>
    </div>
  );
};
