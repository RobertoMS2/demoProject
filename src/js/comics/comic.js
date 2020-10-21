const comicUtils = require('./comicUtils');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id !== null && id !== '') {
    comicUtils.getComic(id);
} else {
    comicUtils.getComicsExtended();
}