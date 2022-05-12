import {Link, Outlet} from "react-router-dom";
import './navigation.css';

export const Navigation = () => {

    return (
        <div>
            <ul className='navigation__links'>
                <Link className='navigation__link' to='/map'>Map</Link>
                <Link className='navigation__link'  to='/drawing-bar'>DrawingBar</Link>
                <Link className='navigation__link'  to='/marker-list'>Marker List</Link>
            </ul>
            <Outlet />
        </div>
    )
}