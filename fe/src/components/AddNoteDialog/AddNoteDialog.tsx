import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { KeyboardEventHandler, useEffect, useState } from 'react';

type AddNoteDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (body: string) => void;
};

export const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [body, setBody] = useState("");

  const handleCancel = () => {
    onClose();
    setBody("");
  };

  const handleSubmit = () => {
    onSubmit(body);
    setBody("");
  };

  const handleKeyPress: KeyboardEventHandler = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      if (open) {
        event.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleTextFieldChange: TextFieldProps["onChange"] = (event) => {
    setBody(event.currentTarget.value);
  };

  return (
    <div className="add-note-dialog">
      <Dialog
        open={open}
        fullScreen
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogActions>
          <Button onClick={handleCancel} color="primary" title="Esc">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" title="Ctrl+Enter">
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
            onKeyPress={handleKeyPress}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
