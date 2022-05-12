import {useContext, useEffect, useState} from "react";
import L from "leaflet";
import {ACTION, StoreContext} from "../App";

// type mapProps = {
//     map:  L.Map
// }

export const DrawingBar = ({map}: any) => {
    type MarkerBody  = {
        name: string,
        description: string,
        created: string
    }

    const {state, dispatch} = useContext(StoreContext);

    const [drawing, setDrawing] = useState<boolean>(false);
    const onDraw = () => setDrawing(true);


    const [markerBody, setMarkerBody] = useState<MarkerBody>({
        name: '',
        description: '',
        created: ''
    });

    const currentTime = new Date().toISOString().slice(0, 10);
    const onMapClick = () => {
        map.current?.on('click', (event: any) => {
            const popUpContent = `${'<div class="drawing-bar__marker-name"></div>'}name: ${markerBody.name}
           <div class="drawing-bar__marker-info">description: ${markerBody.description}</div>
           <div class="drawing-bar__marker-info">coords: ${event.latlng.lat} ${event.latlng.lng}</div>
           <div class="drawing-bar__marker-info">created: ${markerBody.created}</div>
        `;
            const marker = L.marker([event.latlng.lat, event.latlng.lng], {title: markerBody.name}).addTo(map.current);
            if (marker) {
                dispatch({
                    action: ACTION.ADD_MARKER,
                    data: {marker: marker}
                })
                map.current.off('click');
                setDrawing(false);
                marker.bindPopup(popUpContent).openPopup();
            }
            setMarkerBody({name: '', created: '', description: ''});
        });
    }

    useEffect(() => {
        if (drawing) {
            onMapClick();
        }
    }, [drawing, map])
    console.log(markerBody)
    return (
        <div style={{
            width: '300px',
            height: '300px',
            backgroundColor: 'white',
            zIndex: '22222',
            top: '100px',
            position: 'absolute'
        }}>
            <form className='drawing-bar' style={{display: 'grid'}}>
                <label>name
                    <input
                        type='text'
                        value={markerBody.name}
                        onChange={(event) => setMarkerBody({...markerBody, name: event.target.value})}
                    />
                </label>
                <label>description
                    <input
                        type='text'
                        value={markerBody.description}
                        onChange={(event) => setMarkerBody({...markerBody, description: event.target.value})}
                    />
                </label>
            </form>
            <button type='button' onClick={() => {
                onDraw();
                setMarkerBody({...markerBody, created: currentTime});
            }}>Confirm</button>
        </div>
    )
}