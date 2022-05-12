import React, {useReducer, useRef} from 'react';
import {Routes, Route} from "react-router-dom";
import L from "leaflet";
import {DrawingBar} from "./DrawingBar";
import {Map} from "./Map";
import {MarkerList} from "./MarkerList";
import {Navigation} from "./Navigation";
import {NoMatchPage} from "./NoMatchPage";
import {markerType, StateType} from "./types";
import "./App.css";

export enum ACTION {
    ADD_MARKER = 'ADD_MARKER',
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
    let map = useRef<L.Map | null | undefined>();

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Navigation/>}>
                        <Route path='/map' element={<Map map={map} />}/>
                        <Route path='/drawing-bar' element={<DrawingBar />}/>
                        <Route path='/marker-list' element={<MarkerList />}/>
                    </Route>
                    <Route path="*" element={<NoMatchPage/>}/>
                </Routes>
                <Map map={map} />
            </div>
        </StoreContext.Provider>
    );
}

export default App;
