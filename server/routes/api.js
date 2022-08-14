const express = require('express')
const router = express.Router()
const axios = require('axios')
const city = require('../model/City')
const { post } = require('jquery')

function getWeatherData(cityName) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19e7a80d0afd3edf2dbfc1921342b1a8&units=metric`)
}

router.get('/city/:cityName', function (request, response) {
    let cityName = request.params.cityName
    let weatheInfo = {}

    getWeatherData(cityName)
        .then(function (weatherInfoForCity) {
            let allWeatherData = weatherInfoForCity.data
            weatheInfo = {
                'name': allWeatherData.name,
                'temperature': allWeatherData.main.temp,
                'condition': allWeatherData.weather[0].description,
                'conditionPic': `http://openweathermap.org/img/wn/${allWeatherData.weather[0].icon}@2x.png`
            }
            response.send(weatheInfo)
        })
        .catch((error) => response.send(error))
})

router.get('/cities', function (request, response) {
    if (request.params.cityName == 'false') {
        return response.status(404).send("City not found")
    } else {
        city.find({}, function (error, cities) {
            response.send(cities)
        })
    }
})

router.post('/city', function (request, response) {
    let newCity = new city({
        'name': request.body.name,
        'temperature': request.body.temperature,
        'condition': request.body.condition,
        'conditionPic': request.body.conditionPic
    })
    newCity.save()
    response.send(newCity)
})

router.delete('/city/:cityName', function (request, response) {
    const cityName = request.params.cityName

    city.findOneAndDelete({ name: cityName }, function (error, city) {
        response.send(city)
    })
})

module.exports = router



















