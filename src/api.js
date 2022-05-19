import {useState, useEffect} from "react";

export function useCountries () {
    const [loading, setLoading] = useState (false);
    //const [countries, setCountries] = useState([]);

    const countries = ["Algeria","Antarctica","Argentina","Armenia","Australia","Bolivia","Burma (Myanmar)","Cameroon"]

    // Needs error handeling
    // useEffect(() => {
    //   getCountriesByQuery().then((countries => {
    //     setCountries(countries);
    //     setLoading(false);
    //   }))
    // });

    return {loading, countries, error:null};
}

function getCountriesByQuery() {
  const url = `http://sefdb02.qut.edu.au:3001/countries`
  return fetch(url).then(res => res.json())
}

export function getVolcanoDataByQuery(country) {
    const [rowData, setRowData] = useState([]);
    const url = `http://sefdb02.qut.edu.au:3001/volcanoes/?country=${country}`

    useEffect(() => {
        fetch(url)
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
      }, [])

      return {rowData, error:null}
}

