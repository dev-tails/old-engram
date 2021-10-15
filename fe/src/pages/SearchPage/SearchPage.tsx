import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';

import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation';

type SearchPageProps = {};

export const SearchPage: React.FC<SearchPageProps> = (props) => {
  const notes = [
    {
      body: "This is a test",
      date: "2021-10-01",
    },
    {
      body: "This is a test",
      date: "2021-10-01",
    },
    {
      body: "This is a test",
      date: "2021-10-01",
    },
    {
      body: "This is a test",
      date: "2021-10-01",
    },
    {
      body: "This is a test",
      date: "2021-10-01",
    },
  ];

  function handleSubmit() {}

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

      <div className="search-page__footer">
        <BottomNavigation value={"search"} onChange={handleBottomNavChanged} />
      </div>
    </div>
  );
};
