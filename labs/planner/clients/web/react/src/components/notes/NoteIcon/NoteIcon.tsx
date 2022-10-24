import { SvgIcon } from '@material-ui/core';
import React from 'react';

import { ReactComponent as EventIcon } from '../../icons/EventIcon.svg';
import { ReactComponent as NoteSvgIcon } from '../../icons/NoteIcon.svg';
import { ReactComponent as TaskCompletedIcon } from '../../icons/TaskCompletedIcon.svg';
import { ReactComponent as TaskIcon } from '../../icons/TaskIcon.svg';
import { NoteType } from '../NotesApi';

type NoteIconProps = {
  type?: NoteType;
};

export const NoteIcon: React.FC<NoteIconProps> = ({ type }) => {
  const iconByType = {
    note: NoteSvgIcon,
    task: TaskIcon,
    task_completed: TaskCompletedIcon,
    event: EventIcon,
  };

  return <SvgIcon component={(iconByType as any)[type || "note"]}></SvgIcon>;
};
