import React, { useEffect, useState } from 'react'

import './SwipeBox.css'

import { useHistory } from 'react-router-dom';

import paige from './paige.png';
import zendaya from './zendeya.jpeg';
import katrina from './katrina.JPG';

let userData = [
    {name: 'Paige Buckets', age: 20, img: paige, commonArtists: ["JCole", "PinkPanthress", "Drake", "Bazzi", "Daniel Ceaser"], isMatch: false},
    {name: 'Zendaya Coleman', age: 21, img: zendaya, commonArtists: ["Sam Smith", "JCole", "Ali Gatie", "Post Malone"], isMatch: false},
    {name: 'Katrina Kaif', age: 33, img: katrina, commonArtists: ["Ali Gatie", "Daniel Ceaser", "Drake"], isMatch: false}
]
function SwipeBox(){
    
    const [count, setCount] = useState(0)
    const history = useHistory() // used to redirect page

    function yes() {
        userData[count].isMatch = true
        if (count + 1 == userData.length){
            history.push('/matchlink')
        } else {
            setCount(count+1)
        }
        return
    }
    function no() {
        if (count + 1 == userData.length){
            history.push('/matchlink')
        } else {
            setCount(count+1)
        }
        return
    }

    function createArtistContainers(n) {
        var elements = [];
        for(let i =0; i < n; i++){
            elements.push(<div className="artist-name">{userData[count].commonArtists[i]}</div>);
        }
        return elements;
    }

    return (
        <div>
            <div className="swipe-box-container">
                <span><div onClick={yes} className="yes-button"></div></span>
                <span><img src={userData[count].img} className="match1" alt="Logo" /></span>
                <span><div onClick={no} className="no-button"></div></span>

                <div className="user-info-container">
                    <h1>{userData[count].name + ', '}<span className="age-display">{userData[count].age}</span></h1>
                    <div className="artist-list">
                        <div className="artist-container">
                            {createArtistContainers(userData[count].commonArtists.length)}
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default SwipeBox