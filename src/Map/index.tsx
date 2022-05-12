import React, {useContext, useEffect} from "react";
import L from "leaflet";
import {ACTION, StoreContext} from "../App";


export const Map = ({map}: any) => {
    const {state, dispatch } = useContext(StoreContext);
    useEffect(() => {
        const current_lat: number = 60.00775756116897;
        const current_long: number = 30.37321685645868;
        const current_zoom: number = 16;

        if (!map.current) {
            map.current = L.map('map', {
                center: [current_lat, current_long],
                zoom: current_zoom
            });
            L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map.current);
            // map.flyTo([60.00775756116897, 30.37321685645868]);
            dispatch({
                action: ACTION.MAP_LOAD,
                data: {map: map.current}
            })
        }
    }, [map]);
    return (
        <div id="map"></div>
    )
}