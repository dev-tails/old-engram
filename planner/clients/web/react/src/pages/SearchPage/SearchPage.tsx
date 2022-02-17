import { List, ListItem, ListItemText } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation';
import * as NotesApi from '../../components/notes/NotesApi';
import TextBox from '../../components/textbox/TextBox';
import { setDate } from '../../redux/actions/DateActions';
import { setNoteType } from '../../redux/actions/NoteActions';

type SearchPageProps = {};

export const SearchPage: React.FC<SearchPageProps> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [notes, setNotes] = useState<NotesApi.Note[]>([]);

  function handleSubmit(note: Partial<NotesApi.Note>) {
    if (note.body) {
      NotesApi.searchNotes(note.body).then(setNotes);
    }
  }

  function handleBottomNavChanged(newValue: string) {
    setNoteType(dispatch, newValue);
    history.push("/daily");
  }

  function handleNoteClicked(note: NotesApi.Note) {
    setDate(dispatch, moment(note.date).toDate());
    history.push("/daily");
  }

  return (
    <div className="search-page page">
      <div className="page__content">
        <div className="page__container">
          <div style={{ width: "100%" }}>
            <List disablePadding={true} dense={true}>
              {notes.map((note) => {
                return (
                  <ListItem onClick={handleNoteClicked.bind(this, note)} button>
                    <ListItemText
                      primary={note.body}
                      secondary={note.date}
                    ></ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer__textBox">
          <TextBox
            initialBody=""
            initialType="note"
            focused={true}
            onSubmit={handleSubmit}
          />
        </div>
        <BottomNavigation value={"search"} onChange={handleBottomNavChanged} />
      </div>
    </div>
  );
};
