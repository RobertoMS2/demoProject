const md5 = require('crypto-js/md5');
const constants = require('../utils/consts');

const url_serie = 'https://gateway.marvel.com:443/v1/public/series/';
const url_series = 'https://gateway.marvel.com:443/v1/public/series?orderBy=modified&limit=18&apikey=' + constants.public_key;

const detail = document.querySelector('#wrapper');
const title_wrapper = document.querySelector('#title_wrapper');
const breadcrumbs = document.querySelector('#breadcrumbs ul');

function outputSerie(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'serieDetail container col col-12-np');
    let code = '';
    code += '<div class="col col-4">';
    code += '<div class="r-box r-box-1_2"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '" alt="Portada del primer comic de la serie: ' + data.title + '"></div>';
    code += '</div>';
    code += '<div class="col col-8">';
    title_wrapper.innerHTML = '<h1 class="title"><span>' + data.title + '</span></h1>';
    code += '<ul>'
    code += '<li><b>Año de inicio:</b> ' + data.startYear + '</li>';
    code += '<li><b>Año de fin:</b> ' + data.endYear + '</li>';
    code += '<li><b>Tipo:</b> ' + data.type + '</li>';
    code += '</ul>'
    if (data.creators.available > 0) {
        code += '<h2 class="with-icon iconAuthor"><span>Creadores</h2>';
        code += '<ul>';
        data.creators.items.forEach(element => {
            code += '<li>' + element.name + ' (' + element.role + ').</li>';
        }); 
        code += '</ul>';
    }
    if (data.characters.available > 0) {
        code += '<h2 class="with-icon iconCharacters"><span>Personajes</h2>';
        code += '<ul>';
        data.characters.items.forEach(character => {
            code += '<li>' + character.name + '</li>';
        }); 
        code += '</ul>';
    }
    if (data.stories.available > 0) {
        code += '<h2 class="with-icon iconStories"><span>Historias</h2>';
        code += '<ul>';
        data.stories.items.forEach(story => {
            code += '<li>' + story.name + '. Tipo: ' + story.type + '</li>';
        }); 
        code += '</ul>';
    }
    if (data.comics.available > 0) {
        code += '<h2 class="with-icon iconComics"><span>Comics</h2>';
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
    code += '<div class="r-box r-box-1_1 clip-chat"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '" alt="Portada del primer comic de la serie: ' + data.title + '"></div>';
    code += '<h2>' + data.title + '</h2>';
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
            /* Datos de las migas de pan */
            let characterLi = document.createElement('li');
            characterLi.innerHTML = '<a href="./series.html">Series</a>';
            breadcrumbs.appendChild(characterLi);
            let currentLi = document.createElement('li');
            currentLi.setAttribute('class', 'active');
            currentLi.innerHTML = data.data.results[0].title;
            breadcrumbs.appendChild(currentLi);

            /* Datos de la serie elegida */
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
            /* Datos de las migas de pan */
            let currentLi = document.createElement('li');
            currentLi.setAttribute('class', 'active');
            currentLi.innerHTML = 'Series';
            breadcrumbs.appendChild(currentLi);

            /* Datos del título */
            title_wrapper.innerHTML = '<h1 class="title"><span>Series</span></h1>';

            /* Datos del personaje elegido */
            detail.innerHTML = '';
            data.data.results.forEach(element => {
                outputSeries(element);
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }
}