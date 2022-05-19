import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";

import { Button, Badge } from "reactstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function VolcanoList() {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { headerName: "Title", field: "title" },
    { headerName: "Author", field: "author", sortable: true },
    { headerName: "Edition Count", field: "editionCount", sortable: true },
    { headerName: "Book ID", field: "id" },
  ];

  useEffect(() => {
    fetch("http://openlibrary.org/subjects/drama.json?published_in=2000")
      .then(res => res.json())
      .then(data => data.works)
      .then(works =>
        works.map(book => {
          return {
            title: book.title,
            author: book.authors[0].name,
            editionCount: book.edition_count,
            id: book.cover_id
          };
        })
        )
        .then(books => setRowData(books));
  })


  return (
  <div className= "container">
      <h1>Book Catalouge</h1>
      <p><Badge color="success">{rowData.length}</Badge> Books published in 2000 in the Drama catageory</p>
      <div 
        className="ag-theme-balham"
        style={{
          height: "300px",
          width: "800px"
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination= {true} 
          paginationPageSize= {7}
          onRowClicked={(row) => navigate(`./volcano?title=${row.data.title}`)}
        />

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
  </div>
  );
}
