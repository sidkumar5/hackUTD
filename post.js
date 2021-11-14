import Axios from 'axios'

import fetch from 'node-fetch';
//     fetch('http://localhost:4000/flights?date=2020-01-01')
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });


  let myFlightNumber = 7198;

  Axios.get('http://localhost:3001/formdata').then((response) => {
      console.log(response.data.flightNum) // response is logged in console
      myFlightNumber = response.data.flightNum
  })

  // fetch('http://localhost:3001/formdata', {})
  // .then(data => {
  //   console.log(data)
  // })

  fetch('http://localhost:4000/flights?date=2020-01-01', {})
  .then(response => response.json())
  .then(data => {
    for( let i in data )  {

      if(data[i].flightNumber == myFlightNumber) {
        console.log(data[i].origin.city)
        console.log(data[i].destination.city)
        console.log(data[i].destination.location.latitude)
        console.log(data[i].destination.location.longitude)

        let lat = data[i].destination.location.latitude
        let longitude = data[i].destination.location.longitude - (data[i].destination.location.longitude * 2)
        var config = {
             method: 'get',
             url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + longitude + '&radius=25000&&keyword=attraction&key=AIzaSyCuJK6_Jk59l3Az7tvuOpbSl470vfajqiQ',
             headers: { }
        };

        let closeAttractions = []
        for(let i = 0; i < 15; i++) {
            Axios(config)
            .then(function (response) {
            // edit here
  
            let name = response.data.results[i].name
            let lat = response.data.results[i].geometry.location.lat
            let lng = response.data.results[i].geometry.location.lng

            console.log(JSON.stringify(name) + '  ' + JSON.stringify(lat) + '  ' + JSON.stringify(lng));
            closeAttractions.push({name: name, lat: lat, lng: lng})

            if (i == 14) {
              console.log(closeAttractions)
            }
            
          })
        }

        let flightData = {departureAddress: data[i].origin.city, destinationAddress: data[i].destination.city, lat: data[i].destination.location.latitude, lng: data[i].destination.location.longitude, closeAttractions: closeAttractions}

        //console.log(flightData.closeAttractions)

        Axios.post('http://localhost:3001/flightDetails', {departureAddress: flightData.departureAddress, destinationAddress: flightData.destinationAddress, flightNum: myFlightNumber, lat: flightData.lat, lng: flightData.lng, closeAttractions: flightData.closeAttractions}).then(() => {
            console.log('success') // .then waits for completion and runs code inside brackets
        })

        break;
      }
    // console.log(data[i].flightNumber);

    }
  
  })
  .catch((error) => {
    console.error('Error:', error);
  });
