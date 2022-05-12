import React, {useEffect} from "react";
import L from "leaflet";


export const Map = ({map}: any) => {
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
                subdomains:['mt0','mt1','mt2','mt3'],
                attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map.current);

            // const fly = () => {
            //     map.flyTo(latlng, 14, { duration: 2 });
            // }
        }
    }, [map]);
    return (
        <div id="map"></div>
    )
}