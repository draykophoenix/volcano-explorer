import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

import { Button, Badge, Input } from "reactstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { useCountries, getVolcanoDataByQuery } from "../api";

export default function VolcanoList() {
  return (
    <div className="container">
      <h1>Book Catalouge</h1>

      <VolcanoTable/>

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

  function VolcanoTable () {
  // Volcano data for rows in the volcano table
  const {rowData, volcanoError} = getVolcanoDataByQuery("Japan");
  // Countries for the input box 
  const {loading, countries, countryError} = useCountries();
  // Allows table to navigate with React Router
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState('');

  const columns = [
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion", sortable: true },
  ];

  return (
    <div className= "container">
    {loading ? (
      <p>Loading... </p>
    ) : (
      <form 
        onSubmit={(event) => {
          event.preventDefault();
          console.log(event.target.elements.country.value);
        }}
      >
        <label htmlFor="country">Country:</label>
        <input id="country" name="country" type="text" />
        <button type="submit">Submit</button>
      </form>
    )}

    <p>
      <Badge color="success">{rowData.length}</Badge> Books published in 2000 in the Drama catageory
    </p>

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
  </div>
  )
}

    {/* {loading ? (
      <p>Loading... </p>
    ) : (
        <Input 
          type="select"
          value={selectedCountry}
          onChange={(entry) => setSelectedCountry(entry.target.value)}
        >
        {countries.map((country) => (
          <option>{country}</option>
        ))}
        </Input>
    )} */}
