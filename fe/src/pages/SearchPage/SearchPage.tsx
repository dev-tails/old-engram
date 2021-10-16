import { List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation';
import * as NotesApi from '../../components/notes/NotesApi';
import TextBox from '../../components/textbox/TextBox';

type SearchPageProps = {};

export const SearchPage: React.FC<SearchPageProps> = (props) => {
  const [notes, setNotes] = useState<NotesApi.Note[]>([]);

  // const notes = [
  //   {
  //     body: "This is a test",
  //     date: "2021-10-01",
  //   },
  //   {
  //     body: "This is a test",
  //     date: "2021-10-01",
  //   },
  //   {
  //     body: "This is a test",
  //     date: "2021-10-01",
  //   },
  //   {
  //     body: "This is a test",
  //     date: "2021-10-01",
  //   },
  //   {
  //     body: "This is a test",
  //     date: "2021-10-01",
  //   },
  // ];

  function handleSubmit(note: Partial<NotesApi.Note>) {
    if (note.body) {
      NotesApi.searchNotes(note.body).then(setNotes);
    }
  }

  function handleBottomNavChanged() {}

  return (
    <div className="search-page page">
      <div className="page__content">
        <div className="page__container">
          <List>
            {notes.map((note) => {
              return (
                <ListItem>
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
