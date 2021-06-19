import { BottomNavigation as MaterialBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { List as ListIcon } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNoteTypeFilter } from '../../redux/actions/TypeActions';
import { BulletIcon } from '../notes/BulletIcon/BulletIcon';
import { NoteType } from '../notes/NotesApi';

type BottomTypeNavigatorProps = {};

export const BottomTypeNavigator: React.FC<BottomTypeNavigatorProps> = (
  props
) => {
  const dispatch = useDispatch();
  const type = useSelector((state: any) => state.type);

  function handleChange(event: any, newValue: NoteType) {
    setNoteTypeFilter(dispatch, newValue);
  }

  return (
    <div className="bottom-type-navigator">
      <MaterialBottomNavigation value={type} onChange={handleChange} showLabels>
        <BottomNavigationAction label="All" value="all" icon={<ListIcon />} />
        <BottomNavigationAction
          label="Notes"
          value="note"
          icon={
            <BulletIcon
              note={{ type: "note" }}
              color={type === "note" ? "#90caf9" : ""}
            />
          }
        />
        <BottomNavigationAction
          label="Tasks"
          value="task"
          icon={
            <BulletIcon
              note={{ type: "task" }}
              color={type === "task" ? "#90caf9" : ""}
            />
          }
        />
        <BottomNavigationAction
          label="Events"
          value="event"
          icon={
            <BulletIcon
              note={{ type: "event" }}
              color={type === "event" ? "#90caf9" : ""}
            />
          }
        />
      </MaterialBottomNavigation>
    </div>
  );
};
