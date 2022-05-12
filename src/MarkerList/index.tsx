import {useContext} from "react";
import {ACTION, markerType, StoreContext} from "../App";


export const MarkerList = ({map}: any) => {
    const {state, dispatch } = useContext(StoreContext);

    const deleteMarkerHandler = (id: number) => {
        const markerToDelete = state.markers.find((marker: markerType) => marker._leaflet_id === id);
        console.log(markerToDelete)
        map.current.removeLayer(markerToDelete);
        dispatch({
            action: ACTION.REMOVE_MARKER,
            data: {markerToDelete: markerToDelete}
        })
    }

    console.log('state', state)

    return (
        <div>
            {state.markers?.map((marker: markerType) => {
                return (
                    <div>
                        <button type='button' onClick={() => deleteMarkerHandler(Number(marker._leaflet_id))}>Delete: {marker._leaflet_id}</button>
                    </div>
                )
            })}
        </div>
    )
}

// { _leaflet_id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }
// (markers.filter((x: any) => x !== markerToDelete)) // { _leaflet_id: number; }