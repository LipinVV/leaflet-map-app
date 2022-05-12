import React, {useEffect, useReducer, useRef} from 'react';
import {Routes, Route} from "react-router-dom";
import {DrawingBar} from "./DrawingBar";
import {Map} from './Map';
import {MarkerList} from "./MarkerList";
import {Navigation} from "./Navigation";
import {NoMatchPage} from "./NoMatchPage";
import L from "leaflet";
import './App.css';

export type markerType = {
    _leaflet_id: number;
    name: string,
    description: string
    date: string
}

export type StateType = {
    markers: markerType[],
    map: null
}

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
    map: null
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
    const map = useRef<L.Map | null>();

    useEffect(() => {}, []);

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    console.log('APP', state)
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            <div className="App" style={{position: 'relative'}}>
                <Routes>
                    <Route path='/' element={<Navigation/>}>
                        <Route path='/map' element={<Map map={map}/>}/>
                        <Route path='/drawing-bar' element={<DrawingBar map={map}/>}/>
                        <Route path='/marker-list' element={<MarkerList map={map}/>}/>
                    </Route>
                    <Route path="*" element={<NoMatchPage/>}/>
                </Routes>
                <Map map={map}/>
            </div>
        </StoreContext.Provider>
    );
}

export default App;
