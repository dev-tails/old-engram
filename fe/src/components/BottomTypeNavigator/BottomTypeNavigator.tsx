import { BottomNavigation as MaterialBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { setNoteTypeFilter } from '../../redux/actions/TypeActions';
import { BulletIcon } from '../notes/BulletIcon/BulletIcon';
import { NoteType } from '../notes/NotesApi';

type BottomTypeNavigatorProps = {};

type BottomNavValueType = NoteType | "search";

export const BottomTypeNavigator: React.FC<BottomTypeNavigatorProps> = (
  props
) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const type = useSelector((state: any) => state.type);

  function handleChange(event: any, newValue: BottomNavValueType) {
    if (newValue === "search") {
      return history.push("/search");
    }

    setNoteTypeFilter(dispatch, newValue as NoteType);
  }

  return (
    <div className="bottom-type-navigator">
      <MaterialBottomNavigation value={type} onChange={handleChange} showLabels>
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
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon style={{ fontSize: 18 }}/>}
        />
      </MaterialBottomNavigation>
    </div>
  );
};
