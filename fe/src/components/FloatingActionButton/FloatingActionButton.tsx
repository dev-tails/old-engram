import './FloatingActionButton.scss';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';

import { AddNoteDialog } from '../AddNoteDialog/AddNoteDialog';
import { Note } from '../notes/NotesApi';

type FloatingActionButtonProps = {
  onSubmit(note: Partial<Note>): void;
};

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (body: string) => {
    onSubmit({ body });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="floating-action-button">
      <AddNoteDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <Fab onClick={setOpen.bind(this, true)}>
        <AddIcon />
      </Fab>
    </div>
  );
};
