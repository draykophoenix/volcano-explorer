import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

import { Button, Badge, Input, Label, FormGroup, Form } from "reactstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import { useCountries, useVolcanoList } from "../api";
import { API_URL } from "..";

export default function VolcanoList() {
  // Countries for the input box 
  const {loading: countriesLoading, countries, error: countriesError} = useCountries();
  //
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPopulated, setSelectedPopulated] = useState("");

  return (
  <div className="Page">
    <h1>Volcanos</h1>
    <div className="container">

      {countriesLoading ? (
        <p>Loading... </p>
      ) : (
        <Form>
          <div id="country_block">
            <FormGroup floating>
              <Input
                className="input"
                id="country"
                name="country"
                type="select"
                placeholder="Country"
                value={selectedCountry}
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
          </div>
          
          <div id="populated_block">
            <FormGroup>
              <Label id= "input_label" for="populated">Populated within</Label>
              <Input
                disabled={(localStorage.getItem("instance") === null)}
                className="input"
                id="populated"
                name="populated"
                type="select"
                placeholder="Populated within"
                value={selectedPopulated}
                onChange={(event) => {
                  setSelectedPopulated(event.target.value); 
                }} 
              >
                <option value="">Any</option>
                <option>5km</option>
                <option>10km</option>
                <option>30km</option>
                <option>100km</option>
              </Input>
            </FormGroup>
          </div>
        </Form>
      )}

      <VolcanoTable selectedCountry= {selectedCountry} selectedPopulated = {selectedPopulated}/>

      <Button
        color="secondary"
        size="sm"
        className="mt-3"
        href= {API_URL}
        target="_blank"
        >
          Go to Volcano API
      </Button>
    </div>
  </div>
  );
}

  

  function VolcanoTable ( {selectedCountry, selectedPopulated } ) {
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
        onRowClicked={(row) => navigate(`./volcano?id=${row.data.id}${(selectedPopulated === "") ? "" : `populatedWithin=${selectedPopulated}`}`)}
      />
    </div>
  </div>
  )
}
