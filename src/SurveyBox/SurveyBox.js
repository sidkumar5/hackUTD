import React, { useEffect, useState } from 'react'

import './SurveyBox.css'

import Axios from 'axios'
import { useHistory } from 'react-router-dom';

function SurveyBox(){
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [zipCode, setsetZipCode] = useState('')
    const [gender, setGender] = useState('')
    const [sexualOrientation, setSexualOrientation] = useState('')
    const [spotifyUserName, setSpotifyUserName] = useState('')
    const [spotifyPassword, setSpotifyPassword] = useState('')

    const history = useHistory() // used to redirect page

    function go() {
        let formData = {firstName: firstName, lastName: lastName, age: age, zipCode: zipCode, gender: gender,
                        sexualOrientation: sexualOrientation, spotifyUserName: spotifyUserName, spotifyPassword: spotifyPassword}
        
        // Axios.post('http://localhost:3001/rand', {username: formData.spotifyUserName, password: formData.spotifyPassword}).then(() => {
        //     console.log('success') // .then waits for completion and runs code inside brackets
        // })
        Axios.post('http://localhost:3001/rand', {firstName: formData.firstName, lastName: formData.lastName, age: formData.age, zipCode: formData.zipCode, gender: formData.gender,
                                                  sexualOrientation: formData.sexualOrientation, username: formData.spotifyUserName, password: formData.spotifyPassword}).then(() => {
            console.log('success') // .then waits for completion and runs code inside brackets
        })

        // redirect
        history.push('/matchinterface')
    }


    return (
        <div>
            <div className="form-box-container">
                <h1>connect. vibe.</h1>
                <h5>Fill out the form below to find your match:)</h5>

                <div className="form-box">
                    <h2>First Name</h2>
                    <textarea type="text" className="firstNameInput" onChange={(event) => setFirstName(event.target.value)} value = {firstName}></textarea>
                    <h2>Last Name</h2>
                    <textarea type="text" className="firstNameInput" onChange={(event) => setLastName(event.target.value)} value = {lastName}></textarea>
                    <h2>Age</h2>
                    <textarea type="text" className="firstNameInput" onChange={(event) => setAge(event.target.value)} value = {age}></textarea>
                    <h2>Zip Code</h2>
                    <textarea type="text" className="firstNameInput" onChange={(event) => setsetZipCode(event.target.value)} value = {zipCode}></textarea>
                    <h2>Gender</h2>
                    <textarea type="text" className="firstNameInput" onChange={(event) => setGender(event.target.value)} value = {gender}></textarea>
                    <h2>Sexual Orientation</h2>
                    <textarea type="text" className="firstNameInput" onChange={(event) => setSexualOrientation(event.target.value)} value = {sexualOrientation}></textarea>
                    <h2>Spotify UserName</h2>
                    <textarea type="text" className="firstNameInput" onChange={(event) => setSpotifyUserName(event.target.value)} value = {spotifyUserName}></textarea>
                    <h2>Spotify Password</h2>
                    <textarea type="text" className="firstNameInput" onChange={(event) => setSpotifyPassword(event.target.value)} value = {spotifyPassword}></textarea>

                    <div onClick={go} className="button1">GO</div>
                </div>
            
            </div>
        </div>
    )
}

export default SurveyBox