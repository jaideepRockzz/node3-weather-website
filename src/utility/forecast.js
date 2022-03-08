const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
const forecasturl = 'http://api.weatherstack.com/current?access_key=b034f5b5ea4e623e644800fe33bb6ed8&query='+latitude+','+longitude+'&units=f'
request({url:forecasturl,json:true},(error,{body}) => {
if(error)
callback('Might be network issue!',undefined)
else if(body.error)
callback('Unable to find location', undefined)
else
callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' but feels like',body.current.feelslike)
})
}

module.exports = forecast