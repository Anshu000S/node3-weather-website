const request = require('request')
const forecast = (latitude, longitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=86b9d47f8011d8a499740f4ddc7822b6&query='+longitude+','+latitude

    request({url , json: true},(error,{body})=>{
        if(error) {
            callback('Unable to connect to the weather server', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+'. Currently it is '+body.current.temperature+' degrees outside. IT feels like '+body.current.feelslike+' degrees outside')
        }
    })
}

module.exports = forecast

