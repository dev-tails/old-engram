import "./PagesPage.scss";
import React, { useEffect, useState } from "react";
import { createNote, getNotes, Note } from "../notes/NotesApi";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

type PagesPageProps = {};

export const PagesPage: React.FC<PagesPageProps> = ({}) => {
  const history = useHistory();
  const [pages, setPages] = useState<Note[] | null>(null);

  useEffect(() => {
    getNotes({
      type: "page",
    }).then((pages) => {
      setPages(pages);
    });
  });

  if (!pages) {
    return null;
  }

  const handleCreatePageClicked = async () => {
    const newPage = await createNote({ body: "" });
    history.push(`/notes/${newPage.localId}`);
  };

  return (
    <div className="pages-page">
      <div className="page-content">
        <List>
          <ListItem onClick={handleCreatePageClicked}>
            <ListItemText primary={"Create Page"}></ListItemText>
          </ListItem>
          {pages.map((page) => {
            return (
              <Link to={`/notes/${page.localId}`}>
                <ListItem>
                  <ListItemText primary={page.body}></ListItemText>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </div>
    </div>
  );
};
