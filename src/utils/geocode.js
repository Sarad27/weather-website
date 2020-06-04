const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2FyYWQyNyIsImEiOiJja2F1b2JqNzEwM3A1MnJwYzA5ZmVldHR2In0.yWiZmcD1eU9gXaIfso3jwA&limit=1'

    request({url , json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to mapbox', undefined)
         }else if(body.features.length == 0){
             callback('No location found', undefined)
        }else{
            callback(undefined,{
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location:  body.features[0].place_name
            })
              }
    })
}

module.exports = geocode