const http = require('http');
const url = require('url');

const { getIndex } = require('./controllers/index.controller');
const { getWeather } = require('./controllers/weather.controller');

http.createServer((request, response) => {

    const address = request.url;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    request.body = url.parse(address, true).query;

    if (address === '/') {
        getIndex(request, response);
    } else {
        getWeather(request, response);
    }

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');