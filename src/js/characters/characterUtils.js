const md5 = require('crypto-js/md5');
const constants = require('../utils/consts');

const url_character = 'https://gateway.marvel.com:443/v1/public/characters/';
const url_characters = 'https://gateway.marvel.com:443/v1/public/characters?orderBy=modified&limit=15&apikey=' + constants.public_key;

const detail = document.querySelector('#wrapper');
const title_wrapper = document.querySelector('#title_wrapper');
const breadcrumbs = document.querySelector('#breadcrumbs ul');

function outputCharacter(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'comicDetail container col col-12-np');
    let code = '';
    code += '<div class="col col-4">';
    code += '<div class="r-box r-box-1_2"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '" alt="Imagen de ' + data.name + '"></div>';
    code += '</div>';
    code += '<div class="col col-8">';
    title_wrapper.innerHTML = '<h1 class="title"><span>' + data.name + '</span></h1>';
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
    if (data.series.available > 0) {
        code += '<h2 class="with-icon iconTags"><span>Series</h2>';
        code += '<ul>';
        data.series.items.forEach(serie => {
            const arr = serie.resourceURI.split('/');
            const j = arr[arr.length - 1];
            code += '<li><a href="./comic.html?id=' + j + '">' + serie.name + '</a></li>';
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
    code += '<h2>Más información</h2>';
        code += '<ul>';
        data.urls.forEach(url => {
            code += '<li><a href="' + url.url + '">' + url.type + '</a></li>';
        }); 
        code += '</ul>';
    code += '</div>';
    
    item.innerHTML = code;
    detail.appendChild(item);
}

function outputCharacters(data) {
    let character = document.createElement('div');
    character.setAttribute('class', 'characterItem');
    let code = '';
    code += '<div class="r-box r-box-1_2"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '" alt="Imagen de ' + data.name + '"></div>';
    code += '<p><a href="./character.html?id=' + data.id + '">' + data.name + '</a></p>';
    character.innerHTML = code;
    detail.appendChild(character);
}

module.exports = {
    getCharacter: function(id) {
        const ts = new Date().getTime();
        const message = ts+constants.private_key+constants.public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_character + id + '?apikey=' + constants.public_key + '&ts=' + ts + '&hash=' + hash;

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            /* Datos de las migas de pan */
            let characterLi = document.createElement('li');
            characterLi.innerHTML = '<a href="./character.html">Personajes</a>';
            breadcrumbs.appendChild(characterLi);
            let currentLi = document.createElement('li');
            currentLi.setAttribute('class', 'active');
            currentLi.innerHTML = data.data.results[0].name;
            breadcrumbs.appendChild(currentLi);

            /* Datos del personaje elegido */
            detail.innerHTML = '';
            data.data.results.forEach(element => {
                outputCharacter(element); 
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
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
            /* Datos de las migas de pan */
            let currentLi = document.createElement('li');
            currentLi.setAttribute('class', 'active');
            currentLi.innerHTML = 'Personajes';
            breadcrumbs.appendChild(currentLi);

            /* Datos del título */
            title_wrapper.innerHTML = '<h1 class="title"><span>Personajes</span></h1>';

            /* Datos del personaje elegido */
            detail.innerHTML = '';
            data.data.results.forEach(element => {
                outputCharacters(element);
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });  
    }
}