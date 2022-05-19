import React, {useState, useEffect} from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function VolcanoList() {
  const [rowData, setRowData] = useState([]);

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
  <div>
    <h2>Volcano</h2>
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
      />
    </div>
  </div>
  );
}
