const { exec } = require("child_process"); 

const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser');

const routes = require('./routes');
// const post = require('./Flight-Engine/src/post')

app.use(bodyParser.json())
app.use(cors());

const db = mysql.createConnection({
    type: "mysql",
    host: "localhost",
    user: "root",
    password: "Tzvaz123!",
    database: "destinAAtion"
})

let formData
app.post('/formdata', (req, res) => {
    formData = {name: req.body.name, date: req.body.date, flightNum: req.body.flightNum}
    console.log(formData)


    exec("cd Flight-Engine; cd src; node post.js", (error, stdout, stderr)  => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    db.query('INSERT INTO flight_users (name, date, flightNum) VALUES (?,?,?)', 
        [req.body.name, req.body.date, req.body.flightNum],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values Inserted') // response assures values were inserted if success
            }
        }
    )
})

app.get('/formdata', (req, res) => {
    
    res.send(formData)
})

let link
app.post('/addresses', async (req, res) => {
    let addresses = {addressList: req.body.addressList}
    console.log(addresses)

    let addressList = addresses.addressList
    let curatedLink = await routes.getLink(addressList)
    console.log('CURATED LINK ' + curatedLink.curatedLink)

    link = curatedLink
})

app.get('/addresses', async (req, res) => {
    
    res.send(link)
})

let flightDetails
app.post('/flightDetails', (req, res) => {
    flightDetails = {departureAddress: req.body.departureAddress, destinationAddress: req.body.destinationAddress, flightNum: req.body.flightNum, lat: req.body.lat, lng: req.body.lng, closeAttractions: req.body.closeAttractions}
    console.log(flightDetails)
})

app.get('/flightDetails', (req, res) => {
    
    res.send(flightDetails)
})



// binds and listens to the connections on the specifies host and port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})