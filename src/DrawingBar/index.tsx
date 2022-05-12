import {JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useContext, useEffect, useState} from "react";
import L from "leaflet";
import {ACTION, StoreContext} from "../App";

// type mapProps = {
//     map:  L.Map
// }

export const DrawingBar = ({map}: any) => {
    const {state, dispatch } = useContext(StoreContext);
    const [markers, setMarkers] = useState<any>([]);

    const markerHandler = () => {


    }

    const [drawing, setDrawing]: any = useState(false);
    const onDraw = () => setDrawing(true);

    const popUpContent = `${'<div class="drawing-bar__polygon-name"></div>'}${'marker'}
          <button type="button" class="drawing-bar__polygon-button">${'button'}</button>
        `;

    const takenCoordinates: any = [];
    const onMapClick = () => {
        map.current?.on('click', (event: any) => {
            const coordinate = {latitude: event.latlng.lat, longitude: event.latlng.lng};
            takenCoordinates.push(coordinate);
            const marker = L.marker([event.latlng.lat, event.latlng.lng], {title: 'hello'}).addTo(map.current);
            if(marker) {
                setMarkers([...markers, marker]);
                dispatch({
                    action: ACTION.ADD_MARKER,
                    data: {marker: marker}
                })
                map.current.off('click');
                setDrawing(false);
                marker.bindPopup(popUpContent).openPopup();
            }
        });
    }

    useEffect(() => {
        if (drawing === true) {
            onMapClick();
        }
    }, [drawing, map, takenCoordinates])

    console.log(state)
    return (
        <div style={{
            width: '300px',
            height: '300px',
            backgroundColor: 'white',
            zIndex: '22222',
            top: '100px',
            position: 'absolute'
        }}>
            <button type='button' onClick={onDraw}>Start</button>
            <form className='drawing-bar' style={{display: 'grid'}}>
                <label>name
                    <input type='text'/>
                </label>
                <label>description
                    <input type='text'/>
                </label>
            </form>
        </div>
    )
}