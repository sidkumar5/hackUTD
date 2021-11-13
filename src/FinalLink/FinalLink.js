import React, { useEffect, useState } from 'react'

import './FinalLink.css'

import { useHistory } from 'react-router-dom';
import Axios from 'axios'

import paige from './paige.png';
import zendaya from './zendeya.jpeg';
import katrina from './katrina.JPG';

let userData = [
    {name: 'Paige Buckets', age: 20, img: paige, commonArtists: ["JCole", "PinkPanthress", "Drake", "Bazzi", "Daniel Ceaser"], isMatch: false},
    {name: 'Zendaya Coleman', age: 21, img: zendaya, commonArtists: ["Sam Smith", "JCole", "Ali Gatie", "Post Malone"], isMatch: false},
    {name: 'Katrina Kaif', age: 33, img: katrina, commonArtists: ["Ali Gatie", "Daniel Ceaser", "Drake"], isMatch: false}
]

function FinalLinkBox(){

    function generatePlaylist() {
        Axios.post('http://localhost:3001/rand1', 
        {artistList: ['Drake', 'Bazzi', 'JCole'], 
        credentials: {username: 'brownmamba156@gmail.com', password: '314159265'},
        names: ['Tom', 'Paige']
        }).then(() => {
            console.log('success') // .then waits for completion and runs code inside brackets
        })
    }

    return (
        <div>
            <div className="results-title">
                <h1>R E S U L T S</h1>
                <p>for each match we have a specially curated playlist waiting for you🥳</p>
            </div>
            <div class="arrow-down">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="link-box-container">
                <h1>trustedlink</h1>
                <div class="container">
                    <img src={userData[0].img} className="finalmatchclass" alt="Logo"/>
                    <div class="centered">{userData[0].name}</div>
                </div>
                <div className="curate-button" onClick={generatePlaylist}>curate playlist</div>
            </div>
        </div>
    )
}

export default FinalLinkBox