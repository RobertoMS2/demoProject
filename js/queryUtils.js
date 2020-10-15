const md5 = require('crypto-js/md5');

const public_key = 'ddf4636674238849e5422709e17c4863';
const private_key = '09b155ea7febdbd215169af859ab76c676ae1fec';
const url_comics = 'https://gateway.marvel.com:443/v1/public/comics?orderBy=-onsaleDate&limit=8&apikey=' + public_key;
const url_comic = 'https://gateway.marvel.com:443/v1/public/comics/';

const latestContent = document.querySelector('#latestContent');

/*
    Template
    <div class="comicItem">
        <img src="">
        <h3>Comic name</h3>
        <p>small text</p>
        <button>Read more</button>
    </div>
*/
function outputComics(data) {
    let item = document.createElement('div');
    item.setAttribute('class', 'comicItem');
    let code = '';
    code += '<img src="' + data.thumbnail.path + '.' + data.thumbnail.extension + '">';
    code += '<h3>' + data.title + '</h3>';
    code += '<p>' + data.description + '</p>';
    code += '<a href="/comic/?id=' + data.id + '">Ver más</a>';
    item.innerHTML = code;
    latestContent.appendChild(item);
}

function outputComic() {

}

module.exports = {
    getAllcomics: function() {
        const ts = new Date().getTime();
        const message = ts+private_key+public_key;
        const md = md5(message);
        const hash = md.toString();
        const url = url_comics + '&ts=' + ts + '&hash=' + hash;

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            data.data.results.forEach(element => {
                outputComics(element);
            });
        }).catch(error => {
            console.error(error);
        });
    }
    ,
    getComic: function(id) {
        const url = url_comic + id + '?apikey=' + public_key;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            data.data.results.forEach(element => {
                latestContent.innerHTML = '';
                outputComic(element); 
            });
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }
}