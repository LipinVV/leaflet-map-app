import {Button} from "@mui/material";
import {Paper} from "@mui/material";
import {Stack} from "@mui/material";
import {Box} from "@mui/material";
import {useContext} from "react";
import {Link} from "react-router-dom";
import {ACTION, StoreContext} from "../App";
import {markerType} from "../types";
import "./markerList.css";

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
                    {state.markers?.map((marker: markerType) => {
                        return (
                            <Box>
                                <span>{marker.options.title}</span>
                                <Button
                                    className='marker-list__remove-button'
                                    type='button'
                                    onClick={() => deleteMarkerHandler(Number(marker._leaflet_id))}>delete
                                </Button>
                            </Box>
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

// { _leaflet_id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }
// (markers.filter((x: any) => x !== markerToDelete)) // { _leaflet_id: number; }