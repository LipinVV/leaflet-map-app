import React, {useEffect, useRef} from 'react';
import L from 'leaflet';
import './App.css';

function App() {
    const mapConfiguration = useRef<L.Map>();
    useEffect(() => {
        const current_lat: number = 60.00775756116897;
        const current_long: number = 30.37321685645868;
        const current_zoom: number = 16;

        if (!mapConfiguration.current) {
            mapConfiguration.current = L.map('map', {
                center: [current_lat, current_long],
                zoom: current_zoom
            });
            L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                subdomains:['mt0','mt1','mt2','mt3'],
                attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapConfiguration.current);
        }
    });



    return (
        <div className="App">
            <div id="map"></div>
        </div>
    );
}

export default App;
