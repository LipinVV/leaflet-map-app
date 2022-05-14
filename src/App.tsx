import React, {useEffect, useReducer, useRef} from "react";
import {Routes, Route} from "react-router-dom";
import L from "leaflet";
import {DrawingBar} from "./components/DrawingBar";
import {Map} from "./components/Map";
import {MarkerList} from "./components/MarkerList";
import {Navigation} from "./components/Navigation";
import {NoMatchPage} from "./components/NoMatchPage";
import {markerType, StateType} from "./types";
import "./app.scss";

export enum ACTION {
    ADD_MARKER = 'ADD_MARKER',
    REQUEST_TO_REMOVE_MARKER = 'REQUEST_TO_REMOVE_MARKER',
    REMOVE_MARKER = 'REMOVE_MARKER',
    MAP_LOAD = 'MAP_LOAD',
}

type ActionType = {
    action: ACTION,
    data: any
}

export const INITIAL_STATE: StateType = {
    markers: [],
    map: {}
}

export const StoreContext = React.createContext<{ state: StateType, dispatch: React.Dispatch<any> }>({
    state: INITIAL_STATE,
    dispatch: () => null
});

const reducer = (currentState: StateType, payLoad: ActionType): StateType => {
    switch (payLoad.action) {
        case ACTION.MAP_LOAD:
            return {
                ...currentState,
                map: payLoad.data.map
            }
        case ACTION.ADD_MARKER:
            const updatedMarkers = [...currentState.markers, payLoad.data.marker];
            return {
                ...currentState,
                markers: updatedMarkers
            }
        case ACTION.REQUEST_TO_REMOVE_MARKER:
            return {
                ...currentState,
                markers:  currentState.markers.map((marker: markerType) => {
                    if (marker.options.title === payLoad.data.event) {
                        marker.options.toDelete = payLoad.data.toDelete;
                        if(marker.options.toDelete === true) {
                            marker.openPopup();
                        } else {
                            marker.closePopup();
                        }
                    }
                    return marker;
                })
            }
        case ACTION.REMOVE_MARKER:
            return {
                ...currentState,
                markers: currentState.markers.filter((marker: markerType) => marker !== payLoad.data.markerToDelete)
            }
        default: {
            return currentState;
        }
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const mapContainer: React.MutableRefObject<any> = useRef(null);

    useEffect(() => {
        let map: any = null;
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
            data: {map: map}
        })
        return () => map.remove();
    }, []);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            <div className='app'>
                <Routes>
                    <Route path='/' element={<Navigation />}>
                        <Route path='/drawing-bar' element={<DrawingBar />}/>
                        <Route path='/marker-list' element={<MarkerList />}/>
                    </Route>
                    <Route path="*" element={<NoMatchPage/>}/>
                </Routes>
                <Map mapContainer={mapContainer}   />
            </div>
        </StoreContext.Provider>
    );
}

export default App;
