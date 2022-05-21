import {useState, useEffect} from "react";

export function useCountries () {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);

    // Needs error handeling
    useEffect(() => {
      getCountriesByQuery()
      .then((countries => {
        setCountries(countries);  
      }))
     .then(() => setLoading(false));
    }, [] );

    return {loading, countries, error:null};
}

function getCountriesByQuery() {
  const url = `http://sefdb02.qut.edu.au:3001/countries`
  return (
    fetch(url)
      .then(res => res.json())
  )
}

export function useVolcanoData(country) {
  const [loading, setLoading] = useState(true);
  const [volcanoData, setVolcanoData] = useState([]);

  useEffect(() => {
    if (country != "") {
      getVolcanoDataByQuery(country)
        .then((volcanoData) => {
          setVolcanoData(volcanoData);
        })
    }
  }, [country]);

  return { loading, volcanoData, error:null };
}

function getVolcanoDataByQuery(country) {
    const url = `http://sefdb02.qut.edu.au:3001/volcanoes/?country=${country}`

    return(
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
    )
}

