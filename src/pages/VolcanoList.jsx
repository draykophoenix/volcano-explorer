import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

import { Button, Badge, Input, Label, FormGroup, Form } from "reactstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import { useCountries, useVolcanoList } from "../api";

export default function VolcanoList() {
  // Countries for the input box 
  const {loading: countriesLoading, countries, error: countriesError} = useCountries();
  //
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
  <div>
    <h1>Volcanos</h1>
    <div className="container">

      {countriesLoading ? (
        <p>Loading... </p>
      ) : (
        <Form inline>
          <FormGroup floating>
            <Input
              className="input"
              id="country"
              name="country"
              type="select"
              value={selectedCountry}
              placeholder="Country"
              onChange={(event) => {
                setSelectedCountry(event.target.value); 
              }} 
            >
              <option value={""}></option>
              {countries.map((country) => (
              <option key={country}>{country}</option>
              ))}
            </Input>
            <Label for="country">Country</Label>
          </FormGroup>
        </Form>
      )}

      <VolcanoTable selectedCountry= {selectedCountry}/>

      <Button
        color="secondary"
        size="sm"
        className="mt-3"
        href="http://sefdb02.qut.edu.au:3001/"
        target="_blank"
        >
          Go to Volcano API
      </Button>
  </div>
  </div>
  );
}

  

  function VolcanoTable ( {selectedCountry = []} ) {
  // Volcano data for rows in the volcano table
  const {volcanoListLoading, volcanoList, volcanoListError} = useVolcanoList(selectedCountry);
  // Allows table to navigate with React Router
  const navigate = useNavigate();

  const columns = [
    { headerName: "ID", field:"id", sortable: true, width: 70, filter: "agNumberColumnFilter"},
    { headerName: "Name", field: "name", sortable: true, filter: "agTextColumnFilter" },
    { headerName: "Region", field: "region", sortable: true },
    { headerName: "Subregion", field: "subregion", sortable: true, width:230, filter: "agTextColumnFilter" },
  ];

  return (
    <div className= "container">

    <p>
      <Badge color="secondary">{volcanoList.length}</Badge> &nbsp;Volcano{volcanoList.length === 1 ? "" : "s"} found in {selectedCountry}
    </p>

    <div 
      className="ag-theme-balham-dark"
      style={{
        height: "300px",
        width: "700px"
      }}
    >
      <AgGridReact
        columnDefs={columns}
        rowData={volcanoList}
        pagination= {true} 
        paginationPageSize= {7}
        onRowClicked={(row) => navigate(`./volcano?id=${row.data.id}`)}
      />
    </div>
  </div>
  )
}
