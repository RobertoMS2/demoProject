const md5 = require('crypto-js/md5');

const public_key = 'ddf4636674238849e5422709e17c4863';
const private_key = '09b155ea7febdbd215169af859ab76c676ae1fec';
const url_comic = 'https://gateway.marvel.com:443/v1/public/comics/';

const detail = document.querySelector('#wrapper');

function outputComic(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'comicDetail container');
    let code = '';
    code += '<div class="col col-4">';
    code += '<div class="r-box r-box-1_2"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '"></div>';
    code += '</div>';
    code += '<div class="col col-8">';
    code += '<h1>' + data.title + '</h1>';
    if (data.description !== null) {
        code += '<div>' + data.description + '</div>';
    }
    if (data.description !== '') {
        code += '<p><b>isbn: ' + data.isbn + '</b></p>';
    }
    code += '<p><b>Fecha de venta:</b> ' + data.dates[0].date + '</p>';
    code += '<p><b>Serie:</b>' + data.series.name + '</p>';
    code += '<h2>Autores</h2>';
    code += '<ul>';
    data.creators.items.forEach(element => {
        code += '<li>' + element.name + ' (' + element.role + ').</li>';
    }); 
    code += '</ul>';
    item.innerHTML = code;
    detail.appendChild(item);
}

module.exports = {
    getComic: function(id) {
        const ts = new Date().getTime();
        const message = ts+private_key+public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_comic + id + '?apikey=' + public_key + '&ts=' + ts + '&hash=' + hash;

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            detail.innerHTML = '';
            data.data.results.forEach(element => {
                outputComic(element); 
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }
}