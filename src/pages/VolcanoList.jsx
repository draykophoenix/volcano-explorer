import React from "react";
import { useNavigate} from "react-router-dom";

import { Button, Badge, Input } from "reactstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { getVolcanoDataByQuery } from "../api";

export default function VolcanoList() {
  const navigate = useNavigate();
  const {rowData, error} = getVolcanoDataByQuery();

  const columns = [
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion", sortable: true },
  ];


  return (
  <div className= "container">
      <h1>Book Catalouge</h1>
      <p><Badge color="success">{rowData.length}</Badge> Books published in 2000 in the Drama catageory</p>

      <Input
        type="select"
      >
        <option value={3}>Test</option>
        <option value={3}>Test 2</option>
      </Input>
      <div 
        className="ag-theme-balham"
        style={{
          height: "300px",
          width: "600px"
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination= {true} 
          paginationPageSize= {7}
          onRowClicked={(row) => navigate(`./volcano?title=${row.data.name}`)}
        />
      </div>

      <Button
        color="info"
        size="sm"
        className="mt-3"
        href="http://openlibrary.org/subjects/drama.json?published_in=2000"
        target="_blank"
        >
          Go to Open Library API
        </Button>
  </div>
  );
}
