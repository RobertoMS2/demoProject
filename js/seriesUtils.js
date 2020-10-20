const md5 = require('crypto-js/md5');
const constants = require('./consts');

const url_serie = 'https://gateway.marvel.com:443/v1/public/series/';
const url_series = 'https://gateway.marvel.com:443/v1/public/series?orderBy=modified&limit=18&apikey=' + constants.public_key;

const detail = document.querySelector('#wrapper');
const title_wrapper = document.querySelector('#title_wrapper');

function outputSerie(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'serieDetail container col col-12-np');
    let code = '';
    code += '<div class="col col-4">';
    code += '<div class="r-box r-box-1_2"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '"></div>';
    code += '</div>';
    code += '<div class="col col-8">';
    title_wrapper.innerHTML = '<h1 class="title"><span>' + data.title + '</span></h1>';
    code += '<ul>'
    code += '<li><b>Año de inicio:</b> ' + data.startYear + '</li>';
    code += '<li><b>Año de fin:</b> ' + data.endYear + '</li>';
    code += '<li><b>Tipo:</b> ' + data.type + '</li>';
    code += '</ul>'
    if (data.creators.available > 0) {
        code += '<h2>Creadores</h2>';
        code += '<ul>';
        data.creators.items.forEach(element => {
            code += '<li>' + element.name + ' (' + element.role + ').</li>';
        }); 
        code += '</ul>';
    }
    if (data.characters.available > 0) {
        code += '<h2>Personajes</h2>';
        code += '<ul>';
        data.characters.items.forEach(character => {
            code += '<li>' + character.name + '</li>';
        }); 
        code += '</ul>';
    }
    if (data.stories.available > 0) {
        code += '<h2>Historias</h2>';
        code += '<ul>';
        data.stories.items.forEach(story => {
            code += '<li>' + story.name + '. Tipo: ' + story.type + '</li>';
        }); 
        code += '</ul>';
    }
    if (data.comics.available > 0) {
        code += '<h2>Comics</h2>';
        code += '<ul>';
        data.comics.items.forEach(comic => {
            const arr = comic.resourceURI.split('/');
            const i = arr[arr.length - 1];
            code += '<li><a href="./comic.html?id=' + i + '">' + comic.name + '</a></li>';
        }); 
        code += '</ul>';
    }
    code += '</div>';

    item.innerHTML = code;
    detail.appendChild(item);
}

function outputSeries(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'comicItem col col-4');
    let code = '';
    code += '<div class="r-box r-box-1_1"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '"></div>';
    code += '<h3>' + data.title + '</h3>';
    if (data.description !== null) {
        code += '<p>' + data.description + '</p>';
    }
    code += '<a href="./series.html?id=' + data.id + '">Ver más <span>&gt&gt</span></a>';
    item.innerHTML = code;
    detail.appendChild(item);
}

module.exports = {
    getSerie: function(id) {
        const ts = new Date().getTime();
        const message = ts+constants.private_key+constants.public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_serie + id + '?apikey=' + constants.public_key + '&ts=' + ts + '&hash=' + hash;

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            detail.innerHTML = '';
            data.data.results.forEach(element => {
                outputSerie(element); 
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }, 
    getSeriesExtended: function() {
        const ts = new Date().getTime();
        const message = ts+constants.private_key+constants.public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_series + '&ts=' + ts + '&hash=' + hash;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            title_wrapper.innerHTML = '<h1 class="title"><span>Series</span></h1>';
            data.data.results.forEach(element => {
                outputSeries(element);
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }
}