const comicUtils = require('./comicUtils');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id !== null && id !== '') {
    comicUtils.getComic(id);
    const elto = document.querySelector('#catHeader');
    elto.style.display = "none";
} else {
    comicUtils.getComicsExtended();
    const elto = document.querySelector('#detHeader');
    elto.style.display = "none";
}