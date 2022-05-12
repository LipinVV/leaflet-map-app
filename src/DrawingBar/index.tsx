import {useContext, useEffect, useState} from "react";
import L from "leaflet";
import {Button} from "@mui/material";
import {Input} from "@mui/material";
import {Paper} from "@mui/material";
import {TextareaAutosize} from "@mui/material";
import {InputLabel} from "@mui/material";
import {ACTION, StoreContext} from "../App";
import "./drawingBar.css";

export const DrawingBar = () => {
    type MarkerBody = {
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

    const currentTime: string = new Date().toString().slice(0, 24);

    const onMapClick = () => {
        state?.map?.on('click', (event: any) => {
            const popUpContent = `${'<Paper evelation="10">' +
            '<div class="drawing-bar__marker-name"></div>'}name: ${markerBody.name}
               <div class="drawing-bar__marker-description">description: ${markerBody.description}</div>
               <div class="drawing-bar__marker-info">coords: ${event.latlng.lat} ${event.latlng.lng}</div>
               <div class="drawing-bar__marker-info">created: ${markerBody.created}</div>
           </Paper>
        `;
            const marker = L.marker([event.latlng.lat, event.latlng.lng], {title: markerBody.name}).addTo(state.map);
            if (marker) {
                dispatch({
                    action: ACTION.ADD_MARKER,
                    data: {marker: marker}
                })
                state.map.off('click');
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
    }, [drawing, state.map])

    return (
        <Paper elevation={10} className='drawing-bar'>
            <InputLabel className='drawing-bar__input-label'>name
                <Input
                    className='drawing-bar__input'
                    autoFocus={true}
                    type='text'
                    value={markerBody.name}
                    onChange={(event) => setMarkerBody({...markerBody, name: event.target.value})}
                />
            </InputLabel>
            <InputLabel className='drawing-bar__input-label'>description
                <TextareaAutosize
                    className='drawing-bar__text-area'
                    minRows={5}
                    maxRows={8}
                    placeholder="type description"
                    value={markerBody.description}
                    onChange={(event) => setMarkerBody({...markerBody, description: event.target.value})}
                />
            </InputLabel>
            <Button
                className='drawing-bar__confirm-button'
                variant='contained'
                disabled={markerBody.name.length < 4 || markerBody.description.length < 4}
                onClick={() => {
                    onDraw();
                    setMarkerBody({...markerBody, created: currentTime});
                }}>Confirm
            </Button>
        </Paper>
    )
}