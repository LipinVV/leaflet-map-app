import {useContext, useEffect, useState} from "react";
import L from "leaflet";
import {Button, Input, InputLabel, Paper, TextareaAutosize} from "@mui/material";
import {ACTION, StoreContext} from "../../App";
import "./drawingBar.scss";

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

    const endSymbolToCut = 24;
    const currentTime: string = new Date().toString().slice(0, endSymbolToCut);

    const onMapClick = () => {
        state?.map?.on('click', (event: any) => {
            const popUpContent = `${'<Paper evelation="10" class="drawing-bar__pop-up">'}
                <div class="drawing-bar__marker-name-box">
                    <div class="drawing-bar__marker-name">Name: </div>
                    <div> ${markerBody.name}</div>
                </div>
               <div class="drawing-bar__marker-description">Description: ${markerBody.description}</div>
               <div class="drawing-bar__marker-created">Created on: ${markerBody.created}</div>
               <div class="drawing-bar__marker-coordinates">Coordinates: ${event.latlng.lat}, ${event.latlng.lng}</div>
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
                marker.bindPopup(popUpContent);
            }
            setMarkerBody({name: '', created: '', description: ''});
        });
    }

    useEffect(() => {
        if (drawing && state.map) {
            onMapClick();
        }
    }, [drawing, state.map]);

    return (
        <>
            {!drawing ?
                <Paper elevation={10} className='drawing-bar'>
                    <InputLabel className='drawing-bar__input-label'>Name
                        <Input
                            placeholder='type a name'
                            className='drawing-bar__input'
                            autoFocus={true}
                            type='text'
                            value={markerBody.name}
                            onChange={(event) => setMarkerBody({...markerBody, name: event.target.value})}
                        />
                        {markerBody.name.length > 0 && markerBody.name.length < 4 &&
                            <span className='drawing-bar__input-alert'>Type at least 4 symbols</span>
                        }
                    </InputLabel>
                    <InputLabel className='drawing-bar__input-label'>Description
                        <TextareaAutosize
                            className='drawing-bar__text-area'
                            minRows={5}
                            maxRows={8}
                            placeholder="type description"
                            value={markerBody.description}
                            onChange={(event) => setMarkerBody({...markerBody, description: event.target.value})}
                        />
                        {markerBody.description.length > 0 && markerBody.description.length < 4 &&
                            <span className='drawing-bar__input-alert'>Type at least 4 symbols</span>
                        }
                    </InputLabel>
                    <Button
                        className='drawing-bar__confirm-button'
                        variant='button_confirm'
                        disabled={markerBody.name.length < 4 || markerBody.description.length < 4}
                        onClick={() => {
                            onDraw();
                            setMarkerBody({...markerBody, created: currentTime});
                        }}>Confirm
                    </Button>
                </Paper>
                :
                null
            }
        </>
    )
}