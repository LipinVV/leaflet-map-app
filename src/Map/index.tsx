import React, {useContext, useEffect, useRef} from "react";
import L from "leaflet";
import {ACTION, StoreContext} from "../App";


export const Map = () => {
    const { dispatch } = useContext(StoreContext);

    const mapContainer: any = useRef();

    let map: any = null;

    useEffect(() => {
        const current_lat: number = 60.00775756116897;
        const current_long: number = 30.37321685645868;
        const current_zoom: number = 16;
        map = L.map(mapContainer.current, {
            center: [current_lat, current_long],
            zoom: current_zoom,
            zoomControl: false
        });

    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
    dispatch({
        action: ACTION.MAP_LOAD,
        data: {map: mapContainer.current}
    })
    return () => map.remove();
}, []);

    return (
        <div id='map'  ref={el => mapContainer.current = el}></div>
    )
}
