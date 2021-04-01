import "./DebugNotesPage.scss";

import React, { useEffect, useState } from "react";
import { getNotes, Note } from "../notes/NotesApi";
import { useHistory } from "react-router-dom";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";
import moment from "moment";

type DebugNotesPageProps = {};

export const DebugNotesPage: React.FC<DebugNotesPageProps> = () => {
  const history = useHistory();
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    getNotes().then((pages) => {
      setNotes(pages);
    });
  });

  if (!notes) {
    return null;
  }

  function dateFormatter(params: GridCellParams) {
    return moment(params.value as Date).format("YYYY-MM-DD HH:mm");
  }

  return (
    <div className="debug-notes-page">
      <div className="page-content">
        <div className="actions" style={{ textAlign: "right" }}></div>
        <DataGrid
          autoHeight={true}
          disableColumnResize={undefined}
          rows={notes}
          columns={[
            {
              field: "localId",
              headerName: "ID",
              width: 310,
            },
            { field: "body", headerName: "Body", flex: 1 },
            {
              field: "start",
              headerName: "Start",
              width: 200,
            },
            {
              field: "date",
              headerName: "Date",
              width: 120,
            },
            {
              field: "type",
              headerName: "Type",
              width: 100,
            },
            {
              field: "prev",
              headerName: "Prev",
              width: 310,
            },
            {
              field: "parent",
              headerName: "Parent",
              width: 300,
            },
            {
              field: "updatedAt",
              headerName: "Updated",
              valueFormatter: dateFormatter,
              width: 150,
            },
            {
              field: "createdAt",
              headerName: "Created",
              valueFormatter: dateFormatter,
              width: 150,
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
