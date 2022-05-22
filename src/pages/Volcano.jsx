import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Map, Marker } from "pigeon-maps";
import { stamenTerrain } from 'pigeon-maps/providers'

import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { useVolcanoData } from "../api";

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const {loading: volcanoDataLoading, volcanoData, error: volcanoDataError} = useVolcanoData(id);

    return (
        <div className="page">
            <h1>{volcanoData.name}</h1>
            <div className="container">
                <div className="inline_container">
                    {volcanoDataLoading ? (
                        <p>Loading ...</p>
                    ) : (
                        <div>
                            <div id="map">
                            <VolcanoMap {...volcanoData}/>
                            </div>
                            <div id="data">
                            <VolcanoInformation {...volcanoData}/>
                            </div>
                        </div>
                    )}
                </div>

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
            <ListGroup type="unstyled">
                <ListGroupItem>Country: {country}</ListGroupItem>
                <ListGroupItem>Region: {region}</ListGroupItem>
                <ListGroupItem>Subregion: {subregion}</ListGroupItem>
                <ListGroupItem>Last Eruption: {last_eruption}</ListGroupItem>
                <ListGroupItem>Summit: {summit}</ListGroupItem>
                <ListGroupItem>Elevation: {elevation}</ListGroupItem>
            </ListGroup>
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