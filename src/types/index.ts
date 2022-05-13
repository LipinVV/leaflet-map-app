export type markerType = {
    _leaflet_id: number
    name: string
    description: string
    date: string
    options: {title: string}
}

export type StateType = {
    markers: markerType[],
    map: any
}