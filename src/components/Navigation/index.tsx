import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {MenuList, MenuItem, Paper} from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MapIcon from "@mui/icons-material/Map";
import "./navigation.scss";

export const Navigation = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='navigation'>
            <Paper
                className='navigation__menu'
                elevation={10}
            >
                <MenuList className='navigation__links'>
                    <MenuItem  className={currentPath !== '/' ? 'navigation__link_wrapper' : 'navigation__link_wrapper_active'}>
                        <MapIcon className='navigation__link_icon'/>
                        <Link className='navigation__link' to='/'>Map</Link>
                    </MenuItem>
                    <MenuItem className={currentPath !== '/drawing-bar' ? 'navigation__link_wrapper' : 'navigation__link_wrapper_active'}>
                        <BrushIcon className='navigation__link_icon'/>
                        <Link className='navigation__link' to='/drawing-bar'>Drawing</Link>
                    </MenuItem>
                    <MenuItem className={currentPath !== '/marker-list' ? 'navigation__link_wrapper' : 'navigation__link_wrapper_active'}>
                        <ListAltIcon className='navigation__link_icon'/>
                        <Link className='navigation__link' to='/marker-list'>Markers</Link>
                    </MenuItem>
                </MenuList>
            </Paper>
            <Outlet/>
        </div>
    )
}