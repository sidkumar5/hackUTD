var SpotifyWebApi = require('spotify-web-api-node');
const fs = require("fs");

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'f028166f53f1430c8a9274a1e7b8b6a4',
    clientSecret: 'b8ac0029dd594c1eb4c4620cd17b348a',
    redirectUri: 'https://getyourspotifyrefreshtoken.herokuapp.com/callback'
});
var key = 'BQCSSL8Z0A9q-TyDWdFC_CGKSKcUnkMDL2rz7oBlDYHICgZxLS4pBIYtG6to1iRU6Yks-oiWIAXrXhLxvlmIqa6OTfeT-RrFQaRZ_ww_04zwpGUXIj6PeYJ58mLpmPZqrEQrr3NhYcr8vTipw-Lh2kupJl6_MkAZxoEjCFIdomTbwh0MuTxEhVbtDyCecsmkyqwNznFeJXsisMSk9tMROq_nF7iq36P3EEw6tpp0dmpT5qMe3EkcdvAxkJAURnWM3nKUBWVgP62Nk7Dd_TDmZeabcJNseeaRHrn9nt9TlhjRVQ'
spotifyApi.setAccessToken(key);

var userId = '7sxk4521inchvxcwn2pp4jg8s'
// spotifyApi.createPlaylist('hi')
// spotifyApi.getUserPlaylists('7sxk4521inchvxcwn2pp4jg8s')
//     .then(function(data) {
//         console.log('Retrieved playlists', data.body);
//     },function(err) {
//         console.log('Something went wrong!', err);
//     });

let rec = []
let artists= []
let songs = [];
let seedArtists = [];

//console.log(JSON.stringify(artists))

async function a() {
    //console.log(artists)
    return spotifyApi.getMySavedTracks({
        limit: 20
    })
        .then(function (data) {
            for (var i = 0; i < data.body.items.length; i++) {
                artists[i] = data.body.items[i].track['artists'][0]['name'];
            }
            return artists
        }, function (err) {
            console.log("error here wrong!", err);
        });
}

async function s() {
    return spotifyApi.getMySavedTracks({
        limit: 20
    })
        .then(function (data) {
            for (var i = 0; i < data.body.items.length; i++) {
                songs[i] = data.body.items[i].track.name;
            }
            return songs;

        }, function (err) {
            console.log("error here wrong!", err);
        });
}

async function sA() {
    return spotifyApi.getMySavedTracks({
        limit: 20
    })
        .then(function (data) {
            for (var i = 0; i < data.body.items.length; i++) {
                seedArtists[i] = data.body.items[i].track['artists'][0]['uri'].substring(15);

            }
            return seedArtists;

        }, function (err) {
            console.log("error here wrong!", err);
        });
}

let seed = sA().then;
sA().then((seed) => {
    console.log(seed)
});


function r() {
    return spotifyApi.getRecommendations({
        min_energy: 0.4,
        seed_artists: ['4r63FhuTkUYltbVAg5TQnk', '0eDvMgVFoNV3TpwtrVCoTj', '3TVXtAsR1Inumwj472S9r4'],
        min_popularity: 50
    }).then(function(data) {
        for(let i = 0; i < data.body.tracks.length; i++) {
            let recommendations = data.body.tracks[i]['uri'];
            rec.push(recommendations)
        }
        spotifyApi.addTracksToPlaylist('6V3y77eB3bA22qgSQuxnsa', rec)
        return rec;


    }, function (err) {
        console.log("lol here wrong!", err);
    });
}
let reccco = []


async function nameofR() {
    return spotifyApi.getRecommendations({
        min_energy: 0.4,
        seed_artists: ['4r63FhuTkUYltbVAg5TQnk', '0eDvMgVFoNV3TpwtrVCoTj', '3TVXtAsR1Inumwj472S9r4'],
        min_popularity: 50
    }).then(function(data) {
        for(let i = 0; i < data.body.tracks.length; i++) {
            let recommendations = data.body.tracks[i]['name'];
            reccco.push(recommendations)
        }
        //console.log(rec)
        return reccco;

    }, function (err) {
        console.log("errrrrrrorrr here wrong!", err);
    });
}




// r();

// let art = a().then;

// let son = s().then;



// let recc = nameofR().then;




const promise1 = new Promise((resolve, reject) => {
    resolve('Success!')
});

a().then((art) => {
    console.log(art)
});


const promise2 = new Promise((resolve, reject) => {
    resolve('Success!')
});

s().then((son) => {
    console.log(son)
});


const seeds = new Promise((resolve, reject) => {
    resolve('Success!')
});



const penis = new Promise((resolve, reject) => {
    resolve('Success!')
});

nameofR().then((songrec) => {
    console.log(songrec)
});





module.exports = {
    a,
    s,
    r,
};