const md5 = require('crypto-js/md5');
const constants = require('./consts');

const url_comic = 'https://gateway.marvel.com:443/v1/public/comics/';
const url_comics = 'https://gateway.marvel.com:443/v1/public/comics?orderBy=-onsaleDate&limit=24&apikey=' + constants.public_key;

const detail = document.querySelector('#wrapper');
const title_wrapper = document.querySelector('#title_wrapper');

function outputComic(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'comicDetail container col col-12-np');
    let code = '';
    code += '<div class="col col-4">';
    code += '<div class="r-box r-box-1_2"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '"></div>';
    code += '</div>';
    code += '<div class="col col-8">';
    title_wrapper.innerHTML = '<h1 class="title"><span>' + data.title + '</span></h1>';
    if (data.description !== null) {
        code += '<div>' + data.description + '</div>';
    }
    if (data.description !== '') {
        code += '<p><b>isbn: ' + data.isbn + '</b></p>';
    }
    code += '<p><b>Fecha de venta:</b> ' + data.dates[0].date + '</p>';
    code += '<h2>Precios</h2>';
    code += '<ul>';
    data.prices.forEach(price => {
        let priceName = '';
        if (price.type === 'printPrice') {
            priceName = 'Precio de la versión impresa:';
        } else if (price.type === 'digitalPurchasePrice') {
            priceName = 'Precio de la versión digital:';
        }
        code += '<li>' + priceName + ' ' + price.price + '</li>';
    })
    code += '</ul>';
    code += '<p><b>Serie:</b>' + data.series.name + '</p>';
    if (data.creators.available > 0) {
        code += '<h2>Autores</h2>';
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
    code += '<h2>Historias</h2>';
    code += '<ul>';
    data.stories.items.forEach(story => {
        code += '<li>' + story.name + '. Tipo: ' + story.type + '</li>';
    }); 
    code += '</ul>';
    item.innerHTML = code;
    detail.appendChild(item);
}

function outputComics(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'comicItem col col-3');
    let code = '';
    code += '<div class="r-box r-box-1_1"><img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '"></div>';
    code += '<h3>' + data.title + '</h3>';
    if (data.description !== null) {
        code += '<p>' + data.description + '</p>';
    }
    code += '<a href="./comic.html?id=' + data.id + '">Ver más <span>&gt&gt</span></a>';
    item.innerHTML = code;
    detail.appendChild(item);
}

module.exports = {
    getComic: function(id) {
        const ts = new Date().getTime();
        const message = ts+constants.private_key+constants.public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_comic + id + '?apikey=' + constants.public_key + '&ts=' + ts + '&hash=' + hash;

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
    },
    getComicsExtended: function() {
        const ts = new Date().getTime();
        const message = ts+constants.private_key+constants.public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_comics + '&ts=' + ts + '&hash=' + hash;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            title_wrapper.innerHTML = '<h1 class="title"><span>Comics</span></h1>';
            data.data.results.forEach(element => {
                outputComics(element);
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }
}