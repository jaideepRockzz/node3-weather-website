const request = require('postman-request')

const geocode = (locationname,callback) => {
    const urlforcoordinates = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+locationname+'.json?limit=1&access_token=pk.eyJ1IjoiamFpZGVlcGNvZGluZyIsImEiOiJjbDA5anVleG4wMXI3M2NtajVvemNyNjA2In0.RvbGGdYm0cAnacbyUziX2A'
    request({url:urlforcoordinates,json:true},(error,{body}) => {
    if(error){
    callback('Unable to connect to location services!', undefined)
    }else if(body.features.length === 0){
    callback('unable to find location.try another search',undefined)
    }else{
    callback(undefined,{
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        place: body.features[0].place_name
    })
    }
    })
    }

    module.exports = geocode