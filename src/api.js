import React, {useState, useEffect} from "react";

export function getCountries () {
    const [countryData, setCountryData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
}



export function getVolcanoDataByQuery() {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch("http://sefdb02.qut.edu.au:3001/volcanoes/?country=Japan")
          .then(res => res.json())
          .then(data =>
            data.map(volcano => {
              return {
                name: volcano.name,
                region: volcano.region,
                subregion: volcano.subregion,
              };
            })
            )
            .then(volcano => setRowData(volcano));
      })

      return {rowData, error:null}
}

