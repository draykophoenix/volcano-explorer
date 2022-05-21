import {useState, useEffect} from "react";

export function useCountries () {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);

    // Needs error handeling
    useEffect(() => {
      getCountries()
      .then((countries => {
        setCountries(countries);  
      }))
     .then(() => setLoading(false));
    }, [] );

    return {loading, countries, error:null};
}

function getCountries() {
  const url = `http://sefdb02.qut.edu.au:3001/countries`
  return (
    fetch(url)
      .then(res => res.json())
  )
}

export function useVolcanoList(country) {
  const [loading, setLoading] = useState(true);
  const [volcanoList, setVolcanoList] = useState([]);

  useEffect(() => {
    if (country != "") {
      getVolcanoListByQuery(country)
        .then((volcanoList) => {
          setVolcanoList(volcanoList);
        })
        .then(() => setLoading(false));
    }
  }, [country]);

  return { loading, volcanoList, error:null };
}

function getVolcanoListByQuery(country) {
    const url = `http://sefdb02.qut.edu.au:3001/volcanoes/?country=${country}`

    return(
      fetch(url)
        .then(res => res.json())
        .then(data =>
          data.map(volcano => {
            return {
              id: volcano.id,
              name: volcano.name,
              region: volcano.region,
              subregion: volcano.subregion,
            };
          })
        )
    )
}

export function useVolcanoData(id) {
  const [loading, setLoading] = useState(true);
  const [volcanoData, setVolcanoData] = useState([]);

  useEffect(() => {
    if (id != "") {
      getVolcanoDataByQuery(id)
        .then((volcanoData) => {
          setVolcanoData(volcanoData);
        })
        .then(() => setLoading(false));
    }
  }, [id]);

  return { loading, volcanoData, error:null };
}

function getVolcanoDataByQuery(id) {
    const url = `http://sefdb02.qut.edu.au:3001/volcano/${id}`

    return(
      fetch(url)
        .then(res => res.json())
    )
}

