const axios = require('axios');
const pug = require('pug');
const fs = require('fs');

exports.getWeather = async (request, response) => {

    const city = request.body.city;

    let weather, render;

    try {

        weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=320f53dd5c71c1e9b06e93d8609ed2f4&units=metric`)

        render = pug.renderFile('views/weather.pug', {
            weather: weather
        });

        saveCitySearch(weather.data.name);

    } catch (err) {
        render = pug.renderFile('views/error.pug');
    }

    response.end(render, 'utf-8');

}

function saveCitySearch(city) {

    fs.readFile('cities.json', function read(err, data) {

        if (err) {
            throw err;
        }

        const cities = JSON.parse(data);
        const index = cities.indexOf(city);

        if (index === -1) {
            cities.push(city);
        } else {
            cities.push(cities.splice(index, 1)[0]);
        }

        fs.writeFile('cities.json', JSON.stringify(cities), function (err) {
            if (err) {
                throw err;
            }
        });

    });

}