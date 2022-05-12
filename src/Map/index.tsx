import React, {useContext, useEffect} from "react";
import L from "leaflet";
import {ACTION, StoreContext} from "../App";
import {MapType} from "../types";


export const Map = ({map}: MapType) => {
    const { dispatch } = useContext(StoreContext);

    useEffect(() => {
        if(!map.current) {
            const current_lat: number = 60.00775756116897;
            const current_long: number = 30.37321685645868;
            const current_zoom: number = 16;
            const ready  = L.map('map', {
                center: [current_lat, current_long],
                zoom: current_zoom,
                zoomControl: false
            });
            L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(ready);
            L.control.zoom({
                position: 'bottomright'
            }).addTo(ready);
            map.current = ready;
            dispatch({
                action: ACTION.MAP_LOAD,
                data: {map: ready}
            })
        }
    })

    return (
        <div id='map'></div>
    )
}

// useEffect(() => {
//     const current_lat: number = 60.00775756116897;
//     const current_long: number = 30.37321685645868;
//     const current_zoom: number = 16;
//
//     if (!state.map.current) {
//         state.map.current = L.map('map', {
//             center: [current_lat, current_long],
//             zoom: current_zoom,
//             zoomControl: false
//         });
//         L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
//             subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
//             attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(state.map.current);
//         L.control.zoom({
//             position: 'bottomright'
//         }).addTo(state.map.current);
//         // map.flyTo([60.00775756116897, 30.37321685645868]);
//         dispatch({
//             action: ACTION.MAP_LOAD,
//             data: {map: map.current}
//         })
//     }
// }, [map]);