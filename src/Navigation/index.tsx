import React from "react";
import {Link, Outlet} from "react-router-dom";
import {MenuList, MenuItem, Paper} from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MapIcon from "@mui/icons-material/Map";
import "./navigation.css";

export const Navigation = () => {

    return (
        <div className='navigation'>
            <Paper
                className='navigation__menu'
                elevation={10}
            >
                <MenuList className='navigation__links'>
                    <MenuItem className='navigation__link_wrapper'>
                        <MapIcon className='navigation__link_icon'/>
                        <Link className='navigation__link' to='/'>Map</Link>
                    </MenuItem>
                    <MenuItem className='navigation__link_wrapper'>
                        <BrushIcon className='navigation__link_icon'/>
                        <Link className='navigation__link' to='/drawing-bar'>DrawingBar</Link>
                    </MenuItem>
                    <MenuItem className='navigation__link_wrapper'>
                        <ListAltIcon className='navigation__link_icon'/>
                        <Link className='navigation__link' to='/marker-list'>Marker List</Link>
                    </MenuItem>
                </MenuList>
            </Paper>
            <Outlet/>
        </div>
    )
}