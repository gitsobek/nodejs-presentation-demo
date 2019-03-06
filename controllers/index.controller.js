const pug = require('pug');
const fs = require('fs');

exports.getIndex = (request, response) => {

    let render;

    fs.readFile('cities.json', function read(err, data) {

        if (err) {
            render = pug.renderFile('views/error.pug');
        } else {
            render = pug.renderFile('views/index.pug', {
                cities: JSON.parse(data).reverse().slice(0,5)
            });
        }

        response.end(render, 'utf-8');

    });

}