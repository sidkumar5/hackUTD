import logo from './logo.png';
import React from 'react'

import './NavBar.css'

import { useHistory } from 'react-router-dom';

function NavBar(){

    const history = useHistory() // used to redirect page

    return (
        <div className="navbar">
            <div className="menu-play">
                <div className="play-text">L O G I N</div>
            </div>
            {/* <div className="menu-logo">truelink</div> */}
            <img src={logo} className="logo-image" alt="Logo" />
            <div className="menu-leaderboard">
                <div className="leaderboard-text">S I G N U P</div>
            </div>
        </div>
    )
}

export default NavBar