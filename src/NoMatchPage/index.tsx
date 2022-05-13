import React from "react";
import {Link} from "react-router-dom";
import "./noMatchPage.css";

export const NoMatchPage = () => {

    return (
        <div className='no-match-page'>
            <h2>Sorry, there is no such page</h2>
            <p>
                <Link to="/" className='no-match-page__link'>Return to the home page</Link>
            </p>
        </div>
    )
}