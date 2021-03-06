const md5 = require('crypto-js/md5');
const constants = require('../utils/consts');

const url_comics = 'https://gateway.marvel.com:443/v1/public/comics?orderBy=-onsaleDate&limit=8&apikey=' + constants.public_key;
const url_series = 'https://gateway.marvel.com:443/v1/public/series?orderBy=modified&limit=6&apikey=' + constants.public_key;
const url_characters = 'https://gateway.marvel.com:443/v1/public/characters?orderBy=modified&limit=5&apikey=' + constants.public_key;

const latestContent = document.querySelector('#latestContent');
const charactersList = document.querySelector('#charactersList');
const latestSeries = document.querySelector('#latestSeries');

function outputComics(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'comicItem col col-3');
    let code = '';
    code += '<div class="r-box r-box-1_1 clip-chat"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '" alt="Portada del comic: ' + data.title + '"></div>';
    code += '<h3>' + data.title + '</h3>';
    if (data.description !== null) {
        code += '<p>' + data.description + '</p>';
    }
    code += '<a href="./comic.html?id=' + data.id + '">Ver más <span>&gt&gt</span></a>';
    item.innerHTML = code;
    latestContent.appendChild(item);
}

function outputCharacters(data) {
    let character = document.createElement('div');
    character.setAttribute('class', 'characterItem');
    let code = '';
    code += '<div class="r-box r-box-1_2"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '" alt="Foto del personaje: ' + data.name + '"></div>';
    code += '<p><a href="./character.html?id=' + data.id + '">' + data.name + '</a></p>';
    character.innerHTML = code;
    charactersList.appendChild(character);
}

function outputSeries(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'comicItem col col-4');
    let code = '';
    code += '<div class="r-box r-box-1_1 clip-chat"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '" alt="Portada del primer comic de la serie: ' + data.title + '"></div>';
    code += '<h3>' + data.title + '</h3>';
    if (data.description !== null) {
        code += '<p>' + data.description + '</p>';
    }
    code += '<a href="./series.html?id=' + data.id + '">Ver más <span>&gt&gt</span></a>';
    item.innerHTML = code;
    latestSeries.appendChild(item);
}

module.exports = {
    getAllcomics: function() {
        const ts = new Date().getTime();
        const message = ts+constants.private_key+constants.public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_comics + '&ts=' + ts + '&hash=' + hash;

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            latestContent.innerHTML = '';
            data.data.results.forEach(element => {
                outputComics(element);
            });
        }).catch(error => {
            console.error(error);
        });
    },
    getCharacters: function() {
        const ts = new Date().getTime();
        const message = ts+constants.private_key+constants.public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_characters + '&ts=' + ts + '&hash=' + hash;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            charactersList.innerHTML = '';
            data.data.results.forEach(element => {
                outputCharacters(element);
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    },
    getSeries: function() {
        const ts = new Date().getTime();
        const message = ts+constants.private_key+constants.public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_series + '&ts=' + ts + '&hash=' + hash;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            latestSeries.innerHTML = '';
            data.data.results.forEach(element => {
                outputSeries(element);
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }
}