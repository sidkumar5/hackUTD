async function getLink(addressList) {

    // formats address passed in to have spaces replaced by '+', used by api url
    function formatAddress(address){
        let splitAddress = address.split(' ')
        let newAddress = ''
        for (let a = 0; a < splitAddress.length; a++){
            if (a < splitAddress.length-1){
                newAddress += splitAddress[a]+'+'
            } else {
                newAddress += splitAddress[a]
            }
        }
    
        return newAddress
    }
    
    let mapsUrl = ''
    function getMapsUrl(curr_waypoint){
    
        // creating and logging link to maps website with route
        mapsUrl = 'https://www.google.com/maps/dir/'
        mapsUrl += newOriginAddress + '/'
        console.log('\nROUTE ORDER')
        for (let i = 0; i < waypoint_order_arr.length; i++) {
            let curr_waypoint = waypoint_order_arr[i]
            mapsUrl += formatAddress(addressList[curr_waypoint]) + '/'
            console.log('Address #' + i + ': ' + addressList[curr_waypoint])
        }
        mapsUrl += newOriginAddress + '/'
        console.log('MAPS URL -> ' + mapsUrl)
    
    }
    
    let originAddress = addressList[addressList.length-1]
    let newOriginAddress = formatAddress(originAddress)

    // let destinationAddress = addressList[addressList.length-1]
    // let newDestinationAddress = formatAddress(destinationAddress)
    
    // let orderAddresses = ["4207 Plano Pkwy Carrollton, TX, 75010", // Hebron High School
    //                       "185 W Parkway Blvd Coppell, TX, 75019", // Coppell High School
    //                       "5707 Morriss Rd Flower Mound, TX, 75028",] // Marcus High School
    // let orderAddresses = ["5150 N Garland Ave, Garland, TX 75040",
    //                         "American Airlines Stadium",
    //                         "900 N OConnor Rd, Irving, TX 75061",
    //                         "612 E Sandy Lake Rd 100, Coppell, TX 75019",
    //                         "2204 Airport Fwy Suite 450, Bedford, TX 76022",
    //                         "2 Eagle Point Rd, Lewisville, TX 75077"]
    
    // Google Maps Link Example -> https://www.google.com/maps/dir/The+CORE,+234+Parkway+Blvd,+Coppell,+TX+75019/Coppell+High+School,+185+W+Parkway+Blvd,+Coppell,+TX+75019/Hebron+High+School,+4207+Plano+Pkwy,+Carrollton,+TX+75010/Marcus+High+School,+5707+Morriss+Rd,+Flower+Mound,+TX+75028/The+CORE,+234+Parkway+Blvd,+Coppell,+TX+75019/
    
    //https://www.google.com/maps/dir/?api=1&origin=The+CORE,+234+Parkway+Blvd,+Coppell,+TX+75019&destination=The+CORE,+234+Parkway+Blvd,+Coppell,+TX+75019&waypoints=optimize:true|Coppell+High+School,+185+W+Parkway+Blvd,+Coppell,+TX+75019|Hebron+High+School,+4207+Plano+Pkwy,+Carrollton,+TX+75010|Marcus+High+School,+5707+Morriss+Rd,+Flower+Mound,+TX+75028
    
    // passing in address waypoints to api url                      
    let apiUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin='+newOriginAddress+'&destination='+newOriginAddress+'&waypoints=optimize:true'
    let apiKey = 'AIzaSyCSuA4Z1JIE_KLopg9eN-NNpaBjqoobeVQ'
    for (let i = 0; i < addressList.length-1; i++){
        apiUrl += '|' + formatAddress(addressList[i])
    }
    apiUrl += '&key=' + apiKey
    console.log(apiUrl)
    
    var axios = require('axios');
    
    let waypoint_order_arr = [0]
    
    var config = {
        method: 'get',
        // url: 'https://maps.googleapis.com/maps/api/directions/json?origin='+newOriginAddress+'&destination='+newDestinationAddress+'&key=AIzaSyCSuA4Z1JIE_KLopg9eN-NNpaBjqoobeVQ',
        url: apiUrl,
        headers: { }
    };
    
    await axios(config)
    .then(function (response) {
        //console.log(JSON.stringify(response.data));
        console.log(response.data)
    
        // console.log("BOUNDS: " + response.data.routes[0].bounds)
        // console.log("LEGS: " + response.data.routes[0].legs)
        waypoint_order_arr = response.data.routes[0].waypoint_order
        console.log("\nWAYPOINT_ORDER: " + waypoint_order_arr)
    
        // get optimized maps url
        getMapsUrl(waypoint_order_arr)
    
    })
    .catch(function (error) {
        console.log(error);
    });
  
    let curatedLink = {curatedLink: mapsUrl}
    return curatedLink
}

module.exports = {
    getLink
}