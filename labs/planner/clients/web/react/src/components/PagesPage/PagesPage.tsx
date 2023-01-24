import "./PagesPage.scss";
import React, { useEffect, useState } from "react";
import { createNote, getNotes, Note } from "../notes/NotesApi";
import { useHistory } from "react-router-dom";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";
import moment from "moment";
import { Button } from "@material-ui/core";

type PagesPageProps = {};

export const PagesPage: React.FC<PagesPageProps> = () => {
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
    const newPage = await createNote({ type: "page", body: "" });
    history.push(`/notes/${newPage.localId}`);
  };

  function dateFormatter(params: GridCellParams) {
    return moment(params.value as Date).format("YYYY-MM-DD HH:mm");
  }

  return (
    <div className="pages-page">
      <div className="page-content">
        <div className="actions" style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePageClicked}
          >
            New Page
          </Button>
        </div>
        <DataGrid
          autoHeight={true}
          rows={pages}
          columns={[
            { field: "body", headerName: "Title", flex: 1 },
            {
              field: "updatedAt",
              headerName: "Updated",
              width: 200,
              valueFormatter: dateFormatter,
            },
            {
              field: "createdAt",
              headerName: "Created",
              width: 200,
              valueFormatter: dateFormatter,
            },
          ]}
          getRowId={(row) => {
            return row.localId;
          }}
          onRowClick={(row) => {
            history.push(`/notes/${row.getValue("localId")}`);
          }}
        ></DataGrid>
      </div>
    </div>
  );
};
