import spotifyss from './spotifyss.jpeg';
import React, { useEffect } from 'react'

import './LandingPageBox.css'

import Axios from 'axios'
import { useHistory } from 'react-router-dom';

function LandingPageBox(){
    
    const history = useHistory() // used to redirect page
    function goMatch() {
        history.push('/matchsurvey')
    }

    return (
        <div>
            <div className="landing-page-header">
				<h1>hi. this is <span className="truelink-text">truelink</span>.</h1>
				<p>A dating platform that uses your <a href="http://spotify.com">Spotify</a> and artificial intelligence to  
				<br />
				match you with your soulmate, one song at a time😊</p>
			</div>
            <div>
                <img src={spotifyss} className="spotify-screenshot" alt="Logo" />
            </div>
            <div className="find-match-button"><a href="/matchsurvey"> onClick={goMatch}</a></div>
        </div>
    )
}

export default LandingPageBox