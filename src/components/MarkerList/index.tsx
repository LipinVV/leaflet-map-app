import {Box, Button, Paper, Stack} from "@mui/material";
import {useContext} from "react";
import {Link} from "react-router-dom";
import {ACTION, StoreContext} from "../../App";
import {markerType} from "../../types";
import "./markerList.scss";

export const MarkerList = () => {
    const {state, dispatch} = useContext(StoreContext);
    const deleteMarkerHandler = (id: number) => {
        const markerToDelete = state.markers.find((marker: markerType) => marker._leaflet_id === id);
        state.map.removeLayer(markerToDelete);
        dispatch({
            action: ACTION.REMOVE_MARKER,
            data: {markerToDelete: markerToDelete}
        })
    }

    return (
        <Paper elevation={10} className='marker-list'>
            {state.markers.length > 0 ? <Stack className='marker-list__markers'>
                    <h4 className='marker-list__header'>List of markers</h4>
                    {state.markers?.map((marker: markerType) => {
                        return (
                            <div key={marker.options.title}>
                                {!marker.options.toDelete ?
                                    <Box key={marker.options.title} className='marker-list__marker'>
                                        <span className='marker-list__name'>{marker.options.title}</span>
                                        <Button
                                            value={marker.options.title}
                                            variant='button_delete'
                                            className='marker-list__remove-button'
                                            type='button'
                                            onClick={(event) => {
                                                dispatch({
                                                    action: ACTION.REQUEST_TO_REMOVE_MARKER,
                                                    data: {event: event.currentTarget.value, toDelete: true}
                                                })
                                            }}>delete
                                        </Button>
                                    </Box>
                                    :
                                    <div className='marker-list__confirmation-box'>
                                        <Button
                                            value={marker.options.title}
                                            variant='button_delete'
                                            className='marker-list__remove-button'
                                            type='button'
                                            onClick={() => {
                                                deleteMarkerHandler(marker._leaflet_id)
                                            }
                                            }>confirm
                                        </Button>
                                        <Button
                                            value={marker.options.title}
                                            variant='button_delete'
                                            className='marker-list__remove-button'
                                            type='button'
                                            onClick={(event) => {
                                                dispatch({
                                                    action: ACTION.REQUEST_TO_REMOVE_MARKER,
                                                    data: {event: event.currentTarget.value, toDelete: false}
                                                })
                                            }}>cancel
                                        </Button>
                                    </div>
                                }
                            </div>
                        )
                    })}
                </Stack>
                :
                <Paper className='marker-list__no-markers'>
                    You didn't create markers
                    <Link to='/drawing-bar' className='marker-list__no-markers_link'>Create marker</Link>
                </Paper>
            }
        </Paper>
    )
}