const request = require('request')

const forecast = (lat, lon, callback) =>{

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +lat+ '&lon=' +lon+ '&APPID=d1452ff3837f8819d73c0ea293b68003'

    request({url , json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather', undefined)
        }else if(body.cod == 400){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, 
                'The temperature outside is ' + body.main.temp + ' and there is ' + body.weather[0].description
            )
        }
    })
    
}

module.exports = forecast
