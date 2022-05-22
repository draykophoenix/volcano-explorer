import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Map, Marker } from "pigeon-maps";
import { stamenTerrain } from 'pigeon-maps/providers'

import { Button } from "reactstrap";
import { useVolcanoData } from "../api";


import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const {loading: volcanoDataLoading, volcanoData, error: volcanoDataError} = useVolcanoData(id);
    return (
        <div className="page">
            <h1>{volcanoData.name}</h1>
            <div className="container">
                    {volcanoDataLoading ? (
                        <p>Loading ...</p>
                    ) : (
                        <div>
                            <div id="map">
                                <VolcanoMap {...volcanoData}/>
                            </div>
                            <h5 id="chart_heading">Populated Within</h5>
                            <div className="inline_container">
                                <div id="data">
                                    <VolcanoInformation {...volcanoData}/>
                                </div>
                                <div id="chart">
                                    {localStorage.getItem("instance") === null ? (
                                        <i>...login to access population statistics...</i>
                                    ) : (
                                        <div>
                                            {console.log(localStorage.getItem("instance"))}
                                        <VolcanoChart {...volcanoData}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                <Button
                    color="secondary"
                    size="sm"
                    className="mt-3"
                    onClick={() => navigate("../volcano-list")}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}

function VolcanoInformation ({ country, region, subregion, last_eruption, summit, elevation}) {
    return(
        <div>
            <ul type="inline">
                <li>Country: {country}</li>
                <li>Region: {region}</li>
                <li>Subregion: {subregion}</li>
                <li>Last Eruption: {last_eruption}</li>
                <li>Summit: {summit}</li>
                <li>Elevation: {elevation}</li>
            </ul>
        </div>
    )
}

function VolcanoMap ( {latitude, longitude}) {
return (
    <Map 
        height={300}
        defaultCenter={[latitude, longitude]}
        defaultZoom={7}
    >
        <Marker width={50} anchor={[latitude, longitude]} />
    </Map>
    )
}

function VolcanoChart ( params ) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

    const labels = ["5km", "10km", "30km", "100km"];

    const data = {
      labels,
      datasets: [
        {
          label: 'People',
          data: [params.population_5km, params.population_10km, params.population_30km, params.population_100km],
          backgroundColor: 'rgba(139, 51, 39, 0.9)',
        },
      ],
    };

    return(
        <Bar
            data={data}
        />
    )
}