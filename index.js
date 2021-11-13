const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser');

const scrapers = require('./scrapers');
const spotifyapi = require('./spotifyapi')

app.use(bodyParser.json())
app.use(cors());

// async function asyncCall() {
//     let credentials = {username: "brownmamba156@gmail.com", password: "314159265"}
//     let likedSongsData = []
//     likedSongsData = await scrapers.getLikedSongs(credentials)
//     console.log(likedSongsData)
// }
// asyncCall()

const db = mysql.createConnection({
    type: "mysql",
    host: "localhost",
    user: "root",
    password: "Tzvaz123!",
    database: "TrueLink"
})

let likedSongsData
app.post('/rand', async (req, res) => {
    
    let credentials = {username: req.body.username, password: req.body.password}
    // likedSongsData = await scrapers.getLikedSongs(credentials)
    likedSongsData = await spotifyapi.a()
    console.log(likedSongsData)

    db.query('INSERT INTO users (firstName, lastName, sexualOrientation, age, zipcode, gender) VALUES (?,?,?,?,?,?)', 
        [req.body.firstName, req.body.lastName, req.body.sexualOrientation, req.body.age, req.body.zipCode, req.body.gender],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values Inserted') // response assures values were inserted if success
            }
        }
    )

})
app.get('/rand', async (req, res) => {
    // displays data in /rand
    res.send(likedSongsData)
})

app.post('/rand1', async (req, res) => {
    
    let artistList = req.body.artistList
    let credentials = {username: req.body.credentials.username, password: req.body.credentials.password}
    let names = req.body.names
    //likedSongsData = await scrapers.createPlaylist(artistList, credentials, names)
    likedSongsData = await spotifyapi.r()
    console.log(likedSongsData)

})
app.get('/rand1', async (req, res) => {
    // displays data in /rand
    res.send(likedSongsData)
})



// binds and listens to the connections on the specifies host and port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})