import React from "react";
type MapType = {
    mapContainer: React.MutableRefObject<any>
}

export const Map = ({mapContainer}: MapType) => {
    return (
        <div id='map' ref={el => mapContainer.current = el}>
        </div>
    )
}