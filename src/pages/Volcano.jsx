import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { useVolcanoData } from "../api";

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");


    const {loading: volcanoDataLoading, volcanoData, error: volcanoDataError} = useVolcanoData(id);

    return (
        <div>
        <h1>{volcanoData.name}</h1>
            <div className="container">

                {volcanoDataLoading ? (
                    <p>Loading ...</p>
                ) : (
                    <VolcanoInformation {...volcanoData}/>
                ) }

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

function VolcanoInformation ({ name, country, region, subregion, last_eruption, summit, elevation}) {
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